import { ArrowUpRight } from "lucide-react";
import PageShell from "../components/PageShell";

export default function ContactContent({ content }) {
  return (
    <PageShell
      title={content.title}
      eyebrow={content.eyebrow}
      intro={content.intro}
    >
      <section className="page-split">
        <div>
          <h2>{content.heading}</h2>
          <p>{content.text}</p>
          <a
            className="button-primary"
            href={
              "mailto:hello@africarii.org?subject=" +
              encodeURIComponent(content.subject)
            }
          >
            Email Africa-RII <ArrowUpRight size={18} />
          </a>
          <p className="contact-address">hello@africarii.org</p>
        </div>
        <div className="editorial-card text-card">
          <p className="page-eyebrow">A useful starting point</p>
          <h3>Include in your message</h3>
          <ul>
            <li>Your name and preferred contact details</li>
            <li>The programme or opportunity that interests you</li>
            <li>Your questions, availability or proposed contribution</li>
          </ul>
          <p>
            The button opens your email application so you can review your
            message before sending.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
