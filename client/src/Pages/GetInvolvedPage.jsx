import { Link } from "react-router-dom";
import { ArrowUpRight, HeartHandshake } from "lucide-react";
import PageShell from "../components/PageShell";
import Cta from "../components/Cta";
import { involvement } from "../data/involvement";

export default function GetInvolvedPage() {
  return (
    <PageShell
      title="Be part of what happens next"
      eyebrow="Get involved"
      intro="Give, volunteer or partner with us to create stronger opportunities for communities."
    >
      <div className="editorial-grid">
        {["donate", "volunteer", "partner"].map((key) => (
          <Link key={key} className="editorial-card text-card" to={"/" + key}>
            <HeartHandshake />
            <p className="page-eyebrow">{involvement[key].eyebrow}</p>
            <h2>{involvement[key].title}</h2>
            <p>{involvement[key].intro}</p>
            <span className="card-link">
              Find out more <ArrowUpRight size={16} />
            </span>
          </Link>
        ))}
      </div>
      <Cta
        title="Not sure where to begin?"
        text="Email hello@africarii.org to discuss how you would like to contribute."
      />
      <p>
        <Link className="text-link" to="/contact">
          Contact the team <ArrowUpRight size={16} />
        </Link>
      </p>
    </PageShell>
  );
}
