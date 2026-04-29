export const profile = {
  name: "Anson Woo",
  headline: "Medical Biosciences @ Imperial · Founding Engineer @ EdU",
  location: "London, UK · Hong Kong",
  email: "anson9m23@gmail.com",
  github: "https://github.com/chocoliticekreem",
  linkedin: "https://www.linkedin.com/in/ansonwoo",
  bio: "Year 2 Medical Biosciences student at Imperial, self-teaching AI/ML. Founding Engineer at EdU, building AI automations at Speed NetworkNow and CodeWords. Year 3 placement lined up at NeuroX working on ML for neuroscience.",
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
};

export const experience: Experience[] = [
  {
    company: "Encode Club",
    role: "Scholar",
    period: "Apr 2026 — Present",
    location: "London, UK",
    current: true,
  },
  {
    company: "Imperial Entrepreneurs",
    role: "Secretary",
    period: "Apr 2026 — Present",
    location: "London, UK",
    current: true,
  },
  {
    company: "GDG Academy",
    role: "Spring 2026 Cohort",
    period: "Mar 2026 — Present",
    location: "London, UK",
    current: true,
  },
  {
    company: "CodeWords",
    role: "Builder in Residence",
    period: "Mar 2026 — Present",
    location: "London, UK",
    current: true,
  },
  {
    company: "EdU CareerTech",
    role: "Founding Engineer",
    period: "Mar 2026 — Present",
    location: "London, UK",
    current: true,
  },
  {
    company: "Speed NetworkNow",
    role: "AI Automation Intern",
    period: "Jan 2026 — Present",
    location: "London, UK",
    current: true,
  },
  {
    company: "L'Oréal",
    role: "Spring Intern",
    period: "Apr 2026",
    location: "London, UK",
    current: false,
  },
  {
    company: "Imperial College Chinese Society",
    role: "President",
    period: "May 2025 — Present",
    location: "London, UK",
    current: true,
  },
  {
    company: "Imperial College London",
    role: "Medical Biosciences (BSc)",
    period: "Sep 2024 — 2027",
    location: "London, UK",
    current: true,
  },
];

export type Project = {
  name: string;
  description: string;
  tech: string[];
  url: string;
  context?: string;
};

export const projects: Project[] = [
  {
    name: "Tenkai",
    context: "Unicorn Mafia · Americas Hackathon 2026",
    description:
      "AR as an OS layer for the physical world. Point your phone at any object — a Red Bull, your backpack, a club entrance — and get a floating Liquid Glass UI anchored to it in 3D space. Cards surface your data in context: calories, packing checklists, venue lineups, calendar. A Gemini Live voice agent sees what you see and responds in real time. Went to a club with the product and got 8 signups on the spot.",
    tech: ["Swift", "ARKit", "RealityKit", "FastAPI", "Gemini", "LanceDB", "SSE"],
    url: "https://github.com/arvin-shafiei/americas-um-2026",
  },
  {
    name: "Stream Mind",
    context: "1st place Gradium · 2nd place Google DeepMind · 3rd overall at {Tech:Europe} London AI Hackathon",
    description:
      "Live-streaming AI copilot for creators. Built voice-controlled clipping, instant clip retrieval, YouTube upload flows, voice-interactive chat polls, live chat sentiment analysis, and chatbot tooling for stream communities, with more features on the way.",
    tech: ["Next.js", "Voice AI", "Live Streaming", "YouTube API", "Sentiment Analysis"],
    url: "https://github.com/Stream-Mind/Stream-Mind",
  },
  {
    name: "WhyMessage",
    context: "Photon Residency application",
    description:
      "Relationship CRM sitting inside iMessage as an agent. Builds profiles for every contact with stats, then tells you who to hit up for any scenario — hangout, intros, advice, questions to ask. Built on Photon SDK.",
    tech: ["TypeScript", "Photon SDK", "iMessage"],
    url: "https://github.com/chocoliticekreem/WhyMessage",
  },
  {
    name: "MusicWorld",
    context: "SotonHack '25",
    description:
      "Minecraft mod where the world generates from your Spotify listening. Genre shifts change biomes, landscape, and weather in real time. Lyrics stream into Minecraft chat — rewritten with Minecraft puns.",
    tech: ["Java", "Minecraft Forge", "Spotify API"],
    url: "https://github.com/chocoliticekreem/musicworld",
  },
  {
    name: "WhyCombinator",
    context: "UCL Build AI Festival",
    description:
      "Pitch evaluator that scores content + presentation (gestures, emotion). Multi-agent personas debate across rounds, produce a verdict, then auto-generate a Prolific survey to pitch real humans and validate the AI's take.",
    tech: ["Python", "Multi-agent", "Prolific API"],
    url: "https://github.com/chocoliticekreem/WhyCombinator",
  },
  {
    name: "Biomed RAG Assistant",
    description:
      "RAG system that ingests your lab reports and research papers, then answers research questions with direct retrieval from your own context.",
    tech: ["Python", "RAG", "Vector DB"],
    url: "https://github.com/chocoliticekreem/Biomed-RAG-assistant",
  },
  {
    name: "Central Imaging Control",
    context: "Imperial HealthHack",
    description:
      "Hospital imaging traffic solution — a central control layer that routes and triages scan requests across departments to cut queue times.",
    tech: ["Python", "Healthcare"],
    url: "https://github.com/chocoliticekreem/Central-Imaging-Control---Hospital-Traffic-Solution---Imperial-HealthHack",
  },
];

export const skills = {
  focus: ["AI automations", "Full-Stack Development", "TypeScript", "Python", "ML for neuroscience"],
  tools: ["React", "Next.js", "Node.js", "FastAPI", "Postgres", "RAG / Vector DBs", "Multi-agent systems", "n8n", "Firebase"],
  certs: [
    "Tata — GenAI Powered Data Analytics Job Simulation",
    "Python Data Associate",
    "BCG — GenAI Job Simulation",
  ],
};
