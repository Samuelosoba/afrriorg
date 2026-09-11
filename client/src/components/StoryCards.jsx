import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { summerStories, summerSchoolUrl } from "../data/content";

export default function StoryCards({ exclude }) {
  return (
    <div className="editorial-grid">
      {summerStories
        .filter((s) => s.year !== exclude)
        .map((s) => (
          <Link
            className="editorial-card"
            key={s.year}
            to={summerSchoolUrl + "/" + s.year}
          >
            <img
              src={s.image}
              alt={
                s.verified
                  ? "Summer School " + s.year + " programme photograph"
                  : "Africa-RII archive photograph; year not verified"
              }
              loading="lazy"
            />
            <div className="card-content">
              <p className="page-eyebrow">Summer School / {s.year}</p>
              <span className="draft-badge">
                {s.verified ? "Programme report" : "Draft story"}
              </span>
              <h3>{s.title}</h3>
              <p>{s.subtitle}</p>
              <span className="card-link">
                Read the journal <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        ))}
    </div>
  );
}
