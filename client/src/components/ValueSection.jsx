import { motion } from "framer-motion";
import { Handshake, Users, Sparkles } from "lucide-react";

const values = [
  {
    icon: Handshake,
    title: "Our Commitment",
    description:
      "We are committed to building a lasting legacy of intergenerational impact through human capital development in disadvantaged communities.",
  },
  {
    icon: Sparkles,
    title: "Our Strength",
    description:
      "Our strength lies in inclusive, community-led solutions shaped through research, engagement and collaboration that drive grassroots social change.",
  },
  {
    icon: Users,
    title: "Our Team",
    description:
      "Our interdisciplinary team is united by transparency, innovation and a shared passion for creating sustainable social impact.",
  },
];

export default function ValuesSection() {
  return (
    <section
      data-navbar="dark"
      className="
        relative
        overflow-hidden
        bg-[var(--blue)]
        py-12

        sm:py-14

        lg:flex
        lg:min-h-[620px]
        lg:items-center
        lg:py-12
      "
    >
      {/* =====================================================
                         BACKGROUND
          Keep expensive effects away from mobile
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {/* Static yellow glow */}
        <div
          className="
            absolute
            -left-40
            -top-40
            h-[380px]
            w-[380px]
            rounded-full
            bg-[var(--yellow)]/10
            blur-[90px]
          "
        />

        {/* Static blue glow */}
        <div
          className="
            absolute
            -bottom-32
            -right-40
            h-[420px]
            w-[420px]
            rounded-full
            bg-[var(--blue-dark)]/70
            blur-[90px]
          "
        />

        {/* Decorative rings */}
        <div className="absolute left-[8%] top-[14%] h-16 w-16 rounded-full border border-white/5" />

        <div className="absolute right-[7%] top-[10%] h-20 w-20 rounded-full border border-[var(--yellow)]/10" />
      </div>

      {/* =====================================================
                            CONTENT
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1440px]
          px-5

          sm:px-6

          lg:px-10

          xl:px-12
        "
      >
        {/* =====================================================
                             HEADING
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
            mx-auto
            mb-8
            max-w-3xl
            text-center

            lg:mb-9
          "
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-[2px] w-7 bg-[var(--yellow)]" />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[var(--yellow)]
              "
            >
              What defines us
            </span>

            <span className="h-[2px] w-7 bg-[var(--yellow)]" />
          </div>

          <h2
            className="
              mt-3
              text-[28px]
              font-bold
              leading-[1.03]
              tracking-[-0.04em]
              text-white

              sm:text-[36px]

              lg:text-[42px]

              xl:text-[46px]
            "
          >
            Built on values that
            <span className="block text-[var(--yellow)]">
              shape lasting impact.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-[13px]
              leading-5
              text-white/65

              sm:text-sm
            "
          >
            Our work is grounded in commitment, collaboration and community-led
            solutions that respond to real needs and create lasting change.
          </p>
        </motion.div>

        {/* =====================================================
                              CARDS
        ===================================================== */}

        <div
          className="
            grid
            gap-4

            md:grid-cols-3

            lg:gap-5
          "
        >
          {values.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
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
                  amount: 0.12,
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
                className="
    group
    relative
    overflow-hidden
    rounded-[1.5rem]
    border
    border-white/10
    bg-[var(--blue-dark)]
    p-5
    shadow-[0_12px_30px_rgba(0,0,0,0.10)]

    md:min-h-[250px]

    lg:min-h-[265px]
    lg:p-6
  "
              >
                {/* Static card accent */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-12
                    -top-12
                    hidden
                    h-32
                    w-32
                    rounded-full
                    bg-[var(--yellow)]/[0.07]
                    blur-3xl

                    lg:block
                  "
                />

                {/* Number */}
                <span
                  className="
                    absolute
                    right-5
                    top-4
                    text-5xl
                    font-bold
                    tracking-[-0.08em]
                    text-white/[0.035]
                  "
                >
                  0{index + 1}
                </span>

                <div className="relative flex h-full flex-col">
                  {/* Icon */}

                  <div
                    className="
                      relative
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[var(--yellow)]/70
                      bg-white/[0.03]

                      lg:transition-transform
                      lg:duration-200
                      lg:group-hover:rotate-[4deg]
                      lg:group-hover:scale-[1.04]
                    "
                  >
                    <div className="absolute inset-1.5 rounded-full border border-white/5" />

                    <Icon
                      size={23}
                      strokeWidth={1.8}
                      className="relative text-[var(--yellow)]"
                    />
                  </div>

                  {/* Text */}

                  <div className="mt-4">
                    <h3
                      className="
                        text-xl
                        font-bold
                        tracking-[-0.03em]
                        text-[var(--yellow)]

                        lg:text-[22px]
                      "
                    >
                      {item.title}
                    </h3>

                    <div
                      className="
                        mt-3
                        h-px
                        w-10
                        bg-[var(--yellow)]/50

                        lg:transition-[width]
                        lg:duration-200
                        lg:group-hover:w-16
                      "
                    />

                    <p
                      className="
                        mt-3
                        text-[12px]
                        leading-[1.6]
                        text-white/65

                        sm:text-[13px]

                        lg:text-[13px]
                      "
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom decorative line */}

                  <div className="mt-auto pt-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[var(--yellow)]" />

                      <span
                        className="
                          h-px
                          w-9
                          bg-white/15

                          lg:transition-[width]
                          lg:duration-200
                          lg:group-hover:w-14
                        "
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
