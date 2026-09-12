import mongoose from "mongoose";
import { Admin } from "../src/models.js";
import { hashPassword } from "../src/auth.js";
if (
  !process.env.ADMIN_EMAIL ||
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.ADMIN_EMAIL) ||
  !process.env.ADMIN_PASSWORD ||
  process.env.ADMIN_PASSWORD.length < 12
)
  throw new Error(
    "Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters) in the server environment.",
  );
await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DB || "afrii",
});
await Admin.init();
await Admin.create({
  email: process.env.ADMIN_EMAIL.trim().toLowerCase(),
  passwordHash: hashPassword(process.env.ADMIN_PASSWORD),
});
console.log("Admin created. Remove ADMIN_PASSWORD from your environment.");
await mongoose.disconnect();
