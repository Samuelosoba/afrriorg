import mongoose from "mongoose";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";
import { Story, Category } from "../src/models.js";
import { storePdf } from "../src/reports.js";
import { storyInput } from "../src/validation.js";
await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB || "afrii",
});
await Story.init();
const entries = JSON.parse(
  await readFile(
    new URL("./report-2019-2024.content.json", import.meta.url),
    "utf8",
  ),
);
const backupDir = new URL("../.backups/", import.meta.url);
await mkdir(backupDir, { recursive: true });
await writeFile(
  new URL("before-summer-report-" + Date.now() + ".json", backupDir),
  JSON.stringify(
    {
      stories: await Story.find().lean(),
      categories: await Category.find().lean(),
    },
    null,
    2,
  ),
);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const base = new URL("../../client/public/reports/2019-2024/", import.meta.url);
const full = await storePdf(
  await readFile(new URL("afrii-report-2019-2024.pdf", base)),
  "Africa-RII-report-2019-2024.pdf",
  { source: "User-provided Africa-RII report" },
);
for (const entry of entries) {
  const existing = await Story.findOne({ year: entry.year }).lean();
  const photos = [];
  for (const [index, file] of entry.photoFiles.entries()) {
    const result = await cloudinary.uploader.upload(
      fileURLToPath(new URL(file, base)),
      {
        resource_type: "image",
        public_id: "afrii/report-2019-2024/" + entry.year + "-" + (index + 1),
        overwrite: false,
      },
    );
    photos.push({ src: result.secure_url, alt: entry.photoAlts[index] });
  }
  const extract = await storePdf(
    await readFile(new URL("summer-school-" + entry.year + ".pdf", base)),
    "Summer-School-" + entry.year + "-report.pdf",
    { year: entry.year, sourcePages: entry.pages },
  );
  const draft = storyInput.parse({
    ...entry,
    photos,
    image: photos[0].src,
    source: full.url,
    reports: [
      { ...entry.reports[0], url: extract.url },
      { ...entry.reports[1], url: full.url },
    ],
    videos: existing?.videos || [],
  });
  if (existing) {
    const updated = await Story.updateOne(
      { _id: existing._id, __v: existing.__v },
      { $set: draft, $inc: { __v: 1 } },
    );
    if (!updated.modifiedCount)
      throw new Error(
        "Article changed during import: " +
          entry.year +
          "; rerun after reviewing edits.",
      );
  } else await Story.create(draft);
  console.log(
    "Imported " +
      entry.year +
      ": " +
      photos.length +
      " report photographs, " +
      entry.metrics.length +
      " figures and two PDF links.",
  );
}
const education = await Category.findOne({ slug: "education" });
if (education) {
  const repair = (reports) =>
    (reports || []).map((r) =>
      r.url?.includes("f496ee9d-4eb1-4b4b-9f0c-3842a1d3147a.pdf")
        ? { ...r.toObject(), url: full.url }
        : r,
    );
  education.reports = repair(education.reports);
  for (const programme of education.programs) {
    programme.reports = repair(programme.reports);
    if (
      programme.slug === "summer-school" &&
      !programme.reports.some((r) => r.url === full.url)
    )
      programme.reports.push({
        title: "Africa-RII report, 2019-2024",
        url: full.url,
        description: "The complete original report.",
      });
  }
  await education.save();
}
console.log(
  "Import complete. Existing videos preserved; no unverified video links added.",
);
await mongoose.disconnect();
