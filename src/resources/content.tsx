import type { About, Person, Social, SectionConfig, Popup } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

// =============================================================================
// PERSON & SOCIAL
// =============================================================================
const person: Person = {
  firstName: "Logan",
  lastName: "Waller",
  name: "Logan Waller",
  role: "Technology Student",
  avatar: "/images/profile.jpeg",
  email: "logan@loganwaller.dev",
  location: "Europe/London",
  languages: [],
  github: "Mystik01"
};


const social: Social = [
  { name: "GitHub", icon: "github", link: "https://github.com/Mystik01" },
  { name: "LinkedIn", icon: "linkedin", link: "https://www.linkedin.com/in/logan-waller/" },
  { name: "Email", icon: "email", link: `mailto:${person.email}` },
  { name: "Credly", icon: "credly", link: "https://www.credly.com/users/logan-waller" },
];

// =============================================================================
// POPUP NOTIFICATION
// =============================================================================
const popup: Popup = {
  display: true,
  title: "Under Development",
  description: "This portfolio is currently under development. Some features may not be fully functional yet (projects section) and there might be some bugs. Thanks for your patience!",
};

// =============================================================================
// HOME & ABOUT (legacy compatibility objects)
// =============================================================================

const about: About = {
  label: "About",
  title: "",
  description: "",
  tableOfContent: { display: true, subItems: false },
  avatar: { display: true },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Hello, I'm Logan, a student at Farnborough College of Technology studying T Level Digital Production, Design and Development. 
        I specialize in software engineering and web development, with a growing interest in cybersecurity. 
        As a self-taught developer, I'm passionate about building full-stack applications and continuously expanding my technical skillset.
      </>
    ),
    },
    work: {
    display: true,
    title: "Work Experience",
    description: "I don't really have any actual work experience related to software engineering, but I work two part-time jobs.",
    experiences: [
      {
      company: "Everyone Active",
      timeframe: "2023 - Present (Part-Time)",
      role: "Lifeguard",
      description: (
        <>
        As a lifeguard, I ensure the safety of all pool users by monitoring activities, enforcing safety rules, and responding to emergencies promptly and effectively.
        {'\n'}As part of of being a lifeguard I had to complete the{' '}
        <a href="https://www.rlss.org.uk/national-pool-lifeguard-qualification" target="_blank" rel="noopener noreferrer">
          National Pool Lifeguarding Qualification (NPLQ)
        </a>.
        </>
      ),
      },
      {
      company: "Bp",
      timeframe: "2023 - Present (Part-Time)",
      role: "Retail Assistant",
      description: 'At Bp, I help stock the store, manage fuel authorizations, and provide excellent customer service to ensure a positive experience for all customers.',
      },
    ],
    },
    studies: {
    display: true,
    title: "Studies",
    institutions: [
      { name: "Farnborough College of Technology", timeframe: "Sept. 2024 - July 2026", description: <>T Level Digital Production, Design and Developments</> },
      { name: "HSDC Alton", timeframe: "Sept. 2023 - July 2024", description: <>Level 2 Cambridge Technical Diploma in IT</> },
    ],
  },
  technical: {
    display: true,
    title: "Skills",
    skills: [
      {
        tags: [
          { name: "Python", icon: "python" },
          { name: "JavaScript", icon: "javascript" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Supabase", icon: "supabase" },
          { name: "TypeScript", icon: "typescript" },
          { name: "SQL", icon: "sql"},
          { name: "Git", icon: "git" },
          { name: "React", icon: "react" }
        ],
      },
    ],
  },
};

// =============================================================================
// SECTIONS — Primary content structure (drives navbar & page rendering)
// =============================================================================
// Add a new section object here and it will automatically:
//  1. Create a navbar item with the specified icon
//  2. Render a page heading and content
//  3. Be observed for active-state highlighting
//
// Fields:
//  - id: element id for scroll target
//  - label: text shown in navbar
//  - title: optional heading on the page
//  - icon: icon name from design system
//  - type: renderer type (intro|technical|studies|work|projects) or custom
//  - display: set false to hide
//  - items: optional array of strings for simple self-contained content
//  - images: optional array of image objects to display in a gallery

const sections: SectionConfig[] = [
  {
    id: "intro",
    label: "About",
    type: "intro",
    display: false, // Hidden from navbar, but still renders on page via v4 component
  },
  {
    id: "skills",
    label: "Skills",
    title: about.technical.title,
    icon: "computer",
    type: "technical",
    display: about.technical.display,
  },
  {
    id: "studies",
    label: "Studies",
    title: about.studies.title,
    icon: "book",
    type: "studies",
    display: about.studies.display,
  },
  {
    id: "projects",
    label: "Projects",
    title: "Projects",
    icon: "grid",
    type: "projects",
    display: true,
    links: [
      {
        url: "https://github.com/Mystik01/magic-portfolio",
        title: "This portfolio website",
        description: "A fork of Magic portfolio template, heavily modified though using Once UI. This is my first React project.",
      },
      {
        url: "https://github.com/Mystik01/FlappyBird",
        title: "Flappy Bird Clone",
        description: "My version of Flappy Bird whilst I was leaning Javascript, html and css.",
      },
      {
        url: "https://github.com/divyanshu-in/soundsharp-musicplayer-tkinter",
        title: "Music Player built with Tkinter",
        description: "A music player application built with Python's Tkinter library.",
      },
    ],
  },
  {
    id: "work",
    label: "Work",
    title: about.work.title,
    icon: "briefcase",
    type: "work",
    display: about.work.display,
  },
  
  // Example: Add a new section here
  // {
  //   id: "blog",
  //   label: "Blog",
  //   title: "Writing",
  //   icon: "rss",
  //   type: "projects",
  //   display: true,
  //   items: ["Post A", "Post B"],
  //   images: [{ src: "/images/og/home.jpg", width: 16, height: 9 }],
  // },
];

export { person, social, about, sections, popup };
