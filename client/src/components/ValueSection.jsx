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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.97,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: index * 0.08,
      ease: "easeOut",
    },
  }),
};

export default function ValuesSection() {
  return (
    <section
      data-navbar="dark"
      className="
        relative
        overflow-hidden
        bg-[var(--blue)]
        py-8
        lg:flex
        lg:h-screen
        lg:min-h-[620px]
        lg:items-center
        lg:py-5
      "
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            x: [0, 18, 0],
            y: [0, 12, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 -top-40 h-[380px] w-[380px] rounded-full bg-[var(--yellow)]/10 blur-[100px]"
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, -14, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 -bottom-32 h-[420px] w-[420px] rounded-full bg-[var(--blue-dark)]/70 blur-[100px]"
        />

        <div className="absolute left-[8%] top-[14%] h-16 w-16 rounded-full border border-white/5" />

        <div className="absolute right-[7%] top-[10%] h-20 w-20 rounded-full border border-[var(--yellow)]/10" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-10 xl:px-12">
        {/* Heading */}
        <div className="mx-auto mb-6 max-w-3xl text-center lg:mb-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3"
          >
            <span className="h-[2px] w-7 bg-[var(--yellow)]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--yellow)]">
              What defines us
            </span>

            <span className="h-[2px] w-7 bg-[var(--yellow)]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.08,
            }}
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
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.14,
            }}
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
          </motion.p>
        </div>

        {/* Cards */}
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
              <motion.div
                key={item.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                whileHover={{
                  y: -6,
                  scale: 1.01,
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
                  shadow-[0_16px_38px_rgba(0,0,0,0.14)]
                  md:min-h-[250px]
                  lg:min-h-[265px]
                  lg:p-6
                "
              >
                {/* Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[var(--yellow)]/10 blur-3xl"
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
                  <motion.div
                    whileHover={{
                      rotate: 7,
                      scale: 1.08,
                    }}
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
                    "
                  >
                    <div className="absolute inset-1.5 rounded-full border border-white/5" />

                    <Icon
                      size={23}
                      strokeWidth={1.8}
                      className="relative text-[var(--yellow)]"
                    />
                  </motion.div>

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
                        transition-all
                        duration-500
                        group-hover:w-16
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

                  {/* Bottom */}
                  <div className="mt-auto pt-4">
                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{
                          scale: [1, 1.35, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                        className="h-2 w-2 rounded-full bg-[var(--yellow)]"
                      />

                      <span className="h-px w-9 bg-white/15 transition-all duration-500 group-hover:w-14" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
