import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Users, BookOpen, HeartHandshake } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { categories, programUrl, summerSchoolUrl, summerStories, aboutParagraphs } from "../data/content";
import aboutImage from "../assets/about.png";

export function PageShell({ title, eyebrow, intro, children, crumbs = [] }) {
  return (
    <div className="inner-site">
      <Navbar />
      <main className="content-page">
        <div className="page-intro">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {crumbs.map(c => <span key={c.href}> / <Link to={c.href}>{c.title}</Link></span>)}
            <span> / {title}</span>
          </nav>
          <p className="page-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {intro && <p className="page-lead">{intro}</p>}
        </div>
        <div className="page-body">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
function Cta({ title = "Make opportunity possible.", text = "Give your time, share your skills or start a conversation about working together." }) {
  return <section className="page-cta"><div><h2>{title}</h2><p>{text}</p></div><Link className="button-primary" to="/get-involved">Get involved <ArrowUpRight size={18}/></Link></section>;
}
function ProgramCards({ category }) {
  return <div className="editorial-grid">{category.programs.map(program =>
    <Link className="editorial-card text-card" key={program.slug} to={programUrl(category, program)}>
      <BookOpen size={24}/><h3>{program.title}</h3><p>{program.summary}</p><span className="card-link">Explore programme <ArrowUpRight size={16}/></span>
    </Link>)}</div>;
}
export function ProgramsPage() {
  return <PageShell title="Our programmes" eyebrow="What we do" intro="Five connected areas of work. One commitment to stronger communities.">
    <div className="editorial-grid">{categories.map((c, index) =>
      <Link key={c.slug} to={"/programs/" + c.slug} className="editorial-card">
        <img src={c.image} alt={c.title + " — Africa-RII community photograph"} loading="lazy"/>
        <div className="card-content"><p className="page-eyebrow">0{index + 1} / Our work</p><h2>{c.title}</h2><p>{c.intro}</p><span className="card-link">{c.programs.length} {c.programs.length === 1 ? "programme" : "programmes"} <ArrowUpRight size={16}/></span></div>
      </Link>)}</div><Cta/>
  </PageShell>;
}
export function CategoryPage() {
  const { categorySlug } = useParams();
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return <NotFoundPage/>;
  return <PageShell title={category.title} eyebrow="Our programmes" intro={category.intro} crumbs={[{title:"Programmes",href:"/programs"}]}>
    <section className="page-split"><img className="feature-photo" src={category.image} alt={category.title + " community activity"}/><div><h2>Opportunity starts here.</h2><p>{category.description}</p><Link className="text-link" to="/contact">Ask about this area of work <ArrowUpRight size={16}/></Link></div></section>
    <section className="page-section"><p className="page-eyebrow">Explore this area</p><h2>Our programmes</h2><ProgramCards category={category}/></section><Cta/>
  </PageShell>;
}
export function ProgramPage() {
  const { categorySlug, programSlug } = useParams();
  const category = categories.find(c => c.slug === categorySlug);
  const program = category?.programs.find(p => p.slug === programSlug);
  if (!program) return <NotFoundPage/>;
  return <PageShell title={program.title} eyebrow={category.title} intro={program.summary} crumbs={[{title:"Programmes",href:"/programs"},{title:category.title,href:"/programs/"+category.slug}]}>
    <section className="page-split"><img className="feature-photo" src={category.image} alt={category.title + " — community photograph"}/><div><h2>About the programme</h2>{program.paragraphs.map(p=><p key={p}>{p}</p>)}<Link className="button-outline" to="/contact">Enquire about participation <ArrowUpRight size={16}/></Link></div></section>
    {program.slug === "summer-school" && <section className="page-section"><p className="page-eyebrow">The summer journal</p><h2>Every year has a story.</h2><p>Browse the annual story drafts. Dates, outcomes and year-specific photographs will be added after confirmation.</p><StoryCards/></section>}
    <Cta/>
  </PageShell>;
}
export function StoryCards({ exclude }) {
  return <div className="editorial-grid">{summerStories.filter(s=>s.year!==exclude).map(s=>
    <Link className="editorial-card" key={s.year} to={summerSchoolUrl+"/"+s.year}>
      <img src={s.image} alt="Africa-RII archive photograph; year not verified" loading="lazy"/>
      <div className="card-content"><p className="page-eyebrow">Summer School / {s.year}</p><span className="draft-badge">Draft story</span><h3>{s.title}</h3><p>{s.subtitle}</p><span className="card-link">Read the journal <ArrowUpRight size={16}/></span></div>
    </Link>)}</div>;
}
export function SummerStoryPage() {
  const { year } = useParams();
  const story = summerStories.find(s=>s.year===year);
  if (!story) return <NotFoundPage/>;
  return <PageShell title={"Summer School "+year+": "+story.title} eyebrow="The summer journal" intro={story.subtitle} crumbs={[{title:"Programmes",href:"/programs"},{title:"Summer School",href:summerSchoolUrl}]}>
    <article className="journal">
      <div className="journal-meta"><span className="draft-badge">Draft / awaiting year-specific details</span><span>Summer School · {year}</span><span>3 minute read</span></div>
      <p className="editorial-note">This is a draft article, not a verified event report. Photos are from the existing Africa-RII image collection and have not been attributed to this edition.</p>
      <figure><img src={story.image} alt="Community learning from the Africa-RII image collection"/><figcaption>From the Africa-RII image collection. Photograph date and Summer School edition unverified.</figcaption></figure>
      <div className="journal-layout"><aside><p className="page-eyebrow">In this story</p>{story.sections.map((s,i)=><a key={s.heading} href={"#chapter-"+i}>{s.heading}</a>)}<Link to={summerSchoolUrl}>All summer journals</Link></aside>
      <div className="article-prose">{story.sections.map((section,index)=><section id={"chapter-"+index} key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p>{index===1 && <figure><img src={story.secondImage} alt="Additional Africa-RII community archive photograph" loading="lazy"/><figcaption>Community archive image, shown for context rather than as evidence of the {year} edition.</figcaption></figure>}</section>)}
      <div className="article-end"><h2>Help tell the story</h2><p>Have a confirmed account or photographs from this edition? Contact Africa-RII to contribute to the annual journal.</p><a className="text-link" href={"mailto:info@africarii.org?subject="+encodeURIComponent("Summer School "+year+" story")}>Contact the team <ArrowUpRight size={16}/></a></div></div></div>
    </article><section className="page-section"><h2>More from the summer journal</h2><StoryCards exclude={year}/></section>
  </PageShell>;
}
export function AboutPage() {
  return <PageShell title="Who we are" eyebrow="About us" intro="Rooted in community. Committed to dignity, learning and opportunity.">
    <section className="page-split"><img className="feature-photo" src={aboutImage} alt="Africa-RII community collage"/><div><p className="page-eyebrow">Our story</p><h2>Small beginnings. A lasting commitment.</h2>{aboutParagraphs.map(p=><p key={p}>{p}</p>)}</div></section>
    <section className="page-section editorial-grid">
      <div className="editorial-card text-card"><BookOpen/><h2>Our purpose</h2><p>Restoring dignity and creating opportunities for Africa's most vulnerable communities through education, skills and mentorship.</p></div>
      <div className="editorial-card text-card"><HeartHandshake/><h2>Our commitment</h2><p>Building a lasting legacy of intergenerational impact through human capital development in disadvantaged communities.</p></div>
      <div className="editorial-card text-card"><Users/><h2>Our approach</h2><p>Inclusive, community-led solutions shaped through research, engagement and collaboration, with transparency and innovation at the heart of our work.</p></div>
    </section>
    <section className="page-section"><p className="page-eyebrow">Our journey</p><h2>Growing alongside our communities</h2><ol className="history-list"><li><strong>2012</strong><div><h3>Train A Child Today</h3><p>Responding to educational challenges by providing school supplies to rural students.</p></div></li><li><strong>2019 onwards</strong><div><h3>A broader range of opportunities</h3><p>Our work expanded to include free summer schools, JAMB support, tuition scholarships, career mentorship and gender-focused programmes.</p></div></li><li><strong>Our work today</strong><div><h3>Five connected programme areas</h3><p>Education, community resources, health awareness, gender advocacy and innovation.</p><Link to="/programs" className="text-link">Explore our programmes <ArrowUpRight size={16}/></Link></div></li></ol></section>
    <section id="team" className="page-section team-section"><p className="page-eyebrow">The people behind the work</p><h2>Our team</h2><p className="page-lead">Our interdisciplinary team is united by transparency, innovation and a shared passion for sustainable social impact.</p><div className="team-placeholder"><Users size={40}/><div><h3>Meet the people of Africa-RII</h3><p>Team biographies and portraits will be added here once confirmed. For team enquiries or opportunities to contribute, please contact us.</p><Link to="/contact" className="text-link">Connect with the team <ArrowUpRight size={16}/></Link></div></div></section>
    <section className="page-section"><h2>Get to know Africa-RII</h2><details><summary>Where did Africa-RII begin?</summary><p>Our journey began in 2012 through Train A Child Today, supporting rural students in Nigeria.</p></details><details><summary>Where is the Community Resource Centre?</summary><p>The centre is in Ilora. Please contact the team for visiting arrangements and current activities.</p></details><details><summary>How can I get involved?</summary><p>You can explore giving, volunteering and partnership opportunities on our <Link to="/get-involved">Get involved page</Link>.</p></details></section><Cta/>
  </PageShell>;
}
export function ImpactPage() {
  return <PageShell title="Our impact" eyebrow="Community-led change" intro="Education, empowerment and opportunity are at the heart of our work.">
    <section className="page-split"><img className="feature-photo" src={categories[0].image} alt="Africa-RII education activity"/><div><h2>A commitment that began in 2012</h2><p>From providing supplies to rural students to developing a wider range of community programmes, Africa-RII's work has grown through a long-term commitment to people.</p><p>Our focus spans access to learning, practical skills, mentorship, health awareness and economic empowerment.</p><Link to="/about" className="text-link">Read our journey <ArrowUpRight size={16}/></Link></div></section>
    <section className="page-section"><h2>Where our work makes a difference</h2><div className="editorial-grid">{categories.map(c=><Link className="editorial-card text-card" key={c.slug} to={"/programs/"+c.slug}><h3>{c.title}</h3><p>{c.intro}</p><span className="card-link">Explore this work <ArrowUpRight size={16}/></span></Link>)}</div></section><section className="page-section"><h2>Stories from our work</h2><p>The annual Summer School journal is being prepared. Read the draft stories below.</p><StoryCards/></section><Cta/>
  </PageShell>;
}
const involvement = {
 donate: {title:"Support our work",eyebrow:"Donate",intro:"Help create access to education, practical skills and community development.",heading:"Start with a conversation",text:"Contact Africa-RII to discuss a contribution, the programme you would like to support and the current giving arrangements.",subject:"Donation enquiry"},
 volunteer: {title:"Share your time and skills",eyebrow:"Volunteer",intro:"Contribute your knowledge, energy and experience to community-led work.",heading:"Tell us how you would like to help",text:"Introduce yourself, share your skills and let us know your availability. The team can discuss current opportunities and the next steps with you.",subject:"Volunteering enquiry"},
 partner: {title:"Build opportunity together",eyebrow:"Partner with us",intro:"Work with Africa-RII on education, empowerment and community development.",heading:"Explore a partnership",text:"Tell us about your organisation, the communities or programme areas you are interested in and the support you can offer.",subject:"Partnership enquiry"},
 contact: {title:"Let's start a conversation",eyebrow:"Contact us",intro:"Ask about our programmes, participation or ways to support the work.",heading:"Speak to the Africa-RII team",text:"For programme information, team enquiries and ways to get involved, email us. For visits to the Community Resource Centre in Ilora, please arrange details with the team first.",subject:"Website enquiry"},
};
export function GetInvolvedPage() {
  return <PageShell title="Be part of what happens next" eyebrow="Get involved" intro="Give, volunteer or partner with us to create stronger opportunities for communities."><div className="editorial-grid">{["donate","volunteer","partner"].map(key=><Link key={key} className="editorial-card text-card" to={"/"+key}><HeartHandshake/><p className="page-eyebrow">{involvement[key].eyebrow}</p><h2>{involvement[key].title}</h2><p>{involvement[key].intro}</p><span className="card-link">Find out more <ArrowUpRight size={16}/></span></Link>)}</div><Cta title="Not sure where to begin?" text="Email info@africarii.org to discuss how you would like to contribute."/><p><Link className="text-link" to="/contact">Contact the team <ArrowUpRight size={16}/></Link></p></PageShell>;
}
export function ContactPage({ kind = "contact" }) {
  const content=involvement[kind];
  return <PageShell title={content.title} eyebrow={content.eyebrow} intro={content.intro}><section className="page-split"><div><h2>{content.heading}</h2><p>{content.text}</p><a className="button-primary" href={"mailto:info@africarii.org?subject="+encodeURIComponent(content.subject)}>Email Africa-RII <ArrowUpRight size={18}/></a><p className="contact-address">info@africarii.org</p></div><div className="editorial-card text-card"><p className="page-eyebrow">A useful starting point</p><h3>Include in your message</h3><ul><li>Your name and preferred contact details</li><li>The programme or opportunity that interests you</li><li>Your questions, availability or proposed contribution</li></ul><p>The button opens your email application so you can review your message before sending.</p></div></section></PageShell>;
}
export function StoriesPage() {
  return <PageShell title="The community journal" eyebrow="Stories" intro="A space for the people, learning and ideas behind our work."><h2>Summer School, year by year</h2><p>Draft annual stories awaiting confirmed programme details and photographs.</p><StoryCards/></PageShell>;
}
export function NotFoundPage() {
  return <PageShell title="Page not found" eyebrow="404" intro="That page isn't available. Explore our programmes or return home."><Link className="button-primary" to="/">Back to home</Link><Link className="button-outline" to="/programs">Our programmes</Link></PageShell>;
}
