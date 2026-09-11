import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageShell from "../components/PageShell";
import Cta from "../components/Cta";
import NotFoundPage from "./NotFoundPage";
import { categories } from "../data/content";
import ProgramCards from "../components/ProgramCards";
import ProgrammeResources from "../components/ProgrammeResources";

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return <NotFoundPage />;
  return (
    <PageShell
      title={category.title}
      eyebrow="Our programmes"
      intro={category.intro}
      crumbs={[{ title: "Programmes", href: "/programs" }]}
    >
      <section className="page-split">
        <div>
          <h2>Opportunity starts here.</h2>
          <p>{category.description}</p>
          <Link className="text-link" to="/contact">
            Ask about this area of work <ArrowUpRight size={16} />
          </Link>
        </div>
        <img
          className="feature-photo"
          src={category.image}
          alt={category.title + " community activity"}
        />
      </section>
      <section className="page-section">
        <p className="page-eyebrow">Explore this area</p>
        <h2>Our programmes</h2>
        <ProgramCards category={category} />
      </section>
      <ProgrammeResources
        key={category.slug}
        slug={category.slug}
        title={category.title}
        hideEmpty
      />
      <Cta />
    </PageShell>
  );
}
