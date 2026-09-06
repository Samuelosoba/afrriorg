import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";

import AboutImage from "../assets/about.png";
import HeroImage from "../assets/hero.png";

export default function AboutPreview() {
  return (
    <section
      id="about"
      data-navbar="light"
      className="
        relative
        overflow-hidden
        bg-[#fffdf7]
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
          Decorative effects are desktop only.
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
            bg-[var(--yellow)]/10
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
            bg-blue-100/60
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
            border-[var(--blue)]/5
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
            border-[var(--yellow)]/20
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{
            once: true,
            amount: 0.05,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          className="relative"
        >
          <div
            className="
              relative
              mx-auto
              w-full
              max-w-[540px]

              lg:max-w-[480px]
              xl:max-w-[520px]
            "
          >
            {/* YELLOW FRAME */}

            <div
              className="
                absolute
                -left-3
                -top-3
                h-[88%]
                w-[92%]
                rounded-[1.8rem]
                border-2
                border-[var(--yellow)]

                sm:-left-5
                sm:-top-5
                sm:rounded-[2.3rem]

                lg:-left-6
                lg:-top-6
              "
            />

            {/* IMAGE */}

            <div
              className="
                relative
                h-[260px]
                overflow-hidden
                rounded-[1.8rem]

                sm:h-[360px]
                sm:rounded-[2.3rem]

                md:h-[430px]
                lg:h-[480px]
                xl:h-[520px]
              "
            >
              <picture>
                {/* Mobile alternative */}

                <source media="(max-width: 767px)" srcSet={HeroImage} />

                {/* Tablet/Desktop */}

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
                  "
                />
              </picture>

              {/* Lightweight overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[var(--blue-dark)]/45
                  via-transparent
                  to-transparent
                "
              />

              {/* Mobile caption */}

              <div
                className="
                  absolute
                  bottom-5
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
                    text-[var(--yellow)]
                  "
                >
                  Africa-RII
                </p>

                <p
                  className="
                    mt-1
                    max-w-[250px]
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

        <div className="relative lg:pl-3">
          {/* EYEBROW */}

          <div className="mb-4 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-[var(--yellow)]" />

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
              About Us
            </span>
          </div>

          {/* HEADING */}

          <h2
            className="
              max-w-2xl
              text-[34px]
              font-bold
              leading-[1.03]
              tracking-[-0.04em]
              text-[var(--blue-dark)]

              sm:text-[44px]
              lg:text-[48px]
              xl:text-[54px]
            "
          >
            Who We Are
          </h2>

          {/* =====================================================
                              ABOUT TEXT
          ===================================================== */}

          <div
            className="
              mt-5
              max-w-2xl
              space-y-4
              text-[14px]
              leading-6
              text-slate-600

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
                            QUOTE + CTA
          ===================================================== */}

          <div
            className="
              mt-6
              flex
              flex-col
              gap-4

              sm:flex-row
              sm:items-center

              lg:mt-6
            "
          >
            {/* QUOTE */}

            <div
              className="
                flex-1
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                p-4
                shadow-[0_8px_25px_rgba(3,42,82,0.04)]
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
                    bg-[#fff5c7]
                    text-[var(--blue-dark)]
                  "
                >
                  <Quote size={17} />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-[var(--blue)]
                    "
                  >
                    — Mahatma Gandhi
                  </p>

                  <p
                    className="
                      mt-1.5
                      text-xs
                      leading-5
                      text-slate-600
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
                self-start
                rounded-full
                bg-[var(--yellow)]
                px-6
                py-3.5
                text-sm
                font-bold
                text-[var(--blue-dark)]

                transition-colors
                duration-200

                md:hover:bg-[var(--yellow-light)]

                sm:self-center
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
                  bg-[var(--blue-dark)]
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
        </div>
      </div>
    </section>
  );
}
