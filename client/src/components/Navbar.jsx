import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import logo from "../assets/afrilogo.png"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs", dropdown: true },
  { label: "Impact", href: "#impact" },
  { label: "Get involved", href: "#donate" },
];

const programs = [
  "Education",
  "Skills Acquisition",
  "Community Resource Centre",
  "Sisters' Club",
  "LifeLine",
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 border-b border-neutral-200/60 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="px-2 py-4 sm:px-6">
          <div className="flex h-12 items-center justify-between">
            {/* Logo */}
            <a href="#home" aria-label="Africa-RII home">
        <img
                src={logo}
                alt="Africa-RII logo"
                className="
                  h-auto
                  w-[105px]
                  object-contain
                  sm:w-[125px]
                  md:w-[140px]
                  lg:w-[155px]
                "
              />
            </a>

            {/* Desktop navigation */}
            <div className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <div key={link.label} className="relative">
                  {link.dropdown ? (
                    <button
                      aria-expanded={programOpen} onClick={() => setProgramOpen(!programOpen)}
                      className="flex items-center gap-1.5 text-sm font-medium text-[var(--ink)] transition hover:text-[var(--green)]"
                    >
                      {link.label}
                      <ChevronDown
                        size={15}
                        className={`transition-transform ${
                          programOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm font-medium text-[var(--ink)] transition hover:text-[var(--green)]"
                    >
                      {link.label}
                    </a>
                  )}

                  <AnimatePresence>
                    {link.dropdown && programOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute left-1/2 top-10 w-64 -translate-x-1/2 rounded-2xl border border-neutral-100 bg-white p-2 shadow-xl"
                      >
                        {programs.map((program) => (
                          <a
                            key={program}
                            href="#programs"
                            onClick={() => setProgramOpen(false)}
                            className="block rounded-xl px-4 py-3 text-sm text-neutral-600 transition hover:bg-[#eaf6ef] hover:text-[var(--green)]"
                          >
                            {program}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <a
              href="#donate"
              className="hidden items-center gap-2 rounded-full bg-[var(--green)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--green-hover)] lg:flex"
            >
              Donate
              <ArrowUpRight size={16} />
            </a>

            {/* Mobile button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--ink)] lg:hidden"
              aria-label="Toggle navigation" aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile navigation */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="border-t border-neutral-100 pb-3 pt-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-3 py-3 text-sm font-medium text-[var(--ink)] hover:bg-[var(--green-soft)]"
                    >
                      {link.label}
                    </a>
                  ))}

                  <a
                    href="#donate"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[var(--green)] px-4 py-3 text-sm font-semibold text-white"
                  >
                    Donate
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
