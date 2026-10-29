// Everything about me that isn't a project. The page renders from this, and the
// chat assistant reads it too, so keep it accurate. If you add a fact here, the
// assistant will know it on the next deploy.

export const profile = {
  name: "Dylan Ho",
  shortName: "dylan",
  location: "Toronto, ON",
  email: "dylan.ho@mail.utoronto.ca",
  linkedin: "https://www.linkedin.com/in/dylanho8",
  github: "https://github.com/walkingwave",
  headline: "computer engineering at the university of toronto.",
  intro:
    "i build software, mostly for the web: product, tooling, 3d in the browser, and the occasional ml model. an embedded background means i like knowing what's happening all the way down. i'm also a musician and producer, so a lot of what i build ends up making noise.",
  philosophy:
    "i care about design and validation: scoping what a system needs to do, building it, and proving it works before calling it done. i like projects that connect engineering to things i actually use.",
  education: {
    school: "University of Toronto",
    program: "Computer Engineering (BASc)",
  },
  lookingFor:
    "open to co-op and internship opportunities, engineering collaborations, and conversations about embedded systems, hardware, software, and music tech.",
};

export const experience = [
  {
    role: "Co-founder",
    company: "Portfo",
    type: "startup",
    period: "present",
    location: "Toronto, ON",
    current: true,
    summary:
      "Portfo is a project-first portfolio and discovery platform. You build project pages in Studio, then publish them so people find you through the work, not a resume PDF. It's in private beta, with access opening in waves.",
    highlights: [
      "Studio: a canvas for arranging text, images, video, code, and even 3D models on one project page",
      "Discover: a feed that surfaces the work itself to people browsing for it, not follower counts",
      "Works at any stage: build logs, early prototypes, or the final version, with updates as the project moves",
      "Free plan with unlimited public projects; Premium ($12/mo) adds a custom domain, advanced analytics, more storage, and AI creation tools",
    ],
  },
  {
    role: "Sales Engineering Intern",
    company: "Wolf Advanced Technology",
    type: "16-month co-op",
    period: "present",
    location: "Aurora, ON",
    current: true,
    summary:
      "Wolf Advanced Technology is an NVIDIA OEM partner building rugged, high-performance embedded computing platforms for defense, aerospace, and industrial applications. i support technical pre-sales, from hands-on hardware evaluations and Jetson demo builds to backend tooling for the sales engineering team.",
    highlights: [
      "Support technical evaluation of NVIDIA GPU compute modules and rugged embedded platforms for client-facing pre-sales",
      "Develop Jetson-based proof-of-concept demos for client-facing rugged embedded system evaluations",
      "Run GPU benchmarks and AI/ML training workloads to characterize throughput, thermals, and inference performance",
      "Build backend services in Java and Salesforce Apex to automate sales engineering workflows and internal tooling",
    ],
  },
];

// The company I co-founded. Everything here matches the public copy on
// portfo.dev, keep it that way.
export const nowBuilding = {
  name: "portfo",
  role: "co-founder",
  href: "https://portfo.dev",
  tagline: "from built to discovered.",
  pitch:
    "a project-first portfolio and discovery platform. you build project pages in studio, then publish them so people find you through the work, not a resume pdf.",
  status: "private beta · access opens in waves",
  pillars: [
    {
      title: "start with what you built",
      body: "every project page opens on the work itself: what it is, how it came together, why it's worth a look. the bio comes after, if at all.",
    },
    {
      title: "build the page in studio",
      body: "arrange text, images, video, code, even a 3d model, on one canvas. the layout follows the project and nothing fights you for space.",
    },
    {
      title: "publish where people are looking",
      body: "push it to discover and it's in front of people actively browsing for work like yours, not sitting alone on a url only you visit.",
    },
  ],
  stack: ["Next.js", "React 19", "TypeScript", "Tailwind CSS v4", "Supabase", "Upstash Redis", "Playwright", "Vercel"],
};

export const skills = [
  {
    label: "web & product",
    items: ["TypeScript", "React", "Next.js", "Node.js", "Supabase", "Postgres / SQL", "Tailwind", "Playwright", "Vercel"],
  },
  {
    label: "languages",
    items: ["TypeScript / JavaScript", "Python", "Java", "C / C++", "Linux / Bash"],
  },
  {
    label: "3d & realtime",
    items: ["Three.js", "WebXR", "MediaPipe", "Web Audio API", "Supabase Realtime"],
  },
  {
    label: "ml & audio",
    items: ["PyTorch", "NumPy", "librosa", "scikit-learn", "FastAPI", "Ableton Live"],
  },
  {
    label: "embedded (the background)",
    items: ["FPGA / Verilog", "STM32", "RISC-V", "UART / SPI / I2C", "Altium", "LTspice"],
  },
];

export const interests = [
  "hockey",
  "lacrosse",
  "music production",
  "guitar",
  "working on my car",
  "lego",
  "running",
  "lifting",
  "reviewing food around toronto",
];

// Suggested questions under the chat box.
export const suggestedQuestions = [
  "What is Portfo?",
  "What has he built?",
  "Is he open to a co-op?",
];

// Tiles on the experience page. Each one opens /experience/<slug>.
export const experienceTiles = [
  {
    slug: "portfo",
    title: "Portfo",
    blurb: "co-founder, building project-first portfolios",
    image: { src: "/work/portfo-landing.jpg", alt: "The Portfo landing page", position: "left center" },
    tint: "#0e0e10",
  },
  {
    slug: "wolf",
    title: "Wolf Advanced Technology",
    blurb: "sales engineering co-op in rugged gpu computing",
    glyph: "狼",
    tint: "#1b1f24",
  },
  {
    slug: "uoft",
    title: "University of Toronto",
    blurb: "computer engineering",
    icon: { src: "/experience/uoft-crest.png", alt: "University of Toronto crest", size: 120 },
    tint: "#0b2a55",
  },
];
