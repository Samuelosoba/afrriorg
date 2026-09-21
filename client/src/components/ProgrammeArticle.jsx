import { useState } from "react";
import PhotoCollage from "./PhotoCollage";

export default function ProgrammeArticle({ program }) {
  const [visible, setVisible] = useState(8);
  const photos = program.photos || [];
  return <div className="programme-article">
    <div className="article-prose">
      {(program.sections || []).map((section, index) => <section key={index}>
        <h2>{section.heading}</h2>
        {section.text?.split("\n\n").filter(Boolean).map((text, i) => <p key={i}>{text}</p>)}
        {!!section.items?.length && <ul>{section.items.map((item, i) => <li key={i}>{item}</li>)}</ul>}
      </section>)}
    </div>
    {!!photos.length && <aside className="programme-gallery" aria-label="Programme photographs">
      <p className="page-eyebrow">From the centre</p>
      <h2>Photo gallery</h2>
      <PhotoCollage photos={photos.slice(0, visible)} caption="Photographs from the original Africa-RII programme gallery." />
      {visible < photos.length && <button type="button" className="button-outline" onClick={() => setVisible(n => n + 8)}>Show more photos ({photos.length - visible} remaining)</button>}
    </aside>}
  </div>;
}
