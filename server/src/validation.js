import { z } from "zod";
const slug = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const safeUrl = z
  .string()
  .max(2000)
  .refine(
    (value) =>
      !value ||
      /^https:\/\//.test(value) ||
      (/^\/(?!\/)/.test(value) && !value.includes("\\")),
    "Use HTTPS or a local /path",
  );
const media = {
  videos: z
    .array(
      z.object({
        title: z.string().min(1).max(200),
        url: z.string().min(1).max(2000),
        description: z.string().max(2000).default(""),
      }),
    )
    .max(30)
    .default([]),
  reports: z
    .array(
      z.object({
        title: z.string().min(1).max(200),
        url: safeUrl,
        year: z.string().max(10).default(""),
        description: z.string().max(2000).default(""),
      }),
    )
    .max(30)
    .default([]),
};
export const categoryInput = z
  .object({
    slug,
    title: z.string().min(1).max(200),
    intro: z.string().max(2000),
    description: z.string().max(20000),
    image: safeUrl,
    published: z.boolean().default(true),
    order: z.number().int().min(0).max(1000).default(0),
    ...media,
    programs: z
      .array(
        z.object({
          slug,
          title: z.string().min(1).max(200),
          summary: z.string().max(2000),
          paragraphs: z.array(z.string().min(1).max(10000)).max(40),
          image: safeUrl.default(""),
          source: safeUrl.default(""),
          published: z.boolean().default(true),
          ...media,
        }),
      )
      .max(50),
  })
  .refine(
    (c) => new Set(c.programs.map((p) => p.slug)).size === c.programs.length,
    "Programme slugs must be unique within a category",
  );
export const enquiryInput = z
  .object({
    kind: z.enum(["contact", "volunteer", "partner"]),
    name: z.string().trim().min(1).max(100),
    email: z.string().email().max(254),
    phone: z.string().max(40).default(""),
    topic: z.string().max(200).default(""),
    message: z.string().trim().min(10).max(5000),
    organisation: z.string().max(200).default(""),
    skills: z.string().max(500).default(""),
    availability: z.string().max(500).default(""),
    consent: z.literal(true),
    website: z.string().max(0).optional(),
  })
  .refine(
    (v) => v.kind !== "volunteer" || (v.skills.trim() && v.availability.trim()),
    "Skills and availability are required",
  )
  .refine(
    (v) => v.kind !== "partner" || v.organisation.trim(),
    "Organisation is required",
  );
export const donationInput = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().email().max(254),
  amount: z.string().regex(/^[0-9]+([.][0-9]{1,2})?$/),
  currency: z.enum(["NGN", "USD", "GHS", "ZAR", "KES", "XOF"]),
  consent: z.literal(true),
  idempotencyKey: z.string().uuid(),
});
export const currencies = {
  NGN: { label: "Nigerian naira", minimum: 50 },
  USD: { label: "US dollar", minimum: 2 },
  GHS: { label: "Ghanaian cedi", minimum: 0.1 },
  ZAR: { label: "South African rand", minimum: 1 },
  KES: { label: "Kenyan shilling", minimum: 3 },
  XOF: { label: "West African CFA franc", minimum: 1 },
};
export function enabledCurrencies() {
  return (process.env.PAYSTACK_CURRENCIES || "NGN")
    .split(",")
    .map((c) => c.trim().toUpperCase())
    .filter((c, i, a) => currencies[c] && a.indexOf(c) === i);
}
export const storyInput = z.object({
  metrics: z
    .array(
      z.object({
        label: z.string().min(1).max(100),
        value: z.string().min(1).max(100),
      }),
    )
    .max(12)
    .default([]),
  year: z.string().regex(/^[0-9]{4}$/),
  title: z.string().trim().min(1).max(200),
  subtitle: z.string().max(2000),
  image: safeUrl,
  caption: z.string().max(1000).default(""),
  source: safeUrl.default(""),
  verified: z.boolean().default(false),
  published: z.boolean().default(false),
  sections: z
    .array(
      z.object({
        heading: z.string().trim().min(1).max(200),
        text: z.string().trim().min(1).max(20000),
      }),
    )
    .min(1)
    .max(40),
  photos: z
    .array(
      z.object({
        src: safeUrl.refine((v) => !!v, "Choose a photo"),
        alt: z.string().trim().min(1).max(500),
      }),
    )
    .max(40)
    .default([]),
  ...media,
});
