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
        <div
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

        <div
          className="
            absolute
            -right-40
            bottom-10
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
            left-[5%]
            top-[18%]
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
            right-[6%]
            top-[12%]
            h-14
            w-14
            rounded-full
            border
            border-[var(--yellow)]/20
          "
        />
      </div>

      {/* =====================================================
                          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1320px]
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

            lg:mb-12
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
              y: 15,
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

            md:grid-cols-2
            md:gap-7

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
                  y: -5,
                }}
                className={`
                  group
                  relative
                  grid
                  min-h-[330px]
                  overflow-hidden
                  rounded-[2rem]
                  transition-all
                  duration-500

                  sm:min-h-[350px]

                  lg:min-h-[320px]
                  lg:grid-cols-[0.92fr_1.08fr]

                  ${
                    program.dark
                      ? `
                          bg-[var(--blue-dark)]
                          text-white
                          shadow-[0_20px_55px_rgba(3,42,82,0.12)]
                        `
                      : `
                          bg-white
                          text-[var(--blue-dark)]
                          shadow-[0_20px_55px_rgba(3,42,82,0.07)]
                        `
                  }
                `}
              >
                {/* =============================================
                                IMAGE
                ============================================= */}

                <div
                  className="
                    relative
                    h-[165px]
                    overflow-hidden

                    sm:h-[180px]

                    lg:h-full
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

                      group-hover:scale-105
                    "
                  />

                  {/* IMAGE OVERLAY */}

                  <div
                    className={`
                      absolute
                      inset-0

                      ${
                        program.dark
                          ? `
                              bg-gradient-to-t
                              from-[var(--blue-dark)]/65
                              via-transparent
                              to-transparent

                              lg:bg-gradient-to-r
                              lg:from-transparent
                              lg:to-[var(--blue-dark)]/45
                            `
                          : `
                              bg-gradient-to-t
                              from-white/50
                              via-transparent
                              to-transparent

                              lg:bg-gradient-to-r
                              lg:from-transparent
                              lg:to-white/30
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
                          ? "bg-black/25 text-white"
                          : "bg-white/85 text-[var(--blue-dark)]"
                      }
                    `}
                  >
                    0{index + 1}
                  </span>
                </div>

                {/* =============================================
                                CONTENT
                ============================================= */}

                <div
                  className="
                    relative
                    flex
                    flex-col
                    justify-center
                    p-5

                    sm:p-6

                    lg:p-7
                  "
                >
                  {/* ICON */}

                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl

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
                    <Icon size={19} strokeWidth={1.8} />
                  </div>

                  {/* TITLE */}

                  <h3
                    className="
                      mt-4
                      max-w-sm
                      text-[20px]
                      font-bold
                      leading-[1.13]
                      tracking-[-0.035em]

                      sm:text-[22px]

                      lg:text-[23px]
                    "
                  >
                    {program.title}
                  </h3>

                  {/* LINE */}

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

                  {/* LINKS */}

                  <div
                    className="
                      mt-5
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

                  <a
                    href={program.links[0]?.href || "/programs"}
                    className={`
                      group/explore
                      mt-6
                      inline-flex
                      w-fit
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
                    Explore
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

                {/* HOVER GLOW */}

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
              y: -5,
            }}
            className="
              group
              relative
              flex
              min-h-[330px]
              overflow-hidden
              rounded-[2rem]
              bg-[var(--yellow)]
              p-7
              text-[var(--blue-dark)]
              shadow-[0_20px_55px_rgba(3,42,82,0.08)]

              sm:min-h-[350px]
              sm:p-8

              lg:min-h-[320px]
              lg:p-10
            "
          >
            {/* LARGE BACKGROUND QUOTE */}

            <Quote
              className="
                absolute
                -right-4
                -top-8
                h-40
                w-40
                rotate-180
                text-[var(--blue-dark)]/[0.06]

                sm:h-48
                sm:w-48
              "
              strokeWidth={1.2}
            />

            {/* DECORATIVE CIRCLE */}

            <div
              className="
                absolute
                -bottom-28
                -left-20
                h-64
                w-64
                rounded-full
                border
                border-[var(--blue-dark)]/10
              "
            />

            <div
              className="
                relative
                z-10
                flex
                h-full
                w-full
                flex-col
                justify-between
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
                  <Quote size={18} />
                </div>

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[var(--blue-dark)]/45
                  "
                >
                  Words to live by
                </span>
              </div>

              {/* QUOTE */}

              <div className="my-8">
                <blockquote
                  className="
                    max-w-lg
                    text-[27px]
                    font-bold
                    leading-[1.08]
                    tracking-[-0.045em]

                    sm:text-[30px]

                    lg:text-[32px]

                    xl:text-[35px]
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
                      text-xs
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
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.13em]
                      text-[var(--blue-dark)]/45
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
