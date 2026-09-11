import ContactContent from "../components/ContactContent";
import { involvement } from "../data/involvement";

export default function ContactPage() {
  return <ContactContent content={involvement.contact} />;
}
