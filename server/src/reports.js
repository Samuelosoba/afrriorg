import mongoose from "mongoose";
import { createHash } from "node:crypto";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
export function reportBucket() {
  return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "reports",
  });
}
export async function storePdf(bytes, filename, metadata = {}) {
  if (bytes.subarray(0, 5).toString() !== "%PDF-")
    throw Object.assign(new Error("The file is not a PDF."), { status: 400 });
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  const bucket = reportBucket();
  const existing = await bucket.find({ "metadata.sha256": sha256 }).next();
  if (existing)
    return { url: "/api/reports/" + existing._id, id: String(existing._id) };
  const stream = bucket.openUploadStream(
    filename.replace(/[^a-zA-Z0-9._ -]/g, "_"),
    { contentType: "application/pdf", metadata: { ...metadata, sha256 } },
  );
  await pipeline(Readable.from(bytes), stream);
  return { url: "/api/reports/" + stream.id, id: String(stream.id) };
}
export async function deliverReport(req, res, next) {
  try {
    if (!/^[a-f0-9]{24}$/i.test(req.params.id))
      return res.status(404).json({ error: "Report not found." });
    const id = new mongoose.Types.ObjectId(req.params.id),
      bucket = reportBucket();
    const file = await bucket.find({ _id: id }).next();
    if (!file) return res.status(404).json({ error: "Report not found." });
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition":
        "inline; filename*=UTF-8''" + encodeURIComponent(file.filename),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    });
    let start = 0,
      end = file.length - 1;
    const range = req.get("range");
    if (range) {
      const match = /^bytes=([0-9]*)-([0-9]*)$/.exec(range);
      if (!match || (!match[1] && !match[2]))
        return res
          .status(416)
          .set("Content-Range", "bytes */" + file.length)
          .end();
      if (!match[1]) start = Math.max(0, file.length - Number(match[2]));
      else {
        start = Number(match[1]);
        if (match[2]) end = Math.min(end, Number(match[2]));
      }
      if (
        !Number.isSafeInteger(start) ||
        !Number.isSafeInteger(end) ||
        start > end ||
        start >= file.length
      )
        return res
          .status(416)
          .set("Content-Range", "bytes */" + file.length)
          .end();
      res
        .status(206)
        .set("Content-Range", `bytes ${start}-${end}/${file.length}`);
    }
    res.set("Content-Length", String(end - start + 1));
    if (req.method === "HEAD") return res.end();
    const stream = bucket.openDownloadStream(id, { start, end: end + 1 });
    res.on("close", () => stream.destroy());
    stream.on("error", (error) => {
      if (res.headersSent) res.destroy();
      else next(error);
    });
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
}
