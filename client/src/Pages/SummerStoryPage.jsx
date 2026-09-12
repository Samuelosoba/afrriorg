import { useProgrammes } from "../utils/useProgrammes";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageShell from "../components/PageShell";
import StoryCards from "../components/StoryCards";
import PhotoCollage from "../components/PhotoCollage";
import ProgrammeResources from "../components/ProgrammeResources";
import NotFoundPage from "./NotFoundPage";
import { summerSchoolUrl } from "../data/content";

export default function SummerStoryPage() {
  const { stories: summerStories } = useProgrammes();
  const { year } = useParams();
  const story = summerStories.find((s) => s.year === year);
  if (!story) return <NotFoundPage />;
  const photos = story.photos?.length
    ? story.photos
    : [
        {
          src: story.image,
          alt: story.verified
            ? "Summer School " + year + " learning activities"
            : "Africa-RII community archive; edition unverified",
        },
        {
          src: story.secondImage,
          alt: story.verified
            ? "Summer School " + year + " classroom"
            : "Africa-RII community archive; date unverified",
        },
      ];
  return (
    <PageShell
      title={"Summer School " + year + ": " + story.title}
      eyebrow="The summer journal"
      intro={story.subtitle}
      crumbs={[
        { title: "Programmes", href: "/programs" },
        { title: "Summer School", href: summerSchoolUrl },
      ]}
    >
      <article className="journal summer-journal">
        <div className="journal-meta">
          <span className="draft-badge">
            {story.verified
              ? "Programme report"
              : "Draft / awaiting confirmed details"}
          </span>
          <span>Summer School / {year}</span>
          <span>
            {Math.max(
              1,
              Math.ceil(
                story.sections.reduce(
                  (n, s) => n + s.text.split(" ").length,
                  0,
                ) / 200,
              ),
            )}{" "}
            minute read
          </span>
        </div>
        {!story.verified && (
          <p className="editorial-note">
            This edition awaits a confirmed account. The text below is a draft,
            and the archive photos have not been attributed to this year.
          </p>
        )}
        {story.metrics?.length > 0 && (
          <dl className="story-metrics">
            {story.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <nav className="journal-chapters" aria-label="In this story">
          {story.sections.map((section, index) => (
            <a key={section.heading} href={"#chapter-" + index}>
              {section.heading}
            </a>
          ))}
          <a href="#edition-resources">Videos &amp; reports</a>
        </nav>
        <div className="summer-story-layout">
          <div className="article-prose">
            {story.sections.map((section, index) => (
              <section id={"chapter-" + index} key={section.heading}>
                <p className="page-eyebrow">0{index + 1} / The story</p>
                <h2>{section.heading}</h2>
                <p>{section.text}</p>
              </section>
            ))}
            {story.source && (
              <a
                className="source-link"
                href={story.source}
                target="_blank"
                rel="noreferrer"
              >
                Source: Africa-RII Summer School report
              </a>
            )}
            <div className="article-end">
              <h2>Help tell the story</h2>
              <p>
                Have a confirmed account or photographs from this edition?
                Contribute to the annual journal.
              </p>
              <a
                className="text-link"
                href={
                  "mailto:hello@africarii.org?subject=" +
                  encodeURIComponent("Summer School " + year + " story")
                }
              >
                Contact the team <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <aside
            className="summer-photo-panel"
            aria-label="Summer School photo journal"
          >
            <p className="page-eyebrow">In pictures / {year}</p>
            <h2>Moments of connection</h2>
            <PhotoCollage
              photos={photos.filter((photo) => photo.src)}
              caption={
                story.caption ||
                (story.verified
                  ? "Photographs from the Africa-RII " +
                    year +
                    " Summer School archive."
                  : "Community archive photographs shown for context; edition unverified.")
              }
            />
          </aside>
        </div>
        <div id="edition-resources">
          <ProgrammeResources
            key={year}
            resource={story}
            slug={"summer-school-" + year}
            title={"Summer School " + year}
          />
        </div>
        <Link className="text-link" to={summerSchoolUrl}>
          Explore Summer School <ArrowUpRight size={16} />
        </Link>
      </article>
      <section className="page-section">
        <p className="page-eyebrow">Keep exploring</p>
        <h2>More from the summer journal</h2>
        <StoryCards exclude={year} />
      </section>
    </PageShell>
  );
}
