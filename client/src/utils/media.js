export function youtubeEmbedUrl(value) {
  if (typeof value !== "string") return null;
  let id = value.trim();
  if (!/^[A-Za-z0-9_-]{11}$/.test(id)) {
    try {
      const url = new URL(id);
      if (url.protocol !== "https:") return null;
      const host = url.hostname.replace(/^www[.]/, "");
      if (host === "youtu.be") id = url.pathname.slice(1).split("/")[0];
      else if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
        const parts = url.pathname.split("/");
        id = ["embed", "shorts", "live"].includes(parts[1]) ? parts[2] : url.searchParams.get("v");
      } else return null;
    } catch { return null; }
  }
  return /^[A-Za-z0-9_-]{11}$/.test(id || "") ? "https://www.youtube-nocookie.com/embed/" + id + "?playsinline=1" : null;
}
export function reportUrl(value) {
  if (typeof value !== "string") return null;
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) return value;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch { return null; }
}

