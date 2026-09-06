import { ArrowUpRight, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const footerLinks = {
  organization: [
    { label: "About us", href: "/about" },
    { label: "Our team", href: "/team" },
    { label: "Our impact", href: "/impact" },
    { label: "Stories", href: "/stories" },
  ],

  programs: [
    { label: "Education", href: "/programs/education" },
    { label: "Skills Acquisition", href: "/programs/skills-acquisition" },
    {
      label: "Community Resource Centre",
      href: "/programs/community-resource-centre",
    },
    { label: "Women & Girls", href: "/programs/women-and-girls" },
  ],

  involvement: [
    { label: "Donate", href: "/donate" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Partner", href: "/partner" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedinIn,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-navbar="dark"
      className="
        relative
        overflow-hidden
        bg-[var(--blue-dark)]
        text-white
      "
    >
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0">
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
            -bottom-40
            -left-40
            h-80
            w-80
            rounded-full
            bg-[var(--blue)]/40
            blur-3xl
          "
        />
      </div>

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1440px]
          px-5
          py-8

          sm:px-6
          sm:py-10

          md:px-8

          lg:px-10
          lg:py-8

          xl:px-12
        "
      >
        {/* =====================================================
                            TOP ROW
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            gap-6
            border-b
            border-white/10
            pb-7

            md:flex-row
            md:items-end
            md:justify-between

            lg:pb-6
          "
        >
          {/* BRAND */}

          <div>
            <a
              href="/"
              className="
                inline-flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  text-[26px]
                  font-bold
                  tracking-[-0.05em]
                  text-white

                  sm:text-[30px]
                "
              >
                Africa-RII
              </span>

              <span
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-[var(--yellow)]
                "
              />
            </a>

            <h2
              className="
                mt-3
                max-w-xl
                text-[24px]
                font-bold
                leading-[1.08]
                tracking-[-0.035em]
                text-white

                sm:text-[30px]

                lg:text-[34px]
              "
            >
              Creating opportunities.
              <span className="block text-[var(--yellow)]">
                Strengthening communities.
              </span>
            </h2>
          </div>

          {/* SOCIALS */}

          <div className="flex items-center gap-2.5">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    text-white/65
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-[var(--yellow)]
                    hover:bg-[var(--yellow)]
                    hover:text-[var(--blue-dark)]
                  "
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
        </div>

        {/* =====================================================
                        MIDDLE CONTENT
        ===================================================== */}

        <div
          className="
            grid
            gap-8
            border-b
            border-white/10
            py-7

            sm:grid-cols-2

            lg:grid-cols-[1.2fr_0.8fr_0.9fr_0.9fr_0.9fr]
            lg:gap-7
            lg:py-6
          "
        >
          {/* NEWSLETTER */}

          <div
            className="
              sm:col-span-2

              lg:col-span-1
            "
          >
            <div
              className="
                rounded-[1.4rem]
                border
                border-white/10
                bg-white/[0.045]
                p-4
                backdrop-blur-sm

                sm:p-5

                lg:p-4
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-[var(--yellow)]
                    text-[var(--blue-dark)]
                  "
                >
                  <Mail size={16} />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-[var(--yellow)]
                    "
                  >
                    Stay connected
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-sm
                      font-bold
                      text-white
                    "
                  >
                    Get updates from Africa-RII.
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="
                  mt-4
                  flex
                  gap-2
                "
              >
                <input
                  type="email"
                  placeholder="Email address"
                  className="
                    min-w-0
                    flex-1
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.07]
                    px-4
                    py-2.5
                    text-xs
                    text-white
                    outline-none
                    placeholder:text-white/30
                    focus:border-[var(--yellow)]
                  "
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="
                    group
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--yellow)]
                    text-[var(--blue-dark)]
                    transition-transform
                    duration-300

                    hover:-translate-y-1
                  "
                >
                  <ArrowUpRight
                    size={15}
                    className="
                      transition-transform
                      duration-300
                      group-hover:rotate-45
                    "
                  />
                </button>
              </form>
            </div>
          </div>

          {/* CONTACT */}

          <div>
            <FooterTitle>Contact</FooterTitle>

            <div className="mt-3 space-y-2">
              <a
                href="mailto:info@africarii.org"
                className="
                  block
                  text-xs
                  leading-5
                  text-white/55
                  transition
                  hover:text-white
                "
              >
                info@africarii.org
              </a>

              <p
                className="
                  text-xs
                  leading-5
                  text-white/40
                "
              >
                Africa-Rural Interventions Initiative
              </p>
            </div>
          </div>

          <FooterColumn title="Organization" links={footerLinks.organization} />

          <FooterColumn title="Programs" links={footerLinks.programs} />

          <FooterColumn title="Get involved" links={footerLinks.involvement} />
        </div>

        {/* =====================================================
                           BOTTOM
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            gap-3
            pt-5
            text-[10px]
            text-white/35

            sm:flex-row
            sm:items-center
            sm:justify-between

            lg:pt-4
          "
        >
          <p>© {currentYear} Africa-Rural Interventions Initiative.</p>

          <div className="flex gap-5">
            <a
              href="/privacy"
              className="
                transition
                hover:text-white
              "
            >
              Privacy
            </a>

            <a
              href="/terms"
              className="
                transition
                hover:text-white
              "
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }) {
  return (
    <p
      className="
        text-[9px]
        font-bold
        uppercase
        tracking-[0.17em]
        text-[var(--yellow)]

        sm:text-[10px]
      "
    >
      {children}
    </p>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <FooterTitle>{title}</FooterTitle>

      <div className="mt-3 space-y-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="
              group
              flex
              w-fit
              items-center
              gap-1.5
              text-xs
              leading-5
              text-white/50
              transition
              hover:text-white
            "
          >
            {link.label}

            <ArrowUpRight
              size={11}
              className="
                opacity-0
                transition-all
                duration-300
                group-hover:translate-x-0.5
                group-hover:opacity-100
              "
            />
          </a>
        ))}
      </div>
    </div>
  );
}
