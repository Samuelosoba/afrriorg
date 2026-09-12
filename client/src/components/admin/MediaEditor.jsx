import AssetField from "./AssetField";
export default function MediaEditor({ value, onChange }) {
  function update(type, index, key, next) {
    onChange({
      ...value,
      [type]: (value[type] || []).map((item, i) =>
        i === index ? { ...item, [key]: next } : item,
      ),
    });
  }
  return (
    <div className="admin-media">
      {["videos", "reports"].map((type) => (
        <div key={type}>
          <h3>{type === "videos" ? "YouTube videos" : "PDF reports"}</h3>
          {(value[type] || []).map((item, index) => (
            <div className="admin-subcard" key={index}>
              <label>
                Title
                <input
                  required
                  value={item.title}
                  onChange={(e) => update(type, index, "title", e.target.value)}
                />
              </label>
              {type === "reports" ? (
                <AssetField
                  pdf
                  label="PDF URL"
                  value={item.url}
                  onChange={(v) => update(type, index, "url", v)}
                />
              ) : (
                <label>
                  YouTube URL or video ID
                  <input
                    required
                    value={item.url}
                    onChange={(e) => update(type, index, "url", e.target.value)}
                  />
                </label>
              )}
              <label>
                Description
                <textarea
                  value={item.description || ""}
                  onChange={(e) =>
                    update(type, index, "description", e.target.value)
                  }
                />
              </label>
              {type === "reports" && (
                <label>
                  Year
                  <input
                    value={item.year || ""}
                    onChange={(e) =>
                      update(type, index, "year", e.target.value)
                    }
                  />
                </label>
              )}
              <button
                type="button"
                className="button-outline"
                onClick={() =>
                  onChange({
                    ...value,
                    [type]: value[type].filter((_, i) => i !== index),
                  })
                }
              >
                Remove {type === "videos" ? "video" : "report"}
              </button>
            </div>
          ))}
          <button
            type="button"
            className="button-outline"
            onClick={() =>
              onChange({
                ...value,
                [type]: [
                  ...(value[type] || []),
                  {
                    title: "",
                    url: "",
                    description: "",
                    ...(type === "reports" ? { year: "" } : {}),
                  },
                ],
              })
            }
          >
            Add {type === "videos" ? "video" : "report"}
          </button>
        </div>
      ))}
    </div>
  );
}
