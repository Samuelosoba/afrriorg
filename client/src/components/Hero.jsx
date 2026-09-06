import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import HeroImage from "../assets/hero.png";
import HeroBackground from "../assets/afriihero.webp";

export default function Hero() {
  return (
    <section
      data-navbar="dark"
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        bg-[var(--blue-dark)]
        pt-24
        lg:pt-28
      "
    >
      {/* =====================================================
                          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Hero background */}
        <img
          src={HeroBackground}
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
            opacity-60
            lg:opacity-70
          "
        />

        {/* Base blue tint */}
        <div className="absolute inset-0 bg-[var(--blue-dark)]/55" />

        {/* Desktop gradient */}
        <div
          className="
            absolute
            inset-0
            bg-[var(--blue-dark)]/55

            lg:bg-gradient-to-r
            lg:from-[var(--blue-dark)]/95
            lg:via-[var(--blue-dark)]/65
            lg:to-[var(--blue-dark)]/25
          "
        />

        {/* Expensive blur effects hidden on mobile */}
        <div
          className="
            absolute
            -left-40
            top-20
            hidden
            h-[500px]
            w-[500px]
            rounded-full
            bg-[var(--blue)]
            opacity-25
            blur-[110px]

            md:block
          "
        />

        <div
          className="
            absolute
            -right-40
            -top-40
            hidden
            h-[550px]
            w-[550px]
            rounded-full
            bg-[var(--yellow)]
            opacity-[0.08]
            blur-[90px]

            md:block
          "
        />
      </div>

      {/* Bottom divider */}
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
          min-h-[calc(100svh-6rem)]
          w-full
          max-w-[1440px]
          grid-cols-1
          items-center
          gap-8
          px-6
          pb-10

          lg:min-h-[calc(100svh-7rem)]
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          className="
            relative
            z-10
            max-w-2xl

            lg:max-w-none
          "
        >
          {/* Eyebrow */}

          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[var(--yellow)] sm:w-10" />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[var(--yellow)]

                
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
              text-[40px]
              font-bold
              leading-[0.96]
              tracking-[-0.05em]
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
              max-w-lg
              text-md
              leading-7
              text-white/70
              text-[15px]

              sm:text-base
              lg:text-[16px]
            "
          >
            Restoring dignity and creating opportunities for Africa&apos;s most
            vulnerable communities.
          </p>

          {/* CTA */}

          <div className="mt-7 flex items-center">
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

                transition-colors
                duration-200

                md:hover:bg-[var(--yellow-light)]
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
                  duration-200

                  md:group-hover:rotate-45
                "
              >
                <ArrowUpRight size={16} />
              </span>
            </a>
          </div>

          {/* Supporting line */}

          <div className="mt-7">
            <p className="text-[15px] font-semibold text-white">
              Community-led impact
            </p>

            <p className="mt-1 text-[14px] text-white/45">
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
            x: 24,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.45,
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
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="600"
                height="520"
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
                  from-[var(--blue-dark)]/50
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
