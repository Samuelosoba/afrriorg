import PageShell from "./PageShell";
import EnquiryForm from "./EnquiryForm";
export default function ContactContent({ content, kind }) {
  return (
    <PageShell
      title={content.title}
      eyebrow={content.eyebrow}
      intro={content.intro}
    >
      <div className="engagement-layout">
        <div className="engagement-copy">
          <h2>{content.heading}</h2>
          <p>{content.text}</p>
          <div className="giving-note">
            <h3>
              {kind === "volunteer"
                ? "Every skill has a place"
                : "Build a shared purpose"}
            </h3>
            <p>
              {kind === "volunteer"
                ? "Tell us what you enjoy doing, the experience you bring and when you can help. The team will discuss suitable opportunities with you."
                : "Introduce your organisation, your areas of interest and the contribution you have in mind. We can explore the next steps together."}
            </p>
          </div>
          <p>Prefer to write directly?</p>
          <a className="text-link" href="mailto:hello@africarii.org">
            hello@africarii.org
          </a>
        </div>
        <EnquiryForm kind={kind} />
      </div>
    </PageShell>
  );
}
