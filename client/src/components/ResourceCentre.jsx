import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

import ResourceImage from "../assets/hero.png";

const timeline = [
  {
    year: "2020",
    title: "The beginning",
    description:
      "A community-focused vision begins to take shape around creating access to learning, support and shared resources.",
  },
  {
    year: "2021",
    title: "Growing access",
    description:
      "More community members begin using the centre as a space for learning, connection and support.",
  },
  {
    year: "2022",
    title: "Expanding opportunities",
    description:
      "Training, education and community-led activities broaden the centre’s reach and usefulness.",
  },
  {
    year: "2023",
    title: "Strengthening community",
    description:
      "The centre becomes a stronger platform for collaboration, capacity building and local participation.",
  },
  {
    year: "2024",
    title: "Deepening impact",
    description:
      "Programs continue to evolve around the changing needs of children, young people, women and families.",
  },
];

export default function ResourceCentre() {
  return (
    <section className="relative overflow-hidden bg-[#fffdf7] py-24 sm:py-28 lg:py-32">
      {/* Decorative shapes */}
      <div className="absolute -left-32 bottom-20 h-[380px] w-[380px] rounded-full bg-[var(--yellow)]/10 blur-3xl" />
      <div className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[var(--yellow)]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--blue)]">
                Community Resource Centre
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[var(--blue-dark)] sm:text-5xl lg:text-6xl">
              A space where
              <span className="block text-[var(--blue)]">
                opportunity comes together.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Main layout */}
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-28"
          >
            <div className="relative">
              {/* Yellow border */}
              <div className="absolute -left-4 -top-4 h-full w-full rounded-[2.5rem] border-[3px] border-[var(--yellow)] sm:-left-6 sm:-top-6" />

              <div className="relative h-[500px] overflow-hidden rounded-[2.5rem] sm:h-[620px]">
                <img
                  src={ResourceImage}
                  alt="Africa-RII Community Resource Centre"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--blue-dark)]/70 via-transparent to-transparent" />

                {/* Image content */}
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <div className="flex items-center gap-2 text-[var(--yellow)]">
                    <MapPin size={17} />
                    <span className="text-xs font-bold uppercase tracking-[0.16em]">
                      Community-led development
                    </span>
                  </div>

                  <p className="mt-4 max-w-md text-2xl font-semibold leading-snug text-white sm:text-3xl">
                    More than a building — a place for people to learn, connect
                    and grow.
                  </p>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-7 right-4 rounded-3xl bg-[var(--yellow)] p-5 text-[var(--blue-dark)] shadow-xl sm:right-[-20px] sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.15em]">
                  Built around
                </p>

                <p className="mt-1 text-xl font-bold">Community needs</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT TIMELINE */}
          <div>
            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              The Community Resource Centre represents Africa-RII’s belief that
              lasting development happens when people have a shared space to
              access knowledge, opportunities, support and one another.
            </p>

            <div className="relative mt-12">
              {/* Vertical line */}
              <div className="absolute bottom-0 left-[25px] top-0 w-px bg-slate-200" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="relative flex gap-7 pb-10 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-4 border-[#fffdf7] bg-[var(--blue)] shadow-sm">
                    <div className="h-3 w-3 rounded-full bg-[var(--yellow)]" />
                  </div>

                  {/* Timeline content */}
                  <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(3,42,82,0.08)] sm:p-7">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-3xl font-bold tracking-[-0.04em] text-[var(--blue)]">
                        {item.year}
                      </span>

                      <span className="w-fit rounded-full bg-[#fff5c7] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--blue-dark)]">
                        Our journey
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-[var(--blue-dark)] sm:text-2xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-10"
            >
              <a
                href="/programs/community-resource-centre"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--blue)] px-7 py-4 text-sm font-bold text-white transition hover:bg-[var(--blue-dark)]"
              >
                Explore the centre
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--yellow)] text-[var(--blue-dark)] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={15} />
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
