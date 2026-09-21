import { useState } from "react";
import { adminRequest } from "../../utils/adminApi";
import AssetField from "./AssetField";
import MediaEditor from "./MediaEditor";
import ProgrammeArticleEditor from "./ProgrammeArticleEditor";
export default function ProgrammeEditor({ category, onSaved, onCancel }) {
  const [draft, setDraft] = useState(structuredClone(category)),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const field = (key, value) => setDraft((old) => ({ ...old, [key]: value }));
  const programField = (index, key, value) =>
    field(
      "programs",
      draft.programs.map((p, i) => (i === index ? { ...p, [key]: value } : p)),
    );
  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await adminRequest("/programmes" + (draft._id ? "/" + draft._id : ""), {
        method: draft._id ? "PUT" : "POST",
        body: {
          ...draft,
          programs: draft.programs.map((p) => ({
            ...p,
            paragraphs: p.paragraphs.filter((text) => text.trim()),
            sections: (p.sections || []).map(s => ({ ...s, items: (s.items || []).filter(text => text.trim()) })),
          })),
        },
      });
      await onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="site-form admin-editor" onSubmit={save}>
      <h2>{draft._id ? "Edit category" : "New category"}</h2>
      <p>
        Saving a published category updates the website. Keep it unpublished
        while preparing content.
      </p>
      <fieldset disabled={busy}>
        <div className="form-grid">
          {["title", "slug"].map((key) => (
            <label key={key}>
              Category {key}
              <input
                required
                value={draft[key]}
                pattern={key === "slug" ? "[a-z0-9]+(-[a-z0-9]+)*" : undefined}
                onChange={(e) => field(key, e.target.value)}
              />
            </label>
          ))}
        </div>
        <label>
          Card introduction
          <textarea
            value={draft.intro}
            onChange={(e) => field("intro", e.target.value)}
          />
        </label>
        <label>
          Full description
          <textarea
            rows={5}
            value={draft.description}
            onChange={(e) => field("description", e.target.value)}
          />
        </label>
        <AssetField
          label="Category image"
          value={draft.image}
          onChange={(v) => field("image", v)}
        />
        <label>
          Display order
          <input
            type="number"
            min="0"
            max="1000"
            value={draft.order || 0}
            onChange={(e) => field("order", Number(e.target.value))}
          />
        </label>
        <label className="form-check">
          <input
            type="checkbox"
            checked={draft.published}
            onChange={(e) => field("published", e.target.checked)}
          />
          Published
        </label>
        <MediaEditor value={draft} onChange={setDraft} />
        <h2>Programmes in this category</h2>
        {draft.programs.map((program, index) => (
          <div className="admin-subcard" key={index}>
            <h3>{program.title || "New programme"}</h3>
            <div className="form-grid">
              {["title", "slug"].map((key) => (
                <label key={key}>
                  Programme {key}
                  <input
                    required
                    value={program[key]}
                    pattern={
                      key === "slug" ? "[a-z0-9]+(-[a-z0-9]+)*" : undefined
                    }
                    onChange={(e) => programField(index, key, e.target.value)}
                  />
                </label>
              ))}
            </div>
            <label>
              Summary
              <textarea
                value={program.summary}
                onChange={(e) => programField(index, "summary", e.target.value)}
              />
            </label>
            <label>
              Full text (one paragraph per line)
              <textarea
                rows={6}
                value={program.paragraphs.join("\n")}
                onChange={(e) =>
                  programField(index, "paragraphs", e.target.value.split("\n"))
                }
              />
            </label>
            <AssetField
              label="Programme image (optional)"
              value={program.image}
              onChange={(v) => programField(index, "image", v)}
            />
            <label>
              Source link (optional)
              <input
                value={program.source || ""}
                onChange={(e) => programField(index, "source", e.target.value)}
              />
            </label>
            <label className="form-check">
              <input
                type="checkbox"
                checked={program.published !== false}
                onChange={(e) =>
                  programField(index, "published", e.target.checked)
                }
              />
              Published
            </label>
            <ProgrammeArticleEditor value={program} onChange={next => field("programs", draft.programs.map((p, i) => i === index ? next : p))} />
            <MediaEditor
              value={program}
              onChange={(next) =>
                field(
                  "programs",
                  draft.programs.map((p, i) => (i === index ? next : p)),
                )
              }
            />
            <button
              type="button"
              className="button-outline"
              onClick={() =>
                field(
                  "programs",
                  draft.programs.filter((_, i) => i !== index),
                )
              }
            >
              Remove programme from draft
            </button>
          </div>
        ))}
        <button
          type="button"
          className="button-outline"
          onClick={() =>
            field("programs", [
              ...draft.programs,
              {
                title: "",
                slug: "",
                summary: "",
                paragraphs: [],
                image: "",
                source: "",
                published: false,
                videos: [],
                reports: [],
              },
            ])
          }
        >
          Add programme
        </button>
        <div className="resource-actions">
          <button className="button-primary" disabled={busy}>
            {busy ? "Saving�" : "Save category"}
          </button>
          <button type="button" className="button-outline" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </fieldset>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
