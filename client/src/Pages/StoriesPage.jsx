import PageShell from "../components/PageShell";
import StoryCards from "../components/StoryCards";

export default function StoriesPage() {
  return (
    <PageShell
      title="The community journal"
      eyebrow="Stories"
      intro="A space for the people, learning and ideas behind our work."
    >
      <h2>Summer School, year by year</h2>
      <p>
        The 2025 programme report, alongside draft archive entries for 2024 and
        2026.
      </p>
      <StoryCards />
    </PageShell>
  );
}
