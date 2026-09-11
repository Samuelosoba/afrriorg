import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";

import AboutImage from "../assets/about.png";
import HeroImage from "../assets/hero-transparent.png";

export default function AboutPreview() {
  return (
    <section
      id="about"
      data-navbar="light"
      className="
        relative
        overflow-hidden
        bg-[var(--surface)]
        py-14
        sm:py-16
        lg:flex
        lg:min-h-[90vh]
        lg:items-center
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
            -left-32
            top-16
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
            -bottom-28
            -right-28
            h-96
            w-96
            rounded-full
            bg-[var(--green-soft)]/5
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-[8%]
            top-[12%]
            h-24
            w-24
            rounded-full
            border
            border-[var(--green)]/5
          "
        />

        <div
          className="
            absolute
            bottom-[10%]
            left-[5%]
            h-16
            w-16
            rounded-full
            border
            border-[var(--green-soft)]/20
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
          grid
          w-full
          max-w-[1440px]
          items-center
          gap-10
          px-5
          sm:px-6
          md:px-8
          lg:grid-cols-[0.88fr_1.12fr]
          lg:gap-14
          lg:px-12
          xl:gap-20
        "
      >
        {/* =====================================================
                              IMAGE
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 28,
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
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          <div
            className="
              relative
              mx-auto
              w-full
              max-w-[460px]
              sm:max-w-[560px]
              md:max-w-[540px]
              lg:max-w-[480px]
              xl:max-w-[520px]
            "
          >
            {/* IMAGE FRAME */}

            <div
              className="
                about-photo
                relative
                h-[520px]
                overflow-hidden
                rounded-[1.8rem]

                min-[390px]:h-[560px]

                sm:h-[600px]
                sm:rounded-[2.3rem]

                md:h-[430px]
                lg:h-[480px]
                xl:h-[520px]
              "
            >
              <picture>
                {/* MOBILE IMAGE */}
                <source media="(max-width: 767px)" srcSet={HeroImage} />

                {/* TABLET / DESKTOP IMAGE */}
                <img
                  src={AboutImage}
                  alt="Africa-RII working with local communities"
                  loading="lazy"
                  decoding="async"
                  width="720"
                  height="900"
                  className="
                    h-full
                    w-full
                    object-cover
                    object-center

                    max-md:scale-[1.38]

                    md:scale-100
                  "
                />
              </picture>

              {/* IMAGE OVERLAY */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[var(--ink)]/50
                  via-transparent
                  to-transparent
                "
              />

              {/* MOBILE IMAGE CAPTION */}

              <div
                className="
                  absolute
                  bottom-6
                  left-5
                  right-5
                  md:hidden
                "
              >
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[var(--green)]
                  "
                >
                  Africa-RII
                </p>

                <p
                  className="
                    mt-1
                    max-w-[290px]
                    text-lg
                    font-semibold
                    leading-snug
                    text-white
                  "
                >
                  Empowering communities through opportunity.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
                          RIGHT CONTENT
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 26,
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
            duration: 0.55,
            delay: 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mt-10
            text-left

            sm:mt-12

            lg:mt-0
            lg:pl-3
          "
        >
          {/* =====================================================
                   ABOUT US — CENTERED ON MOBILE ONLY
          ===================================================== */}

          <div
            className="
              mb-5
              flex
              w-full
              items-center
              justify-center
              gap-3

              lg:justify-start
            "
          >
            {/* LEFT LINE */}

            <span
              className="
                h-[2px]
                w-9
                bg-[var(--green-soft)]
                sm:w-10
              "
            />

            {/* ABOUT US */}

            <span
              className="
                whitespace-nowrap
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[var(--green)]
                sm:text-xs
              "
            >
              About Us
            </span>

            {/* RIGHT LINE — MOBILE/TABLET ONLY */}

            <span
              className="
                h-[2px]
                w-9
                bg-[var(--green-soft)]
                sm:w-10
                lg:hidden
              "
            />
          </div>

          {/* =====================================================
                     WHO WE ARE — LEFT ALIGNED
          ===================================================== */}

          <h2
            className="
    mx-auto
    max-w-2xl
    text-center
    text-[34px]
    font-bold
    leading-[1.03]
    tracking-[-0.04em]
    text-[var(--ink)]

    sm:text-[44px]

    lg:mx-0
    lg:text-left
    lg:text-[48px]

    xl:text-[54px]
  "
          >
            Who We Are
          </h2>

          {/* =====================================================
                         DESKTOP ABOUT TEXT
          ===================================================== */}

          <div
            className="
              about-copy
              mt-5
              hidden
              max-w-2xl
              space-y-4
              text-left
              text-[14px]
              leading-6
              text-neutral-600

              md:block

              sm:text-base
              sm:leading-7

              lg:space-y-3
              lg:text-[14px]
              lg:leading-[1.65]

              xl:text-[15px]
            "
          >
            <p>
              Africa Rural Interventions Initiative (Africa-RII) began its
              journey in 2012 through Train A Child Today (TACT), responding to
              the educational and socio-economic challenges facing underserved
              communities in Nigeria. What started with providing school
              supplies to rural students has grown into a broader commitment to
              education, empowerment and community development.
            </p>

            <p>
              Guided by the belief that dignity can be restored through
              education, skills and mentorship, Africa-RII established a
              Community Resource Centre in Ilora — a safe space where young
              people can learn, build practical skills and receive mentorship.
              Since 2019, our work has expanded to include free summer schools,
              JAMB support, university tuition scholarships, career mentorship
              and gender-focused programmes.
            </p>

            <p>
              Today, Africa-RII works across education, youth development,
              skills acquisition, health awareness and economic empowerment. By
              working directly with communities, we help individuals gain the
              knowledge, confidence and opportunities they need to build
              resilient livelihoods and create lasting change.
            </p>
          </div>

          {/* =====================================================
                    MOBILE ABOUT TEXT — LEFT ALIGNED
          ===================================================== */}

          <div
            className="
              about-mobile-copy
              mt-5
              max-w-[410px]
              space-y-4
              text-left
              text-sm
              leading-6
              text-neutral-600

              md:hidden
            "
          >
            <p>
              Since 2012, Africa-RII has worked with underserved communities in
              Nigeria to improve access to education, practical skills and
              opportunities that help people build better futures.
            </p>

            <p>
              What began with providing school supplies to children in rural
              communities has grown into a wider commitment to education, youth
              development, mentorship and community empowerment.
            </p>

            <p>
              Through our Community Resource Centre in Ilora, young people are
              given a safe and supportive space to learn, develop practical
              skills, receive mentorship and gain the confidence needed to
              pursue new opportunities.
            </p>
          </div>

          {/* =====================================================
                            QUOTE + CTA
          ===================================================== */}

          <div
            className="
              about-actions
              mt-7
              flex
              flex-col
              items-start
              gap-4

              sm:flex-row
              sm:items-center

              lg:mt-6
            "
          >
            {/* QUOTE — DESKTOP */}

            <div
              className="
                hidden
                flex-1
                rounded-2xl
                border
                border-neutral-200/80
                bg-white
                p-4
                shadow-[0_8px_25px_rgba(0,40,20,0.04)]

                md:block
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#eaf6ef]
                    text-[var(--ink)]
                  "
                >
                  <Quote size={17} />
                </div>

                <div className="text-left">
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-[var(--green)]
                    "
                  >
                    — Mahatma Gandhi
                  </p>

                  <p
                    className="
                      mt-1.5
                      text-xs
                      leading-5
                      text-neutral-600
                      sm:text-[13px]
                    "
                  >
                    The best way to find yourself is to lose yourself in the
                    service of others.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}

            <a
              href="/about"
              className="
                group
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[var(--green)]
                px-6
                py-3.5
                text-sm
                font-bold
                text-white
                transition-colors
                duration-200

                md:hover:bg-[var(--green-hover)]
              "
            >
              Discover our story
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--ink)]
                  text-white
                  transition-transform
                  duration-200

                  md:group-hover:rotate-45
                "
              >
                <ArrowUpRight size={14} />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
