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

import EducationImg from "../assets/afriihero.webp";
import CommunityImg from "../assets/skills.webp";
import HealthImg from "../assets/health.webp";
import WomenImg from "../assets/sisters.webp";
import InnovationImg from "../assets/computer2.webp";

const programs = [
  {
    title: "Education",
    icon: BookOpen,
    image: EducationImg,
    dark: true,
    links: [
      {
        label: "TACT",
        href: "/programs/tact",
      },
      {
        label: "Ajumobi",
        href: "/programs/ajumobi",
      },
      {
        label: "Summer School",
        href: "/programs/summer-school",
      },
    ],
  },

  {
    title: "Community Resource Centre",
    icon: Building2,
    image: CommunityImg,
    dark: false,
    links: [
      {
        label: "CRC",
        href: "/programs/community-resource-centre",
      },
      {
        label: "Skills Acquisition",
        href: "/programs/skills-acquisition",
      },
    ],
  },

  {
    title: "Community Health Awareness",
    icon: HeartPulse,
    image: HealthImg,
    dark: true,
    links: [
      {
        label: "LifeLine",
        href: "/programs/lifeline",
      },
    ],
  },

  {
    title: "Gender Advocacy, Rights & Mentorship",
    icon: Venus,
    image: WomenImg,
    dark: false,
    links: [
      {
        label: "Sisters' Club",
        href: "/programs/sisters-club",
      },
    ],
  },

  {
    title: "Innovation & Social Enterprise",
    icon: Lightbulb,
    image: InnovationImg,
    dark: true,
    links: [
      {
        label: "Computer & IT",
        href: "/programs/computer-and-it",
      },
    ],
  },
];

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export default function ProgramsPreview() {
  return (
    <section
      id="programs"
      data-navbar="light"
      className="
        relative
        overflow-hidden
        bg-[#f7f9fc]
        py-12

        sm:py-14

        lg:py-16
      "
    >
      {/* =====================================================
                          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            x: [0, 22, 0],
            y: [0, 14, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-40
            top-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-[var(--yellow)]/10
            blur-[110px]
          "
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-40
            bottom-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-blue-100/60
            blur-[110px]
          "
        />

        <div
          className="
            absolute
            left-[6%]
            top-[14%]
            h-20
            w-20
            rounded-full
            border
            border-[var(--blue)]/5
          "
        />

        <div
          className="
            absolute
            right-[7%]
            top-[18%]
            h-14
            w-14
            rounded-full
            border
            border-[var(--yellow)]/20
          "
        />
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

        <div
          className="
            mx-auto
            mb-10
            max-w-2xl
            text-center

            sm:mb-12

            lg:mb-14
          "
        >
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
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span className="h-[2px] w-8 bg-[var(--yellow)]" />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[var(--blue)]

                sm:text-xs
              "
            >
              What we do
            </span>

            <span className="h-[2px] w-8 bg-[var(--yellow)]" />
          </motion.div>

          <motion.h2
            initial={{
              opacity: 0,
              y: 16,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.08,
            }}
            className="
              mt-3
              text-[30px]
              font-bold
              leading-[1.04]
              tracking-[-0.04em]
              text-[var(--blue-dark)]

              sm:text-[38px]

              md:text-[42px]

              lg:text-[46px]
            "
          >
            Creating pathways
            <span className="block text-[var(--blue)]">to opportunity.</span>
          </motion.h2>
        </div>

        {/* =====================================================
                          PROGRAM GRID
        ===================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          className="
            grid
            grid-cols-1
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
                variants={cardVariants}
                whileHover={{
                  y: -6,
                }}
                className={`
                  group
                  relative
                  flex
                  min-h-[360px]
                  flex-col
                  overflow-hidden
                  rounded-[1.9rem]
                  transition-all
                  duration-500

                  sm:min-h-[375px]

                  lg:min-h-[390px]

                  ${
                    program.dark
                      ? `
                          bg-[var(--blue-dark)]
                          text-white
                          shadow-[0_18px_50px_rgba(3,42,82,0.12)]
                        `
                      : `
                          bg-white
                          text-[var(--blue-dark)]
                          shadow-[0_18px_50px_rgba(3,42,82,0.07)]
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
                    h-[165px]
                    shrink-0
                    overflow-hidden

                    sm:h-[175px]

                    lg:h-[180px]
                  "
                >
                  <img
                    src={program.image}
                    alt={program.title}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      ease-out

                      group-hover:scale-105
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
                              from-[var(--blue-dark)]/75
                              via-[var(--blue-dark)]/10
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
                      backdrop-blur-md

                      ${
                        program.dark
                          ? "bg-black/20 text-white"
                          : "bg-white/85 text-[var(--blue-dark)]"
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
                    flex-1
                    flex-col
                    px-5
                    pb-5

                    sm:px-6
                    sm:pb-6
                  "
                >
                  {/* ICON */}

                  <motion.div
                    whileHover={{
                      rotate: 6,
                      scale: 1.05,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                    }}
                    className={`
                      -mt-6
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      shadow-lg

                      sm:h-13
                      sm:w-13

                      ${
                        program.dark
                          ? `
                              bg-[var(--yellow)]
                              text-[var(--blue-dark)]
                            `
                          : `
                              bg-[var(--blue)]
                              text-white
                            `
                      }
                    `}
                  >
                    <Icon size={21} strokeWidth={1.8} />
                  </motion.div>

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

                      ${program.dark ? "text-white" : "text-[var(--blue-dark)]"}
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
                      transition-all
                      duration-500

                      group-hover:w-14

                      ${
                        program.dark ? "bg-[var(--yellow)]" : "bg-[var(--blue)]"
                      }
                    `}
                  />

                  {/* =================================================
                                  LINKS
                  ================================================= */}

                  <div
                    className="
                      mt-4
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
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
                          transition-all
                          duration-300

                          sm:text-xs

                          ${
                            program.dark
                              ? `
                                  bg-white/10
                                  text-white
                                  hover:bg-[var(--yellow)]
                                  hover:text-[var(--blue-dark)]
                                `
                              : `
                                  bg-[#eef4fb]
                                  text-[var(--blue-dark)]
                                  hover:bg-[var(--blue)]
                                  hover:text-white
                                `
                          }
                        `}
                      >
                        {link.label}

                        <ArrowUpRight
                          size={11}
                          className="
                            transition-transform
                            duration-300

                            group-hover/link:rotate-45
                          "
                        />
                      </a>
                    ))}
                  </div>

                  {/* EXPLORE */}

                  <div className="mt-auto pt-5">
                    <a
                      href={program.links[0]?.href || "/programs"}
                      className={`
                        group/explore
                        inline-flex
                        items-center
                        gap-2
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.13em]
                        transition-colors

                        ${
                          program.dark
                            ? `
                                text-white/35
                                hover:text-[var(--yellow)]
                              `
                            : `
                                text-[var(--blue-dark)]/40
                                hover:text-[var(--blue)]
                              `
                        }
                      `}
                    >
                      Explore program
                      <ArrowUpRight
                        size={12}
                        className="
                          transition-transform
                          duration-300

                          group-hover/explore:translate-x-1
                        "
                      />
                    </a>
                  </div>
                </div>

                {/* GLOW */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-44
                    w-44
                    rounded-full
                    bg-[var(--yellow)]/0
                    blur-3xl
                    transition-all
                    duration-700

                    group-hover:bg-[var(--yellow)]/10
                  "
                />
              </motion.article>
            );
          })}

          {/* =====================================================
                              QUOTE CARD
          ===================================================== */}

          <motion.article
            variants={cardVariants}
            whileHover={{
              y: -6,
            }}
            className="
              group
              relative
              flex
              min-h-[360px]
              overflow-hidden
              rounded-[1.9rem]
              bg-[var(--yellow)]
              p-6
              text-[var(--blue-dark)]
              shadow-[0_18px_50px_rgba(3,42,82,0.08)]

              sm:min-h-[375px]
              sm:p-7

              lg:min-h-[390px]
              lg:p-8
            "
          >
            {/* LARGE BACKGROUND QUOTE */}

            <Quote
              className="
                absolute
                -right-5
                -top-8
                h-40
                w-40
                rotate-180
                text-[var(--blue-dark)]/[0.055]

                lg:h-48
                lg:w-48
              "
              strokeWidth={1}
            />

            {/* DECORATIVE CIRCLE */}

            <div
              className="
                absolute
                -bottom-28
                -left-24
                h-64
                w-64
                rounded-full
                border
                border-[var(--blue-dark)]/10
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
                border-[var(--blue-dark)]/10
              "
            />

            {/* CONTENT */}

            <div
              className="
                relative
                z-10
                flex
                h-full
                w-full
                flex-col
              "
            >
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
                    bg-[var(--blue-dark)]
                    text-[var(--yellow)]
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
                    text-[var(--blue-dark)]/40
                  "
                >
                  Inspiration
                </span>
              </div>

              {/* QUOTE */}

              <div
                className="
                  flex
                  flex-1
                  items-center
                  py-7
                "
              >
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
                <span
                  className="
                    h-[2px]
                    w-8
                    bg-[var(--blue-dark)]
                  "
                />

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
                      text-[var(--blue-dark)]/40
                    "
                  >
                    Service • Humanity • Community
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
