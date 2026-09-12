import { useState } from "react";
import { Send } from "lucide-react";
import { submitJson } from "../utils/forms";

export default function EnquiryForm({ kind = "contact" }) {
  const [busy, setBusy] = useState(false),
    [status, setStatus] = useState(null);
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget,
      data = Object.fromEntries(new FormData(form));
    setBusy(true);
    setStatus(null);
    try {
      const result = await submitJson("/api/enquiries", {
        ...data,
        kind,
        consent: data.consent === "on",
      });
      if (!result.sent) throw new Error("Delivery could not be confirmed.");
      setStatus({
        ok: true,
        text: "Thank you. Your enquiry has been received by the Africa-RII team.",
      });
      form.reset();
    } catch (error) {
      setStatus({ ok: false, text: error.message });
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      className="site-form"
      onSubmit={submit}
      aria-label={kind + " enquiry form"}
    >
      <p className="page-eyebrow">
        {kind === "contact"
          ? "Send a message"
          : kind === "volunteer"
            ? "Volunteer application"
            : "Partnership enquiry"}
      </p>
      <h2>
        {kind === "contact"
          ? "We would love to hear from you"
          : "Tell us about yourself"}
      </h2>
      <p>Fields marked * are required.</p>
      <fieldset disabled={busy}>
        <div className="form-grid">
          <label>
            Full name *
            <input name="name" autoComplete="name" required maxLength={100} />
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
          <label>
            Phone number <span>(optional)</span>
            <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
          </label>
          <label>
            Area of interest
            <select name="topic">
              <option>General enquiry</option>
              <option>Education</option>
              <option>Community Resource Centre</option>
              <option>Community health</option>
              <option>Women and girls</option>
              <option>Innovation</option>
              <option>Donations</option>
            </select>
          </label>
          {kind === "partner" && (
            <label className="form-full">
              Organisation *
              <input
                name="organisation"
                autoComplete="organization"
                required
                maxLength={200}
              />
            </label>
          )}
          {kind === "volunteer" && (
            <>
              <label>
                Your skills or experience *
                <input name="skills" required maxLength={500} />
              </label>
              <label>
                Availability *
                <input
                  name="availability"
                  placeholder="Days, hours or preferred dates"
                  required
                  maxLength={500}
                />
              </label>
            </>
          )}
          <label className="form-full">
            {kind === "partner"
              ? "Tell us about your proposed partnership"
              : kind === "volunteer"
                ? "Why would you like to volunteer?"
                : "Your message"}{" "}
            *
            <textarea
              name="message"
              rows={5}
              minLength={10}
              maxLength={5000}
              required
            />
          </label>
        </div>
        <label className="form-trap" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="form-check">
          <input name="consent" type="checkbox" required />
          <span>
            I agree that Africa-RII may use these details to respond to my
            enquiry. *
          </span>
        </label>
        <p className="form-note">
          Please do not include payment card details or sensitive personal
          documents.
        </p>
        <button className="button-primary" disabled={busy} type="submit">
          {busy ? "Sending�" : "Send enquiry"} <Send size={16} />
        </button>
      </fieldset>
      {status && (
        <p
          className={"form-status " + (status.ok ? "is-success" : "is-error")}
          role={status.ok ? "status" : "alert"}
        >
          {status.text}
        </p>
      )}
      <p className="form-note">
        Prefer email?{" "}
        <a href="mailto:hello@africarii.org">hello@africarii.org</a>
      </p>
    </form>
  );
}
