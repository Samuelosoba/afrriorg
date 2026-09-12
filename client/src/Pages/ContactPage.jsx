import { Link } from "react-router-dom";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import PageShell from "../components/PageShell";
import EnquiryForm from "../components/EnquiryForm";

export default function ContactPage() {
  return (
    <PageShell
      title="Let's start a conversation."
      eyebrow="Contact us"
      intro="Ask a question, explore an opportunity or tell us how you would like to support your community."
    >
      <div className="engagement-layout">
        <div className="engagement-copy">
          <h2>Reach the Africa-RII team</h2>
          <p>
            We welcome enquiries about our programmes, participation,
            volunteering and partnerships. Choose an area of interest in the
            form so the team has the right context.
          </p>
          <div className="contact-detail">
            <Mail />
            <div>
              <h3>Email us</h3>
              <a className="text-link" href="mailto:hello@africarii.org">
                hello@africarii.org
              </a>
              <p>For general questions and programme enquiries.</p>
            </div>
          </div>
          <div className="contact-detail">
            <MapPin />
            <div>
              <h3>Community Resource Centre</h3>
              <p>Ilora, Nigeria</p>
              <p>
                Please arrange your visit with the team first. We will confirm
                directions and the available activities.
              </p>
            </div>
          </div>
          <div className="contact-map">
            <iframe title="Map of Ilora, Nigeria" src="https://www.google.com/maps?q=Ilora%2C%20Oyo%2C%20Nigeria&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <p className="form-note">Ilora area map. Contact us to confirm the centre?s entrance and visiting arrangements.</p>
          </div>
          <div className="giving-note">
            <h3>Make your enquiry count</h3>
            <p>
              Include the programme, year or opportunity you are asking about,
              along with any relevant dates.
            </p>
          </div>
        </div>
        <EnquiryForm />
      </div>
      <section className="page-section">
        <p className="page-eyebrow">Find your next step</p>
        <h2>Other ways to connect</h2>
        <div className="editorial-grid">
          {[
            {
              title: "Volunteer",
              href: "/volunteer",
              text: "Share your skills, experience and availability.",
            },
            {
              title: "Partner with us",
              href: "/partner",
              text: "Tell us about your organisation and a possible collaboration.",
            },
            {
              title: "Support our work",
              href: "/donate",
              text: "Make a one-time donation through Paystack.",
            },
          ].map((item) => (
            <Link
              className="editorial-card text-card"
              key={item.href}
              to={item.href}
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="card-link">
                Get started <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="page-section">
        <h2>Before you get in touch</h2>
        <details>
          <summary>How do I join a programme?</summary>
          <p>
            Tell us which programme interests you, your location and any
            questions. The team will advise on current availability and
            participation.
          </p>
        </details>
        <details>
          <summary>Can I visit the Community Resource Centre?</summary>
          <p>
            Please use the form or email to arrange a visit and confirm
            directions before travelling.
          </p>
        </details>
        <details>
          <summary>Where can I request a programme report?</summary>
          <p>
            Check the programme page for available PDF reports or send a request
            specifying the programme and year.
          </p>
        </details>
        <details>
          <summary>Who should I contact about a donation?</summary>
          <p>
            Email hello@africarii.org with your payment reference and question.
            Do not send your card number, PIN or one-time password.
          </p>
        </details>
      </section>
    </PageShell>
  );
}
