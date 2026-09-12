import PageShell from "../components/PageShell";
import ProgramsPreview from "../components/ProgramsPreview";

export default function ProgramsPage() {
  return (
    <PageShell
      title="Our programmes"
      eyebrow="What we do"
      intro="Five connected areas of work. One commitment to stronger communities."
    >
      <ProgramsPreview />
    </PageShell>
  );
}
