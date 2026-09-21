import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import PartnerOne from "../assets/logoNav.png";
import PartnerTwo from "../assets/partner2.webp";
import PartnerThree from "../assets/partner3.webp";
import PartnerFour from "../assets/logoNav.png";
import PartnerFive from "../assets/partner3.webp";
import PartnerSix from "../assets/partner2.webp";

const partners = [
  {
    name: "Partner One",
    logo: PartnerOne,
  },
  {
    name: "Partner Two",
    logo: PartnerTwo,
  },
  {
    name: "Partner Three",
    logo: PartnerThree,
  },
  {
    name: "Partner Four",
    logo: PartnerFour,
  },
  {
    name: "Partner Five",
    logo: PartnerFive,
  },
  {
    name: "Partner Six",
    logo: PartnerSix,
  },
];

export default function PartnersSection() {
  return (
    <section
      data-navbar="light"
      className="
        relative
        overflow-hidden
        bg-white
        py-10

        sm:py-12

        lg:flex
        lg:min-h-[360px]
        lg:items-center
        lg:py-16
      "
    >
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            -left-32
            top-0
            h-72
            w-72
            rounded-full
            bg-[var(--green-soft)]/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-32
            bottom-0
            h-80
            w-80
            rounded-full
            bg-[var(--green-soft)]/5
            blur-3xl
          "
        />
      </div>

      {/* ================= MAIN ================= */}

      <div
        className="
          relative
          mx-auto
          flex
          w-full
          max-w-[1440px]
          flex-col
          justify-center
          px-5

          sm:px-6
          md:px-8
          lg:px-10
          xl:px-12
        "
      >
        {/* ================= HEADER ================= */}

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
              y: 20,
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
            }}
          >
            <div className="flex items-center gap-3">
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
                Our partners
              </span>
            </div>

            <h2
              className="
                mt-3
                max-w-xl
                text-[30px]
                font-bold
                leading-[1.04]
                tracking-[-0.04em]
                text-[var(--ink)]

                sm:text-[38px]
                md:text-[42px]
                lg:text-[46px]
                xl:text-[50px]
              "
            >
              Better together.
            </h2>
          </motion.div>

          <motion.a
            href="/partner"
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
              group
              inline-flex
              w-fit
              items-center
              gap-3
              rounded-full
              bg-[var(--green-soft)]
              px-5
              py-3
              text-xs
              font-bold
              text-[var(--ink)]
              transition-all
              duration-300

              hover:-tranneutral-y-1
              hover:bg-[var(--green-hover)]

              sm:text-sm
            "
          >
            Become a partner
            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-[var(--green-soft)]
                text-[var(--ink)]
                transition-transform
                duration-300

                group-hover:rotate-45
              "
            >
              <ArrowUpRight size={14} />
            </span>
          </motion.a>
        </div>

        {/* ================= MARQUEE ================= */}

        <div
          className="
            relative
            mt-10
            w-full
            overflow-hidden

            sm:mt-12
            lg:mt-10
          "
        >
          {/* LEFT FADE */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              top-0
              z-20
              w-12
              bg-gradient-to-r
              from-white
              via-white/80
              to-transparent

              sm:w-20
            "
          />

          {/* RIGHT FADE */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              right-0
              top-0
              z-20
              w-12
              bg-gradient-to-l
              from-white
              via-white/80
              to-transparent

              sm:w-20
            "
          />

          {/* MOVING TRACK */}

          <motion.div
            className="
              flex
              w-max
              will-change-transform
            "
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          >
            {/* ================= FIRST GROUP ================= */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-6
                pr-6

                sm:gap-8
                sm:pr-8

                lg:gap-10
                lg:pr-10
              "
            >
              {partners.map((partner) => (
                <PartnerLogo key={`first-${partner.name}`} partner={partner} />
              ))}
            </div>

            {/* ================= SECOND GROUP ================= */}

            <div
              aria-hidden="true"
              className="
                flex
                shrink-0
                items-center
                gap-6
                pr-6

                sm:gap-8
                sm:pr-8

                lg:gap-10
                lg:pr-10
              "
            >
              {partners.map((partner) => (
                <PartnerLogo key={`second-${partner.name}`} partner={partner} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
                        PARTNER LOGO
========================================================= */

function PartnerLogo({ partner }) {
  return (
    <div
      className="
        group
        flex
        shrink-0
        flex-col
        items-center
      "
    >
      <div
        className="
          relative
          flex
          h-[92px]
          w-[92px]
          items-center
          justify-center
          overflow-hidden
          rounded-full
          bg-[var(--background)]
          p-3
          shadow-[0_10px_35px_rgba(0,40,20,0.08)]
          transition-all
          duration-300

          group-hover:-tranneutral-y-1
          group-hover:shadow-[0_16px_45px_rgba(0,40,20,0.14)]

          sm:h-[110px]
          sm:w-[110px]

          md:h-[120px]
          md:w-[120px]

          lg:h-[128px]
          lg:w-[128px]
        "
      >
        <img
          src={partner.logo}
          alt={partner.name}
          draggable="false"
          className="
            h-full
            w-full
            select-none
            rounded-full
            object-cover
            opacity-80
            transition-all
            duration-300

            group-hover:scale-105
            group-hover:opacity-100
          "
        />
      </div>
    </div>
  );
}
