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

// Details adapted from Africa-RII's published programme pages.
const verifiedPrograms = {
  "skills-acquisition": {
    source: "https://africarii.org/skill-acquisition/",
    paragraphs: [
      "Free vocational and digital workshops help young people and women develop practical skills. Training is informed by community needs and delivered with local professionals and partner organisations.",
      "In 2022, a three-day workshop introduced 35 participants to tie-dye and resin jewellery with the Women and Youths Arts Foundation. The 2023 programme reached 105 participants through digital skills, small-business learning, soap making, beads and Adire, working with the foundation and Master Art Classes.",
      "Africa-RII's published programme report records 140 participants across these two cohorts. Contact the team about current training and opportunities to support equipment or facilitation."
    ]
  },
  ajumobi: {
    title: "Àjùmòbí Scholarships",
    source: "https://africarii.org/ajumobi-scholarships/",
    summary: "Examination and undergraduate support, connected with mentorship and community responsibility.",
    paragraphs: [
      "Àjùmòbí Scholarships combine financial assistance with an emphasis on self-reliance, integrity and service. Support includes entrance-examination fees, tuition, learning materials and mentorship.",
      "The published programme history records seven awardees in the 2024 pilot and 37 in 2025. The initiative encourages scholars to contribute through volunteering, mentoring and leadership.",
      "Contact Africa-RII for current eligibility criteria, application dates and support arrangements."
    ]
  },
  "sisters-club": {
    source: "https://africarii.org/education_project/sisters-club/",
    paragraphs: [
      "Sisters' Club connects reading, discussion and writing with mentorship, leadership and digital access for girls and young women.",
      "Its approach combines learning beyond literacy, role-model relationships, access to technology, inclusive community participation and collective advocacy. Together, these activities create space to question inequalities and develop the confidence to participate in change."
    ]
  },
  lifeline: {
    source: "https://africarii.org/enterprise-data-collection-survey/",
    paragraphs: [
      "LifeLine combines female-health education with fundraising for urgent healthcare needs. Awareness sessions connect with Sisters' Club and offer young women a space to discuss health questions without stigma.",
      "Africa-RII's 2025 report describes an education session involving 12 girls and young women and financial assistance towards one woman's surgery. Enquiries about support and current activities should be directed to the team."
    ]
  },
  crc: {
    source: "https://africarii.org/community-centre/",
    paragraphs: [
      "A former family home in Ilora became a community learning space through local collaboration and fundraising. The centre opened in 2021 and developed from a library into a hub for study, mentorship and practical learning.",
      "Its activities include reading and book lending, vocational workshops and computer learning. In 2025, the centre added new books, Sisters' Club activities and a donated projector.",
      "Visit by arrangement at 5 First Baptist Church Cemetery Road, Oke-gege, Ilora, Oyo State."
    ]
  },
  "summer-school": {
    source: "https://africarii.org/education_project/skill-acquisition/",
    paragraphs: [
      "Africa-RII's free four-week Summer School combines classroom learning with meals and extracurricular opportunities. Local educators, volunteers and supporters help deliver the programme.",
      "Browse the 2025 report and the journal spaces for 2024 and 2026 below. The latter two await confirmed records."
    ]
  }
};
for (const category of categories) {
  for (const program of category.programs) Object.assign(program, verifiedPrograms[program.slug] || {});
}
export const team = [
  { name: "Oladapo O Ajayi", role: "Founder" },
  { name: "Ridwan Shittu", role: "IT / Documentation" },
  { name: "Simisola Wright Esq", role: "Secretary — Legal, Policy & HR" },
  { name: "Celine Okpani", role: "Human Resources" },
  { name: "Olamide Awoyemi", role: "Accounting" },
];
import summer2025Learning from "../assets/summer-2025-learning.jpg";
import summer2025Classroom from "../assets/summer-2025-classroom.jpg";
Object.assign(summerStories.find(s => s.year === "2025"), {
  title: "Learning across classrooms and communities",
  subtitle: "The fifth edition brought 190 learners together through academic study and new creative activities.",
  verified: true,
  source: "https://africarii.org/education_project/skill-acquisition/",
  image: summer2025Learning,
  secondImage: summer2025Classroom,
  sections: [
    { heading: "The fifth edition", text: "Africa-RII reports that its 2025 Summer School enrolled 190 students from different villages. The fifth edition continued the organisation's free summer-learning programme, widening the opportunities available to learners during the holiday period." },
    { heading: "Learning beyond textbooks", text: "The curriculum added graphic design, Monopoly and Ludo, film screenings and career counselling. These activities brought practical, creative and reflective experiences alongside academic study." },
    { heading: "What the report records", text: "The organisation reports an average 87% increase in knowledge of subjects taught. This figure is presented as Africa-RII's reported result; the source does not provide a detailed assessment methodology. The photographs on this page come from the 2025 section of its Summer School archive." },
  ],
});
