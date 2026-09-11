import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({
  title,
  eyebrow,
  intro,
  children,
  crumbs = [],
}) {
  return (
    <div className="inner-site">
      <Navbar />
      <main className="content-page">
        <div className="page-intro">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {crumbs.map((c) => (
              <span key={c.href}>
                {" "}
                / <Link to={c.href}>{c.title}</Link>
              </span>
            ))}
            <span> / {title}</span>
          </nav>
          <p className="page-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {intro && <p className="page-lead">{intro}</p>}
        </div>
        <div className="page-body">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
