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
        py-12

        sm:py-14

        lg:flex
        lg:min-h-[650px]
        lg:items-center
        lg:py-12
      "
    >
      {/* =====================================================
                           BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Lightweight mobile decoration */}

        <div
          className="
            absolute
            -left-28
            -top-28
            h-72
            w-72
            rounded-full
            border
            border-[var(--blue-dark)]/[0.07]
          "
        />

        {/* Desktop only decoration */}

        <div
          className="
            absolute
            -bottom-32
            -right-24
            hidden
            h-80
            w-80
            rounded-full
            bg-white/20

            md:block
          "
        />

        <div
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

      {/* =====================================================
                              MAIN
      ===================================================== */}

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
        {/* =====================================================
                              HEADER
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          className="
            flex
            flex-col
            gap-4

            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div>
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
          </div>

          <p
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
          </p>
        </motion.div>

        {/* =====================================================
                              ACTIONS
        ===================================================== */}

        <div
          className="
            mt-8
            grid
            gap-4

            sm:mt-9
            sm:grid-cols-2

            lg:grid-cols-3
            lg:gap-5
          "
        >
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <motion.a
                key={action.title}
                href={action.href}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{
                  once: true,
                  amount: 0.08,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-[1.6rem]
                  p-5

                  sm:p-6

                  lg:min-h-[250px]
                  lg:transition-transform
                  lg:duration-200
                  lg:hover:-translate-y-1

                  ${
                    action.featured
                      ? `
                        bg-[var(--blue-dark)]
                        text-white
                        shadow-[0_16px_40px_rgba(3,42,82,0.15)]
                      `
                      : `
                        bg-white/70
                        text-[var(--blue-dark)]

                        lg:transition-[background-color,transform]
                        lg:hover:bg-white
                      `
                  }
                `}
              >
                {/* =================================================
                            CIRCLE DECORATION
                ================================================= */}

                <div
                  className={`
                    pointer-events-none
                    absolute
                    -right-12
                    -top-12
                    h-32
                    w-32
                    rounded-full

                    ${
                      action.featured
                        ? "bg-[var(--yellow)]/10"
                        : "bg-[var(--yellow)]/35"
                    }

                    lg:transition-transform
                    lg:duration-300
                    lg:group-hover:scale-110
                  `}
                />

                {/* =================================================
                              CARD CONTENT
                ================================================= */}

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
                    {/* TOP */}

                    <div className="flex items-start justify-between gap-4">
                      {/* Icon */}

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
                              ? `
                                bg-[var(--yellow)]
                                text-[var(--blue-dark)]
                              `
                              : `
                                bg-[var(--blue-dark)]
                                text-white
                              `
                          }
                        `}
                      >
                        <Icon size={19} />
                      </div>

                      {/* Arrow */}

                      <span
                        className={`
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full

                          ${
                            action.featured
                              ? `
                                bg-white/10
                                text-white
                              `
                              : `
                                bg-[var(--blue-dark)]/5
                                text-[var(--blue-dark)]
                              `
                          }

                          lg:transition-transform
                          lg:duration-200
                          lg:group-hover:rotate-45
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

                  {/* =================================================
                                BOTTOM
                  ================================================= */}

                  <div
                    className="
                      mt-6
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

                    <span
                      className={`
                        h-[2px]
                        w-6

                        ${
                          action.featured
                            ? "bg-[var(--yellow)]"
                            : "bg-[var(--blue-dark)]/25"
                        }

                        lg:transition-[width]
                        lg:duration-200
                        lg:group-hover:w-10
                      `}
                    />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* =====================================================
                         SMALL FOOTER CTA
        ===================================================== */}

        <div
          className="
            mt-7
            flex
            items-center
            justify-between
            border-t
            border-[var(--blue-dark)]/10
            pt-4

            sm:mt-8
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
              group/contact
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
                lg:transition-transform
                lg:duration-200
                lg:group-hover/contact:translate-x-1
              "
            />
          </a>
        </div>
      </div>
    </section>
  );
}
