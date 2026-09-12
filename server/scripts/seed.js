import mongoose from "mongoose";
import { readFile } from "node:fs/promises";
import { Category, Story } from "../src/models.js";
await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB || "afrii",
});
await Category.init();
await Story.init();
const categories = JSON.parse(
  await readFile(new URL("./programmes.seed.json", import.meta.url), "utf8"),
);
for (const [order, category] of categories.entries())
  await Category.updateOne(
    { slug: category.slug },
    { $setOnInsert: { ...category, order, published: true } },
    { upsert: true },
  );
const stories = JSON.parse(
  await readFile(new URL("./stories.seed.json", import.meta.url), "utf8"),
);
for (const story of stories)
  await Story.updateOne(
    { year: story.year },
    { $setOnInsert: story },
    { upsert: true },
  );
console.log("Programme seed completed; existing content preserved.");
await mongoose.disconnect();
