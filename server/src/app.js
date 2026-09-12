import { storePdf, deliverReport } from "./reports.js";
import { Story } from "./models.js";
import { storyInput } from "./validation.js";
import { randomUUID } from "node:crypto";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import session from "express-session";
import MongoStore from "connect-mongo";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import mongoose from "mongoose";
import { Admin, Category, Donation, Enquiry } from "./models.js";
import { checkPassword, requireAdmin } from "./auth.js";
import {
  categoryInput,
  enquiryInput,
  currencies,
  enabledCurrencies,
} from "./validation.js";
import { initialize, reconcile, validSignature } from "./payments.js";

export function createApp({ sessionStore } = {}) {
  const app = express();
  app.disable("x-powered-by");
  if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          "img-src": ["'self'", "data:", "https:"],
          "frame-src": [
            "https://www.youtube-nocookie.com",
              "https://www.google.com",
            "https://www.youtube.com",
          ],
          "object-src": ["'self'", "https:"],
          "upgrade-insecure-requests":
            process.env.NODE_ENV === "production" ? [] : null,
        },
      },
    }),
  );
  app.post(
    "/api/webhooks/paystack",
    express.raw({ type: "application/json", limit: "1mb" }),
    async (req, res) => {
      if (
        !validSignature(
          req.body,
          req.get("x-paystack-signature"),
          process.env.PAYSTACK_SECRET_KEY,
        )
      )
        return res.status(401).json({ error: "Invalid webhook signature." });
      let event;
      try {
        event = JSON.parse(req.body.toString());
      } catch {
        return res.sendStatus(400);
      }
      if (event.event !== "charge.success") return res.sendStatus(200);
      if (!(await Donation.exists({ reference: event.data?.reference })))
        return res.sendStatus(200);
      await reconcile(event.data.reference);
      res.sendStatus(200);
    },
  );
  app.use(express.json({ limit: "200kb" }));
  app.use(
    "/api",
    rateLimit({
      windowMs: 60000,
      limit: 150,
      standardHeaders: "draft-7",
      legacyHeaders: false,
    }),
  );
  app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    if (
      !["GET", "HEAD", "OPTIONS"].includes(req.method) &&
      req.get("origin") !== process.env.CLIENT_URL
    )
      return res
        .status(403)
        .json({ error: "Request origin is not permitted." });
    next();
  });
  app.use(
    session({
      name: "afrii.sid",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store:
        sessionStore ||
        MongoStore.create({
          mongoUrl: process.env.MONGODB_URI,
          dbName: process.env.MONGODB_DB || "afrii",
          collectionName: "sessions",
        }),
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 8 * 60 * 60 * 1000,
      },
    }),
  );
  app.get("/api/health", (_req, res) =>
    res
      .status(mongoose.connection.readyState === 1 ? 200 : 503)
      .json({ ready: mongoose.connection.readyState === 1 }),
  );
  app.get("/api/reports/:id", deliverReport);
  app.get("/api/stories", async (_req, res) =>
    res.json({
      stories: await Story.find({ published: true }).sort({ year: -1 }).lean(),
    }),
  );
  app.get("/api/programmes", async (_req, res) => {
    const categories = await Category.find({ published: true })
      .sort({ order: 1 })
      .lean();
    res.json({
      categories: categories.map((c) => ({
        ...c,
        programs: c.programs.filter((p) => p.published !== false),
      })),
    });
  });
  app.get("/api/donations/config", (_req, res) =>
    res.json({
      currencies: enabledCurrencies().map((code) => ({
        code,
        ...currencies[code],
      })),
    }),
  );
  app.post(
    "/api/donations",
    rateLimit({ windowMs: 60000, limit: 20 }),
    async (req, res) => {
      if (req.body.action === "initialize")
        return res.json(await initialize(req.body));
      if (
        req.body.action !== "verify" ||
        !/^afrii-[a-f0-9-]{36}$/.test(req.body.reference || "")
      )
        return res.status(400).json({ error: "Invalid donation request." });
      const donation = await reconcile(req.body.reference);
      res.json({
        verified: donation.status === "success",
        amount: donation.amount / 100,
        currency: donation.currency,
        reference: donation.reference,
        test: donation.mode === "test",
        message:
          "Payment is not confirmed. Keep your reference and contact us if you were debited.",
      });
    },
  );
  app.post(
    "/api/enquiries",
    rateLimit({ windowMs: 3600000, limit: 10 }),
    async (req, res) => {
      const data = enquiryInput.parse(req.body);
      const enquiry = await Enquiry.create(data);
      res.status(201).json({ sent: true, id: enquiry.id });
    },
  );
  const loginLimit = rateLimit({ windowMs: 15 * 60000, limit: 10 });
  app.post("/api/admin/login", loginLimit, async (req, res) => {
    const input = z
      .object({
        email: z.string().email(),
        password: z.string().min(1).max(256),
      })
      .parse(req.body);
    const admin = await Admin.findOne({ email: input.email.toLowerCase() });
    if (!admin || !checkPassword(input.password, admin.passwordHash))
      return res.status(401).json({ error: "Invalid email or password." });
    await new Promise((resolve, reject) =>
      req.session.regenerate((error) => (error ? reject(error) : resolve())),
    );
    req.session.adminId = admin.id;
    await new Promise((resolve, reject) =>
      req.session.save((error) => (error ? reject(error) : resolve())),
    );
    res.json({ email: admin.email });
  });
  app.post("/api/admin/logout", requireAdmin, async (req, res) => {
    await new Promise((resolve, reject) =>
      req.session.destroy((error) => (error ? reject(error) : resolve())),
    );
    res.clearCookie("afrii.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.json({ ok: true });
  });
  app.use("/api/admin", requireAdmin);
  app.get("/api/admin/me", async (req, res) => {
    const admin = await Admin.findById(req.session.adminId);
    if (!admin)
      return res.status(401).json({ error: "Account no longer exists." });
    res.json({ email: admin.email });
  });
  app.get("/api/admin/stories", async (_req, res) =>
    res.json({ stories: await Story.find().sort({ year: -1 }).lean() }),
  );
  app.post("/api/admin/stories", async (req, res) =>
    res.status(201).json(await Story.create(storyInput.parse(req.body))),
  );
  app.put("/api/admin/stories/:id", async (req, res) => {
    const body = storyInput.parse(req.body);
    const version = z.number().int().min(0).parse(req.body.__v);
    const story = await Story.findOneAndUpdate(
      { _id: req.params.id, __v: version },
      { $set: body, $inc: { __v: 1 } },
      { returnDocument: "after", runValidators: true },
    );
    if (!story)
      return res.status(409).json({
        error: "Article changed in another session. Reload before saving.",
      });
    res.json(story);
  });
  app.delete("/api/admin/stories/:id", async (req, res) => {
    const version = z.number().int().min(0).parse(req.body.__v);
    const result = await Story.deleteOne({ _id: req.params.id, __v: version });
    if (!result.deletedCount)
      return res
        .status(409)
        .json({ error: "Article changed. Reload before deleting." });
    res.json({ ok: true });
  });
  app.get("/api/admin/programmes", async (_req, res) =>
    res.json({ categories: await Category.find().sort({ order: 1 }).lean() }),
  );
  app.post("/api/admin/programmes", async (req, res) =>
    res.status(201).json(await Category.create(categoryInput.parse(req.body))),
  );
  app.put("/api/admin/programmes/:id", async (req, res) => {
    const input = categoryInput.parse(req.body);
    const version = z.number().int().min(0).parse(req.body.__v);
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, __v: version },
      { $set: input, $inc: { __v: 1 } },
      { returnDocument: "after", runValidators: true },
    );
    if (!category)
      return res.status(409).json({
        error:
          "This category changed in another session. Reload before editing.",
      });
    res.json(category);
  });
  app.delete("/api/admin/programmes/:id", async (req, res) => {
    const version = z.number().int().parse(req.body.__v);
    const result = await Category.deleteOne({
      _id: req.params.id,
      __v: version,
    });
    if (!result.deletedCount)
      return res
        .status(409)
        .json({ error: "Category changed. Reload and try again." });
    res.json({ ok: true });
  });
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 25 * 1024 * 1024, files: 1 },
    fileFilter: (_req, file, cb) =>
      cb(
        null,
        ["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(
          file.mimetype,
        ),
      ),
  });
  app.post("/api/admin/uploads", upload.single("file"), async (req, res) => {
    if (!req.file)
      return res
        .status(400)
        .json({ error: "Choose an image up to 8 MB or a PDF up to 25 MB." });
    const bytes = req.file.buffer;
    const pdf = req.file.mimetype === "application/pdf";
    const valid = pdf
      ? bytes.subarray(0, 5).toString() === "%PDF-"
      : (bytes[0] === 0xff && bytes[1] === 0xd8) ||
        bytes
          .subarray(0, 8)
          .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ||
        (bytes.subarray(0, 4).toString() === "RIFF" &&
          bytes.subarray(8, 12).toString() === "WEBP");
    if (!valid)
      return res
        .status(400)
        .json({ error: "File contents do not match a supported format." });
    if (pdf) {
      const stored = await storePdf(bytes, req.file.originalname);
      return res.status(201).json({ ...stored, storage: "mongodb" });
    }
    if (bytes.length > 8 * 1024 * 1024)
      return res.status(400).json({ error: "Images must be 8 MB or smaller." });
    if (!process.env.CLOUDINARY_API_SECRET)
      return res.status(503).json({ error: "Cloudinary is not configured." });
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const result = await new Promise((resolve, reject) =>
      cloudinary.uploader
        .upload_stream(
          {
            folder: "afrii",
            resource_type: pdf ? "raw" : "image",
            ...(pdf
              ? { public_id: randomUUID() + ".pdf" }
              : { allowed_formats: ["jpg", "png", "webp"] }),
          },
          (error, result) => (error ? reject(error) : resolve(result)),
        )
        .end(bytes),
    );
    res
      .status(201)
      .json({ url: result.secure_url, publicId: result.public_id });
  });
  app.get("/api/admin/revenue", async (req, res) => {
    const mode = req.query.mode === "test" ? "test" : "live";
    const totals = await Donation.aggregate([
      { $match: { status: "success", mode } },
      {
        $group: {
          _id: "$currency",
          amount: { $sum: "$amount" },
          fees: { $sum: "$fees" },
          count: { $sum: 1 },
        },
      },
    ]);
    const page = Math.max(1, Number.parseInt(req.query.page) || 1);
    const filter = { mode };
    const [donations, count] = await Promise.all([
      Donation.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * 25)
        .limit(25)
        .select("-fingerprint -idempotencyKey -authorizationUrl")
        .lean(),
      Donation.countDocuments(filter),
    ]);
    res.json({ totals, donations, count, page });
  });
  app.post("/api/admin/donations/:reference/reconcile", async (req, res) => {
    await reconcile(req.params.reference);
    res.json({ ok: true });
  });
  app.get("/api/admin/enquiries", async (req, res) => {
    const page = Math.max(1, Number.parseInt(req.query.page) || 1);
    res.json({
      enquiries: await Enquiry.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * 25)
        .limit(25)
        .lean(),
      count: await Enquiry.countDocuments(),
      page,
    });
  });
  app.patch("/api/admin/enquiries/:id", async (req, res) => {
    const status = z
      .enum(["new", "in-progress", "closed"])
      .parse(req.body.status);
    res.json(
      await Enquiry.findByIdAndUpdate(
        req.params.id,
        { status },
        { returnDocument: "after" },
      ),
    );
  });
  app.use("/api", (_req, res) =>
    res.status(404).json({ error: "Endpoint not found." }),
  );
  app.use((error, _req, res, _next) => {
    if (error instanceof z.ZodError)
      return res.status(400).json({
        error: error.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; "),
      });
    if (error.code === 11000)
      return res.status(409).json({ error: "That slug already exists." });
    if (error.name === "CastError")
      return res.status(400).json({ error: "Invalid identifier." });
    if (error instanceof multer.MulterError)
      return res
        .status(400)
        .json({ error: "Upload exceeds the allowed size or file count." });
    res.status(error.status || 500).json({
      error: error.status
        ? error.message
        : "The server could not complete this request. Please try again.",
    });
  });
  return app;
}
