import {
  capabilities as zhCapabilities,
  caseCategories as zhCaseCategories,
  caseStudies as zhCaseStudies,
  contactChannels as zhContactChannels,
  deploymentRoutes as zhDeploymentRoutes,
  navItems as zhNavItems,
  productLinks,
  testimonials as zhTestimonials,
  type Capability,
  type CaseStudy,
  type DeploymentRoute,
  type NavItem,
  type Testimonial,
} from "./content";

export type Language = "zh" | "en";

type CaseCategory = {
  key: (typeof zhCaseCategories)[number]["key"];
  label: string;
};

export type SiteContent = {
  navItems: NavItem[];
  capabilities: Capability[];
  caseCategories: readonly CaseCategory[];
  caseStudies: CaseStudy[];
  deploymentRoutes: DeploymentRoute[];
  testimonials: Testimonial[];
  contactChannels: typeof zhContactChannels;
  docsHref: string;
  navbar: {
    tagline: string;
    languageLabel: string;
    menuOpen: string;
    menuClose: string;
  };
  home: {
    heroTitleTop: string;
    heroTitleAccent: string;
    heroDescription: string;
    demoCta: string;
    quickStartCta: string;
    capabilityEyebrow: string;
    capabilityTitle: string;
    capabilityDescription: string;
    showcaseEyebrow: string;
    showcaseTitle: string;
    showcaseDescription: string;
    allCasesCta: string;
    deploymentEyebrow: string;
    deploymentTitle: string;
    deploymentDescription: string;
    deploymentDocsCta: string;
    wordEyebrow: string;
    wordTitle: string;
    wordDescription: string;
    feedbackLabel: string;
    finalCtaTitle: string;
    finalCtaDescription: string;
    finalCasesCta: string;
    githubRepoCta: string;
  };
  heroStage: {
    sessionLabel: string;
    recordingLabel: string;
    portraitLabel: string;
    productPanelTitle: string;
    pipelineItems: Array<{
      label: string;
      value: string;
    }>;
    highlights: Array<{
      title: string;
      meta: string;
    }>;
  };
  showcase: {
    featuredLabel: string;
    openResourceCta: string;
    previousLabel: string;
    nextLabel: string;
  };
  deploymentCard: {
    outcomeLabel: string;
    modelsLabel: string;
    bestForLabel: string;
  };
  casesPage: {
    eyebrow: string;
    title: string;
    description: string;
    contributionLine: string;
    filterTitle: string;
    resourceNote: string;
    comingSoonLabel: string;
  };
  caseDetail: {
    backToLibrary: string;
    videoTitle: string;
    outcomesTitle: string;
    docsCta: string;
    relatedEyebrow: string;
    relatedTitle: string;
  };
  about: {
    contactEyebrow: string;
    titlePrefix: string;
    titleBrand: string;
    titleSuffix: string;
    intro: string;
    qqTitle: string;
    qqValue: string;
    qqDescription: string;
    collaborationEyebrow: string;
    collaborationTitle: string;
    collaborationDescription: string;
    cooperationAreas: Array<{
      title: string;
      copy: string;
    }>;
    communityEyebrow: string;
    communityTitle: string;
    communityDescription: string;
    githubCta: string;
    docsCta: string;
  };
  footer: {
    tagline: string;
    description: string;
    siteTitle: string;
    resourcesTitle: string;
    docsPrimary: string;
    docsSecondary: string;
    communityTitle: string;
    communityName: string;
    communityDescription: string;
  };
};

const enNavItems: NavItem[] = [
  { key: "home", label: "Home" },
  { key: "docs", label: "Docs" },
  { key: "cases", label: "Cases" },
  { key: "about", label: "About" },
];

const enCaseCategories = [
  { key: "all", label: "All" },
  { key: "commerce", label: "Commerce" },
  { key: "media", label: "Media" },
  { key: "education", label: "Education" },
  { key: "enterprise", label: "Enterprise" },
  { key: "public-service", label: "Public service" },
  { key: "creative", label: "Creative" },
] as const;

const enCapabilities: Capability[] = [
  {
    title: "Real-time Conversation Flow",
    description:
      "Tie together user input, session state, LLM responses, streaming voice, and WebRTC playback in one product-ready loop.",
    meta: "Session / LLM / WebRTC",
    icon: "radio",
  },
  {
    title: "Avatar and Voice Profiles",
    description:
      "Define characters, voices, TTS/STT providers, and model backends so teams can test different avatar experiences quickly.",
    meta: "Avatar / Voice / Provider",
    icon: "user",
  },
  {
    title: "Captions and Turn Control",
    description:
      "Surface caption events, speaking state, and interruption controls so real-time conversations stay visible and responsive.",
    meta: "Events / Turn-taking",
    icon: "captions",
  },
  {
    title: "Pluggable Model Backends",
    description:
      "Start with a lightweight demo, then move to higher-quality inference as your compute, latency, and visual requirements grow.",
    meta: "wav2lip / flashtalk",
    icon: "plug",
  },
];

const enCaseStudies: CaseStudy[] = [
  {
    slug: "ecommerce-livestream",
    title: "Live Commerce Avatar",
    eyebrow: "High-frequency interaction",
    category: "commerce",
    categoryLabel: "Commerce",
    description: "Bring product knowledge, audience Q&A, speech, captions, and real-time avatar video into one live commerce workflow.",
    detailIntro: "Build an interactive AI host that explains products, answers buyer questions, and presents offers with synchronized voice and video.",
    route: "OmniRT / FlashTalk",
    features: ["Product knowledge", "Real-time Q&A", "Caption sync"],
    image: "/images/cases/live-sales.jpeg",
    accent: "amber",
    featured: true,
    statusLabel: "Full story",
    videoUrl: "https://1441945933.vod-qcloud.com/0b66444dvodcq1441945933/d9d848c95001834806724661995/SaicQA0Ah7QA.mp4",
    sections: [
      { title: "Use case", body: "Live commerce teams need long-running product narration, fast audience response, and a consistent rhythm for offers and objections." },
      { title: "OpenTalking setup", body: "Connect product knowledge, promotion scripts, and comment streams to LLM responses, then render speech, captions, and WebRTC avatar video in real time." },
      { title: "Recommended model", body: "FlashTalk or OmniRT is recommended for steadier lip sync and higher visual quality in branded commerce and client-facing demos." },
    ],
    outcomes: ["Lower repetitive hosting cost", "Real-time audience response", "Reusable livestream templates"],
  },
  {
    slug: "local-life-host",
    title: "Local Services Deal Host",
    eyebrow: "Store conversion",
    category: "commerce",
    categoryLabel: "Commerce",
    description: "Explain packages, booking rules, store locations, and local promotions for restaurants, gyms, salons, and offline retail.",
    detailIntro: "Turn local offers and store FAQs into avatar-led videos and Q&A experiences for local commerce campaigns.",
    route: "QuickTalk / FlashTalk",
    features: ["Store knowledge", "Campaign scripts", "Voice profile"],
    image: "/images/cases/live-sales.jpeg",
    accent: "mint",
    statusLabel: "Full story",
    sections: [
      { title: "Use case", body: "Local merchants need to explain fast-changing offers, usage restrictions, locations, and booking steps without producing every video by hand." },
      { title: "OpenTalking setup", body: "Load store FAQs, package details, and campaign scripts as knowledge, then configure a branded avatar voice for repeatable video production." },
      { title: "Recommended model", body: "Start with QuickTalk to validate scripts and campaign flow, then upgrade to FlashTalk for polished public-facing assets." },
    ],
    outcomes: ["Clearer offer explanation", "Lower campaign video cost", "Reusable templates across stores"],
  },
  {
    slug: "cross-border-shopping-guide",
    title: "Multilingual Shopping Guide",
    eyebrow: "Global commerce",
    category: "commerce",
    categoryLabel: "Commerce",
    description: "Use multilingual avatars to explain product benefits, sizing, shipping, duties, and after-sales policies for global buyers.",
    detailIntro: "Create a multilingual avatar guide that keeps product claims and service rules consistent across markets.",
    route: "FlashTalk / OmniRT",
    features: ["Multilingual TTS", "Product knowledge", "Caption sync"],
    image: "/images/cases/live-sales.jpeg",
    accent: "cyan",
    statusLabel: "Full story",
    sections: [
      { title: "Use case", body: "Cross-border teams must explain the same products in multiple languages while keeping terminology, policies, and claims aligned." },
      { title: "OpenTalking setup", body: "Use one product knowledge base, then configure language, voice, subtitles, and persona settings for each market." },
      { title: "Recommended model", body: "FlashTalk or OmniRT is a good fit for multilingual product demos and brand assets where consistent visual quality matters." },
    ],
    outcomes: ["Lower multilingual content cost", "Consistent product messaging", "Better pre-sales coverage"],
  },
  {
    slug: "private-domain-shopping-assistant",
    title: "Private Community Shopping Assistant",
    eyebrow: "Community commerce",
    category: "commerce",
    categoryLabel: "Commerce",
    description: "Use an avatar assistant in private communities to explain campaigns, bundles, and purchase paths with contextual answers.",
    detailIntro: "Turn community FAQs, campaign calendars, and member segments into a conversational avatar assistant.",
    route: "Local GPU",
    features: ["Campaign knowledge", "Memory layer", "Member segments"],
    image: "/images/cases/coming-soon.svg",
    accent: "violet",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "Private community operations involve repetitive questions, changing offers, and different user contexts that text-only replies handle poorly." },
      { title: "OpenTalking setup", body: "Load campaign scripts, product bundles, and member rules into knowledge, then use memory to keep recommendations contextual." },
      { title: "Recommended model", body: "A local GPU setup is recommended when community data, user labels, and campaign rules need to stay under direct control." },
    ],
    outcomes: ["Fewer repetitive replies", "Consistent campaign messaging", "More contextual member service"],
  },
  {
    slug: "product-launch-host",
    title: "Product Launch Host",
    eyebrow: "Brand launch",
    category: "commerce",
    categoryLabel: "Commerce",
    description: "Use a digital host for launch openings, product storytelling, audience Q&A, and post-event content clips.",
    detailIntro: "Create a reusable launch host that combines product highlights, event scripts, and interactive Q&A.",
    route: "OmniRT",
    features: ["Long-form narration", "Immersive mode", "Brand persona"],
    image: "/images/cases/coming-soon.svg",
    accent: "rose",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "Product launches need a polished host, consistent brand language, and reusable media without relying on every shoot or rehearsal." },
      { title: "OpenTalking setup", body: "Combine launch scripts, product knowledge, voice settings, and a branded avatar to cover opening remarks, demos, and Q&A." },
      { title: "Recommended model", body: "OmniRT is recommended when the launch requires stronger visual stability and a more polished delivery standard." },
    ],
    outcomes: ["Consistent brand delivery", "Reusable launch format", "More post-event content assets"],
  },
  {
    slug: "news-anchor",
    title: "News Anchor",
    eyebrow: "Stable narration",
    category: "media",
    categoryLabel: "Media",
    description: "Create stable avatar-led news, announcements, and branded programs with consistent long-form narration.",
    detailIntro: "Organize scripts, anchor identity, voice, and real-time video output for company updates, market briefs, and media programs.",
    route: "QuickTalk / FlashTalk",
    features: ["Long-form narration", "Voice profile", "WebRTC playback"],
    image: "/images/cases/news-anchor.jpeg",
    accent: "cyan",
    featured: true,
    statusLabel: "Full story",
    videoUrl: "https://1441945933.vod-qcloud.com/0b66444dvodcq1441945933/1006e25f5001834806728756004/iscjqpxwBUAA.mp4",
    sections: [
      { title: "Use case", body: "Media and enterprise teams need repeatable narration with a consistent face, clear voice, and predictable delivery rhythm." },
      { title: "OpenTalking setup", body: "Combine script input, anchor persona, TTS voice, and avatar rendering into a program-ready broadcast workflow." },
      { title: "Recommended model", body: "QuickTalk works for local validation, while FlashTalk is better for stable long-form narration and program-style output." },
    ],
    outcomes: ["Lower cost for daily programs", "Switchable anchor identity", "Consistent narration style"],
  },
  {
    slug: "enterprise-announcement-anchor",
    title: "Enterprise Announcement Anchor",
    eyebrow: "Internal communication",
    category: "media",
    categoryLabel: "Media",
    description: "Turn company notices, release updates, and internal announcements into consistent avatar-led videos.",
    detailIntro: "Create a reusable digital presenter for internal announcements, product updates, and brand communications.",
    route: "QuickTalk / Wav2Lip",
    features: ["Announcement scripts", "Private deployment", "Batch generation"],
    image: "/images/cases/news-anchor.jpeg",
    accent: "slate",
    statusLabel: "Full story",
    sections: [
      { title: "Use case", body: "Text announcements are easy to ignore, while video updates are costly to produce repeatedly." },
      { title: "OpenTalking setup", body: "Use announcement text, a brand avatar, and a fixed voice profile to generate captioned videos in batches." },
      { title: "Recommended model", body: "QuickTalk or Wav2Lip is recommended for private batch production and controlled internal communication." },
    ],
    outcomes: ["More engaging updates", "Standardized internal messaging", "Batch-friendly video workflow"],
  },
  {
    slug: "financial-morning-brief",
    title: "Financial Morning Brief",
    eyebrow: "Data narration",
    category: "media",
    categoryLabel: "Media",
    description: "Automatically narrate market summaries, industry news, and key data points for research teams and finance creators.",
    detailIntro: "Turn market data and analyst notes into a recurring avatar-led morning brief.",
    route: "QuickTalk",
    features: ["Data summaries", "Scheduled scripts", "Program template"],
    image: "/images/cases/news-anchor.jpeg",
    accent: "amber",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "Financial briefs need to be updated on a fixed schedule while explaining dense numbers in a clear, repeatable format." },
      { title: "OpenTalking setup", body: "Connect structured data, research summaries, and a script template, then render the brief with a consistent digital anchor." },
      { title: "Recommended model", body: "QuickTalk is a practical starting point for daily brief generation before upgrading visual quality for branded programs." },
    ],
    outcomes: ["Lower daily production cost", "Clearer data explanation", "Repeatable program format"],
  },
  {
    slug: "medical-science-broadcast",
    title: "Healthcare Education Broadcast",
    eyebrow: "Public health content",
    category: "media",
    categoryLabel: "Media",
    description: "Convert health knowledge, care reminders, and disease education into clear avatar-led videos.",
    detailIntro: "Use reviewed healthcare knowledge to produce digital human videos for patient education and public health communication.",
    route: "Local GPU",
    features: ["Reviewed knowledge", "Safe wording", "Caption sync"],
    image: "/images/cases/coming-soon.svg",
    accent: "mint",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "Healthcare education needs accurate, accessible language and a workflow that can be reviewed before publication." },
      { title: "OpenTalking setup", body: "Build a reviewed knowledge base and safety wording rules, then output captioned avatar videos for each topic." },
      { title: "Recommended model", body: "A local GPU setup is recommended when institutions need to keep source material and review workflows private." },
    ],
    outcomes: ["Faster education content", "Reviewable medical messaging", "Reusable public health templates"],
  },
  {
    slug: "policy-explainer-anchor",
    title: "Policy Explainer Anchor",
    eyebrow: "Public information",
    category: "media",
    categoryLabel: "Media",
    description: "Turn policies, service procedures, and public notices into easier-to-understand avatar explanations.",
    detailIntro: "Help government, parks, and enterprise service centers explain complex policy language through digital narration and Q&A.",
    route: "Local GPU",
    features: ["Policy knowledge", "Process explanation", "Multi-turn Q&A"],
    image: "/images/cases/coming-soon.svg",
    accent: "violet",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "Policy text is often long and technical, while users mostly need eligibility, required documents, process steps, and edge cases." },
      { title: "OpenTalking setup", body: "Load policy text, FAQs, and process maps into a knowledge base, then use the avatar to explain highlights and guide questions." },
      { title: "Recommended model", body: "Local GPU deployment is a good fit for controlled policy knowledge and frequently updated public service workflows." },
    ],
    outcomes: ["Lower policy comprehension barrier", "Clearer service processes", "Continuously updatable knowledge"],
  },
  {
    slug: "ai-course-instructor",
    title: "AI Course Instructor",
    eyebrow: "Course production",
    category: "education",
    categoryLabel: "Education",
    description: "Turn slides, notes, and knowledge bases into avatar-led course explanations with follow-up Q&A.",
    detailIntro: "Use a digital instructor for lessons, knowledge walkthroughs, and Q&A in online courses or internal learning programs.",
    route: "QuickTalk / FlashTalk",
    features: ["Course knowledge", "Immersive mode", "Caption sync"],
    image: "/images/cases/companion.jpeg",
    accent: "cyan",
    featured: true,
    statusLabel: "Full story",
    sections: [
      { title: "Use case", body: "Courses need scalable narration and quick updates, but recording instructors repeatedly slows down content iteration." },
      { title: "OpenTalking setup", body: "Load slides, notes, and quizzes as knowledge, then render a digital instructor with a consistent voice and lesson structure." },
      { title: "Recommended model", body: "Start with QuickTalk to validate pacing, then use FlashTalk when course branding and visual polish matter more." },
    ],
    outcomes: ["Lower course recording cost", "Faster lesson updates", "Interactive learning support"],
  },
  {
    slug: "enterprise-training-instructor",
    title: "Enterprise Training Instructor",
    eyebrow: "Standardized training",
    category: "education",
    categoryLabel: "Education",
    description: "Deliver SOPs, compliance policies, and onboarding lessons through a consistent digital instructor.",
    detailIntro: "Convert internal policies, operating manuals, and training decks into avatar-led training modules.",
    route: "Wav2Lip / QuickTalk",
    features: ["SOP knowledge", "Private deployment", "Batch generation"],
    image: "/images/cases/companion.jpeg",
    accent: "mint",
    statusLabel: "Full story",
    sections: [
      { title: "Use case", body: "Enterprise training repeats the same knowledge across teams, while policy changes require fast and consistent updates." },
      { title: "OpenTalking setup", body: "Load SOPs and internal policies as knowledge, then generate chapter-based videos with a fixed digital instructor." },
      { title: "Recommended model", body: "Wav2Lip or QuickTalk is recommended for private, batch-oriented internal training production." },
    ],
    outcomes: ["Less repetitive training work", "Consistent policy delivery", "Reusable internal learning assets"],
  },
  {
    slug: "ai-interview-coach",
    title: "AI Interview Coach",
    eyebrow: "Immersive practice",
    category: "education",
    categoryLabel: "Education",
    description: "Simulate interview questions, follow-ups, feedback, and review sessions through a voice-enabled digital interviewer.",
    detailIntro: "Combine job knowledge, memory, and a digital interviewer persona to create low-pressure, repeatable interview practice.",
    route: "QuickTalk",
    features: ["Memory layer", "Follow-up questions", "Voice input"],
    image: "/images/cases/companion.jpeg",
    accent: "violet",
    statusLabel: "Full story",
    sections: [
      { title: "Use case", body: "Candidates need repeated practice and realistic follow-ups, but text chat lacks presence and human coaching is expensive." },
      { title: "OpenTalking setup", body: "Configure role-specific knowledge, interviewer persona, voice input, and memory to track recurring practice points." },
      { title: "Recommended model", body: "QuickTalk is recommended because low latency matters more than cinematic quality in interview practice." },
    ],
    outcomes: ["More frequent practice", "More specific feedback", "Stronger sense of interview presence"],
  },
  {
    slug: "language-speaking-coach",
    title: "Language Speaking Coach",
    eyebrow: "Speaking practice",
    category: "education",
    categoryLabel: "Education",
    description: "Create role-based conversations, voice input, and real-time feedback for foreign-language speaking practice.",
    detailIntro: "Let an avatar act as a tutor, customer, interviewer, or travel companion across different speaking scenarios.",
    route: "Local audio + QuickTalk",
    features: ["Role dialogue", "Memory layer", "Immersive mode"],
    image: "/images/cases/coming-soon.svg",
    accent: "rose",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "Language learners need frequent, low-pressure speaking practice and contextual feedback in realistic scenarios." },
      { title: "OpenTalking setup", body: "Configure roles, topics, vocabulary knowledge, and learner memory to support voice conversations and review." },
      { title: "Recommended model", body: "Local audio plus QuickTalk is recommended for fast conversational turnaround during practice." },
    ],
    outcomes: ["More speaking practice", "Switchable conversation roles", "Personalized learning memory"],
  },
  {
    slug: "medical-communication-training",
    title: "Clinical Communication Training",
    eyebrow: "Simulation training",
    category: "education",
    categoryLabel: "Education",
    description: "Simulate patient, family, and clinician conversations for consultation practice, risk explanation, and service training.",
    detailIntro: "Create repeatable digital patients or instructors for healthcare communication training and process simulation.",
    route: "Local GPU",
    features: ["Safe wording", "Scenario memory", "Multi-turn dialogue"],
    image: "/images/cases/coming-soon.svg",
    accent: "slate",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "Clinical communication training needs repeatable scenarios, emotional nuance, and safe wording without risk to real patients." },
      { title: "OpenTalking setup", body: "Configure patient roles, training objectives, and safety boundaries, then record dialogue for review and coaching." },
      { title: "Recommended model", body: "Local GPU deployment is recommended for institutions that need controlled training material and sensitive scenario data." },
    ],
    outcomes: ["Lower training coordination cost", "Repeatable simulation scenes", "More stable communication practice"],
  },
  {
    slug: "enterprise-knowledge-agent",
    title: "Enterprise Knowledge Support Agent",
    eyebrow: "Customer service",
    category: "enterprise",
    categoryLabel: "Enterprise",
    description: "Connect product manuals, after-sales FAQs, and internal knowledge to a more approachable avatar service entry.",
    detailIntro: "Use an avatar to answer enterprise knowledge questions with voice, captions, and a more human service experience.",
    route: "Local GPU / Private deployment",
    features: ["Enterprise knowledge", "Session state", "Private deployment"],
    image: "/images/cases/companion.jpeg",
    accent: "mint",
    featured: true,
    statusLabel: "Full story",
    sections: [
      { title: "Use case", body: "Enterprise support needs consistent answers across product features, after-sales policies, and service workflows." },
      { title: "OpenTalking setup", body: "Connect a private knowledge base and response policy to an avatar interface with speech, captions, and real-time video." },
      { title: "Recommended model", body: "Local GPU or private deployment is recommended when enterprise knowledge and customer conversations need controlled boundaries." },
    ],
    outcomes: ["Friendlier support entry", "Consistent knowledge delivery", "Private knowledge integration"],
  },
  {
    slug: "pre-sales-solution-consultant",
    title: "Pre-sales Solution Consultant",
    eyebrow: "Solution consulting",
    category: "enterprise",
    categoryLabel: "Enterprise",
    description: "Explain product fit, deployment options, and delivery boundaries based on customer industry, budget, and infrastructure.",
    detailIntro: "Use a digital consultant to cover standard pre-sales education and early requirement discovery.",
    route: "QuickTalk / FlashTalk",
    features: ["Solution knowledge", "Requirement discovery", "Voice persona"],
    image: "/images/cases/companion.jpeg",
    accent: "cyan",
    statusLabel: "Full story",
    sections: [
      { title: "Use case", body: "Pre-sales teams repeatedly explain product scope, deployment limits, and delivery paths to customers with different contexts." },
      { title: "OpenTalking setup", body: "Load solution docs, pricing principles, and deployment playbooks into knowledge, then let the avatar guide early conversations." },
      { title: "Recommended model", body: "QuickTalk is enough for internal validation, while FlashTalk is better for client meetings and public demos." },
    ],
    outcomes: ["Less repetitive pre-sales work", "More standardized solution messaging", "Better early qualification"],
  },
  {
    slug: "financial-service-teller",
    title: "Financial Service Teller",
    eyebrow: "Financial service",
    category: "enterprise",
    categoryLabel: "Enterprise",
    description: "Explain banking, insurance, and securities services with process guidance, product rules, and risk reminders.",
    detailIntro: "Configure a digital teller for financial consultation, process guidance, and compliance-aware reminders.",
    route: "Private deployment",
    features: ["Compliance wording", "Process knowledge", "Safety boundaries"],
    image: "/images/cases/coming-soon.svg",
    accent: "amber",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "Financial service conversations require precise wording, process clarity, and visible risk reminders." },
      { title: "OpenTalking setup", body: "Connect product rules, risk disclaimers, and service processes to a controlled avatar consultation flow." },
      { title: "Recommended model", body: "Private deployment is recommended because financial data, compliance review, and service reliability are critical." },
    ],
    outcomes: ["More standardized service explanation", "Clearer risk reminders", "Private service entry"],
  },
  {
    slug: "hr-employee-service-assistant",
    title: "HR Employee Service Assistant",
    eyebrow: "Employee experience",
    category: "enterprise",
    categoryLabel: "Enterprise",
    description: "Explain attendance, payroll, onboarding, offboarding, and benefits policies through an internal avatar assistant.",
    detailIntro: "Turn HR policies and workflows into a digital employee service assistant that reduces repetitive HR questions.",
    route: "Local GPU",
    features: ["HR knowledge", "Process guidance", "Access boundaries"],
    image: "/images/cases/coming-soon.svg",
    accent: "violet",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "Employees frequently ask about policies and procedures, while HR teams need answers to stay accurate and consistent." },
      { title: "OpenTalking setup", body: "Load HR handbooks, workflow guides, and service entry points into knowledge, then present them through a friendly avatar." },
      { title: "Recommended model", body: "Local GPU deployment is recommended for internal system integration and employee data boundaries." },
    ],
    outcomes: ["Fewer repetitive HR questions", "More intuitive employee service", "Consistent policy communication"],
  },
  {
    slug: "smart-showroom-guide",
    title: "Smart Showroom Guide",
    eyebrow: "Showroom guide",
    category: "enterprise",
    categoryLabel: "Enterprise",
    description: "Guide visitors through enterprise showrooms, product centers, and event booths with product stories and interactive Q&A.",
    detailIntro: "Create a digital showroom guide for product portfolios, customer stories, and visitor routes.",
    route: "OmniRT",
    features: ["Showroom knowledge", "Immersive mode", "Multi-screen display"],
    image: "/images/cases/coming-soon.svg",
    accent: "rose",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "Showrooms need consistent storytelling and visitor guidance, especially when traffic exceeds available human guides." },
      { title: "OpenTalking setup", body: "Load exhibit knowledge, route scripts, and brand messages into a digital guide that can answer visitor questions." },
      { title: "Recommended model", body: "OmniRT is recommended for large-screen, client-facing scenarios where visual quality is part of the experience." },
    ],
    outcomes: ["More efficient visitor reception", "Continuously updated exhibit content", "Better brand storytelling"],
  },
  {
    slug: "scenic-area-guide",
    title: "Scenic Area Guide",
    eyebrow: "Immersive tour",
    category: "public-service",
    categoryLabel: "Public service",
    description: "Explain routes, attractions, opening hours, and visitor services for scenic areas and travel destinations.",
    detailIntro: "Bring attraction knowledge, route recommendations, and multilingual narration into a digital guide experience.",
    route: "QuickTalk / OmniRT",
    features: ["Tour knowledge", "Multilingual narration", "Immersive mode"],
    image: "/images/cases/coming-soon.svg",
    accent: "mint",
    featured: true,
    statusLabel: "Full story",
    sections: [
      { title: "Use case", body: "Tourism destinations need scalable storytelling, route advice, and visitor services across peak hours and languages." },
      { title: "OpenTalking setup", body: "Load attraction facts, routes, and service FAQs into knowledge, then let the avatar guide visitors through narration and Q&A." },
      { title: "Recommended model", body: "QuickTalk is enough for fast deployment; OmniRT is better for big screens, visitor centers, and premium experiences." },
    ],
    outcomes: ["Broader guide coverage", "More engaging destination stories", "Multilingual visitor support"],
  },
  {
    slug: "museum-docent",
    title: "Museum Docent",
    eyebrow: "Knowledge guide",
    category: "public-service",
    categoryLabel: "Public service",
    description: "Explain exhibits, collection stories, and historical context through a digital docent with interactive Q&A.",
    detailIntro: "Create a museum or exhibition guide that combines curated knowledge with natural avatar narration.",
    route: "Local GPU",
    features: ["Exhibit knowledge", "Immersive mode", "Multi-turn Q&A"],
    image: "/images/cases/coming-soon.svg",
    accent: "cyan",
    statusLabel: "Full story",
    sections: [
      { title: "Use case", body: "Museums need to balance professional knowledge with accessible storytelling for visitors with different interests." },
      { title: "OpenTalking setup", body: "Load exhibit descriptions, historical context, and common questions into knowledge, then guide visitors by route or topic." },
      { title: "Recommended model", body: "Local GPU deployment is recommended for on-site networks, reviewed content, and controlled updates." },
    ],
    outcomes: ["More continuous exhibit narration", "More natural visitor interaction", "Reusable exhibition content"],
  },
  {
    slug: "government-service-guide",
    title: "Government Service Guide",
    eyebrow: "Process guidance",
    category: "public-service",
    categoryLabel: "Public service",
    description: "Explain eligibility, document checklists, and service procedures so citizens can understand what to do next.",
    detailIntro: "Use a digital guide for public service counters, online portals, and policy service centers.",
    route: "Private deployment",
    features: ["Process knowledge", "Policy Q&A", "Safe wording"],
    image: "/images/cases/coming-soon.svg",
    accent: "amber",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "Public service workflows involve conditions, documents, deadlines, and exceptions that users often need explained step by step." },
      { title: "OpenTalking setup", body: "Load service catalogs, document templates, and policy FAQs into knowledge, then guide users through voice and captions." },
      { title: "Recommended model", body: "Private deployment is recommended for government knowledge, service data, and review requirements." },
    ],
    outcomes: ["Clearer service paths", "Fewer repetitive counter questions", "More consistent policy wording"],
  },
  {
    slug: "hospital-triage-assistant",
    title: "Hospital Navigation Assistant",
    eyebrow: "Patient guidance",
    category: "public-service",
    categoryLabel: "Public service",
    description: "Explain departments, hospital routes, checkup reminders, and service hours for patients and visitors.",
    detailIntro: "Build a digital hospital guide that helps patients understand service locations, steps, and preparation notes.",
    route: "Local GPU",
    features: ["Hospital knowledge", "Process guidance", "Safety boundaries"],
    image: "/images/cases/coming-soon.svg",
    accent: "rose",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "Hospitals receive high volumes of repeated navigation and process questions, especially from first-time patients." },
      { title: "OpenTalking setup", body: "Connect hospital service knowledge and safety reminders to an avatar that explains routes, timing, and preparation steps." },
      { title: "Recommended model", body: "Local GPU deployment is recommended for internal information management and sensitive service boundaries." },
    ],
    outcomes: ["Less pressure on front-desk staff", "Faster patient understanding", "Unified service information"],
  },
  {
    slug: "senior-care-companion",
    title: "Senior Care Companion",
    eyebrow: "Care service",
    category: "public-service",
    categoryLabel: "Public service",
    description: "Provide daily reminders, activity notices, health education, and gentle companionship for senior care and community services.",
    detailIntro: "Create a warm digital companion for community notices, daily reminders, and basic conversational support.",
    route: "QuickTalk",
    features: ["Memory layer", "Daily reminders", "Warm persona"],
    image: "/images/cases/companion.jpeg",
    accent: "violet",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "Senior care services need patient, repeated, and long-term communication that is difficult to cover manually at all times." },
      { title: "OpenTalking setup", body: "Configure a warm persona, reminder knowledge, and lightweight memory to support activity notices and everyday conversation." },
      { title: "Recommended model", body: "QuickTalk is recommended for a lightweight first version focused on rhythm, warmth, and service flow." },
    ],
    outcomes: ["Warmer community service", "More reliable daily reminders", "Useful long-term companion prototype"],
  },
  {
    slug: "virtual-ip-short-video",
    title: "Virtual IP Short-video Series",
    eyebrow: "IP content",
    category: "creative",
    categoryLabel: "Creative",
    description: "Build a virtual IP with stable persona, voice, and script templates for ongoing short-video production.",
    detailIntro: "Combine persona design, scripts, voice, and avatar video into a repeatable virtual IP content workflow.",
    route: "QuickTalk / FlashTalk",
    features: ["Persona design", "Voice profile", "Program templates"],
    image: "/images/cases/anime-talk-show-preview.png",
    accent: "violet",
    featured: true,
    statusLabel: "Full story",
    sections: [
      { title: "Use case", body: "Virtual IP content depends on steady persona, style, and iteration speed, not just avatar rendering quality." },
      { title: "OpenTalking setup", body: "Configure persona, voice, and script templates so teams can turn ideas into repeatable avatar-led short videos." },
      { title: "Recommended model", body: "Start with QuickTalk to validate the character format, then move to FlashTalk for better visual polish." },
    ],
    outcomes: ["Stable character output", "Lower short-video production cost", "Reusable brand IP workflow"],
  },
  {
    slug: "game-npc-dialogue",
    title: "Game NPC Dialogue",
    eyebrow: "Interactive character",
    category: "creative",
    categoryLabel: "Creative",
    description: "Connect game lore, character memory, and quest context to create more immersive NPC conversations.",
    detailIntro: "Build speaking, memory-aware digital characters for games, interactive installations, and virtual worlds.",
    route: "Local audio + QuickTalk",
    features: ["Character memory", "Lore knowledge", "Voice interaction"],
    image: "/images/cases/anime-talk-show-preview.png",
    accent: "amber",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "NPC dialogue needs persona consistency, quest context, and low-latency feedback beyond fixed lines." },
      { title: "OpenTalking setup", body: "Load lore, quest state, and character memory into the conversation layer, then return voice and avatar feedback." },
      { title: "Recommended model", body: "Local audio plus QuickTalk is recommended for lower latency in prototypes and interactive installations." },
    ],
    outcomes: ["More natural NPC interaction", "Reusable character memory", "Stronger interactive prototype"],
  },
  {
    slug: "anime-talk-show",
    title: "Animated Talk Show",
    eyebrow: "Character show",
    category: "creative",
    categoryLabel: "Creative",
    description: "Connect animated characters, scripts, and real-time voice to validate interactive character content quickly.",
    detailIntro: "Bring a character concept to life by combining persona, scripts, voice style, and avatar video in a talk-show format.",
    route: "Mock first, then Local",
    features: ["Persona design", "Creative scripts", "Fast validation"],
    image: "/images/cases/anime-talk-show-preview.png",
    accent: "violet",
    statusLabel: "Full story",
    videoUrl: "https://1441945933.vod-qcloud.com/0b66444dvodcq1441945933/53e1ae875001834806729384095/y2rxrMrkX9AA.mp4",
    sections: [
      { title: "Use case", body: "Character content needs fast iteration across persona, line delivery, and interaction rhythm." },
      { title: "OpenTalking setup", body: "Add multi-character switching, show scripts, audience interaction, and an asset library for repeatable character production." },
      { title: "Recommended model", body: "Use Mock first, then QuickTalk, to validate persona and rhythm before investing in higher-quality rendering." },
    ],
    outcomes: ["Validate character persona quickly", "Lower content iteration cost", "Expandable multi-role interaction"],
  },
  {
    slug: "creative-performance",
    title: "Creative Singing / Imitation",
    eyebrow: "Voice performance",
    category: "creative",
    categoryLabel: "Creative",
    description: "Experiment with voice style, avatar performance, and creative interaction while switching model backends in the same product shell.",
    detailIntro: "A creative playground for comparing models, voices, scripts, and avatar performances without rebuilding the demo each time.",
    route: "Local / OmniRT",
    features: ["Voice imitation", "Character performance", "Backend switching"],
    image: "/images/cases/creative-performance-preview.png",
    accent: "rose",
    statusLabel: "Full story",
    videoUrl: "https://1441945933.vod-qcloud.com/0b66444dvodcq1441945933/26e7d30f5001834806725677498/DDWi04ozqdsA.mp4",
    sections: [
      { title: "Use case", body: "Creative concepts change quickly, and teams often need to compare voices, visuals, and scripts without rebuilding the whole demo." },
      { title: "OpenTalking setup", body: "Add asset management, templates, and recording export so experiments can become reusable short videos or performance assets." },
      { title: "Recommended model", body: "Local backends are useful for fast iteration, while OmniRT is better for delivery-quality performance." },
    ],
    outcomes: ["Compare model results quickly", "Good for content-team iteration", "Reusable demo templates"],
  },
  {
    slug: "digital-twin-knowledge-creator",
    title: "Digital Twin Knowledge Creator",
    eyebrow: "Personal knowledge",
    category: "creative",
    categoryLabel: "Creative",
    description: "Combine a personal knowledge base, voice style, and avatar identity to publish opinions, lessons, and Q&A content continuously.",
    detailIntro: "Create a digital twin for experts, creators, and founders who want to turn knowledge assets into consistent video output.",
    route: "FlashTalk / OmniRT",
    features: ["Personal knowledge", "Voice cloning", "Memory layer"],
    image: "/images/cases/creative-performance-preview.png",
    accent: "slate",
    statusLabel: "Planned story",
    sections: [
      { title: "Use case", body: "Knowledge creators need consistent output, but recording every lesson, update, and answer takes too much time." },
      { title: "OpenTalking setup", body: "Combine personal knowledge, speaking style, voice, and avatar identity into a reusable digital twin workflow." },
      { title: "Recommended model", body: "FlashTalk or OmniRT is recommended for public-facing digital twins and long-term creator branding." },
    ],
    outcomes: ["Video-ready knowledge assets", "Reusable personal style", "Long-term creator workflow"],
  },
];

const enDeploymentRoutes: DeploymentRoute[] = [
  {
    name: "Fast Trial and Demo",
    badge: "No GPU",
    description:
      "Run the conversation, speech, captions, and browser playback experience before preparing model weights or inference services.",
    models: "Static avatar image + real LLM/TTS/WebRTC path",
    bestFor: "Product teams, solution demos, and first-time OpenTalking evaluations",
    outcome: "Get a demo-ready prototype running in minutes",
  },
  {
    name: "Local Offline Validation",
    badge: "Local GPU",
    description:
      "Run real-time avatar rendering on your own GPU workstation or server while keeping assets, audio, and sessions local.",
    models: "QuickTalk / Wav2Lip / MuseTalk local backends",
    bestFor: "Content teams, offline workflows, private validation, and custom avatar projects",
    outcome: "Generate avatar video in a controlled local environment",
  },
  {
    name: "Production Delivery",
    badge: "Inference Server",
    description:
      "Separate the product layer from model inference for better visual quality, multi-GPU scaling, and stable long-running service.",
    models: "FlashTalk / FlashHead",
    bestFor: "Teams that need higher visual quality, concurrency, and clearer service boundaries",
    outcome: "Production-ready AI avatar output",
  },
];

const enTestimonials: Testimonial[] = [
  {
    quote:
      "We validated scripts and interaction in Mock mode first, then switched to a local model for visual quality checks. That loop is exactly what early avatar prototyping needs.",
    name: "Content Team",
    role: "Short video and livestream",
    avatar: "/images/avatars/content-team.svg",
  },
  {
    quote:
      "OpenTalking makes the LLM, voice, captions, and WebRTC flow easy to explain, which helped us align quickly on private demos and client delivery.",
    name: "Delivery Team",
    role: "Private deployment",
    avatar: "/images/avatars/delivery-team.svg",
  },
  {
    quote:
      "The model backend is replaceable, and the frontend events are clear enough for us to connect our own avatar model and business workflow quickly.",
    name: "Community Developer",
    role: "Model adaptation",
    avatar: "/images/avatars/developer.svg",
  },
];

const enContactChannels: typeof zhContactChannels = [
  {
    title: "QQ Community",
    description: "Discuss real-time avatars, FlashTalk, OmniRT, model deployment, and product scenarios.",
    value: "",
    href: "",
    kind: "qq",
  },
  {
    title: "Partnership",
    description: "Private deployment, scenario co-creation, model integration, and enterprise partnerships.",
    value: "opentalking-ai@outlook.com",
    href: "mailto:opentalking-ai@outlook.com",
    kind: "email",
  },
  {
    title: "GitHub",
    description: "Open issues, submit PRs, share scenarios, and help improve the docs.",
    value: "datascale-ai/opentalking",
    href: productLinks.github,
    kind: "github",
  },
];

export const siteContent: Record<Language, SiteContent> = {
  zh: {
    navItems: zhNavItems,
    capabilities: zhCapabilities,
    caseCategories: zhCaseCategories,
    caseStudies: zhCaseStudies,
    deploymentRoutes: zhDeploymentRoutes,
    testimonials: zhTestimonials,
    contactChannels: zhContactChannels,
    docsHref: productLinks.docsZh,
    navbar: {
      tagline: "Real-time avatar platform",
      languageLabel: "切换语言",
      menuOpen: "打开导航",
      menuClose: "关闭导航",
    },
    home: {
      heroTitleTop: "开源实时数字人",
      heroTitleAccent: "生成与对话框架",
      heroDescription:
        "从文本、语音到数字人视频，OpenTalking 帮你快速搭建可本地运行、可二次开发、可私有化部署的数字人应用。",
      demoCta: "看看 Demo",
      quickStartCta: "快速开始",
      capabilityEyebrow: "Product capability",
      capabilityTitle: "从对话到画面，核心链路一次跑通",
      capabilityDescription: "OpenTalking 把会话、语音、字幕、播放和模型服务串成完整的数字人产品链路。",
      showcaseEyebrow: "Showcase",
      showcaseTitle: "真实产品场景，为数字人服务而生",
      showcaseDescription: "用同一套编排层覆盖直播、播报、陪伴、角色内容和端到端演示。",
      allCasesCta: "全部案例",
      deploymentEyebrow: "Deployment",
      deploymentTitle: "按你的需求匹配不同部署方式",
      deploymentDescription: "从快速演示、本地离线到高质量交付，沿着同一套链路逐步升级。",
      deploymentDocsCta: "查看部署文档",
      wordEyebrow: "Word of mouth",
      wordTitle: "看看用户们的口碑",
      wordDescription: "谁在使用它？",
      feedbackLabel: "使用反馈",
      finalCtaTitle: "也想试试自己的数字人应用？",
      finalCtaDescription: "来试试Demo，再选择模型、音色和业务场景定制你的角色。",
      finalCasesCta: "查看案例",
      githubRepoCta: "GitHub 仓库",
    },
    heroStage: {
      sessionLabel: "live-session: 24fps",
      recordingLabel: "实时录制演示",
      portraitLabel: "竖屏素材",
      productPanelTitle: "产品链路",
      pipelineItems: [
        { label: "LLM大脑", value: "Qwen / DeepSeek / GPT" },
        { label: "声音与字幕", value: "TTS / STT / 多音色 / 音色克隆" },
        { label: "数字人驱动", value: "QuickTalk / Wav2Lip / FlashTalk" },
        { label: "实时播放", value: "WebRTC audio/video" },
      ],
      highlights: [
        { title: "角色定制", meta: "Persona" },
        { title: "音色模仿", meta: "Voice clone" },
        { title: "记忆系统", meta: "Memory" },
        { title: "知识装载", meta: "Knowledge" },
      ],
    },
    showcase: {
      featuredLabel: "Featured scenario",
      openResourceCta: "查看资源页",
      previousLabel: "上一个案例",
      nextLabel: "下一个案例",
    },
    deploymentCard: {
      outcomeLabel: "预期效果",
      modelsLabel: "模型：",
      bestForLabel: "适合：",
    },
    casesPage: {
      eyebrow: "Customer stories",
      title: "行业场景与案例",
      description: "OpenTalking 在直播、播报、陪伴互动和内容生产中的应用落地。",
      contributionLine: "欢迎发现有趣的应用落地贡献给我们！",
      filterTitle: "场景分类",
      resourceNote: "每个案例沉淀业务背景、演示视频、实施方案与预期收益，便于快速判断是否适合你的场景。",
      comingSoonLabel: "Coming soon",
    },
    caseDetail: {
      backToLibrary: "返回案例库",
      videoTitle: "案例视频",
      outcomesTitle: "预期收益",
      docsCta: "查看部署文档",
      relatedEyebrow: "Related stories",
      relatedTitle: "继续查看相关场景",
    },
    about: {
      contactEyebrow: "Contact",
      titlePrefix: "联系",
      titleBrand: "OpenTalking",
      titleSuffix: "团队",
      intro: "无论是开源交流、私有化部署、模型接入还是场景共创，通过下面方式联系我们。",
      qqTitle: "QQ 交流群",
      qqValue: "QQ: 1103327938",
      qqDescription: "讨论部署、模型、产品场景和二次开发。",
      collaborationEyebrow: "Collaboration",
      collaborationTitle: "聊聊合作？",
      collaborationDescription: "如果你正在评估实时数字人产品、内容生产工具或私有化部署路线，欢迎找我们沟通合作。",
      cooperationAreas: [
        { title: "私有化部署与本地离线方案", copy: "围绕企业数据边界、GPU 资源和模型服务形态，评估从 Demo 到本地交付的部署路径。" },
        { title: "数字人模型、音色与形象接入", copy: "接入不同数字人驱动模型、TTS 音色和角色资产，让 OpenTalking 适配更多内容生产流程。" },
        { title: "直播、短视频、课程场景共创", copy: "把行业脚本、素材管理、演示视频和交互能力沉淀为可复用的数字人解决方案。" },
        { title: "开源二次开发与技术支持", copy: "面向产品团队和开发者，支持 API 集成、模型适配、部署经验和文档改进。" },
      ],
      communityEyebrow: "Open source community",
      communityTitle: "来与我们一起开源共建吧！",
      communityDescription: "如果你对数字人的应用也感兴趣，欢迎提交模型适配、部署经验、行业案例和文档改进，也欢迎把你基于 OpenTalking 做出的产品形态分享给社区。",
      githubCta: "GitHub 仓库",
      docsCta: "阅读文档",
    },
    footer: {
      tagline: "开源实时数字人生成与对话框架",
      description: "从 Demo、素材生产到私有化部署，帮助团队更快构建可落地的数字人应用。",
      siteTitle: "站点",
      resourcesTitle: "资源",
      docsPrimary: "中文文档",
      docsSecondary: "English Docs",
      communityTitle: "加入交流群",
      communityName: "AI 数字人交流群",
      communityDescription: "讨论部署、模型接入、内容场景和二次开发。",
    },
  },
  en: {
    navItems: enNavItems,
    capabilities: enCapabilities,
    caseCategories: enCaseCategories,
    caseStudies: enCaseStudies,
    deploymentRoutes: enDeploymentRoutes,
    testimonials: enTestimonials,
    contactChannels: enContactChannels,
    docsHref: productLinks.docsEn,
    navbar: {
      tagline: "Real-time avatar platform",
      languageLabel: "Switch language",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    home: {
      heroTitleTop: "Real-time",
      heroTitleAccent: "Avatar Platform",
      heroDescription:
        "OpenTalking helps teams build local, extensible, privately deployable avatar apps from text and voice to real-time video.",
      demoCta: "View demos",
      quickStartCta: "Quick start",
      capabilityEyebrow: "Product capability",
      capabilityTitle: "From conversation to video, in one flow",
      capabilityDescription: "OpenTalking connects dialogue, voice, captions, playback, and model services into a complete AI avatar workflow.",
      showcaseEyebrow: "Showcase",
      showcaseTitle: "Built for real avatar use cases",
      showcaseDescription: "Use the same orchestration layer for livestreaming, broadcast, companion experiences, character content, and end-to-end demos.",
      allCasesCta: "All cases",
      deploymentEyebrow: "Deployment",
      deploymentTitle: "Pick the right path for your stage",
      deploymentDescription: "Start with a quick demo, move to local offline validation, and upgrade to higher-quality delivery on the same architecture.",
      deploymentDocsCta: "Deployment docs",
      wordEyebrow: "Community voices",
      wordTitle: "What builders are saying",
      wordDescription: "Teams are using OpenTalking to prototype, customize, and ship AI avatar experiences.",
      feedbackLabel: "OpenTalking feedback",
      finalCtaTitle: "Ready to prototype your own avatar app?",
      finalCtaDescription: "Start from the demo, then bring in your model, voice, persona, and product workflow.",
      finalCasesCta: "View cases",
      githubRepoCta: "GitHub repo",
    },
    heroStage: {
      sessionLabel: "live-session: 24fps",
      recordingLabel: "Real-time Demo",
      portraitLabel: "Portrait asset",
      productPanelTitle: "Product pipeline",
      pipelineItems: [
        { label: "LLM Brain", value: "Qwen / DeepSeek / GPT" },
        { label: "Voice and Captions", value: "TTS / STT / Voice clone" },
        { label: "Avatar Driver", value: "QuickTalk / Wav2Lip / FlashTalk" },
        { label: "Real-time Playback", value: "WebRTC audio/video" },
      ],
      highlights: [
        { title: "Persona", meta: "Character" },
        { title: "Voice Clone", meta: "Voice" },
        { title: "Memory layer", meta: "Memory" },
        { title: "Knowledge Base", meta: "Context" },
      ],
    },
    showcase: {
      featuredLabel: "Featured scenario",
      openResourceCta: "Open resource",
      previousLabel: "Previous case",
      nextLabel: "Next case",
    },
    deploymentCard: {
      outcomeLabel: "Expected outcome",
      modelsLabel: "Models: ",
      bestForLabel: "Best for: ",
    },
    casesPage: {
      eyebrow: "Customer stories",
      title: "Use Cases and Stories",
      description: "Explore OpenTalking in livestreaming, broadcast, companion, and content production.",
      contributionLine: "Built something interesting with OpenTalking? We would love to feature it.",
      filterTitle: "Browse by scenario",
      resourceNote: "Each story captures the business context, demo media, implementation approach, and expected value so teams can evaluate fit quickly.",
      comingSoonLabel: "Coming soon",
    },
    caseDetail: {
      backToLibrary: "Back to cases",
      videoTitle: "Case video",
      outcomesTitle: "Expected outcomes",
      docsCta: "Deployment docs",
      relatedEyebrow: "Related stories",
      relatedTitle: "Explore related scenarios",
    },
    about: {
      contactEyebrow: "Contact",
      titlePrefix: "Contact the",
      titleBrand: "OpenTalking",
      titleSuffix: "Team",
      intro: "Reach out for open-source collaboration, private deployment, model integration, or new AI avatar scenarios.",
      qqTitle: "QQ Community",
      qqValue: "QQ: 1103327938",
      qqDescription: "Discuss deployment, models, product scenarios, and custom development.",
      collaborationEyebrow: "Collaboration",
      collaborationTitle: "Build together",
      collaborationDescription: "If your team is evaluating real-time avatar products, content workflows, or private deployment, we would be glad to talk.",
      cooperationAreas: [
        { title: "Private deployment and offline setup", copy: "Map the path from demo to local delivery around data boundaries, GPU resources, and model service architecture." },
        { title: "Avatar models, voices, and identity", copy: "Integrate avatar drivers, TTS voices, and character assets so OpenTalking fits more content workflows." },
        { title: "Livestream, short video, and learning scenarios", copy: "Turn scripts, asset management, demo videos, and interaction patterns into reusable AI avatar solutions." },
        { title: "Open-source development support", copy: "Work with teams and developers on API integration, model adaptation, deployment notes, and documentation improvements." },
      ],
      communityEyebrow: "Open source community",
      communityTitle: "Contribute to community",
      communityDescription: "Contribute model adapters, deployment guides, scenario demos, documentation improvements, or applications to OpenTalking!",
      githubCta: "GitHub repo",
      docsCta: "Read docs",
    },
    footer: {
      tagline: "Real-time AI avatar platform",
      description: "From demos and content production to private deployment, OpenTalking helps teams build shippable avatar applications faster.",
      siteTitle: "Site",
      resourcesTitle: "Resources",
      docsPrimary: "Chinese Docs",
      docsSecondary: "English Docs",
      communityTitle: "Join community",
      communityName: "AI Avatar QQ Group",
      communityDescription: "Discuss deployment, model integration, content scenarios, and custom development.",
    },
  },
};
