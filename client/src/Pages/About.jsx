import dapo from "../assets/dapo.jpg";
import simisola from "../assets/simisola.jpg";
import chidinma from "../assets/chidinma.jpg";
import yemisi from "../assets/yemisi.jpg";
import femi from "../assets/femi.jpg";
import { Link } from "react-router-dom";
import { ArrowUpRight, Users, BookOpen, HeartHandshake } from "lucide-react";
import PageShell from "../components/PageShell";
import Cta from "../components/Cta";
import { aboutParagraphs, team } from "../data/content";
import aboutImage from "../assets/about.png";

const portraits = {
  "Oladapo O Ajayi": dapo,
  "Simisola Wright Esq": simisola,
  "Chidinma Pauletee": chidinma,
  "Oluyemisi Olokun": yemisi,
  "Oluwafemi Olubukola": femi,
};

export default function AboutPage() {
  return (
    <PageShell
      title="Who we are"
      eyebrow="About us"
      intro="Rooted in community. Committed to dignity, learning and opportunity."
    >
      <section className="page-split">
        <div>
          <p className="page-eyebrow">Our story</p>
          <h2>Small beginnings. A lasting commitment.</h2>
          {aboutParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <img
          className="feature-photo"
          src={aboutImage}
          alt="Africa-RII community collage"
        />
      </section>
      <section className="page-section editorial-grid">
        <div className="editorial-card text-card">
          <BookOpen />
          <h2>Our purpose</h2>
          <p>
            Restoring dignity and creating opportunities for Africa's most
            vulnerable communities through education, skills and mentorship.
          </p>
        </div>
        <div className="editorial-card text-card">
          <HeartHandshake />
          <h2>Our commitment</h2>
          <p>
            Building a lasting legacy of intergenerational impact through human
            capital development in disadvantaged communities.
          </p>
        </div>
        <div className="editorial-card text-card">
          <Users />
          <h2>Our approach</h2>
          <p>
            Inclusive, community-led solutions shaped through research,
            engagement and collaboration, with transparency and innovation at
            the heart of our work.
          </p>
        </div>
      </section>
      <section className="page-section">
        <p className="page-eyebrow">Our journey</p>
        <h2>Growing alongside our communities</h2>
        <ol className="history-list">
          <li>
            <strong>2012</strong>
            <div>
              <h3>Train A Child Today</h3>
              <p>
                Responding to educational challenges by providing school
                supplies to rural students.
              </p>
            </div>
          </li>
          <li>
            <strong>2019 onwards</strong>
            <div>
              <h3>A broader range of opportunities</h3>
              <p>
                Our work expanded to include free summer schools, JAMB support,
                tuition scholarships, career mentorship and gender-focused
                programmes.
              </p>
            </div>
          </li>
          <li>
            <strong>Our work today</strong>
            <div>
              <h3>Five connected programme areas</h3>
              <p>
                Education, community resources, health awareness, gender
                advocacy and innovation.
              </p>
              <Link to="/programs" className="text-link">
                Explore our programmes <ArrowUpRight size={16} />
              </Link>
            </div>
          </li>
        </ol>
      </section>
      <section id="team" className="page-section team-section">
        <p className="page-eyebrow">The people behind the work</p>
        <h2>Our team</h2>
        <p className="page-lead">
          Our interdisciplinary team is united by transparency, innovation and a
          shared passion for sustainable social impact.
        </p>
        <div className="editorial-grid">
          {team
            .filter((person) => portraits[person.name])
            .map((person) => (
              <div
                className={
                  "editorial-card team-card" +
                  (portraits[person.name] ? " has-portrait" : "")
                }
                key={person.name}
              >
                {portraits[person.name] && (
                  <img
                    className="team-portrait"
                    src={portraits[person.name]}
                    alt={person.name}
                    loading="lazy"
                  />
                )}
                <div className="team-caption">
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                </div>
              </div>
            ))}
        </div>
        <div className="team-directory">
          {team
            .filter((person) => !portraits[person.name])
            .map((person) => (
              <div key={person.name}>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
            ))}
        </div>
      </section>
      <section className="page-section">
        <h2>Get to know Africa-RII</h2>
        <details>
          <summary>Where did Africa-RII begin?</summary>
          <p>
            Our journey began in 2012 through Train A Child Today, supporting
            rural students in Nigeria.
          </p>
        </details>
        <details>
          <summary>Where is the Community Resource Centre?</summary>
          <p>
            The centre is in Ilora. Please contact the team for visiting
            arrangements and current activities.
          </p>
        </details>
        <details>
          <summary>How can I get involved?</summary>
          <p>
            You can explore giving, volunteering and partnership opportunities
            on our <Link to="/get-involved">Get involved page</Link>.
          </p>
        </details>
      </section>
      <Cta />
    </PageShell>
  );
}
