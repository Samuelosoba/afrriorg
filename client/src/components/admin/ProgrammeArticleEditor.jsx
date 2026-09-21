import AssetField from "./AssetField";

export default function ProgrammeArticleEditor({ value, onChange }) {
  const update = (key, index, fields) => onChange({ ...value, [key]: value[key].map((item, i) => i === index ? { ...item, ...fields } : item) });
  return <div className="admin-article-fields">
    <h4>Article sections</h4>
    {(value.sections || []).map((section, index) => <div className="admin-subcard" key={index}>
      <label>Section heading<input required value={section.heading} onChange={e => update("sections", index, { heading: e.target.value })} /></label>
      <label>Text (separate paragraphs with a blank line)<textarea value={section.text} onChange={e => update("sections", index, { text: e.target.value })} /></label>
      <label>List items (one per line)<textarea value={(section.items || []).join("\n")} onChange={e => update("sections", index, { items: e.target.value.split("\n") })} /></label>
      <button type="button" className="text-link" onClick={() => onChange({ ...value, sections: value.sections.filter((_, i) => i !== index) })}>Remove section</button>
    </div>)}
    <button type="button" className="button-outline" onClick={() => onChange({ ...value, sections: [...(value.sections || []), { heading: "", text: "", items: [] }] })}>Add section</button>
    <h4>Photo gallery</h4>
    {(value.photos || []).map((photo, index) => <div className="admin-subcard" key={index}>
      <AssetField label={"Photo " + (index + 1)} value={photo.src} onChange={src => update("photos", index, { src })} />
      <label>Photo description<input value={photo.alt} onChange={e => update("photos", index, { alt: e.target.value })} /></label>
      <button type="button" className="text-link" onClick={() => onChange({ ...value, photos: value.photos.filter((_, i) => i !== index) })}>Remove photo</button>
    </div>)}
    <button type="button" className="button-outline" onClick={() => onChange({ ...value, photos: [...(value.photos || []), { src: "", alt: "" }] })}>Add photo</button>
  </div>;
}
