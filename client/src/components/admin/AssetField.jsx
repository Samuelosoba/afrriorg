import { useState } from "react";
import { adminRequest } from "../../utils/adminApi";
export default function AssetField({ label, value, onChange, pdf = false }) {
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function upload(event) {
    const file = event.target.files[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const result = await adminRequest("/uploads", { method: "POST", body });
      onChange(result.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  }
  return (
    <div className="asset-field">
      <label>
        {label}
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://�"
        />
      </label>
      <label>
        {busy ? "Uploading�" : pdf ? "Upload PDF" : "Upload image"}
        <input
          type="file"
          accept={pdf ? "application/pdf" : "image/jpeg,image/png,image/webp"}
          disabled={busy}
          onChange={upload}
        />
      </label>
      {error && <p role="alert">{error}</p>}
      {value && !pdf && <img src={value} alt="Selected programme" />}
    </div>
  );
}
