/**
 * Single source of truth for every piece of personal content on the site.
 * Components read from here so nothing is duplicated across the markup.
 */

export const identity = {
  firstName: "TANMAY",
  lastName: "TYAGI",
  shortName: "TANMAY TYAGI",
  initials: "TT",
  location: "Greater Noida, Uttar Pradesh",
  email: "tanmaytyagi68@gmail.com",
  /** Rotating pair in the hero. Kept short — they animate character by character. */
  roleLead: "Engineering",
  roles: ["SOFTWARE", "AI SYSTEMS"],
  /** Loading-screen marquee. */
  marquee: ["Software Engineer", "AI Engineer"],
  links: {
    github: "https://github.com/tanmaytyagii",
    linkedin: "https://linkedin.com/in/tyagitanmay",
    codolio: "https://codolio.com/profile/tanmaytyagi/problemSolving",
    leetcode: "https://leetcode.com/u/tanmayytyagii/",
    codechef: "https://www.codechef.com/users/tanmaytyagii",
    x: "https://x.com/TanmayyTyagii",
  },
  /**
   * Drop a PDF at `public/resume.pdf` and set this to "/resume.pdf" to show the
   * resume link in the bottom-right corner. Left empty so it never 404s.
   */
  resumeUrl: "",
};

export const about = {
  title: "About Me",
  body:
    "Final-year Computer Science undergraduate building software and AI systems. " +
    "Nine months across two engineering internships, a full-stack event platform " +
    "shipped end to end, and a local-first RAG engine where hybrid retrieval and " +
    "cross-encoder reranking took Precision@5 from 60% to 91%. First author on an " +
    "IEEE-accepted paper on evidence-grounded healthcare AI.",
};

export interface Discipline {
  title: string;
  description: string;
  tags: string[];
}

export const disciplines: Discipline[] = [
  {
    title: "ENGINEER",
    description:
      "Typed components, responsive interfaces, REST services, relational data.",
    tags: [
      "TypeScript",
      "JavaScript",
      "React.js",
      "React Hooks",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "HTML5 & CSS3",
      "Node.js",
      "REST APIs",
      "Supabase",
      "PostgreSQL",
    ],
  },
  {
    title: "APPLY AI",
    description:
      "Hybrid search, reranking, grounded citations, and the benchmarking behind them.",
    tags: [
      "Python",
      "LLMs",
      "RAG",
      "Hybrid Retrieval",
      "BM25",
      "Cross-Encoder",
      "ChromaDB",
      "Ollama",
      "Sentence Transformers",
      "Prompt Engineering",
      "n8n",
    ],
  },
  {
    title: "FOUNDATIONS",
    description:
      "Systems fundamentals under the frameworks — shipped Agile, linted, unit-tested.",
    tags: [
      "DSA",
      "OOP",
      "Functional Programming",
      "C++",
      "C",
      "CUDA",
      "SQL",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
      "Git",
      "Postman",
    ],
  },
];

export interface CareerEntry {
  role: string;
  organisation: string;
  period: string;
  summary: string;
}

export const career: CareerEntry[] = [
  {
    role: "B.Tech, Computer Science",
    organisation: "Bennett University",
    period: "2023",
    summary:
      "Computer Science and Engineering in Greater Noida, 8.63/10 SGPA, expected May 2027. Coursework across data structures, operating systems, DBMS and computer networks, alongside research on retrieval-augmented architectures.",
  },
  {
    role: "Software Engineer Intern",
    organisation: "Sopra Steria",
    period: "2025",
    summary:
      "Delivered Ocasio, a full-stack event platform, owning it from data model through deployment. Built reusable React and TypeScript components and an in-app assistant, tuned Vite builds, held the line with ESLint and static analysis, and shipped unit-tested features in an Agile team.",
  },
  {
    role: "AI Automation Engineer Intern",
    organisation: "Grafo Software",
    period: "NOW",
    summary:
      "Architected and deployed production automation workflows in n8n, orchestrating multi-step processes across departments. Integrated third-party REST APIs and two LLM provider services, leading system design for automated data processing and task orchestration.",
  },
];

export const research = {
  label: "Research",
  status: "IEEE Accepted",
  venue: "iSmartComp 2026",
  title: "Evidence-Grounded Healthcare AI: Evaluating RAG and LLM Architectures",
  summary:
    "Compared retrieval-augmented generation against standalone LLM architectures for clinical question answering, measuring where grounding actually changes the answer rather than only the confidence attached to it.",
  meta: [
    { label: "Role", value: "First Author" },
    { label: "Team", value: "4 members, led" },
    { label: "Ownership", value: "Backend & AI integration" },
    { label: "Venue", value: "iSmartComp 2026" },
  ],
  evaluated: ["Hallucination reduction", "Factual accuracy", "Clinical reliability"],
};

export interface Project {
  id: string;
  name: string;
  category: string;
  /** One or two sentences: the problem and the move that answers it. */
  summary: string;
  /** Short, verified result lines. Rendered as callouts on the featured card. */
  metrics?: { value: string; label: string }[];
  /** Stage flow, featured card only. */
  pipeline?: string[];
  tech: string[];
  image: string;
  github: string;
  live?: string;
  featured?: boolean;
}

/**
 * Order is deliberate and must not change.
 * Every claim below was verified against the repository it links to.
 */
export const projects: Project[] = [
  {
    id: "edgerag",
    name: "EdgeRAG",
    category: "Local-first RAG engine",
    summary:
      "Most RAG systems answer even when the retrieved evidence is thin. EdgeRAG scores the evidence first, cites the exact passage behind every claim, and declines when nothing supports an answer.",
    pipeline: [
      "Dense + BM25",
      "Rank fusion",
      "Cross-encoder",
      "Confidence",
      "Cite or abstain",
    ],
    metrics: [
      { value: "60% → 91%", label: "Precision@5" },
      { value: "3,200", label: "chunks from 607 pages" },
      { value: "55", label: "backend tests in CI" },
    ],
    tech: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "BM25",
      "Cross-Encoder",
      "Ollama",
    ],
    image: "/images/work/edgerag.webp",
    github: "https://github.com/tanmaytyagii/EdgeRAG",
    live: "https://edgerag-production.up.railway.app",
    featured: true,
  },
  {
    id: "ocasio",
    name: "Ocasio",
    category: "Event marketplace",
    summary:
      "An event marketplace where customers and vendors meet under different permissions — discovery and booking on one side, a dashboard and onboarding on the other, both behind role-gated routes.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase Auth"],
    image: "/images/work/ocasio.webp",
    github: "https://github.com/tanmaytyagii/Ocasio",
  },
  {
    id: "moodflix",
    name: "MoodFlix",
    category: "Sentiment-driven discovery",
    summary:
      "Describe a mood in plain language instead of picking a genre. A lexicon classifier resolves the sentence to one of seven emotional states, scores its own confidence, and maps that state into TMDB genre space.",
    tech: ["React", "TypeScript", "Tailwind CSS", "TMDB API", "Python", "NLTK"],
    image: "/images/work/moodflix.webp",
    github: "https://github.com/tanmaytyagii/MoodFlix-Movie-Recommendation-System",
    live: "https://mood-flix-movie-recommendation-syst.vercel.app",
  },
  {
    id: "amazon",
    name: "Amazon Clone",
    category: "Full-stack commerce",
    summary:
      "A real checkout pipeline, not a UI clone. Orders persist server-side before Stripe sees them, a signature-verified webhook confirms payment, and the order state machine advances from there.",
    tech: ["Next.js", "TypeScript", "Prisma", "MongoDB", "Stripe", "NextAuth"],
    image: "/images/work/amazon.webp",
    github: "https://github.com/tanmaytyagii/amazon-clone-nextjs",
    live: "https://amazon-clone-nextjs-pi.vercel.app",
  },
  {
    id: "globalfx",
    name: "GlobalFX Pro",
    category: "FX analytics desk",
    summary:
      "A currency desk built on real ECB reference rates. Realised volatility comes from daily log returns, alerts fire once per crossing, and anything that cannot be computed is labelled unavailable rather than filled in.",
    tech: ["JavaScript", "Chart.js", "ECB / Frankfurter", "Service Worker", "PWA"],
    image: "/images/work/globalfx.webp",
    github: "https://github.com/tanmaytyagii/GlobalFX-Pro",
    live: "https://global-fx-pro.vercel.app",
  },
  {
    id: "evalix",
    name: "Evalix AI",
    category: "Explainable screening agent",
    summary:
      "Resumes are stripped of name, gender, age and address before any model sees them, then scored against a deterministic five-dimension rubric a recruiter can audit line by line — and override, with the reason logged.",
    tech: ["Python", "FastAPI", "Streamlit", "Sentence Transformers", "SQLite"],
    image: "/images/work/evalix.webp",
    github: "https://github.com/rohan1460/evalix-ai",
  },
];

/** Sphere textures for the 3D tech-stack canvas. */
export const techStack = [
  "/images/typescript.webp",
  "/images/javascript.webp",
  "/images/python.webp",
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/fastapi.webp",
  "/images/postgres.webp",
  "/images/mongo.webp",
  "/images/tailwind.webp",
];

export interface Certification {
  name: string;
  issuer: string;
}

export const certifications: Certification[] = [
  {
    name: "Accelerated Computing in CUDA C and C++",
    issuer: "NVIDIA Deep Learning Institute",
  },
  { name: "Operating Systems and You", issuer: "Google" },
  { name: "Introduction to Generative AI", issuer: "Google Cloud" },
];

export interface CodingPlatform {
  key: string;
  name: string;
  kicker: string;
  blurb: string;
  cta: string;
  url: string;
  /** Codolio leads the group; GitHub closes it. Both span the full width. */
  wide?: boolean;
  primary?: boolean;
}

export const problemSolving = {
  label: "Problem Solving",
  blurb:
    "Data structures and algorithms practice tracked across platforms, alongside the CS fundamentals the rest of this page is built on.",
  platforms: [
    {
      key: "codolio",
      name: "Codolio",
      kicker: "Problem Solving Profile",
      blurb: "DSA practice, competitive programming and coding progress.",
      cta: "View profile",
      url: identity.links.codolio,
      wide: true,
      primary: true,
    },
    {
      key: "leetcode",
      name: "LeetCode",
      kicker: "Competitive Programming",
      blurb: "Data structures and algorithms practice.",
      cta: "View LeetCode",
      url: identity.links.leetcode,
    },
    {
      key: "codechef",
      name: "CodeChef",
      kicker: "Competitive Programming",
      blurb: "Competitive programming and algorithmic problem solving.",
      cta: "View CodeChef",
      url: identity.links.codechef,
    },
    {
      key: "github",
      name: "GitHub",
      kicker: "Engineering + DSA",
      blurb: "Projects, implementations and technical work.",
      cta: "View GitHub",
      url: identity.links.github,
      wide: true,
    },
  ] as CodingPlatform[],
  /**
   * Intentionally empty. None of these platforms expose a figure that can be
   * read reliably without signing in, so the section shows platform identity and
   * purpose instead of numbers. Add { value, label } entries only for figures
   * that have actually been verified, and the stat grid renders itself.
   */
  stats: [] as { value: string; label: string }[],
};
