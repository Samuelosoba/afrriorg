import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Cta({
  title = "Make opportunity possible.",
  text = "Give your time, share your skills or start a conversation about working together.",
}) {
  return (
    <section className="page-cta">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Link className="button-primary" to="/get-involved">
        Get involved <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
