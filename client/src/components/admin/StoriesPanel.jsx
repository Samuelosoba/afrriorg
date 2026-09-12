import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminRequest } from "../../utils/adminApi";
import { useProgrammes } from "../../utils/useProgrammes";
import AssetField from "./AssetField";
import MediaEditor from "./MediaEditor";
function StoryEditor({ story, onSaved, onCancel }) {
  const [draft, setDraft] = useState(structuredClone(story)),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const field = (key, value) => setDraft((old) => ({ ...old, [key]: value }));
  async function save(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await adminRequest("/stories" + (draft._id ? "/" + draft._id : ""), {
        method: draft._id ? "PUT" : "POST",
        body: draft,
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
      <p className="page-eyebrow">Education / Summer School</p>
      <h2>{draft._id ? "Edit article" : "New article"}</h2>
      <fieldset disabled={busy}>
        <div className="form-grid">
          <label>
            Year
            <input
              required
              pattern="[0-9]{4}"
              inputMode="numeric"
              maxLength={4}
              value={draft.year}
              onChange={(e) => field("year", e.target.value)}
            />
          </label>
          <label>
            Article title
            <input
              required
              maxLength={200}
              value={draft.title}
              onChange={(e) => field("title", e.target.value)}
            />
          </label>
        </div>
        <label>
          Introduction
          <textarea
            value={draft.subtitle}
            onChange={(e) => field("subtitle", e.target.value)}
          />
        </label>
        <AssetField
          label="Cover image"
          value={draft.image}
          onChange={(v) => field("image", v)}
        />
        <label>
          Photo attribution / caption
          <textarea
            value={draft.caption || ""}
            onChange={(e) => field("caption", e.target.value)}
          />
        </label>
        <label>
          Source URL
          <input
            value={draft.source || ""}
            onChange={(e) => field("source", e.target.value)}
          />
        </label>
        <label className="form-check">
          <input
            type="checkbox"
            checked={draft.verified}
            onChange={(e) => field("verified", e.target.checked)}
          />
          Year-specific text and photographs are verified
        </label>
        <label className="form-check">
          <input
            type="checkbox"
            checked={draft.published}
            onChange={(e) => field("published", e.target.checked)}
          />
          Publish on the website
        </label>
        <h3>Report figures</h3>
        {(draft.metrics || []).map((metric, index) => (
          <div className="form-grid" key={index}>
            <label>
              Figure label
              <input
                required
                value={metric.label}
                onChange={(e) =>
                  field(
                    "metrics",
                    draft.metrics.map((m, i) =>
                      i === index ? { ...m, label: e.target.value } : m,
                    ),
                  )
                }
              />
            </label>
            <label>
              Figure value
              <input
                required
                value={metric.value}
                onChange={(e) =>
                  field(
                    "metrics",
                    draft.metrics.map((m, i) =>
                      i === index ? { ...m, value: e.target.value } : m,
                    ),
                  )
                }
              />
            </label>
            <button
              type="button"
              className="button-outline"
              onClick={() =>
                field(
                  "metrics",
                  draft.metrics.filter((_, i) => i !== index),
                )
              }
            >
              Remove figure
            </button>
          </div>
        ))}
        <button
          type="button"
          className="button-outline"
          onClick={() =>
            field("metrics", [
              ...(draft.metrics || []),
              { label: "", value: "" },
            ])
          }
        >
          Add report figure
        </button>
        <h3>Article sections</h3>
        {draft.sections.map((section, index) => (
          <div className="admin-subcard" key={index}>
            <label>
              Section heading
              <input
                required
                value={section.heading}
                onChange={(e) =>
                  field(
                    "sections",
                    draft.sections.map((s, i) =>
                      i === index ? { ...s, heading: e.target.value } : s,
                    ),
                  )
                }
              />
            </label>
            <label>
              Section text
              <textarea
                required
                rows={6}
                value={section.text}
                onChange={(e) =>
                  field(
                    "sections",
                    draft.sections.map((s, i) =>
                      i === index ? { ...s, text: e.target.value } : s,
                    ),
                  )
                }
              />
            </label>
            <button
              type="button"
              className="button-outline"
              disabled={draft.sections.length === 1}
              onClick={() =>
                field(
                  "sections",
                  draft.sections.filter((_, i) => i !== index),
                )
              }
            >
              Remove section
            </button>
          </div>
        ))}
        <button
          className="button-outline"
          type="button"
          onClick={() =>
            field("sections", [...draft.sections, { heading: "", text: "" }])
          }
        >
          Add section
        </button>
        <h3>Photo gallery</h3>
        <p>Photos appear together in the responsive article collage.</p>
        {draft.photos.map((photo, index) => (
          <div className="admin-subcard" key={index}>
            <AssetField
              label={"Photo " + (index + 1)}
              value={photo.src}
              onChange={(v) =>
                field(
                  "photos",
                  draft.photos.map((p, i) =>
                    i === index ? { ...p, src: v } : p,
                  ),
                )
              }
            />
            <label>
              Describe this photograph
              <input
                required
                value={photo.alt}
                onChange={(e) =>
                  field(
                    "photos",
                    draft.photos.map((p, i) =>
                      i === index ? { ...p, alt: e.target.value } : p,
                    ),
                  )
                }
              />
            </label>
            <div className="resource-actions">
              <button
                type="button"
                className="button-outline"
                disabled={index === 0}
                onClick={() => {
                  const photos = [...draft.photos];
                  [photos[index - 1], photos[index]] = [
                    photos[index],
                    photos[index - 1],
                  ];
                  field("photos", photos);
                }}
              >
                Move earlier
              </button>
              <button
                type="button"
                className="button-outline"
                onClick={() =>
                  field(
                    "photos",
                    draft.photos.filter((_, i) => i !== index),
                  )
                }
              >
                Remove photo
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="button-outline"
          onClick={() =>
            field("photos", [...draft.photos, { src: "", alt: "" }])
          }
        >
          Add photo
        </button>
        <MediaEditor value={draft} onChange={setDraft} />
        <div className="editor-save-bar">
          <button className="button-primary" disabled={busy}>
            {busy ? "Saving..." : "Save article"}
          </button>
          <button className="button-outline" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </fieldset>
      {error && (
        <p role="alert" className="form-status is-error">
          {error}
        </p>
      )}
    </form>
  );
}
export default function StoriesPanel() {
  const [stories, setStories] = useState([]),
    [editing, setEditing] = useState(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true);
  const { refresh } = useProgrammes();
  useEffect(() => {
    adminRequest("/stories")
      .then((data) => setStories(data.stories))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  async function reload() {
    try {
      setStories((await adminRequest("/stories")).stories);
      await refresh();
    } catch (err) {
      setError(err.message);
    }
  }
  async function remove(story) {
    if (
      !window.confirm(
        "Delete Summer School " +
          story.year +
          "? This removes the article from the website.",
      )
    )
      return;
    try {
      await adminRequest("/stories/" + story._id, {
        method: "DELETE",
        body: { __v: story.__v },
      });
      await reload();
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <section>
      {editing ? (
        <StoryEditor
          key={editing._id || "new"}
          story={editing}
          onCancel={() => setEditing(null)}
          onSaved={async () => {
            setEditing(null);
            await reload();
          }}
        />
      ) : (
        <>
          <div className="resource-actions">
            <div>
              <p className="page-eyebrow">Education</p>
              <h2>Summer School articles</h2>
            </div>
            <button
              className="button-primary"
              onClick={() =>
                setEditing({
                  year: String(new Date().getFullYear()),
                  title: "",
                  subtitle: "",
                  image: "",
                  caption: "",
                  source: "",
                  published: false,
                  verified: false,
                  sections: [{ heading: "", text: "" }],
                  photos: [],
                  videos: [],
                  reports: [],
                })
              }
            >
              New article
            </button>
          </div>
          <p>Manage each year's story, photo collage, videos and reports.</p>
          {loading ? (
            <p>Loading articles...</p>
          ) : (
            stories.map((story) => (
              <article className="admin-category" key={story._id}>
                <div>
                  <p className="page-eyebrow">Summer School / {story.year}</p>
                  <h3>{story.title}</h3>
                  <p>
                    {story.published ? "Published" : "Draft"} /{" "}
                    {story.photos.length} photos
                  </p>
                  {story.published && (
                    <Link
                      to={"/programs/education/summer-school/" + story.year}
                    >
                      View article
                    </Link>
                  )}
                </div>
                <div className="resource-actions">
                  <button
                    className="button-outline"
                    onClick={() => setEditing(story)}
                  >
                    Edit article
                  </button>
                  <button
                    className="button-outline"
                    onClick={() => remove(story)}
                  >
                    Delete article
                  </button>
                </div>
              </article>
            ))
          )}
          {!loading && !stories.length && (
            <p>
              No articles yet. Add one or run the seed command to import the
              existing journals.
            </p>
          )}
        </>
      )}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
