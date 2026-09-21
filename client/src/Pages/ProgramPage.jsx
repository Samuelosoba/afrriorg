import { useProgrammes } from "../utils/useProgrammes";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageShell from "../components/PageShell";
import Cta from "../components/Cta";
import StoryCards from "../components/StoryCards";
import NotFoundPage from "./NotFoundPage";
import ProgrammeResources from "../components/ProgrammeResources";
import ProgrammeArticle from "../components/ProgrammeArticle";

export default function ProgramPage() {
  const { categories } = useProgrammes();
  const { categorySlug, programSlug } = useParams();
  const category = categories.find((c) => c.slug === categorySlug);
  const program = category?.programs.find((p) => p.slug === programSlug);
  if (!program) return <NotFoundPage />;
  return (
    <PageShell
      title={program.title}
      eyebrow={category.title}
      intro={program.summary}
      crumbs={[
        { title: "Programmes", href: "/programs" },
        { title: category.title, href: "/programs/" + category.slug },
      ]}
    >
      <section className="page-split">
        <div>
          <h2>{program.slug === "crc" ? "A Story of Hope, Learning, and Possibility" : "About the programme"}</h2>
          {program.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {program.source && (
            <p>
              <a
                href={program.source}
                target="_blank"
                rel="noreferrer"
                className="source-link"
              >
                Read the original Africa-RII programme report
              </a>
            </p>
          )}
          <Link className="button-outline" to="/contact">
            Enquire about participation <ArrowUpRight size={16} />
          </Link>
        </div>
        <img
          className="feature-photo"
          src={program.image || category.image}
          alt={program.title + " - community photograph"}
        />
      </section>
      <ProgrammeArticle key={program.slug} program={program} />
      <ProgrammeResources
        resource={program}
        key={program.slug}
        slug={program.slug}
        title={program.title}
      />
      {program.slug === "summer-school" && (
        <section className="page-section">
          <p className="page-eyebrow">The summer journal</p>
          <h2>Every year has a story.</h2>
          <p>
            Explore annual Summer School stories, photographs, videos and
            reports.
          </p>
          <StoryCards />
        </section>
      )}
      <Cta />
    </PageShell>
  );
}
