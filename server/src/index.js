import express from "express";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { createApp } from "./app.js";
import { Category, Donation, Admin, Story } from "./models.js";
for (const key of ["MONGODB_URI", "CLIENT_URL", "SESSION_SECRET"])
  if (!process.env[key]) throw new Error(key + " must be configured.");
if (process.env.SESSION_SECRET.length < 32)
  throw new Error("SESSION_SECRET must have at least 32 characters.");
await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB || "afrii",
});
await Promise.all([
  Category.init(),
  Donation.init(),
  Admin.init(),
  Story.init(),
]);
const app = createApp();
if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
  const dist = fileURLToPath(new URL("../../client/dist", import.meta.url));
  app.use(express.static(dist));
  app.get("/{*path}", (_req, res) => res.sendFile(dist + "/index.html"));
}
export default app;

if (!process.env.VERCEL) {
const server = app.listen(process.env.PORT || 4000, () =>
  console.log("Africa-RII API listening on port " + (process.env.PORT || 4000)),
);
for (const signal of ["SIGTERM", "SIGINT"])
  process.on(signal, () =>
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    }),
  );
}
