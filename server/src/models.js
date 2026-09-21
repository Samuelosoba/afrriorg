import mongoose from "mongoose";
const { Schema } = mongoose;
const media = {
  videos: [{ title: String, url: String, description: String }],
  reports: [{ title: String, url: String, description: String, year: String }],
};
const program = new Schema(
  {
    slug: String,
    title: String,
    summary: String,
    paragraphs: [String],
    sections: [{ heading: String, text: String, items: [String] }],
    photos: [{ src: String, alt: String }],
    image: String,
    source: String,
    published: { type: Boolean, default: true },
    ...media,
  },
  { _id: false },
);
export const Category = mongoose.model(
  "Category",
  new Schema(
    {
      slug: { type: String, unique: true, required: true },
      title: String,
      intro: String,
      description: String,
      image: String,
      order: Number,
      published: { type: Boolean, default: true },
      programs: [program],
      ...media,
    },
    { timestamps: true, optimisticConcurrency: true },
  ),
);
export const Admin = mongoose.model(
  "Admin",
  new Schema(
    {
      email: { type: String, unique: true, required: true },
      passwordHash: { type: String, required: true },
    },
    { timestamps: true },
  ),
);
export const Donation = mongoose.model(
  "Donation",
  new Schema(
    {
      reference: { type: String, unique: true, required: true },
      idempotencyKey: { type: String, unique: true, required: true },
      fingerprint: String,
      name: String,
      email: String,
      amount: Number,
      currency: String,
      status: {
        type: String,
        enum: ["created", "initializing", "pending", "success", "failed"],
        default: "created",
      },
      authorizationUrl: String,
      providerId: String,
      mode: { type: String, enum: ["test", "live"] },
      paidAt: Date,
      fees: Number,
      verifiedAt: Date,
    },
    { timestamps: true },
  ),
);
export const Enquiry = mongoose.model(
  "Enquiry",
  new Schema(
    {
      kind: String,
      name: String,
      email: String,
      phone: String,
      topic: String,
      message: String,
      organisation: String,
      skills: String,
      availability: String,
      consent: Boolean,
      status: {
        type: String,
        enum: ["new", "in-progress", "closed"],
        default: "new",
      },
    },
    { timestamps: true },
  ),
);
export const Story = mongoose.model(
  "Story",
  new Schema(
    {
      year: { type: String, unique: true, required: true },
      title: String,
      subtitle: String,
      image: String,
      caption: String,
      source: String,
      verified: { type: Boolean, default: false },
      published: { type: Boolean, default: false },
      sections: [{ heading: String, text: String }],
      metrics: [{ label: String, value: String }],
      photos: [{ src: String, alt: String }],
      ...media,
    },
    { timestamps: true, optimisticConcurrency: true },
  ),
);
