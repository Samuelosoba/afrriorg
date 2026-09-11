import ContactContent from "../components/ContactContent";
import { involvement } from "../data/involvement";

export default function VolunteerPage() {
  return <ContactContent content={involvement.volunteer} />;
}
