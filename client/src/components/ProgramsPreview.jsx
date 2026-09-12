import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  HeartPulse,
  Venus,
  Lightbulb,
  Quote,
} from "lucide-react";

import { useProgrammes } from "../utils/useProgrammes";

export default function ProgramsPreview() {
  const { categories } = useProgrammes();
  const icons = [BookOpen, Building2, HeartPulse, Venus, Lightbulb];
  const programs = categories.map((c, i) => ({
    title: c.title,
    href: "/programs/" + c.slug,
    image: c.image,
    icon: icons[i % icons.length],
    dark: false,
    links: c.programs.map((p) => ({
      label: p.title,
      href: "/programs/" + c.slug + "/" + p.slug,
    })),
  }));
  return (
    <section
      id="programs"
      data-navbar="light"
      className="
        relative
        overflow-hidden
        bg-[var(--background)]
        py-12

        sm:py-14

        lg:py-16
      "
    >
      {/* =====================================================
                           BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div
          className="
            absolute
            -left-40
            top-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-[var(--green-soft)]/10
            blur-[90px]
          "
        />

        <div
          className="
            absolute
            -right-40
            bottom-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-[var(--green-soft)]/5
            blur-[90px]
          "
        />

        <div className="absolute left-[6%] top-[14%] h-20 w-20 rounded-full border border-[var(--green)]/5" />

        <div className="absolute right-[7%] top-[18%] h-14 w-14 rounded-full border border-[var(--green-soft)]/20" />
      </div>

      {/* =====================================================
                           CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1400px]
          px-5

          sm:px-6

          lg:px-10

          xl:px-12
        "
      >
        {/* =====================================================
                              HEADER
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            programs-heading mb-10
            max-w-2xl
            text-center

            sm:mb-12

            lg:mb-14
          "
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-[var(--green-soft)]" />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[var(--green)]

                sm:text-xs
              "
            >
              What we do
            </span>

            <span className="h-[2px] w-8 bg-[var(--green-soft)]" />
          </div>

          <h2
            className="
              mt-3
              text-[30px]
              font-bold
              leading-[1.04]
              tracking-[-0.04em]
              text-[var(--ink)]

              sm:text-[38px]

              md:text-[42px]

              lg:text-[46px]
            "
          >
            Creating pathways
            <span className="block text-[var(--green)]">to opportunity.</span>
          </h2>
        </motion.div>

        {/* =====================================================
                         PROGRAM GRID
        ===================================================== */}

        <div
          className="
            grid
            programs-grid grid-cols-1
            gap-6

            sm:grid-cols-2
            sm:gap-7

            lg:grid-cols-3
            lg:gap-8

            xl:gap-9
          "
        >
          {programs.map((program, index) => {
            const Icon = program.icon;

            return (
              <motion.article
                key={program.title}
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.1,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -4,
                  transition: {
                    duration: 0.2,
                    ease: "easeOut",
                  },
                }}
                className={`
                  group
                  relative
                  flex
                  program-card min-h-[360px]
                  flex-col
                  overflow-hidden
                  rounded-[1.9rem]

                  sm:min-h-[375px]

                  lg:min-h-[390px]

                  ${
                    program.dark
                      ? `
                        bg-[var(--ink)]
                        text-white
                        shadow-[0_14px_35px_rgba(0,40,20,0.10)]
                      `
                      : `
                        bg-white
                        text-[var(--ink)]
                        shadow-[0_14px_35px_rgba(0,40,20,0.06)]
                      `
                  }
                `}
              >
                {/* =================================================
                                 IMAGE
                ================================================= */}

                <div
                  className="
                    relative
                    program-photo h-[165px]
                    shrink-0
                    overflow-hidden

                    sm:h-[175px]

                    lg:h-[180px]
                  "
                >
                  <img
                    src={program.image}
                    alt={program.title}
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="420"
                    className="
                      h-full
                      w-full
                      object-cover

                      lg:transition-transform
                      lg:duration-300
                      lg:group-hover:scale-[1.03]
                    "
                  />

                  <div
                    className={`
                      absolute
                      inset-0

                      ${
                        program.dark
                          ? `
                            bg-gradient-to-t
                            from-[var(--ink)]/75
                            via-[var(--ink)]/10
                            to-transparent
                          `
                          : `
                            bg-gradient-to-t
                            from-white/65
                            via-white/5
                            to-transparent
                          `
                      }
                    `}
                  />

                  {/* NUMBER */}

                  <span
                    className={`
                      absolute
                      left-4
                      top-4
                      rounded-full
                      px-3
                      py-1.5
                      text-[9px]
                      font-bold
                      tracking-[0.15em]

                      ${
                        program.dark
                          ? "bg-black/25 text-white"
                          : "bg-white/90 text-[var(--ink)]"
                      }
                    `}
                  >
                    0{index + 1}
                  </span>
                </div>

                {/* =================================================
                                CONTENT
                ================================================= */}

                <div
                  className="
                    relative
                    flex
                    program-body flex-1
                    flex-col
                    px-5
                    pb-5

                    sm:px-6
                    sm:pb-6
                  "
                >
                  {/* ICON */}

                  <div
                    className={`
                      -mt-6
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      shadow-md

                      ${
                        program.dark
                          ? `
                            bg-[var(--green-soft)]
                            text-[var(--ink)]
                          `
                          : `
                            bg-[var(--green)]
                            text-white
                          `
                      }

                      lg:transition-transform
                      lg:duration-200
                      lg:group-hover:rotate-[3deg]
                      lg:group-hover:scale-[1.03]
                    `}
                  >
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  {/* TITLE */}

                  <h3
                    className={`
                      mt-4
                      max-w-sm
                      text-[19px]
                      font-bold
                      leading-[1.15]
                      tracking-[-0.03em]

                      sm:text-[20px]

                      lg:text-[21px]

                      ${program.dark ? "text-white" : "text-[var(--ink)]"}
                    `}
                  >
                    {program.title}
                  </h3>

                  {/* ACCENT */}

                  <div
                    className={`
                      mt-3
                      h-[2px]
                      w-8

                      lg:transition-[width]
                      lg:duration-200
                      lg:group-hover:w-14

                      ${
                        program.dark
                          ? "bg-[var(--green-soft)]"
                          : "bg-[var(--green)]"
                      }
                    `}
                  />

                  {/* =================================================
                                  LINKS
                  ================================================= */}

                  <div className="program-links mt-4 flex flex-wrap gap-2">
                    {program.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`
                          group/link
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          px-3.5
                          py-2
                          text-[11px]
                          font-bold

                          sm:text-xs

                          lg:transition-colors
                          lg:duration-200

                          ${
                            program.dark
                              ? `
                                bg-white/10
                                text-white

                                lg:hover:bg-[var(--green-soft)]
                                lg:hover:text-[var(--ink)]
                              `
                              : `
                                bg-[var(--background)]
                                text-[var(--ink)]

                                lg:hover:bg-[var(--green)]
                                lg:hover:text-white
                              `
                          }
                        `}
                      >
                        {link.label}

                        <ArrowUpRight
                          size={11}
                          className="
                            lg:transition-transform
                            lg:duration-200
                            lg:group-hover/link:rotate-45
                          "
                        />
                      </a>
                    ))}
                  </div>

                  {/* =================================================
                                EXPLORE
                  ================================================= */}

                  <div className="program-explore mt-auto pt-5">
                    <a
                      href={program.href}
                      className={`
                        group/explore
                        inline-flex
                        items-center
                        gap-2
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.13em]

                        lg:transition-colors
                        lg:duration-200

                        ${
                          program.dark
                            ? `
                              text-white/35
                              lg:hover:text-[var(--green)]
                            `
                            : `
                              text-[var(--muted)]
                              lg:hover:text-[var(--green)]
                            `
                        }
                      `}
                    >
                      Explore program
                      <ArrowUpRight
                        size={12}
                        className="
                          lg:transition-transform
                          lg:duration-200
                          lg:group-hover/explore:tranneutral-x-1
                        "
                      />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}

          {/* =====================================================
                           QUOTE CARD
          ===================================================== */}

          <motion.article
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 0.4,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -4,
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            }}
            className="
              group
              relative
              flex
              program-quote min-h-[360px]
              overflow-hidden
              rounded-[1.9rem]
              bg-[var(--green-soft)]
              p-6
              text-[var(--ink)]
              shadow-[0_14px_35px_rgba(0,40,20,0.07)]

              sm:min-h-[375px]
              sm:p-7

              lg:min-h-[390px]
              lg:p-8
            "
          >
            {/* LARGE QUOTE */}

            <Quote
              className="
                absolute
                -right-5
                -top-8
                h-40
                w-40
                rotate-180
                text-[var(--ink)]/[0.055]

                lg:h-48
                lg:w-48
              "
              strokeWidth={1}
            />

            {/* DECORATION */}

            <div
              className="
                absolute
                -bottom-28
                -left-24
                h-64
                w-64
                rounded-full
                border
                border-[var(--ink)]/10
              "
            />

            <div
              className="
                absolute
                bottom-10
                right-8
                h-12
                w-12
                rounded-full
                border
                border-[var(--ink)]/10
              "
            />

            {/* CONTENT */}

            <div className="relative z-10 flex h-full w-full flex-col">
              {/* TOP */}

              <div className="flex items-center justify-between">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--ink)]
                    text-[var(--green)]
                  "
                >
                  <Quote size={17} />
                </div>

                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[var(--muted)]
                  "
                >
                  Inspiration
                </span>
              </div>

              {/* QUOTE */}

              <div className="flex flex-1 items-center py-7">
                <blockquote
                  className="
                    max-w-md
                    text-[25px]
                    font-bold
                    leading-[1.08]
                    tracking-[-0.045em]

                    sm:text-[27px]

                    lg:text-[29px]

                    xl:text-[31px]
                  "
                >
                  “The best way to find yourself is to lose yourself in the
                  service of others.”
                </blockquote>
              </div>

              {/* AUTHOR */}

              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[var(--ink)]" />

                <div>
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                    "
                  >
                    Mahatma Gandhi
                  </p>

                  <p
                    className="
                      mt-1
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.13em]
                      text-[var(--muted)]
                    "
                  >
                    Service • Humanity • Community
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
