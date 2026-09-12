import {
  createHash,
  createHmac,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import { Donation } from "./models.js";
import { donationInput, enabledCurrencies, currencies } from "./validation.js";
export function validSignature(body, signature, secret) {
  if (
    !secret ||
    !Buffer.isBuffer(body) ||
    typeof signature !== "string" ||
    !/^[a-f0-9]{128}$/i.test(signature)
  )
    return false;
  return timingSafeEqual(
    createHmac("sha512", secret).update(body).digest(),
    Buffer.from(signature, "hex"),
  );
}
export async function paystack(path, body) {
  if (!process.env.PAYSTACK_SECRET_KEY)
    throw Object.assign(new Error("Online donations are not configured yet."), {
      status: 503,
    });
  const response = await fetch("https://api.paystack.co" + path, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: "Bearer " + process.env.PAYSTACK_SECRET_KEY,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(15000),
  });
  const result = await response.json();
  if (!response.ok || !result.status)
    throw Object.assign(
      new Error(
        "Paystack could not complete this request. Please retain your reference and try checking again.",
      ),
      { status: 502 },
    );
  return result.data;
}
export async function reconcile(reference) {
  const donation = await Donation.findOne({ reference });
  if (!donation)
    throw Object.assign(new Error("Donation not found."), { status: 404 });
  if (donation.status === "success") return donation;
  const payment = await paystack(
    "/transaction/verify/" + encodeURIComponent(reference),
  );
  if (
    payment.reference !== reference ||
    payment.amount !== donation.amount ||
    payment.currency !== donation.currency ||
    payment.customer?.email?.toLowerCase() !== donation.email.toLowerCase() ||
    payment.domain !== donation.mode
  )
    throw Object.assign(
      new Error("Payment details do not match the donation."),
      { status: 409 },
    );
  if (payment.status === "success") {
    // Atomic transition: concurrent callbacks and webhook retries cannot credit twice.
    await Donation.updateOne(
      { _id: donation._id, status: { $ne: "success" } },
      {
        $set: {
          status: "success",
          providerId: String(payment.id),
          paidAt: payment.paid_at ? new Date(payment.paid_at) : new Date(),
          fees: payment.fees || 0,
          verifiedAt: new Date(),
        },
      },
    );
  } else if (["failed", "abandoned", "reversed"].includes(payment.status))
    await Donation.updateOne(
      { _id: donation._id, status: { $ne: "success" } },
      { $set: { status: "failed", verifiedAt: new Date() } },
    );
  return Donation.findById(donation._id);
}
export async function initialize(input) {
  const data = donationInput.parse(input);
  if (!process.env.PAYSTACK_SECRET_KEY)
    throw Object.assign(new Error("Online donations are not configured yet."), {
      status: 503,
    });
  const amount = Math.round(Number(data.amount) * 100);
  if (
    !enabledCurrencies().includes(data.currency) ||
    !Number.isSafeInteger(amount) ||
    amount < currencies[data.currency].minimum * 100 ||
    amount > 1000000000 ||
    (data.currency === "XOF" && amount % 100)
  )
    throw Object.assign(
      new Error(
        "Choose an enabled currency and a valid amount within the displayed limits.",
      ),
      { status: 400 },
    );
  const fingerprint = createHash("sha256")
    .update(
      JSON.stringify([
        data.name,
        data.email.toLowerCase(),
        amount,
        data.currency,
      ]),
    )
    .digest("hex");
  let donation;
  try {
    donation = await Donation.create({
      reference: "afrii-" + randomUUID(),
      idempotencyKey: data.idempotencyKey,
      fingerprint,
      name: data.name,
      email: data.email,
      amount,
      currency: data.currency,
      mode: process.env.PAYSTACK_SECRET_KEY.startsWith("sk_live_")
        ? "live"
        : "test",
    });
  } catch (error) {
    if (error.code !== 11000) throw error;
    donation = await Donation.findOne({ idempotencyKey: data.idempotencyKey });
  }
  if (!donation || donation.fingerprint !== fingerprint)
    throw Object.assign(
      new Error(
        "This request key was already used with different donation details.",
      ),
      { status: 409 },
    );
  if (donation.status === "success")
    return { reference: donation.reference, completed: true };
  if (donation.authorizationUrl)
    return { url: donation.authorizationUrl, reference: donation.reference };
  const locked = await Donation.findOneAndUpdate(
    { _id: donation._id, status: "created" },
    { $set: { status: "initializing" } },
    { returnDocument: "after" },
  );
  if (!locked)
    throw Object.assign(
      new Error(
        "This checkout is already being prepared. Check its reference before starting another donation: " +
          donation.reference,
      ),
      { status: 409 },
    );
  try {
    const payment = await paystack("/transaction/initialize", {
      email: donation.email,
      amount,
      currency: donation.currency,
      reference: donation.reference,
      callback_url: new URL("/donate", process.env.CLIENT_URL).href,
      metadata: { donor_name: donation.name },
    });
    const url = new URL(payment.authorization_url);
    if (url.protocol !== "https:" || url.hostname !== "checkout.paystack.com")
      throw new Error("Invalid checkout URL");
    await Donation.updateOne(
      { _id: donation._id },
      { $set: { authorizationUrl: url.href } },
    );
    await Donation.updateOne(
      { _id: donation._id, status: "initializing" },
      { $set: { status: "pending" } },
    );
    return { url: url.href, reference: donation.reference };
  } catch (error) {
    error.message += " Reference: " + donation.reference;
    throw error;
  }
}
