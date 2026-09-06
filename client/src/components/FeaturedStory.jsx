import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";

import StoryImage from "../assets/hero.png";

export default function FeaturedStory() {
  return (
    <section
      id="stories"
      className="relative overflow-hidden bg-[var(--blue-dark)] py-24 sm:py-28 lg:py-32"
    >
      {/* Decorative glow */}
      <div className="absolute -left-32 top-20 h-[360px] w-[360px] rounded-full bg-[var(--yellow)]/10 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[var(--blue)]/60 blur-3xl" />

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
              <span className="h-[2px] w-10 bg-[var(--yellow)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--yellow)]">
                Stories of change
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Behind every number is
              <span className="block text-[var(--yellow)]">a human story.</span>
            </h2>
          </motion.div>
        </div>

        {/* Main story card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="grid overflow-hidden rounded-[2.5rem] bg-white lg:grid-cols-[1.05fr_0.95fr]"
        >
          {/* Story Image */}
          <div className="relative min-h-[420px] lg:min-h-[620px]">
            <img
              src={StoryImage}
              alt="Africa-RII beneficiary story"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[var(--blue-dark)]/40 via-transparent to-transparent" />

            {/* Floating category */}
            <div className="absolute left-6 top-6 rounded-full bg-[var(--yellow)] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--blue-dark)] sm:left-8 sm:top-8">
              Education
            </div>
          </div>

          {/* Story content */}
          <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-14">
            <div>
              {/* Quote icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff5c7] text-[var(--blue-dark)]">
                <Quote size={21} />
              </div>

              {/* Quote */}
              <blockquote className="mt-8 max-w-xl text-2xl font-semibold leading-[1.35] tracking-[-0.02em] text-[var(--blue-dark)] sm:text-3xl lg:text-4xl">
                “The opportunity gave me confidence, support and a reason to
                believe I could build a different future.”
              </blockquote>

              {/* Story description */}
              <p className="mt-7 max-w-xl text-base leading-8 text-slate-600">
                Through access to learning, mentorship and community support,
                participants are able to build practical skills, strengthen
                their confidence and create new pathways for themselves and
                their families.
              </p>
            </div>

            {/* Bottom content */}
            <div className="mt-10 border-t border-slate-200 pt-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-[var(--blue-dark)]">
                    A story of possibility
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Africa-RII community programme
                  </p>
                </div>

                <a
                  href="/stories"
                  className="group inline-flex items-center gap-3 text-sm font-bold text-[var(--blue)]"
                >
                  Read the full story
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--blue)] text-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Smaller stories preview */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Learning without limits",
              category: "Education",
            },
            {
              number: "02",
              title: "Skills that create opportunity",
              category: "Empowerment",
            },
            {
              number: "03",
              title: "Stronger women, stronger communities",
              category: "Women & Girls",
            },
          ].map((story, index) => (
            <motion.a
              key={story.number}
              href="/stories"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.18em] text-[var(--yellow)]">
                  {story.number}
                </span>

                <ArrowUpRight
                  size={17}
                  className="text-white/40 transition duration-300 group-hover:rotate-45 group-hover:text-[var(--yellow)]"
                />
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-white/40">
                {story.category}
              </p>

              <h3 className="mt-3 text-xl font-semibold leading-snug text-white">
                {story.title}
              </h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
