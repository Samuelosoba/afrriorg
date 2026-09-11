import ContactContent from "../components/ContactContent";
import { involvement } from "../data/involvement";

export default function DonatePage() {
  return <ContactContent content={involvement.donate} />;
}
