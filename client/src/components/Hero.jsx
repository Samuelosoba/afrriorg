import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import HeroImage from "../assets/hero.png";
import HeroBackground from "../assets/afriihero.webp"; // change this to your background image

export default function Hero() {
  return (
    <section
      data-navbar="dark"
      className="
        relative
        flex
        h-[100svh]
        overflow-hidden
        bg-[var(--blue-dark)]
        pt-24
        lg:pt-28
      "
    >
      {/* =====================================================
                          BACKGROUND IMAGE
      ===================================================== */}

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        {/* Background photo */}
        <img
          src={HeroBackground}
          alt=""
          className="
      absolute
      inset-0
      h-full
      w-full
      object-cover
      object-center
      opacity-70
    "
        />

        {/* Blue tint */}
        <div
          className="
      absolute
      inset-0
      bg-[var(--blue-dark)]/45
    "
        />

        {/* Keep left side dark for readable text */}
        <div
          className="
      absolute
      inset-0
      bg-gradient-to-r
      from-[var(--blue-dark)]/95
      via-[var(--blue-dark)]/60
      to-[var(--blue-dark)]/20
    "
        />

        {/* Subtle blue glow */}
        <div
          className="
      absolute
      -left-40
      top-20
      h-[500px]
      w-[500px]
      rounded-full
      bg-[var(--blue)]
      opacity-25
      blur-[110px]
    "
        />

        {/* Yellow glow */}
        <div
          className="
      absolute
      -right-40
      -top-40
      h-[550px]
      w-[550px]
      rounded-full
      bg-[var(--yellow)]
      opacity-[0.08]
      blur-[90px]
    "
        />
      </div>

      {/* Bottom border */}

      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      {/* =====================================================
                           MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          h-full
          w-full
          max-w-[1440px]
          grid-cols-1
          items-center
          gap-8
          px-6
          pb-8

          lg:grid-cols-[0.92fr_1.08fr]
          lg:gap-12
          lg:px-12
          lg:pb-10
        "
      >
        {/* =====================================================
                           LEFT CONTENT
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="relative z-10"
        >
          {/* Eyebrow */}

          <div className="flex items-center gap-3">
            <span className="h-[2px] w-10 bg-[var(--yellow)]" />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[var(--yellow)]
                sm:text-xs
              "
            >
              Creating Opportunities For Communities
            </span>
          </div>

          {/* Heading */}

          <h1
            className="
              mt-5
              max-w-3xl
              text-[42px]
              font-bold
              leading-[0.95]
              tracking-[-0.055em]
              text-white

              sm:text-5xl

              lg:text-[60px]

              xl:text-[68px]

              2xl:text-[76px]
            "
          >
            Africa-Rural
            <span className="block">Interventions</span>
            <span className="block text-[var(--yellow)]">Initiative</span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-5
              max-w-xl
              text-sm
              leading-7
              text-white/65

              sm:text-base

              lg:text-[16px]
            "
          >
            Restoring dignity and creating opportunities for Africa&apos;s most
            vulnerable communities.
          </p>

          {/* CTA */}

          <div className="mt-6 flex items-center">
            <a
              href="#programs"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[var(--yellow)]
                px-6
                py-3
                text-sm
                font-bold
                text-[var(--blue-dark)]
                transition-all
                duration-300

                hover:-translate-y-1
                hover:bg-[var(--yellow-light)]
              "
            >
              Support our work
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--blue-dark)]
                  text-white
                  transition-transform
                  duration-300

                  group-hover:rotate-45
                "
              >
                <ArrowUpRight size={16} />
              </span>
            </a>
          </div>

          {/* Supporting line */}

          <div className="mt-7">
            <p className="text-xs font-semibold text-white">
              Community-led impact
            </p>

            <p className="mt-0.5 text-[10px] text-white/45">
              Education • Empowerment • Opportunity
            </p>
          </div>
        </motion.div>

        {/* =====================================================
                            RIGHT IMAGE
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 45,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="
            relative
            z-10
            hidden

            lg:block
          "
        >
          <div className="relative mx-auto max-w-[600px]">
            <div
              className="
                relative
                overflow-hidden
                rounded-[2.2rem]
              "
            >
              <img
                src={HeroImage}
                alt="Africa-RII community impact"
                className="
                  h-[430px]
                  w-full
                  object-contain

                  xl:h-[480px]

                  2xl:h-[520px]
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[var(--blue-dark)]/55
                  via-transparent
                  to-transparent
                "
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
