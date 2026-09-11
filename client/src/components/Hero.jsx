import { ArrowUpRight } from "lucide-react";
import HeroImage from "../assets/hero-transparent.png";
import EducationImage from "../assets/afriihero.webp";
import CommunityImage from "../assets/skills.webp";
import MentorshipImage from "../assets/sisters.webp";

export default function Hero() {
  return (
    <section id="home" data-navbar="light" className="hero-section">
      <div className="hero-backdrop" aria-hidden="true">
        <img src={EducationImage} alt="" />
        <img src={CommunityImage} alt="" />
        <img src={MentorshipImage} alt="" />
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span />
            Creating opportunities for communities
          </p>
          <h1>
            Africa-Rural<span>Interventions</span>
            <span>Initiative</span>
          </h1>
          <p className="hero-description">
            Restoring dignity and creating opportunities for Africa&apos;s most
            vulnerable communities.
          </p>
          <div className="hero-actions">
            <a href="#donate" className="button-primary">
              Support our work <ArrowUpRight size={18} />
            </a>
            <a href="#programs" className="button-outline">
              Explore our programs <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="hero-note">
            <span className="hero-note-line" />
            <div>
              <p>Community-led impact</p>
              <span>Education &bull; Empowerment &bull; Opportunity</span>
            </div>
          </div>
        </div>
        <div className="hero-visual hidden md:block">
          <span className="hero-dot hero-dot-first" />
          <span className="hero-dot hero-dot-second" />
          <img
            src={HeroImage}
            alt="Community education and empowerment across Africa"
            fetchPriority="high"
            width="640"
            height="640"
          />
          <p>Rooted in community. Inspired by possibility.</p>
        </div>
      </div>
    </section>
  );
}
