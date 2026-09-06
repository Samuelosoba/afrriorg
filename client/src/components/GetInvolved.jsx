import { motion } from "framer-motion";
import { ArrowUpRight, HeartHandshake, HandHeart, Users } from "lucide-react";

const actions = [
  {
    icon: HandHeart,
    eyebrow: "Give",
    title: "Donate",
    text: "Support education, skills and community development.",
    href: "/donate",
    featured: true,
  },
  {
    icon: Users,
    eyebrow: "Serve",
    title: "Volunteer",
    text: "Share your time, knowledge and skills with communities.",
    href: "/volunteer",
  },
  {
    icon: HeartHandshake,
    eyebrow: "Collaborate",
    title: "Partner",
    text: "Build meaningful programs and long-term impact with us.",
    href: "/partner",
  },
];

export default function GetInvolved() {
  return (
    <section
      id="donate"
      data-navbar="light"
      className="
        relative
        overflow-hidden
        bg-[var(--yellow)]
        py-8

        sm:py-10

        lg:flex
        lg:h-[100svh]
        lg:items-center
        lg:py-4
      "
    >
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            -left-28
            -top-28
            h-72
            w-72
            rounded-full
            border
            border-[var(--blue-dark)]/10
          "
        />

        <div
          className="
            absolute
            -bottom-32
            -right-24
            h-80
            w-80
            rounded-full
            bg-white/20
          "
        />

        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[10%]
            top-[10%]
            hidden
            h-20
            w-20
            rounded-full
            border
            border-[var(--blue-dark)]/10

            lg:block
          "
        />
      </div>

      {/* MAIN */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1440px]
          px-5

          sm:px-6

          md:px-8

          lg:px-10

          xl:px-12
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            gap-4

            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[var(--blue-dark)]" />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[var(--blue-dark)]

                  sm:text-xs
                "
              >
                Get involved
              </span>
            </div>

            <h2
              className="
                mt-3
                max-w-xl
                text-[30px]
                font-bold
                leading-[1.02]
                tracking-[-0.045em]
                text-[var(--blue-dark)]

                sm:text-[38px]

                md:text-[42px]

                lg:text-[46px]

                xl:text-[50px]
              "
            >
              Be part of what
              <span className="block">happens next.</span>
            </h2>
          </motion.div>

          <motion.p
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
              delay: 0.1,
            }}
            className="
              max-w-md
              text-[12px]
              leading-5
              text-[var(--blue-dark)]/65

              sm:text-sm
              sm:leading-6
            "
          >
            Give, volunteer or partner with us to create stronger opportunities
            for communities.
          </motion.p>
        </div>

        {/* ACTIONS */}

        <div
          className="
            mt-7
            grid
            gap-4

            sm:mt-8
            sm:grid-cols-2

            lg:mt-7
            lg:grid-cols-3
            lg:gap-5
          "
        >
          {actions.map((action, index) => {
            const Icon = action.icon;

            return (
              <motion.a
                key={action.title}
                href={action.href}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -5,
                }}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-[1.6rem]
                  p-5
                  transition-all
                  duration-300

                  sm:p-6

                  lg:min-h-[250px]

                  ${
                    action.featured
                      ? "bg-[var(--blue-dark)] text-white shadow-[0_20px_55px_rgba(3,42,82,0.18)]"
                      : "bg-white/60 text-[var(--blue-dark)] backdrop-blur-sm hover:bg-white"
                  }
                `}
              >
                {/* Circle decoration */}

                <div
                  className={`
                    absolute
                    -right-12
                    -top-12
                    h-32
                    w-32
                    rounded-full
                    transition-transform
                    duration-500
                    group-hover:scale-125

                    ${
                      action.featured
                        ? "bg-[var(--yellow)]/10"
                        : "bg-[var(--yellow)]/35"
                    }
                  `}
                />

                <div
                  className="
                    relative
                    flex
                    h-full
                    flex-col
                    justify-between
                  "
                >
                  <div>
                    {/* TOP ROW */}

                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl

                          ${
                            action.featured
                              ? "bg-[var(--yellow)] text-[var(--blue-dark)]"
                              : "bg-[var(--blue-dark)] text-white"
                          }
                        `}
                      >
                        <Icon size={19} />
                      </div>

                      <span
                        className={`
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          transition-transform
                          duration-300
                          group-hover:rotate-45

                          ${
                            action.featured
                              ? "bg-white/10 text-white"
                              : "bg-[var(--blue-dark)]/5 text-[var(--blue-dark)]"
                          }
                        `}
                      >
                        <ArrowUpRight size={14} />
                      </span>
                    </div>

                    {/* EYEBROW */}

                    <p
                      className={`
                        mt-5
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.18em]

                        sm:text-[10px]

                        ${
                          action.featured
                            ? "text-[var(--yellow)]"
                            : "text-[var(--blue)]"
                        }
                      `}
                    >
                      {action.eyebrow}
                    </p>

                    {/* TITLE */}

                    <h3
                      className="
                        mt-1.5
                        text-[24px]
                        font-bold
                        tracking-[-0.035em]

                        sm:text-[28px]

                        lg:text-[30px]
                      "
                    >
                      {action.title}
                    </h3>

                    {/* TEXT */}

                    <p
                      className={`
                        mt-2
                        max-w-xs
                        text-[11px]
                        leading-5

                        sm:text-xs

                        lg:text-[13px]

                        ${
                          action.featured
                            ? "text-white/55"
                            : "text-[var(--blue-dark)]/55"
                        }
                      `}
                    >
                      {action.text}
                    </p>
                  </div>

                  {/* BOTTOM */}

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className={`
                        text-[11px]
                        font-bold

                        sm:text-xs

                        ${
                          action.featured
                            ? "text-white"
                            : "text-[var(--blue-dark)]"
                        }
                      `}
                    >
                      {action.title === "Donate"
                        ? "Support our work"
                        : action.title === "Volunteer"
                          ? "Join our team"
                          : "Work with us"}
                    </span>

                    <motion.span
                      initial={{ width: 22 }}
                      whileHover={{ width: 42 }}
                      className={`
                        h-[2px]

                        ${
                          action.featured
                            ? "bg-[var(--yellow)]"
                            : "bg-[var(--blue-dark)]/25"
                        }
                      `}
                    />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* SMALL FOOTER CTA */}

        <motion.div
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
            delay: 0.15,
          }}
          className="
            mt-6
            flex
            items-center
            justify-between
            border-t
            border-[var(--blue-dark)]/10
            pt-4

            sm:mt-7
          "
        >
          <span
            className="
              text-[10px]
              font-semibold
              text-[var(--blue-dark)]/50

              sm:text-xs
            "
          >
            Ready to make an impact?
          </span>

          <a
            href="/contact"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-[11px]
              font-bold
              text-[var(--blue-dark)]

              sm:text-xs
            "
          >
            Talk to us
            <ArrowUpRight
              size={14}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
