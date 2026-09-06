import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ImpactStats from "../components/ImpactStats";
import AboutPreview from "../components/AboutPreview";
import ProgramsPreview from "../components/ProgramsPreview";
import FeaturedStory from "../components/FeaturedStory";
import ResourceCentre from "../components/ResourceCentre";
import ActionGallery from "../components/ActionGallery";
import Footer from "../components/Footer";
import GetInvolved from "../components/GetInvolved";
import PartnersSection from "../components/PartnerSection";
import ValuesSection from "../components/ValueSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      <AboutPreview />
      <ValuesSection />
      <ProgramsPreview />
      <ImpactStats />
      {/* <FeaturedStory /> */}
{/*      
      <ActionGallery /> */}

      {/* <PartnersSection /> */}
      <GetInvolved />
      <Footer />
    </main>
  );
}
