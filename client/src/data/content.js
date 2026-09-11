import education from "../assets/afriihero.webp";
import skills from "../assets/skills.webp";
import health from "../assets/health.webp";
import sisters from "../assets/sisters.webp";
import computers from "../assets/computer2.webp";
import learning from "../assets/computer.jpg";

export const categories = [
  { slug: "education", title: "Education", image: education,
    intro: "Opening pathways to learning, from school supplies to mentorship and opportunities beyond the classroom.",
    description: "Education is where Africa-RII began. Through Train A Child Today, the initiative responded to barriers facing rural students. Our wider education work includes summer learning, JAMB support, university tuition scholarships and career mentorship.",
    programs: [
      { slug: "tact", title: "Train A Child Today (TACT)", summary: "The starting point of our work: helping rural students access school supplies and educational opportunities.", paragraphs: ["Africa-RII began its journey in 2012 through Train A Child Today. Providing school supplies to rural students became the foundation for a wider commitment to education and community development.", "Our educational work recognises that access to learning depends on more than being enrolled in school. Materials, encouragement and opportunities to ask questions all contribute to a young person's ability to participate."] },
      { slug: "ajumobi", title: "Ajumobi", summary: "Explore Ajumobi, part of Africa-RII's education portfolio.", paragraphs: ["Ajumobi is listed within Africa-RII's education programmes. It sits alongside TACT and Summer School in our commitment to expanding educational opportunity.", "Contact our team for the current programme focus, eligibility and ways to take part. Detailed programme information will be added when confirmed."] },
      { slug: "summer-school", title: "Summer School", summary: "A space for learning, encouragement and connection during the school holidays.", paragraphs: ["Free summer schools are part of Africa-RII's education work, which expanded from 2019. They connect with our wider commitment to learning, practical skills and mentorship.", "Explore the annual journal below. The 2024, 2025 and 2026 entries are being prepared for the archive; each will bring together the year's story and photographs."] },
    ] },
  { slug: "community-resource-centre", title: "Community Resource Centre", image: skills,
    intro: "A community space where young people can learn, develop practical skills and find mentorship.",
    description: "Africa-RII established a Community Resource Centre in Ilora as a safe space for learning and personal development. The centre brings education, skills and mentorship closer to the community.",
    programs: [
      { slug: "crc", title: "CRC", summary: "Discover the Community Resource Centre in Ilora.", paragraphs: ["The Community Resource Centre is a safe space where young people can learn, build practical skills and receive mentorship.", "By bringing opportunities into the community, the centre supports Africa-RII's broader commitment to restoring dignity through education, skills and relationships. Contact the team for current activities and visiting arrangements."] },
      { slug: "skills-acquisition", title: "Skills Acquisition", summary: "Practical learning to build confidence and support livelihoods.", paragraphs: ["Skills acquisition is one of the ways Africa-RII supports youth development and economic empowerment. It complements classroom learning with a focus on practical capabilities.", "Contact our team to learn which training opportunities are currently available, how to participate and how to support a learning activity."] },
    ] },
  { slug: "community-health", title: "Community Health Awareness", image: health,
    intro: "Making health awareness part of community development.",
    description: "Our work includes community health awareness alongside education and empowerment. LifeLine is the programme within this area of our work.",
    programs: [{ slug: "lifeline", title: "LifeLine", summary: "Community health awareness through the LifeLine programme.", paragraphs: ["LifeLine sits within Africa-RII's community health awareness portfolio. It reflects a commitment to the wellbeing of the communities we work with.", "Get in touch for details of current activities and opportunities to collaborate. Programme schedules and participation information are shared by the team."] }] },
  { slug: "women-and-girls", title: "Gender Advocacy, Rights & Mentorship", image: sisters,
    intro: "Creating space for girls and young women to learn, connect and grow.",
    description: "Gender-focused programmes are part of Africa-RII's expanded community work. Sisters' Club sits within our focus on gender advocacy, rights and mentorship.",
    programs: [{ slug: "sisters-club", title: "Sisters' Club", summary: "Connection and mentorship within our work with women and girls.", paragraphs: ["Sisters' Club is part of Africa-RII's gender advocacy, rights and mentorship work. It connects with our belief that knowledge and encouragement can help people build confidence.", "Speak to the team about participation, mentorship and opportunities to support this programme."] }] },
  { slug: "innovation", title: "Innovation & Social Enterprise", image: computers,
    intro: "Connecting practical learning with digital opportunity.",
    description: "Innovation and social enterprise form one of Africa-RII's five programme areas. Computer & IT is the programme within this area.",
    programs: [{ slug: "computer-and-it", title: "Computer & IT", summary: "Digital learning as part of practical skills development.", paragraphs: ["Computer & IT connects with Africa-RII's focus on practical skills and youth development. Digital learning is one pathway through which young people can explore new possibilities.", "Contact the team to find out about current learning opportunities or discuss support for computer and IT activities."] }] },
];
export const programUrl = (category, program) => `/programs/${category.slug}/${program.slug}`;
export const summerSchoolUrl = "/programs/education/summer-school";
export const summerStories = [
 { year: "2024", title: "Making room for learning", subtitle: "Education, encouragement and the value of a shared learning space.", image: education, secondImage: sisters,
   sections: [
    { heading: "Learning belongs in the community", text: "A school holiday can be a chance to pause, explore a question and return to learning with fresh curiosity. Africa-RII's commitment to education extends beyond school supplies to include summer schools, mentorship and other forms of educational support. This journal entry introduces the themes behind that work while the 2024 record is being assembled." },
    { heading: "More than a lesson", text: "The value of a learning space includes the relationships it makes possible. A young person needs room to ask for help, share an idea and practise something unfamiliar. These are reasons to invest in community-based education, and a useful lens for the Summer School archive." },
    { heading: "The 2024 record", text: "Confirmed dates, activities, participant reflections and outcomes for this edition have not yet been supplied. This draft does not report them as completed events. The final story will replace this note with a verified account and photographs attributed to the 2024 programme." },
   ] },
 { year: "2025", title: "Confidence grows through connection", subtitle: "Reflecting on mentorship, participation and learning together.", image: sisters, secondImage: learning,
   sections: [
    { heading: "A place to ask questions", text: "Learning and confidence often develop together. Encouragement can help a learner attempt a difficult task, while a conversation can open up a new way of thinking about the future. Africa-RII's wider work combines education with mentorship and practical skills. Those connections frame this draft for the 2025 Summer School journal." },
    { heading: "Connecting learning and possibility", text: "The Community Resource Centre in Ilora is part of Africa-RII's commitment to making opportunities accessible within the community. A meaningful education story should show what learners worked on, what support they received and how their own voices shaped the experience." },
    { heading: "The 2025 record", text: "The edition's dates, lesson details, participant accounts and results are awaiting confirmation. No attendance figures or personal testimonials are claimed in this draft. Year-specific photographs and a verified narrative will complete the archive entry." },
   ] },
 { year: "2026", title: "Keeping opportunity within reach", subtitle: "A journal space for the next chapter of summer learning.", image: learning, secondImage: education,
   sections: [
    { heading: "Why keep a summer learning journal?", text: "An annual journal can help a community see its work over time. It gives space to the learning itself, the people who support it and the questions worth carrying into another year. This draft reserves that space for Africa-RII's 2026 Summer School story." },
    { heading: "Listening as well as documenting", text: "A useful record includes more than a list of activities. It should explain the purpose of the learning, give context to photographs and include participants' perspectives with their permission. That approach reflects Africa-RII's wider emphasis on community-led solutions and collaboration." },
    { heading: "The 2026 record", text: "The status, dates and activities of the 2026 edition have not been confirmed for this website. This page is neither an event announcement nor a report that the programme has taken place. The team can add a confirmed account and correctly attributed images when they are available." },
   ] },
];
export const aboutParagraphs = [
 "Africa Rural Interventions Initiative (Africa-RII) began its journey in 2012 through Train A Child Today (TACT), responding to the educational and socio-economic challenges facing underserved communities in Nigeria. What started with providing school supplies to rural students has grown into a broader commitment to education, empowerment and community development.",
 "Guided by the belief that dignity can be restored through education, skills and mentorship, Africa-RII established a Community Resource Centre in Ilora — a safe space where young people can learn, build practical skills and receive mentorship. Since 2019, our work has expanded to include free summer schools, JAMB support, university tuition scholarships, career mentorship and gender-focused programmes.",
 "Today, Africa-RII works across education, youth development, skills acquisition, health awareness and economic empowerment. By working directly with communities, we help individuals gain the knowledge, confidence and opportunities they need to build resilient livelihoods and create lasting change.",
];
