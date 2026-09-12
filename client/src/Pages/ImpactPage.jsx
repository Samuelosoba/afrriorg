import impactImage from "../assets/afriihero.webp";
import { useProgrammes } from "../utils/useProgrammes";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageShell from "../components/PageShell";
import Cta from "../components/Cta";
import StoryCards from "../components/StoryCards";

export default function ImpactPage() {
  const { categories } = useProgrammes();
  return (
    <PageShell
      title="Our impact"
      eyebrow="Community-led change"
      intro="Education, empowerment and opportunity are at the heart of our work."
    >
      <section className="page-split">
        <div>
          <h2>A commitment that began in 2012</h2>
          <p>
            From providing supplies to rural students to developing a wider
            range of community programmes, Africa-RII's work has grown through a
            long-term commitment to people.
          </p>
          <p>
            Our focus spans access to learning, practical skills, mentorship,
            health awareness and economic empowerment.
          </p>
          <Link to="/about" className="text-link">
            Read our journey <ArrowUpRight size={16} />
          </Link>
        </div>
        <img
          className="feature-photo"
          src={categories[0]?.image || impactImage}
          alt="Africa-RII education activity"
        />
      </section>
      <section className="page-section">
        <h2>Where our work makes a difference</h2>
        <div className="editorial-grid">
          {categories.map((c) => (
            <Link
              className="editorial-card text-card"
              key={c.slug}
              to={"/programs/" + c.slug}
            >
              <h3>{c.title}</h3>
              <p>{c.intro}</p>
              <span className="card-link">
                Explore this work <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="page-section">
        <h2>Stories from our work</h2>
        <p>Explore stories and reports from our Summer School editions.</p>
        <StoryCards />
      </section>
      <Cta />
    </PageShell>
  );
}
