import { CareerRole, LeaderProfile, ProductItem, ServiceCategory, WhySolitaPoint } from '../types';

// Configurable Live Product & Founder Profile URLs
export const VISTARO_AI_URL = "https://vistaroai.online/";
export const SPLITPRO_URL = "https://split-pro-beta.vercel.app/";
export const FOUNDER_RESUME_URL = "https://sonu-kumar-ai-engineer.vercel.app/";
export const FOUNDER_GITHUB_URL = "https://github.com/sonubai-dev";

export const COMPANY_INFO = {
  name: "Solita Solutions",
  shortName: "Solita",
  tagline: "Building Technology That Moves Businesses Forward.",
  subheadline: "AI-powered products, automation, and digital solutions built for real-world businesses.",
  alternativeStatement: "AI-powered products, digital solutions, and technology built for the next generation of businesses.",
  positioning: "Technology Company • AI Product Studio • Digital Solutions Company",
  corePositioning: "Solita Solutions builds intelligent digital products and practical technology solutions for businesses and modern users.",
  description: "Solita Solutions is a technology company focused on building AI-powered products, digital platforms, automation systems, and custom technology solutions. We combine product thinking, engineering, AI, automation, and modern design to create technology that solves real-world problems.",
  founderLedNotice: "Founder-led technology company",
  founder: {
    name: "Sonu Kumar",
    role: "Founder & CEO",
    resumeUrl: FOUNDER_RESUME_URL,
    githubUrl: FOUNDER_GITHUB_URL
  },
  products: {
    vistaro: VISTARO_AI_URL,
    splitpro: SPLITPRO_URL
  },
  contact: {
    whatsappNumber: "+919341718066",
    whatsappDisplay: "+91 9341718066",
    phone: "+91 7439551862",
    email: "help.solita@gmail.com",
    devEmail: "contact.dev.sonu@gmail.com",
    whatsappMessage: "Hi Solita Solutions, I would like to discuss a technology solution for my business."
  }
};

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: "vistaro-ai",
    name: "Vistaro AI",
    category: "AI Visual Content Platform",
    tagline: "AI-powered visual content creation.",
    description: "Vistaro AI is an AI-powered visual content and image-to-video platform designed to transform static visuals into engaging dynamic content.",
    status: "Product",
    ctaText: "Explore Vistaro AI",
    url: VISTARO_AI_URL,
    isHighlighted: true,
    highlights: [
      "Image-to-video generation engine",
      "Dynamic visual storytelling pipelines",
      "High-fidelity property & product visualization"
    ],
    useCases: [
      "Real estate marketing",
      "Property visualization",
      "Product marketing",
      "Social media content",
      "Promotional videos",
      "Image-to-video generation",
      "AI-powered visual storytelling"
    ]
  },
  {
    id: "splitpro",
    name: "SplitPro",
    category: "Image Processing & Productivity Tool",
    tagline: "Modern image splitting and processing tool.",
    description: "SplitPro is a modern image splitting and processing tool designed to make complex image-splitting workflows simple, fast, and customizable.",
    status: "Product",
    ctaText: "Explore SplitPro",
    url: SPLITPRO_URL,
    isHighlighted: true,
    highlights: [
      "Precision custom image divisions",
      "Optimized multi-tile grid generation",
      "High-speed client & batch processing"
    ],
    useCases: [
      "Image splitting",
      "Grid creation",
      "Custom image divisions",
      "Content preparation",
      "Social media workflows",
      "Creative production"
    ]
  }
];

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: "ai-solutions",
    title: "AI Solutions",
    shortDesc: "Intelligent agentic workflows and practical artificial intelligence models engineered directly into your operations.",
    iconName: "Bot",
    systemCapability: "End-to-end model fine-tuning, reasoning agents & secure inference integrations.",
    services: [
      "AI Agents",
      "AI Automation",
      "AI-powered workflows",
      "AI integrations",
      "Custom AI applications"
    ]
  },
  {
    id: "business-automation",
    title: "Business Automation",
    shortDesc: "Automating repetitive business communications, lead scoring, and multi-channel customer journeys.",
    iconName: "Zap",
    systemCapability: "Eliminating manual bottlenecks across communication, support, and lead qualification.",
    services: [
      "WhatsApp Automation",
      "Lead Automation",
      "Customer Follow-up Automation",
      "Workflow Automation",
      "CRM Automation",
      "Communication Automation"
    ]
  },
  {
    id: "web-software",
    title: "Web & Software Development",
    shortDesc: "Mission-critical web platforms, custom SaaS architectures, and internal corporate tools built for scale.",
    iconName: "Code",
    systemCapability: "High-performance full-stack architectures engineered for uptime and modularity.",
    services: [
      "Business Websites",
      "Web Applications",
      "SaaS Development",
      "Custom Software",
      "Dashboard Development",
      "API Integrations"
    ]
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    shortDesc: "Native and cross-platform mobile experiences integrated with intelligent offline and real-time features.",
    iconName: "Smartphone",
    systemCapability: "User-centric Android and cross-platform engineering with hardware and AI acceleration.",
    services: [
      "Android Applications",
      "AI-powered mobile apps",
      "Business productivity apps",
      "Custom mobile solutions"
    ]
  },
  {
    id: "digital-business-systems",
    title: "Digital Business Systems",
    shortDesc: "Cohesive organizational operating systems connecting sales, support, customer data, and analytics.",
    iconName: "Layers",
    systemCapability: "Centralized data pipelines and custom dashboards that replace fragmented tools.",
    services: [
      "CRM systems",
      "Lead management",
      "Customer communication systems",
      "Internal business tools",
      "Custom dashboards"
    ]
  }
];

export const WHY_SOLITA_POINTS: WhySolitaPoint[] = [
  {
    id: "product-mindset",
    title: "Product Mindset",
    description: "We build technology around real user problems instead of adding technology for the sake of technology.",
    badge: "Purpose-Driven"
  },
  {
    id: "ai-first",
    title: "AI First",
    description: "We actively use modern AI models and intelligent automation to build faster and smarter systems.",
    badge: "Modern Stack"
  },
  {
    id: "engineering-focus",
    title: "Engineering Focus",
    description: "Our solutions are designed with scalability, maintainability, and real-world deployment in mind.",
    badge: "Architecture"
  },
  {
    id: "business-driven",
    title: "Business Driven",
    description: "Technology should create measurable business value.",
    badge: "Impact"
  },
  {
    id: "product-plus-services",
    title: "Product + Services",
    description: "We understand both sides of technology: building our own products and solving business problems for clients.",
    badge: "Dual Expertise"
  },
  {
    id: "long-term-thinking",
    title: "Long-Term Thinking",
    description: "We aim to build technology assets that continue creating value over time.",
    badge: "Sustainability"
  }
];

export const LEADERSHIP_TEAM: LeaderProfile[] = [
  {
    name: "Sonu Kumar",
    role: "Founder & CEO",
    bio: "Technology entrepreneur focused on AI, software products, automation, and building practical technology solutions.",
    focus: ["AI Product Strategy", "Systems Architecture", "Automation Engineering"],
    imagePlaceholderText: "SK",
    resumeUrl: FOUNDER_RESUME_URL,
    githubUrl: FOUNDER_GITHUB_URL
  },
  {
    name: "Lalita Kumari",
    role: "Leadership",
    bio: "Part of the leadership behind Solita Solutions.",
    focus: ["Operations & Planning", "Product Oversight", "Client Relations"],
    imagePlaceholderText: "LK"
  }
];

export const EXPLORING_AREAS = [
  { name: "Artificial Intelligence", desc: "Autonomous reasoning and generative models designed for business logic." },
  { name: "AI Agents", desc: "Goal-driven digital assistants orchestrating complex multi-step work." },
  { name: "Automation", desc: "Event-driven system pipelines that eliminate repetitive friction." },
  { name: "SaaS", desc: "Scalable software tools solving targeted industry bottlenecks." },
  { name: "Developer Tools", desc: "High-leverage utilities that empower creators and engineers." },
  { name: "Business Software", desc: "Custom operational software engineered for unique company workflows." },
  { name: "Productivity", desc: "Lightweight, distraction-free tools built for focused output." },
  { name: "Digital Infrastructure", desc: "Resilient cloud systems, data backbones, and API fabrics." }
];

export const CAREER_ROLES: CareerRole[] = [
  {
    title: "AI Engineer",
    category: "Engineering",
    type: "Full-time / Contract",
    location: "Remote / Hybrid",
    description: "Work on proprietary LLM integration, agentic frameworks, and generative video/image pipelines.",
    status: "Current / Upcoming Opportunities"
  },
  {
    title: "Full Stack Developer",
    category: "Engineering",
    type: "Full-time",
    location: "Remote / Hybrid",
    description: "Build scalable web platforms, APIs, and modern frontends using React, TypeScript, and Node.js.",
    status: "Current / Upcoming Opportunities"
  },
  {
    title: "Android Developer",
    category: "Mobile",
    type: "Full-time",
    location: "Remote / Hybrid",
    description: "Architect high-performance native Android applications with AI-driven on-device capabilities.",
    status: "Current / Upcoming Opportunities"
  },
  {
    title: "UI/UX Designer",
    category: "Design",
    type: "Full-time / Contract",
    location: "Remote",
    description: "Craft modern product studio interfaces, design systems, and friction-free user flows.",
    status: "Current / Upcoming Opportunities"
  },
  {
    title: "Product Designer",
    category: "Design",
    type: "Full-time",
    location: "Remote",
    description: "Lead end-to-end product definitions, prototyping, and user testing for our internal tools.",
    status: "Current / Upcoming Opportunities"
  },
  {
    title: "Software Engineer",
    category: "Engineering",
    type: "Full-time",
    location: "Remote / Hybrid",
    description: "Solve complex backend challenges, database scaling, and distributed architecture needs.",
    status: "Current / Upcoming Opportunities"
  },
  {
    title: "AI Automation Engineer",
    category: "Automation",
    type: "Full-time",
    location: "Remote",
    description: "Design conversational WhatsApp bots, CRM integrations, and multi-system automated triggers.",
    status: "Current / Upcoming Opportunities"
  },
  {
    title: "Product Intern",
    category: "Product & Growth",
    type: "Internship",
    location: "Remote",
    description: "Learn hands-on product management, feature benchmarking, and growth experiments.",
    status: "Current / Upcoming Opportunities"
  }
];

export const SERVICE_OPTIONS = [
  "AI Solution",
  "Automation",
  "Website",
  "Web Application",
  "Mobile Application",
  "SaaS",
  "Custom Software",
  "Other"
];

export const BUDGET_RANGES = [
  "Flexible / Discussion Phase",
  "$1,000 - $3,000",
  "$3,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000+"
];
