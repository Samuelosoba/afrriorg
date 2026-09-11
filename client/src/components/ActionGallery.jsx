import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import GalleryOne from "../assets/hero.png";
import GalleryTwo from "../assets/hero.png";
import GalleryThree from "../assets/hero.png";
import GalleryFour from "../assets/hero.png";
import GalleryFive from "../assets/hero.png";

const galleryItems = [
  {
    image: GalleryOne,
    title: "Learning in community",
    category: "Education",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    image: GalleryTwo,
    title: "Building practical skills",
    category: "Empowerment",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    image: GalleryThree,
    title: "Supporting young people",
    category: "Youth",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    image: GalleryFour,
    title: "Creating safer spaces",
    category: "Women & Girls",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    image: GalleryFive,
    title: "Community-led action",
    category: "Community",
    className: "md:col-span-1 md:row-span-2",
  },
];

export default function ActionGallery() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)] py-24 sm:py-28 lg:py-32">
      <div className="absolute -right-40 top-10 h-[380px] w-[380px] rounded-full bg-[var(--green-soft)]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[var(--green-soft)]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--green)]">
                Africa-RII in action
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
              Change looks different
              <span className="block text-[var(--green)]">
                in every community.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Gallery */}
        <div className="grid auto-rows-[260px] gap-5 md:grid-cols-4">
          {galleryItems.map((item, index) => (
            <motion.a
              key={item.title}
              href="/gallery"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
              }}
              className={`group relative overflow-hidden rounded-[2rem] ${item.className}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/80 via-[var(--ink)]/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--green)]">
                  {item.category}
                </p>

                <div className="mt-2 flex items-end justify-between gap-5">
                  <h3 className="max-w-xs text-xl font-semibold leading-snug text-white sm:text-2xl">
                    {item.title}
                  </h3>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition duration-300 group-hover:rotate-45 group-hover:bg-[var(--green-soft)] group-hover:text-[var(--ink)]">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom area */}
        <div className="mt-10 flex flex-col gap-6 rounded-[2rem] bg-white p-7 shadow-[0_14px_45px_rgba(0,40,20,0.06)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--green)]">
              More from the field
            </p>

            <p className="mt-2 max-w-2xl text-base leading-7 text-neutral-600">
              Explore moments from our programs, trainings, community events and
              the people at the heart of Africa-RII’s work.
            </p>
          </div>

          <a
            href="/gallery"
            className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[var(--green)] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--ink)]"
          >
            View gallery
            <span className="transition-transform group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
