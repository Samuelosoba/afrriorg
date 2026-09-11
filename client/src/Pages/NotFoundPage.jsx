import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";

export default function NotFoundPage() {
  return (
    <PageShell
      title="Page not found"
      eyebrow="404"
      intro="That page isn't available. Explore our programmes or return home."
    >
      <Link className="button-primary" to="/">
        Back to home
      </Link>
      <Link className="button-outline" to="/programs">
        Our programmes
      </Link>
    </PageShell>
  );
}
