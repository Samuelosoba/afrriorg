import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Impact1 from "../assets/computer.jpg";
import Impact2 from "../assets/sisters.webp";
import Impact3 from "../assets/skills.webp";
import Impact4 from "../assets/health.webp";

const impactStats = [
  {
    value: "13+",
    label: "Years of impact",
  },
  {
    value: "1,000+",
    label: "People reached",
  },
  {
    value: "50+",
    label: "Communities",
  },
  {
    value: "15+",
    label: "Programs",
  },
];

const slides = [
  {
    image: Impact1,
    title: "Education that opens doors",
    text: "Creating access to learning, mentorship and new opportunities.",
  },
  {
    image: Impact2,
    title: "Communities at the centre",
    text: "Working with people to build solutions that respond to real needs.",
  },
  {
    image: Impact3,
    title: "Empowerment in action",
    text: "Supporting young people with skills, confidence and practical pathways.",
  },
  {
    image: Impact4,
    title: "Impact that lasts",
    text: "Building stronger communities through long-term, people-first interventions.",
  },
];

export default function ImpactStats() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((current) =>
        current === slides.length - 1 ? 0 : current + 1,
      );
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  const prevSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  return (
    <section
      id="impact"
      data-navbar="dark"
      className="
        relative
        overflow-hidden
        bg-[var(--blue-dark)]
        py-12

        sm:py-14

        lg:flex
        lg:min-h-[680px]
        lg:items-center
        lg:py-12
      "
    >
      {/* =====================================================
                           BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div
          className="
            absolute
            -right-32
            -top-32
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
            -bottom-32
            -left-28
            h-80
            w-80
            rounded-full
            bg-[var(--blue)]/50
            blur-3xl
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

          lg:grid-cols-[0.9fr_1.1fr]
          lg:gap-10
          lg:px-10

          xl:grid-cols-[0.85fr_1.15fr]
          xl:gap-14
          xl:px-12
        "
      >
        {/* =====================================================
                            LEFT SIDE
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
        >
          {/* Eyebrow */}

          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[var(--yellow)]" />

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
              Our impact
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              mt-3
              max-w-lg
              text-[30px]
              font-bold
              leading-[1.02]
              tracking-[-0.045em]
              text-white

              sm:text-[38px]

              lg:text-[42px]

              xl:text-[48px]
            "
          >
            13 Years Of{" "}
            <span className="text-[var(--yellow)]">Sustained Impact</span>
          </h2>

          <p
            className="
              mt-3
              max-w-md
              text-[12px]
              leading-5
              text-white/50

              sm:text-sm
              sm:leading-6
            "
          >
            Measurable progress built through years of community-led work,
            collaboration and long-term commitment.
          </p>

          {/* =====================================================
                               STATS
          ===================================================== */}

          <div
            className="
              mt-7
              grid
              grid-cols-2
              gap-x-6
              gap-y-7

              sm:grid-cols-4
              sm:gap-x-7

              lg:mt-8
            "
          >
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="
                  group
                  min-w-0
                "
              >
                <div
                  className="
                    text-[34px]
                    font-bold
                    leading-none
                    tracking-[-0.055em]
                    text-white

                    sm:text-[34px]

                    lg:text-[36px]

                    xl:text-[42px]
                  "
                >
                  {stat.value}
                </div>

                <div
                  className="
                    mt-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-[var(--yellow)]

                    sm:text-[11px]
                  "
                >
                  {stat.label}
                </div>

                <div
                  className="
                    mt-3
                    h-[2px]
                    w-6
                    bg-white/15

                    lg:transition-[width]
                    lg:duration-200
                    lg:group-hover:w-12
                  "
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* =====================================================
                          RIGHT SLIDESHOW
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
              max-w-[700px]
            "
          >
            <div
              className="
                relative
                h-[220px]
                overflow-hidden
                rounded-[1.5rem]

                sm:h-[300px]
                sm:rounded-[1.8rem]

                md:h-[350px]

                lg:h-[400px]

                xl:h-[440px]

                2xl:h-[470px]
              "
            >
              {/* Current image only */}

              <img
                key={currentSlide}
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                loading="lazy"
                decoding="async"
                width="900"
                height="600"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

              {/* Overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[var(--blue-dark)]/95
                  via-transparent
                  to-black/10
                "
              />

              {/* Text */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-4

                  sm:p-5

                  lg:p-6
                "
              >
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[var(--yellow)]

                    sm:text-[10px]
                  "
                >
                  Community impact
                </p>

                <h3
                  className="
                    mt-1
                    max-w-md
                    text-lg
                    font-bold
                    leading-tight
                    text-white

                    sm:text-xl

                    lg:text-[24px]
                  "
                >
                  {slides[currentSlide].title}
                </h3>

                <p
                  className="
                    mt-1.5
                    max-w-md
                    text-[11px]
                    leading-5
                    text-white/60

                    sm:text-xs

                    lg:text-[13px]
                  "
                >
                  {slides[currentSlide].text}
                </p>
              </div>

              {/* Counter */}

              <div
                className="
                  absolute
                  left-3
                  top-3
                  z-20
                  rounded-full
                  bg-[var(--blue-dark)]/70
                  px-3
                  py-1.5
                  text-[9px]
                  font-bold
                  tracking-[0.12em]
                  text-white

                  sm:left-4
                  sm:top-4
                "
              >
                0{currentSlide + 1}
                <span className="mx-1 text-white/30">/</span>0{slides.length}
              </div>

              {/* Controls */}

              <div
                className="
                  absolute
                  right-3
                  top-3
                  z-20
                  flex
                  gap-2

                  sm:right-4
                  sm:top-4
                "
              >
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-black/30
                    text-white

                    lg:transition-colors
                    lg:duration-200
                    lg:hover:bg-[var(--yellow)]
                    lg:hover:text-[var(--blue-dark)]
                  "
                >
                  <ChevronLeft size={15} />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-black/30
                    text-white

                    lg:transition-colors
                    lg:duration-200
                    lg:hover:bg-[var(--yellow)]
                    lg:hover:text-[var(--blue-dark)]
                  "
                >
                  <ChevronRight size={15} />
                </button>
              </div>

              {/* Dots */}

              <div
                className="
                  absolute
                  bottom-3
                  right-3
                  z-20
                  flex
                  items-center
                  gap-1.5

                  sm:bottom-4
                  sm:right-4
                "
              >
                {slides.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`
                      h-1.5
                      rounded-full

                      ${
                        currentSlide === index
                          ? "w-6 bg-[var(--yellow)]"
                          : "w-1.5 bg-white/40"
                      }

                      lg:transition-[width,background-color]
                      lg:duration-200
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
