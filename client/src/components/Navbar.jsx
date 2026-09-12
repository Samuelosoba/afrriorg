import { useProgrammes } from "../utils/useProgrammes";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import logo from "../assets/afrilogo.png";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Impact", href: "/impact" },
  { label: "Get involved", href: "/get-involved" },
  { label: "Contact us", href: "/contact" },
];

export default function Navbar() {
  const { categories } = useProgrammes();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const dropdown = useRef(null);
  const location = useLocation();
  const close = () => {
    setMobileOpen(false);
    setProgramOpen(false);
  };
  useEffect(() => {
    function dismiss(event) {
      if (event.type === "keydown" && event.key === "Escape") {
        setMobileOpen(false);
        setProgramOpen(false);
        document.getElementById("program-menu-toggle")?.focus();
      } else if (
        event.type === "pointerdown" &&
        dropdown.current &&
        !dropdown.current.contains(event.target)
      )
        setProgramOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", dismiss);
    };
  }, []);
  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 border-b border-neutral-200/60 bg-white/95 backdrop-blur-md">
      <nav className="site-nav" aria-label="Main navigation">
        <Link to="/" onClick={close} aria-label="Africa-RII home">
          <img className="nav-logo" src={logo} alt="Africa-RII" />
        </Link>
        <div className="desktop-nav">
          <NavLink to="/about" onClick={close}>
            About
          </NavLink>
          <div className="nav-programs" ref={dropdown}>
            <NavLink to="/programs" onClick={close}>
              Programs
            </NavLink>
            <button
              id="program-menu-toggle"
              type="button"
              aria-label="Show programme categories"
              aria-expanded={programOpen}
              aria-controls="program-menu"
              onClick={() => setProgramOpen(!programOpen)}
            >
              <ChevronDown size={16} />
            </button>
            {programOpen && (
              <div id="program-menu" className="program-menu">
                {categories.map((c) => (
                  <Link key={c.slug} to={"/programs/" + c.slug} onClick={close}>
                    {c.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navLinks.slice(1).map((link) => (
            <NavLink key={link.href} to={link.href} onClick={close}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <Link
          to="/donate"
          onClick={close}
          className="button-primary nav-donate"
        >
          Donate <ArrowUpRight size={16} />
        </Link>
        <button
          type="button"
          className="mobile-toggle"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>
      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
          key={location.pathname}
        >
          <NavLink to="/about" onClick={close}>
            About
          </NavLink>
          <NavLink to="/programs" onClick={close}>
            All programs
          </NavLink>
          <div className="mobile-categories">
            {categories.map((c) => (
              <Link key={c.slug} to={"/programs/" + c.slug} onClick={close}>
                {c.title}
              </Link>
            ))}
          </div>
          {navLinks.slice(1).map((link) => (
            <NavLink key={link.href} to={link.href} onClick={close}>
              {link.label}
            </NavLink>
          ))}
          <Link to="/donate" className="button-primary" onClick={close}>
            Donate <ArrowUpRight size={16} />
          </Link>
        </nav>
      )}
    </header>
  );
}
