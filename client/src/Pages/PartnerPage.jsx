import ContactContent from "../components/ContactContent";
import { involvement } from "../data/involvement";

export default function PartnerPage() {
  return <ContactContent content={involvement.partner} />;
}
