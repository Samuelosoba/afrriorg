import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Heart, ArrowUpRight } from "lucide-react";
import PageShell from "../components/PageShell";
import { submitJson } from "../utils/forms";

function PaymentStatus({ reference }) {
  const [result, setResult] = useState(null),
    [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    submitJson("/api/donations", { action: "verify", reference })
      .then((data) => {
        if (active) setResult(data);
        if (data.verified) {
          try {
            sessionStorage.removeItem("afrii-donation-request");
          } catch {
            /* Storage may be unavailable. */
          }
        }
      })
      .catch((error) => {
        if (active) setResult({ error: error.message });
      });
    return () => {
      active = false;
    };
  }, [reference, attempt]);
  return (
    <section className="site-form payment-result" aria-live="polite">
      <h2>
        {!result
          ? "Checking your payment..."
          : result.verified
            ? result.test
              ? "Test payment confirmed"
              : "Thank you for your donation"
            : "Payment not yet confirmed"}
      </h2>
      {result?.verified ? (
        <p>
          {result.test
            ? "This was a test transaction."
            : "Your donation has been verified."}{" "}
          Amount: {result.currency} {result.amount.toLocaleString("en-NG")}.
        </p>
      ) : (
        <p>
          {result?.error ||
            result?.message ||
            "Please wait while we check your donation with Paystack."}
        </p>
      )}
      <p className="form-note">
        Reference: <span className="payment-reference">{reference}</span>
      </p>
      {result && !result.verified && (
        <button
          type="button"
          className="button-outline"
          onClick={() => {
            setResult(null);
            setAttempt((n) => n + 1);
          }}
        >
          Check payment again
        </button>
      )}
      <p>
        <Link to="/contact" className="text-link">
          Contact the team
        </Link>
      </p>
      <Link to="/donate" className="text-link">
        Back to donations
      </Link>
    </section>
  );
}
export default function DonatePage() {
  const [params] = useSearchParams();
  const reference = params.get("reference") || params.get("trxref");
  const [amount, setAmount] = useState("5000"),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const [options, setOptions] = useState([]),
    [currency, setCurrency] = useState("NGN");
  const requestKey = useRef(null);
  useEffect(() => {
    fetch("/api/donations/config")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        setOptions(data.currencies);
        if (data.currencies[0]) setCurrency(data.currencies[0].code);
      })
      .catch(() =>
        setError("Donation options are unavailable. Please try again later."),
      );
  }, []);
  const selected = options.find((c) => c.code === currency);
  async function donate(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const payload = JSON.stringify([data.name, data.email, amount, currency]);
      const fingerprint = Array.from(
        new Uint8Array(
          await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(payload),
          ),
        ),
        (b) => b.toString(16).padStart(2, "0"),
      ).join("");
      if (!requestKey.current) {
        try {
          requestKey.current = JSON.parse(
            sessionStorage.getItem("afrii-donation-request"),
          );
        } catch {
          /* Use the in-memory request key. */
        }
      }
      if (!requestKey.current || requestKey.current.fingerprint !== fingerprint)
        requestKey.current = { fingerprint, key: crypto.randomUUID() };
      try {
        sessionStorage.setItem(
          "afrii-donation-request",
          JSON.stringify(requestKey.current),
        );
      } catch {
        /* The current page still retains the key. */
      }
      const result = await submitJson("/api/donations", {
        ...data,
        amount,
        currency,
        idempotencyKey: requestKey.current.key,
        consent: data.consent === "on",
        action: "initialize",
      });
      if (result.completed) {
        window.location.assign(
          "/donate?reference=" + encodeURIComponent(result.reference),
        );
        return;
      }
      const url = new URL(result.url);
      if (url.protocol !== "https:" || url.hostname !== "checkout.paystack.com")
        throw new Error("Unable to open checkout.");
      window.location.assign(url.href);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }
  return (
    <PageShell
      title="Give opportunity a place to grow."
      eyebrow="Donate"
      intro="Support education, practical skills and community-led opportunities through a one-time donation."
    >
      <div className="engagement-layout">
        <div className="engagement-copy">
          <Heart size={32} />
          <h2>A gift towards stronger communities</h2>
          <p>
            Your support helps Africa-RII continue its work in education,
            community resources, health awareness, women and girls, and
            innovation.
          </p>
          <div className="giving-note">
            <h3>Choose an amount that works for you</h3>
            <p>
              Choose an available donation currency. International cards may be
              charged in their home currency by their bank. Continue to Paystack
              to select an available payment method and review your payment.
            </p>
          </div>
          <h3>Have a question about giving?</h3>
          <p>
            For larger contributions or support for a particular programme,
            speak with our team.
          </p>
          <Link className="text-link" to="/contact">
            Discuss your donation <ArrowUpRight size={16} />
          </Link>
        </div>
        {reference ? (
          <PaymentStatus key={reference} reference={reference} />
        ) : (
          <form
            className="site-form"
            onSubmit={donate}
            aria-label="Donation form"
          >
            <p className="page-eyebrow">One-time donation</p>
            <h2>Make your contribution</h2>
            <fieldset disabled={busy || !selected}>
              <label>
                Currency *
                <select
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    setAmount(e.target.value === "NGN" ? "5000" : "20");
                  }}
                >
                  {options.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.code} � {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="amount-options">
                {(currency === "NGN"
                  ? [2000, 5000, 10000, 25000]
                  : [10, 20, 50, 100]
                ).map((value) => (
                  <button
                    type="button"
                    key={value}
                    aria-pressed={amount === String(value)}
                    onClick={() => setAmount(String(value))}
                  >
                    {currency} {value.toLocaleString("en-NG")}
                  </button>
                ))}
              </div>
              <label>
                Donation amount ({currency}) *
                <input
                  name="amount"
                  type="number"
                  inputMode="decimal"
                  min={selected?.minimum || 1}
                  max="10000000"
                  step={currency === "XOF" ? "1" : "0.01"}
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>
              <p className="form-note">
                Minimum: {currency} {selected?.minimum}. Maximum: {currency}{" "}
                10,000,000.
              </p>
              <label>
                Full name *
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                Email address *
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                />
              </label>
              <label className="form-check">
                <input type="checkbox" name="consent" required />
                <span>
                  I confirm this is a one-time donation and agree to share these
                  details for payment processing. *
                </span>
              </label>
              <button className="button-primary" type="submit" disabled={busy}>
                {busy ? "Opening checkout..." : "Donate with Paystack"}{" "}
                <ArrowUpRight size={16} />
              </button>
              <p className="form-note">
                Payment details are entered on Paystack's checkout.
              </p>
            </fieldset>
            {error && (
              <p className="form-status is-error" role="alert">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
      <section className="page-section">
        <h2>Questions about donations</h2>
        <details>
          <summary>Is this a recurring donation?</summary>
          <p>
            No. This form creates a single payment for the amount you choose.
          </p>
        </details>
        <details>
          <summary>What if my payment is not confirmed?</summary>
          <p>
            Keep your Paystack reference and contact hello@africarii.org. If you
            have been debited, ask the team to check before making another
            payment.
          </p>
        </details>
        <details>
          <summary>Can I support a specific programme?</summary>
          <p>
            Please contact the team to discuss programme-specific contributions
            before donating.
          </p>
        </details>
      </section>
    </PageShell>
  );
}
