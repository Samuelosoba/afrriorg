import { Link } from "react-router-dom";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { programUrl } from "../data/content";

export default function ProgramCards({ category }) {
  return (
    <div className="editorial-grid">
      {category.programs.map((program) => (
        <Link
          className="editorial-card text-card"
          key={program.slug}
          to={programUrl(category, program)}
        >
          <BookOpen size={24} />
          <h3>{program.title}</h3>
          <p>{program.summary}</p>
          <span className="card-link">
            Explore programme <ArrowUpRight size={16} />
          </span>
        </Link>
      ))}
    </div>
  );
}
