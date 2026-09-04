import { FAQItem } from '../types';

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'timelines', label: 'Timelines & Delivery' },
  { id: 'communication', label: 'Communication & Sync' },
  { id: 'engagement', label: 'Engagement Models' },
  { id: 'ownership', label: 'Code Ownership & IP' }
] as const;

export const FAQ_ITEMS: FAQItem[] = [
  // 1. Timelines & Delivery
  {
    id: 'faq-timeline-mvp',
    category: 'timelines',
    categoryLabel: 'Timelines & Delivery',
    question: 'What is your typical timeline for delivering an MVP or enterprise system?',
    answer: 'Focused prototypes and production-ready MVPs are typically delivered in 3 to 6 weeks. Comprehensive custom software suites, multi-tenant enterprise architectures, or advanced AI agent automation pipelines generally take between 8 to 14 weeks. Every project is segmented into rigid 2-week deliverable sprints, guaranteeing functional, testable software at every milestone.',
    highlights: [
      '3–6 weeks for focused MVPs and automation workflows',
      '8–14 weeks for full-scale enterprise platforms',
      'Bi-weekly production-grade staging deployments'
    ]
  },
  {
    id: 'faq-timeline-predictability',
    category: 'timelines',
    categoryLabel: 'Timelines & Delivery',
    question: 'How do you guarantee deadline predictability and eliminate scope creep?',
    answer: 'We prevent scope creep through an upfront Architecture Blueprint phase. Before any code is committed, we define technical boundaries, data schemas, API contracts, and user acceptance criteria in writing. When requirements evolve during development, we evaluate them through explicit trade-off matrices so your target launch date remains deterministic.',
    highlights: [
      'Upfront Architecture Blueprinting & schema locking',
      'Defined acceptance criteria for every sprint',
      'Zero surprise invoices or silent timeline delays'
    ]
  },
  {
    id: 'faq-timeline-fasttrack',
    category: 'timelines',
    categoryLabel: 'Timelines & Delivery',
    question: 'Can you accommodate expedited or mission-critical launch dates?',
    answer: 'Yes. When investor deadlines, seasonal launches, or competitive pressures require accelerated delivery, we can deploy a dedicated surge pod. By parallelizing UI/UX design systems, backend microservices, and cloud infrastructure pipelines, we have helped companies launch production-hardened systems in as little as 14 to 21 days.',
    highlights: [
      'Dedicated surge engineering pods available on request',
      'Parallelized frontend, backend, and DevOps tracks',
      'Rapid 14–21 day turnaround for critical go-to-market runs'
    ]
  },

  // 2. Communication & Sync
  {
    id: 'faq-comm-channels',
    category: 'communication',
    categoryLabel: 'Communication & Sync',
    question: 'How does day-to-day communication and progress reporting work?',
    answer: 'We operate with high signal and zero corporate overhead. Your team is invited into a dedicated private Slack or Discord channel with direct access to our core engineers and tech lead (Sonu Kumar)—never through middleman account managers. We maintain transparent communication with asynchronous video walkthroughs, pull request summaries, and real-time query resolution.',
    highlights: [
      'Direct Slack/Discord access to core engineers',
      'No middleman account managers or communication delays',
      'Loom walkthroughs and PR summaries with every drop'
    ]
  },
  {
    id: 'faq-comm-updates',
    category: 'communication',
    categoryLabel: 'Communication & Sync',
    question: 'How frequently will our team see live progress and working demos?',
    answer: 'Weekly. Every Friday or at the close of each sprint cycle, we host a live walkthrough demo on a dedicated staging environment (e.g. staging.yourcompany.com). You and your stakeholders can interact with real features on staging environments before anything is promoted to production.',
    highlights: [
      'Weekly live sprint demos and interactive walkthroughs',
      'Dedicated staging URLs updated continuously',
      'Transparent Git commit history and changelogs'
    ]
  },
  {
    id: 'faq-comm-timezones',
    category: 'communication',
    categoryLabel: 'Communication & Sync',
    question: 'How do you handle international timezones and asynchronous collaboration?',
    answer: 'We work with clients across North America, Europe, the Middle East, and the Asia-Pacific region. We organize our sprint schedules so critical syncs, design reviews, and demos occur during your working business hours, while heavy engineering and automated testing run continuously.',
    highlights: [
      'Guaranteed daily overlap windows for live syncs',
      'Clear asynchronous handoffs with documented decisions',
      'Rigorous technical documentation for distributed teams'
    ]
  },

  // 3. Engagement Models & Pricing
  {
    id: 'faq-model-types',
    category: 'engagement',
    categoryLabel: 'Engagement Models',
    question: 'What engagement structures and contract models do you support?',
    answer: 'We provide three flexible engagement models tailored to your product maturity: 1) Fixed-Scope Milestone Contracts for projects with defined deliverables and fixed budgets; 2) Dedicated Engineering Retainers for high-growth companies needing an embedded squad on continuous monthly sprints; and 3) 2-Week Architecture & AI Audits for evaluating legacy refactoring and AI agent feasibility.',
    highlights: [
      'Fixed-Scope Milestone Contracts with deterministic budgets',
      'Dedicated Engineering Retainers for continuous roadmap execution',
      '2-Week Architecture & AI Feasibility Audits'
    ]
  },
  {
    id: 'faq-model-disbursements',
    category: 'engagement',
    categoryLabel: 'Engagement Models',
    question: 'How are invoices, deposits, and milestone disbursements structured?',
    answer: 'Our billing is strictly tied to verifiable deliverables. A typical engagement includes an initial kickoff retainer (25–30%), intermediate milestone payments tied to demonstration on staging, and a final balance release only after user acceptance testing (UAT) and full production deployment.',
    highlights: [
      'Disbursements tied directly to verifiable delivery milestones',
      'Funds released after staging demonstration and approval',
      'Complete transparency with zero hidden maintenance fees'
    ]
  },

  // 4. Code Ownership & IP
  {
    id: 'faq-ip-ownership',
    category: 'ownership',
    categoryLabel: 'Code Ownership & IP',
    question: 'Who owns the intellectual property and source code at the end of the project?',
    answer: 'You own 100% of all intellectual property, source code, architecture diagrams, and design assets from day one. Upon project completion, full administrative access to GitHub repositories, Docker registries, cloud infrastructure (AWS/GCP), and deployment credentials is transferred directly to your organization with zero vendor lock-in.',
    highlights: [
      '100% complete client IP and source code ownership',
      'Zero recurring licensing fees or proprietary studio lock-in',
      'Complete handoff of GitHub repositories, CI/CD, and credentials'
    ]
  },
  {
    id: 'faq-ip-confidentiality',
    category: 'ownership',
    categoryLabel: 'Code Ownership & IP',
    question: 'How do you safeguard client confidentiality, data privacy, and NDA terms?',
    answer: 'We execute comprehensive mutual Non-Disclosure Agreements (NDAs) before examining technical blueprints or business workflows. Furthermore, all AI architectures and agent automations strictly implement enterprise zero-data-retention standards, ensuring your business data, prompts, and vector embeddings are never used for model training.',
    highlights: [
      'Binding mutual Non-Disclosure Agreements (NDAs) signed upfront',
      'Enterprise zero-retention policies for all AI API integrations',
      'Strict isolation of production databases and client credentials'
    ]
  }
];
