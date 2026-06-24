export type PageKey = "home" | "docs" | "cases" | "about" | "caseDetail";

export type NavItem = {
  key: PageKey;
  label: string;
};

export type Capability = {
  title: string;
  description: string;
  meta: string;
  icon: "radio" | "user" | "captions" | "plug";
};

export type CaseCategoryKey =
  | "commerce"
  | "media"
  | "education"
  | "enterprise"
  | "public-service"
  | "creative";

export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  category: CaseCategoryKey;
  categoryLabel: string;
  description: string;
  detailIntro: string;
  route: string;
  features: string[];
  image: string;
  imagePosition?: string;
  accent: "cyan" | "mint" | "amber" | "violet" | "rose" | "slate";
  comingSoon?: boolean;
  featured?: boolean;
  statusLabel?: string;
  videoUrl?: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  outcomes: string[];
};

export type DeploymentRoute = {
  name: string;
  badge: string;
  description: string;
  models: string;
  bestFor: string;
  outcome: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export type DocsGroup = {
  title: string;
  description: string;
  links: Array<{
    label: string;
    href: string;
  }>;
};

export const navItems: NavItem[] = [
  { key: "home", label: "首页" },
  { key: "docs", label: "文档" },
  { key: "cases", label: "案例" },
  { key: "about", label: "关于我们" },
];

export const productLinks = {
  docsZh: "https://datascale-ai.github.io/opentalking/",
  docsEn: "https://datascale-ai.github.io/opentalking/en/",
  github: "https://github.com/datascale-ai/opentalking",
};

export const liveSignals = [
  "字幕事件",
  "打断控制",
  "记忆系统",
  "角色音色",
];

export const caseCategories = [
  { key: "all", label: "全部场景" },
  { key: "commerce", label: "电商零售" },
  { key: "media", label: "媒体内容" },
  { key: "education", label: "教育培训" },
  { key: "enterprise", label: "企业服务" },
  { key: "public-service", label: "文旅公服" },
  { key: "creative", label: "创意娱乐" },
] as const;

export const capabilities: Capability[] = [
  {
    title: "实时对话编排",
    description:
      "把前端交互、会话状态、LLM 回复、流式语音和 WebRTC 播放组织成稳定的产品链路。",
    meta: "Session / LLM / WebRTC",
    icon: "radio",
  },
  {
    title: "角色与音色配置",
    description:
      "支持选择或创建数字人物，配置声音、TTS、STT 与驱动模型，适合多角色产品验证。",
    meta: "Avatar / Voice / Provider",
    icon: "user",
  },
  {
    title: "字幕与打断控制",
    description:
      "面向真实对话体验，保留字幕事件、语音播放状态和用户打断控制等关键产品细节。",
    meta: "Events / Interruptions",
    icon: "captions",
  },
  {
    title: "可插拔模型后端",
    description:
      "从本地快速启动，到远端高质量模型推理部署，按算力和质量需求渐进部署。",
    meta: "wav2lip / flashtalk",
    icon: "plug",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "ecommerce-livestream",
    title: "电商直播数字人",
    eyebrow: "高频互动",
    category: "commerce",
    categoryLabel: "电商零售",
    description: "面向商品讲解、评论问答和直播间陪跑，把商品知识库、语音回复、字幕和实时视频整合到同一链路。",
    detailIntro: "用 OpenTalking 搭建可互动的数字人直播间，让商品介绍、用户问题和优惠转化通过实时语音与画面完成。",
    route: "OmniRT / FlashTalk",
    features: ["商品知识库", "实时问答", "字幕同步"],
    image: "/images/cases/live-sales.jpeg",
    accent: "amber",
    featured: true,
    statusLabel: "完整案例",
    videoUrl: "https://1441945933.vod-qcloud.com/0b66444dvodcq1441945933/d9d848c95001834806724661995/SaicQA0Ah7QA.mp4",
    sections: [
      { title: "业务场景", body: "直播间需要长时间讲解商品、回应评论和稳定表达优惠信息，数字人可以承担重复且高频的讲解工作。" },
      { title: "OpenTalking 方案", body: "接入商品知识库、促销脚本和评论流，由 LLM 生成回复，再通过 TTS、字幕事件和 WebRTC 输出实时数字人画面。" },
      { title: "推荐模型", body: "推荐 FlashTalk / OmniRT：口型和画面稳定性更适合长时段直播、品牌带货和面向客户展示的高质量场景。" },
    ],
    outcomes: ["减少重复讲解成本", "评论问答实时响应", "沉淀直播间模板"],
  },
  {
    slug: "local-life-host",
    title: "本地生活团购主播",
    eyebrow: "门店转化",
    category: "commerce",
    categoryLabel: "电商零售",
    description: "为餐饮、美业、健身和门店团购讲解套餐内容、活动规则、预约方式和到店权益。",
    detailIntro: "把门店活动、区域话术和团购规则整理成数字人讲解流程，帮助本地商家低成本完成内容生产。",
    route: "QuickTalk / FlashTalk",
    features: ["门店知识库", "活动话术", "音色配置"],
    image: "/images/cases/live-sales.jpeg",
    accent: "mint",
    statusLabel: "完整案例",
    sections: [
      { title: "业务场景", body: "本地生活商家需要高频解释套餐差异、门店位置、使用限制和预约方式，短视频和直播素材更新频繁。" },
      { title: "OpenTalking 方案", body: "将门店 FAQ、活动规则和套餐脚本装载为知识库，配置品牌音色和主播形象，快速生成讲解与问答内容。" },
      { title: "推荐模型", body: "推荐 QuickTalk 起步，验证门店话术和转化路径；对外投放素材可升级 FlashTalk 获得更稳定的视觉效果。" },
    ],
    outcomes: ["门店活动解释更清晰", "降低团购素材制作成本", "适合多城市模板复用"],
  },
  {
    slug: "cross-border-shopping-guide",
    title: "跨境电商多语种导购",
    eyebrow: "全球化导购",
    category: "commerce",
    categoryLabel: "电商零售",
    description: "面向海外买家，用多语言数字人讲解商品卖点、尺码、物流、关税和售后问题。",
    detailIntro: "为跨境商品建立多语言导购角色，让商品说明、售前问答和售后提示保持一致表达。",
    route: "FlashTalk / OmniRT",
    features: ["多语言 TTS", "商品知识库", "字幕同步"],
    image: "/images/cases/live-sales.jpeg",
    accent: "cyan",
    statusLabel: "完整案例",
    sections: [
      { title: "业务场景", body: "跨境商品需要在不同语言市场中解释卖点和售后规则，人工录制多语种视频成本高且迭代慢。" },
      { title: "OpenTalking 方案", body: "用商品知识库统一事实口径，为不同市场配置语言、音色和字幕，输出可复用的导购视频和实时问答体验。" },
      { title: "推荐模型", body: "推荐 FlashTalk / OmniRT：适合多语种展示、品牌出海素材和对画质一致性有要求的导购场景。" },
    ],
    outcomes: ["降低多语种内容成本", "商品信息表达一致", "支持海外售前问答"],
  },
  {
    slug: "private-domain-shopping-assistant",
    title: "私域社群商品助手",
    eyebrow: "私域运营",
    category: "commerce",
    categoryLabel: "电商零售",
    description: "在社群和私域运营中，用数字人解释活动、商品组合和购买路径，辅助运营人员完成高频答疑。",
    detailIntro: "将社群 FAQ、活动日历和用户分层话术转成数字人助手，适合私域直播、社群运营和会员活动。",
    route: "Local GPU",
    features: ["活动知识库", "记忆系统", "用户分层"],
    image: "/images/cases/coming-soon.svg",
    accent: "violet",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "私域运营需要持续解释活动规则、库存状态和购买路径，用户问题重复但又需要结合上下文回复。" },
      { title: "OpenTalking 方案", body: "把活动话术、商品组合和会员权益装入知识库，配合记忆系统记录偏好，用数字人完成更自然的答疑。" },
      { title: "推荐模型", body: "推荐 Local GPU 路线：便于接入私域数据和用户标签，同时控制数据边界和响应延迟。" },
    ],
    outcomes: ["减少社群重复答疑", "运营话术统一", "支持会员分层沟通"],
  },
  {
    slug: "product-launch-host",
    title: "新品发布会数字主持",
    eyebrow: "品牌发布",
    category: "commerce",
    categoryLabel: "电商零售",
    description: "让数字人承担新品发布会的开场、卖点串讲、互动问答和会后内容切片。",
    detailIntro: "为新品发布建立数字主持人，把产品卖点、流程脚本和互动问答组织成可复用发布模板。",
    route: "OmniRT",
    features: ["长文本播报", "沉浸模式", "品牌角色"],
    image: "/images/cases/coming-soon.svg",
    accent: "rose",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "新品发布需要稳定的主持节奏、统一品牌表达和可复用的视频素材，传统拍摄和主持排期成本较高。" },
      { title: "OpenTalking 方案", body: "通过发布会脚本、产品知识库和品牌音色配置，让数字主持人完成串场、卖点讲解和观众问答。" },
      { title: "推荐模型", body: "推荐 OmniRT：适合对视觉稳定性、品牌质感和交付画面要求更高的发布会场景。" },
    ],
    outcomes: ["统一品牌发布表达", "发布流程可模板化", "沉淀会后传播素材"],
  },
  {
    slug: "news-anchor",
    title: "新闻主播",
    eyebrow: "稳定播报",
    category: "media",
    categoryLabel: "媒体内容",
    description: "适合新闻播报、公告解读和品牌内容栏目，稳定输出长文本播报内容。",
    detailIntro: "把新闻文本、主播角色和实时视频输出组织起来，适合企业公告、财经播报、课程资讯和品牌栏目。",
    route: "QuickTalk / FlashTalk",
    features: ["长文本播报", "音色配置", "WebRTC 播放"],
    image: "/images/cases/news-anchor.jpeg",
    accent: "cyan",
    featured: true,
    statusLabel: "完整案例",
    videoUrl: "https://1441945933.vod-qcloud.com/0b66444dvodcq1441945933/1006e25f5001834806728756004/iscjqpxwBUAA.mp4",
    sections: [
      { title: "业务场景", body: "媒体和企业需要稳定、可重复的内容播报，长文本内容要求口型稳定、语速自然、栏目风格一致。" },
      { title: "OpenTalking 方案", body: "将脚本输入、主播角色、TTS 音色和数字人后端组合起来，形成可栏目化复用的播报流程。" },
      { title: "推荐模型", body: "推荐 QuickTalk / FlashTalk：前者适合本地快速验证，后者更适合稳定长文本播报和栏目化内容输出。" },
    ],
    outcomes: ["日更栏目制作更轻", "主播形象可切换", "播报风格稳定统一"],
  },
  {
    slug: "enterprise-announcement-anchor",
    title: "企业公告播报",
    eyebrow: "内部传播",
    category: "media",
    categoryLabel: "媒体内容",
    description: "将企业通知、版本更新、内部公告转成统一形象的数字人播报，提高信息触达和阅读意愿。",
    detailIntro: "为企业建立可复用的数字播报员，用统一形象输出内部通知、版本更新和品牌公告。",
    route: "QuickTalk / Wav2Lip",
    features: ["公告脚本", "私有化部署", "批量生成"],
    image: "/images/cases/news-anchor.jpeg",
    accent: "slate",
    statusLabel: "完整案例",
    sections: [
      { title: "业务场景", body: "企业公告通常依赖文字通知，阅读率和理解效率有限；视频化表达又容易受拍摄成本和排期影响。" },
      { title: "OpenTalking 方案", body: "把公告文本、品牌形象和固定音色配置为播报模板，结合字幕输出和批量生成形成内部传播素材。" },
      { title: "推荐模型", body: "推荐 QuickTalk / Wav2Lip：适合本地批量生成和私有化部署，对企业内部内容更容易控制数据边界。" },
    ],
    outcomes: ["公告触达更直观", "内部表达更标准", "适合批量视频化"],
  },
  {
    slug: "financial-morning-brief",
    title: "财经早报主播",
    eyebrow: "数据播报",
    category: "media",
    categoryLabel: "媒体内容",
    description: "每天自动播报市场摘要、行业快讯和重点数据，为投研团队和财经自媒体提供稳定内容入口。",
    detailIntro: "将财经数据、行业快讯和分析摘要转成数字人早报，适合固定栏目和自动化内容生产。",
    route: "QuickTalk",
    features: ["数据摘要", "定时脚本", "栏目模板"],
    image: "/images/cases/news-anchor.jpeg",
    accent: "amber",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "财经早报依赖固定时段更新，内容结构稳定但数据密集，需要兼顾准确性、节奏和可视化解释。" },
      { title: "OpenTalking 方案", body: "接入结构化数据和投研摘要，由脚本模板生成播报内容，再通过数字主播输出栏目视频。" },
      { title: "推荐模型", body: "推荐 QuickTalk：适合快速生成日更播报素材，后续可接入更高质量模型做品牌栏目升级。" },
    ],
    outcomes: ["降低日更早报成本", "数据解读更可视化", "适合固定栏目运营"],
  },
  {
    slug: "medical-science-broadcast",
    title: "医疗科普播报",
    eyebrow: "健康教育",
    category: "media",
    categoryLabel: "媒体内容",
    description: "将健康知识、疾病科普和就诊提醒转成通俗易懂的视频内容，辅助医疗健康机构做科普传播。",
    detailIntro: "用经过审核的健康知识库生成数字人科普视频，适合慢病管理、就诊提醒和公益健康教育。",
    route: "Local GPU",
    features: ["审核知识库", "安全话术", "字幕同步"],
    image: "/images/cases/coming-soon.svg",
    accent: "mint",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "医疗科普需要表达准确、语言通俗，并且能够在不同疾病主题之间快速复用内容生产流程。" },
      { title: "OpenTalking 方案", body: "建立审核知识库和安全话术边界，让数字人按照固定模板讲解健康知识，并保留字幕方便二次审核。" },
      { title: "推荐模型", body: "推荐 Local GPU：便于在机构内网使用审核资料和私有内容，先保证知识来源与表达边界可控。" },
    ],
    outcomes: ["科普内容生产更快", "医疗表达更可审核", "适合健康教育短视频"],
  },
  {
    slug: "policy-explainer-anchor",
    title: "政策解读数字播报",
    eyebrow: "公共信息",
    category: "media",
    categoryLabel: "媒体内容",
    description: "把政策条款、办事流程和通知公告转为可听可看的数字人解读，降低理解门槛。",
    detailIntro: "面向政务、园区和企业服务中心，将复杂政策内容拆解为数字人解读和问答入口。",
    route: "Local GPU",
    features: ["政策知识库", "流程解释", "多轮问答"],
    image: "/images/cases/coming-soon.svg",
    accent: "violet",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "政策文本专业且冗长，企业和公众往往更关心办理条件、材料、流程和适用边界。" },
      { title: "OpenTalking 方案", body: "把政策条文、FAQ 和办理流程装入知识库，让数字播报员先解释重点，再引导用户进入问答。" },
      { title: "推荐模型", body: "推荐 Local GPU：适合政企知识库和流程资料在可控环境内运行，同时保留部署弹性。" },
    ],
    outcomes: ["政策理解门槛降低", "办事流程解释更清晰", "便于持续更新知识库"],
  },
  {
    slug: "ai-course-instructor",
    title: "AI 课程讲师",
    eyebrow: "课程生产",
    category: "education",
    categoryLabel: "教育培训",
    description: "将课件、讲义和知识库转为数字人课程讲解，并支持课后问答与课程内容快速更新。",
    detailIntro: "用数字讲师承接课程讲解、知识点串联和课后问答，适合在线课程、企业课程和知识付费内容。",
    route: "QuickTalk / FlashTalk",
    features: ["课件知识库", "沉浸模式", "字幕同步"],
    image: "/images/cases/companion.jpeg",
    accent: "cyan",
    featured: true,
    statusLabel: "完整案例",
    sections: [
      { title: "业务场景", body: "课程内容需要规模化讲解和稳定表达，真人录课成本高，课程更新后还要重新录制。" },
      { title: "OpenTalking 方案", body: "把课件、讲义和题库整理为知识库，配置数字讲师形象和音色，生成课程讲解与课后答疑体验。" },
      { title: "推荐模型", body: "推荐 QuickTalk / FlashTalk：先快速验证讲解节奏，再根据课程品牌和画质需求升级模型。" },
    ],
    outcomes: ["降低录课成本", "课程更新更轻量", "支持问答式学习体验"],
  },
  {
    slug: "enterprise-training-instructor",
    title: "企业培训讲师",
    eyebrow: "标准化培训",
    category: "education",
    categoryLabel: "教育培训",
    description: "面向 SOP、合规制度和新人培训，用统一数字讲师完成标准化内容交付。",
    detailIntro: "将企业制度、操作手册和培训课件转为数字讲师内容，适合新人培训、合规宣导和岗位 SOP。",
    route: "Wav2Lip / QuickTalk",
    features: ["SOP 知识库", "私有化部署", "批量生成"],
    image: "/images/cases/companion.jpeg",
    accent: "mint",
    statusLabel: "完整案例",
    sections: [
      { title: "业务场景", body: "企业培训重复度高、覆盖面广，制度更新后需要快速同步到所有员工。" },
      { title: "OpenTalking 方案", body: "把制度文档和岗位 SOP 作为知识库，使用固定讲师形象输出章节化视频与问答辅助。" },
      { title: "推荐模型", body: "推荐 Wav2Lip / QuickTalk：适合企业内网批量生产，优先保证部署简单和内容可控。" },
    ],
    outcomes: ["减少重复培训", "制度表达一致", "适合内训内容沉淀"],
  },
  {
    slug: "ai-interview-coach",
    title: "AI 面试陪练官",
    eyebrow: "沉浸训练",
    category: "education",
    categoryLabel: "教育培训",
    description: "模拟面试官进行追问、反馈和复盘，帮助用户在更真实的语音对话中完成练习。",
    detailIntro: "结合岗位知识库、记忆系统和数字面试官形象，为求职者提供低压力、高频次的面试陪练。",
    route: "QuickTalk",
    features: ["记忆系统", "多轮追问", "语音输入"],
    image: "/images/cases/companion.jpeg",
    accent: "violet",
    statusLabel: "完整案例",
    sections: [
      { title: "业务场景", body: "求职者需要反复练习表达和应变，但普通文本聊天缺少临场感，真人陪练成本也比较高。" },
      { title: "OpenTalking 方案", body: "配置岗位知识库和面试官人设，通过语音输入、多轮追问和记忆系统记录练习重点。" },
      { title: "推荐模型", body: "推荐 QuickTalk：低延迟更适合面试对话，能够优先验证追问节奏和沉浸感。" },
    ],
    outcomes: ["提升练习频率", "面试反馈更具体", "增强临场表达体验"],
  },
  {
    slug: "language-speaking-coach",
    title: "语言口语陪练",
    eyebrow: "口语练习",
    category: "education",
    categoryLabel: "教育培训",
    description: "通过角色对话、语音输入和实时反馈构建外语口语练习环境，支持商务和生活化场景。",
    detailIntro: "让数字人扮演外教、客户或面试官，在不同主题下陪用户进行口语对话和表达训练。",
    route: "Local audio + QuickTalk",
    features: ["角色对话", "记忆系统", "沉浸模式"],
    image: "/images/cases/coming-soon.svg",
    accent: "rose",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "语言学习需要持续开口练习和即时反馈，用户往往缺少低压力、可重复的真实对话环境。" },
      { title: "OpenTalking 方案", body: "配置不同会话角色、学习目标和词汇知识库，用数字人完成语音对话、纠错提示和复盘建议。" },
      { title: "推荐模型", body: "推荐 Local audio + QuickTalk：优先保证语音往返速度，适合练习型产品快速迭代。" },
    ],
    outcomes: ["提高开口练习频率", "场景角色可切换", "支持个性化学习记忆"],
  },
  {
    slug: "medical-communication-training",
    title: "医护沟通训练",
    eyebrow: "仿真训练",
    category: "education",
    categoryLabel: "教育培训",
    description: "模拟患者、家属和医护对话，帮助训练问诊沟通、风险告知和服务表达。",
    detailIntro: "为医护培训构建可重复演练的数字患者或数字导师，适合沟通训练和服务流程模拟。",
    route: "Local GPU",
    features: ["安全话术", "情境记忆", "多轮对话"],
    image: "/images/cases/coming-soon.svg",
    accent: "slate",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "医护沟通训练强调情境、同理心和安全表达，需要可重复、低风险的模拟练习环境。" },
      { title: "OpenTalking 方案", body: "配置患者角色、训练目标和安全话术边界，记录对话过程，帮助培训者复盘表达和流程。" },
      { title: "推荐模型", body: "推荐 Local GPU：适合在机构内部署训练材料和敏感话术，保障资料和训练数据可控。" },
    ],
    outcomes: ["降低培训组织成本", "训练场景可重复", "提升沟通表达稳定性"],
  },
  {
    slug: "enterprise-knowledge-agent",
    title: "企业知识库客服",
    eyebrow: "智能服务",
    category: "enterprise",
    categoryLabel: "企业服务",
    description: "将产品手册、售后 FAQ 和内部知识库连接到数字人，提供更具亲和力的客户服务入口。",
    detailIntro: "用数字人承接企业知识库问答，让用户在语音、字幕和画面中获得更自然的服务体验。",
    route: "Local GPU / 私有化",
    features: ["企业知识库", "会话状态", "私有化部署"],
    image: "/images/cases/companion.jpeg",
    accent: "mint",
    featured: true,
    statusLabel: "完整案例",
    sections: [
      { title: "业务场景", body: "企业客服需要解释产品功能、售后流程和常见问题，传统机器人缺少亲和力和多模态表达。" },
      { title: "OpenTalking 方案", body: "接入企业知识库和安全回复策略，用数字人展示回答、字幕和语音，让服务入口更像真人咨询。" },
      { title: "推荐模型", body: "推荐 Local GPU / 私有化部署：适合企业知识资产和客户会话数据留在可控环境中。" },
    ],
    outcomes: ["客服入口更友好", "知识口径更统一", "适合私有知识库接入"],
  },
  {
    slug: "pre-sales-solution-consultant",
    title: "售前方案顾问",
    eyebrow: "方案咨询",
    category: "enterprise",
    categoryLabel: "企业服务",
    description: "根据客户行业、预算和部署条件，讲解产品方案、部署路线和交付边界。",
    detailIntro: "让数字人承担标准售前讲解和初步需求澄清，帮助销售和交付团队提升沟通效率。",
    route: "QuickTalk / FlashTalk",
    features: ["方案知识库", "需求澄清", "角色音色"],
    image: "/images/cases/companion.jpeg",
    accent: "cyan",
    statusLabel: "完整案例",
    sections: [
      { title: "业务场景", body: "售前沟通需要反复解释产品能力、部署限制和交付流程，不同客户又有不同业务背景。" },
      { title: "OpenTalking 方案", body: "把方案文档、报价口径和部署路线沉淀为知识库，让数字顾问完成标准讲解和初步问答。" },
      { title: "推荐模型", body: "推荐 QuickTalk / FlashTalk：前者适合低成本验证，后者适合对外展示和客户会议场景。" },
    ],
    outcomes: ["降低售前重复沟通", "方案表达更标准", "帮助初步筛选需求"],
  },
  {
    slug: "financial-service-teller",
    title: "金融业务柜员",
    eyebrow: "金融服务",
    category: "enterprise",
    categoryLabel: "企业服务",
    description: "面向银行、保险和证券业务，解释产品规则、办理流程和风险提示。",
    detailIntro: "为金融服务场景配置数字柜员，辅助完成业务咨询、流程引导和合规提示。",
    route: "私有化部署",
    features: ["合规话术", "流程知识库", "安全边界"],
    image: "/images/cases/coming-soon.svg",
    accent: "amber",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "金融业务咨询需要严谨表达和流程提示，客户又希望获得更自然、更清晰的解释体验。" },
      { title: "OpenTalking 方案", body: "将业务规则、风险提示和流程资料接入知识库，数字柜员按合规话术完成咨询和引导。" },
      { title: "推荐模型", body: "推荐私有化部署：金融场景对数据边界、话术审核和系统稳定性要求更高。" },
    ],
    outcomes: ["业务解释更规范", "风险提示更醒目", "适合私有化服务入口"],
  },
  {
    slug: "hr-employee-service-assistant",
    title: "HR 员工服务助手",
    eyebrow: "员工体验",
    category: "enterprise",
    categoryLabel: "企业服务",
    description: "解释假勤、薪酬、入离职和福利制度，为员工提供更自然的内部服务入口。",
    detailIntro: "把 HR 制度和办事流程转成数字员工服务助手，减少人力团队重复答疑。",
    route: "Local GPU",
    features: ["HR 知识库", "流程引导", "权限边界"],
    image: "/images/cases/coming-soon.svg",
    accent: "violet",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "员工高频咨询制度和流程，HR 团队需要在保证口径一致的同时提高响应效率。" },
      { title: "OpenTalking 方案", body: "接入 HR 手册和流程知识库，数字人按员工问题提供制度解释、材料清单和办理入口提示。" },
      { title: "推荐模型", body: "推荐 Local GPU：便于企业内部系统集成，同时控制员工信息和制度资料访问边界。" },
    ],
    outcomes: ["减少 HR 重复答疑", "员工服务更直观", "制度口径更一致"],
  },
  {
    slug: "smart-showroom-guide",
    title: "智能展厅讲解员",
    eyebrow: "展厅导览",
    category: "enterprise",
    categoryLabel: "企业服务",
    description: "在企业展厅、产品体验馆和活动现场，讲解产品矩阵、案例成果和参观路线。",
    detailIntro: "构建数字展厅讲解员，让参观者通过屏幕、语音或大屏获得稳定且可互动的讲解体验。",
    route: "OmniRT",
    features: ["展厅知识库", "沉浸模式", "多屏展示"],
    image: "/images/cases/coming-soon.svg",
    accent: "rose",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "展厅讲解需要稳定表达品牌故事、产品亮点和参观路线，高峰时段人工讲解难以覆盖所有访客。" },
      { title: "OpenTalking 方案", body: "用展厅知识库、路线脚本和数字讲解员形象串联展项，支持语音问答和沉浸式播放。" },
      { title: "推荐模型", body: "推荐 OmniRT：适合大屏展示和面向客户的高质量视觉输出。" },
    ],
    outcomes: ["提升展厅接待效率", "讲解内容可持续更新", "适合品牌展示场景"],
  },
  {
    slug: "scenic-area-guide",
    title: "文旅景区导览员",
    eyebrow: "沉浸导览",
    category: "public-service",
    categoryLabel: "文旅公服",
    description: "为景区游客讲解路线、景点故事、开放时间和服务设施，提升游览体验。",
    detailIntro: "把景区知识、路线推荐和多语言讲解整合到数字导览员中，适合游客中心和线上导览。",
    route: "QuickTalk / OmniRT",
    features: ["景区知识库", "多语言讲解", "沉浸模式"],
    image: "/images/cases/coming-soon.svg",
    accent: "mint",
    featured: true,
    statusLabel: "完整案例",
    sections: [
      { title: "业务场景", body: "文旅景区需要讲清历史故事、路线建议和服务设施，旺季人工导览覆盖有限。" },
      { title: "OpenTalking 方案", body: "将景区资料、路线和服务 FAQ 装入知识库，数字导览员按游客问题提供讲解和行程建议。" },
      { title: "推荐模型", body: "推荐 QuickTalk / OmniRT：普通导览可先快速部署，大屏或展馆场景可升级高质量推理。" },
    ],
    outcomes: ["导览服务覆盖更广", "景区故事表达更生动", "支持多语言游客服务"],
  },
  {
    slug: "museum-docent",
    title: "博物馆讲解员",
    eyebrow: "知识讲解",
    category: "public-service",
    categoryLabel: "文旅公服",
    description: "围绕展品、展线和历史背景提供数字人讲解，让观众获得更连贯的参观体验。",
    detailIntro: "为博物馆和展览空间配置数字讲解员，将展品知识与互动问答结合起来。",
    route: "Local GPU",
    features: ["展品知识库", "沉浸模式", "多轮问答"],
    image: "/images/cases/coming-soon.svg",
    accent: "cyan",
    statusLabel: "完整案例",
    sections: [
      { title: "业务场景", body: "博物馆展品信息丰富，观众问题多样，需要在专业性和可理解性之间取得平衡。" },
      { title: "OpenTalking 方案", body: "把展品介绍、历史背景和常见问题接入知识库，由数字讲解员按展线或观众提问进行讲解。" },
      { title: "推荐模型", body: "推荐 Local GPU：便于馆内网络和资料管理，同时保障讲解内容可审核、可更新。" },
    ],
    outcomes: ["展品讲解更连贯", "观众互动更自然", "适合展览内容复用"],
  },
  {
    slug: "government-service-guide",
    title: "政务办事引导员",
    eyebrow: "办事引导",
    category: "public-service",
    categoryLabel: "文旅公服",
    description: "解释办事条件、材料清单和流程步骤，帮助公众更快理解服务事项。",
    detailIntro: "用数字人承接政务大厅、园区服务和线上办事入口的流程引导与政策问答。",
    route: "私有化部署",
    features: ["流程知识库", "政策问答", "安全话术"],
    image: "/images/cases/coming-soon.svg",
    accent: "amber",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "政务办事流程涉及条件、材料和时限，用户常常需要反复咨询才能明确下一步。" },
      { title: "OpenTalking 方案", body: "把事项清单、材料模板和政策 FAQ 装入知识库，数字人用语音和字幕逐步解释办理路径。" },
      { title: "推荐模型", body: "推荐私有化部署：适合政务资料、服务数据和审核要求较高的场景。" },
    ],
    outcomes: ["办事路径更清晰", "窗口重复咨询减少", "政策口径更统一"],
  },
  {
    slug: "hospital-triage-assistant",
    title: "医疗导诊助手",
    eyebrow: "就医引导",
    category: "public-service",
    categoryLabel: "文旅公服",
    description: "在医院或线上问诊入口中解释科室位置、就医流程、检查注意事项和服务时间。",
    detailIntro: "构建数字导诊助手，帮助患者理解就医流程和院内服务信息，降低导诊压力。",
    route: "Local GPU",
    features: ["院内知识库", "流程引导", "安全边界"],
    image: "/images/cases/coming-soon.svg",
    accent: "rose",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "医院导诊问题高频且重复，患者对科室位置、检查流程和注意事项存在大量即时咨询需求。" },
      { title: "OpenTalking 方案", body: "接入院内服务知识库和安全提示边界，数字导诊助手以语音、字幕和画面进行流程引导。" },
      { title: "推荐模型", body: "推荐 Local GPU：便于医院内部资料管理和服务系统接入，同时控制敏感信息边界。" },
    ],
    outcomes: ["降低导诊压力", "患者流程理解更快", "服务信息可统一维护"],
  },
  {
    slug: "senior-care-companion",
    title: "银发服务陪伴员",
    eyebrow: "关怀服务",
    category: "public-service",
    categoryLabel: "文旅公服",
    description: "面向养老机构和社区服务，提供生活提醒、活动介绍、健康科普和情感陪伴。",
    detailIntro: "用温和的数字陪伴员承接社区服务通知、生活提醒和基础问答，让服务更有亲和力。",
    route: "QuickTalk",
    features: ["记忆系统", "生活提醒", "角色音色"],
    image: "/images/cases/companion.jpeg",
    accent: "violet",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "养老和社区服务需要温和、重复、长期的提醒与沟通，人工服务难以覆盖所有时间段。" },
      { title: "OpenTalking 方案", body: "配置亲和角色、生活提醒知识库和基础记忆系统，提供活动通知、健康科普和日常陪伴。" },
      { title: "推荐模型", body: "推荐 QuickTalk：部署轻、响应快，适合先验证陪伴节奏和服务流程。" },
    ],
    outcomes: ["提升社区服务温度", "生活提醒更稳定", "适合长期陪伴原型"],
  },
  {
    slug: "virtual-ip-short-video",
    title: "虚拟 IP 短视频栏目",
    eyebrow: "IP 内容",
    category: "creative",
    categoryLabel: "创意娱乐",
    description: "为品牌或个人打造虚拟 IP，用固定人设、音色和脚本模板持续生产短视频栏目。",
    detailIntro: "把角色设定、内容脚本、音色和数字人画面组合成可持续更新的虚拟 IP 内容生产流程。",
    route: "QuickTalk / FlashTalk",
    features: ["角色定制", "音色配置", "栏目模板"],
    image: "/images/cases/anime-talk-show-preview.png",
    accent: "violet",
    featured: true,
    statusLabel: "完整案例",
    sections: [
      { title: "业务场景", body: "虚拟 IP 需要持续输出内容，核心不只是画质，还包括人设稳定、表达风格和脚本迭代效率。" },
      { title: "OpenTalking 方案", body: "配置角色人设、音色和栏目模板，将脚本生成、语音合成和数字人渲染组织成一套内容流水线。" },
      { title: "推荐模型", body: "推荐 QuickTalk / FlashTalk：先验证内容风格，再按账号定位和商业化要求升级画面质量。" },
    ],
    outcomes: ["角色内容稳定更新", "降低短视频生产成本", "适合品牌 IP 运营"],
  },
  {
    slug: "game-npc-dialogue",
    title: "游戏 NPC 对话",
    eyebrow: "互动角色",
    category: "creative",
    categoryLabel: "创意娱乐",
    description: "将游戏世界观、角色记忆和任务信息接入数字人，构建更具沉浸感的 NPC 对话体验。",
    detailIntro: "为游戏、互动展陈和虚拟世界构建会说话、有记忆、有任务上下文的数字角色。",
    route: "Local audio + QuickTalk",
    features: ["角色记忆", "世界观知识库", "语音互动"],
    image: "/images/cases/anime-talk-show-preview.png",
    accent: "amber",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "NPC 对话需要角色一致性、任务上下文和低延迟反馈，传统固定台词难以满足开放式互动。" },
      { title: "OpenTalking 方案", body: "将世界观、任务信息和角色记忆接入会话系统，通过语音和数字人画面提供沉浸式互动。" },
      { title: "推荐模型", body: "推荐 Local audio + QuickTalk：优先降低交互延迟，适合原型验证和互动装置。" },
    ],
    outcomes: ["NPC 互动更自然", "角色记忆可沉淀", "适合互动娱乐原型"],
  },
  {
    slug: "anime-talk-show",
    title: "动漫脱口秀",
    eyebrow: "角色栏目",
    category: "creative",
    categoryLabel: "创意娱乐",
    description: "把二次元角色、文本创作和实时语音连接起来，快速验证内容 IP 的互动表达。",
    detailIntro: "用角色设定驱动内容表达，把文本创作、语音风格和数字人画面组合成可互动的角色栏目。",
    route: "Mock 验证后切 Local",
    features: ["角色设定", "创意台词", "低门槛验证"],
    image: "/images/cases/anime-talk-show-preview.png",
    accent: "violet",
    statusLabel: "完整案例",
    videoUrl: "https://1441945933.vod-qcloud.com/0b66444dvodcq1441945933/53e1ae875001834806729384095/y2rxrMrkX9AA.mp4",
    sections: [
      { title: "业务场景", body: "角色内容需要快速试错，重点不只是画质，还包括人设、台词节奏和实时互动反馈。" },
      { title: "OpenTalking 方案", body: "加入多角色切换、节目脚本、弹幕互动和素材库，让角色 IP 从 Demo 走向持续内容生产。" },
      { title: "推荐模型", body: "推荐 Mock 首跑 + QuickTalk：先低成本验证人设和互动节奏，再按画质需求切换本地或高质量后端。" },
    ],
    outcomes: ["快速验证角色人设", "降低内容试错成本", "可扩展多角色互动"],
  },
  {
    slug: "creative-performance",
    title: "创意演唱 / 模仿秀",
    eyebrow: "声音表演",
    category: "creative",
    categoryLabel: "创意娱乐",
    description: "验证声音风格、形象表演和创意互动内容，用同一产品壳快速切换模型后端。",
    detailIntro: "用于声音、形象和表演内容的实验场，让团队快速比较不同模型、音色和脚本组合的表现。",
    route: "Local / OmniRT",
    features: ["音色模仿", "角色演绎", "后端切换"],
    image: "/images/cases/creative-performance-preview.png",
    accent: "rose",
    statusLabel: "完整案例",
    videoUrl: "https://1441945933.vod-qcloud.com/0b66444dvodcq1441945933/26e7d30f5001834806725677498/DDWi04ozqdsA.mp4",
    sections: [
      { title: "业务场景", body: "创意内容变化快，经常需要比较不同声音、画面和脚本，不适合每次重搭演示系统。" },
      { title: "OpenTalking 方案", body: "加入素材管理、内容模板和录制导出，把实验结果沉淀成短视频、直播切片或角色表演素材。" },
      { title: "推荐模型", body: "推荐 Local / OmniRT：本地路线适合快速试错，OmniRT 更适合画质和最终交付效果要求高的内容。" },
    ],
    outcomes: ["快速比较模型效果", "适合内容团队试错", "沉淀演示模板"],
  },
  {
    slug: "digital-twin-knowledge-creator",
    title: "数字分身知识博主",
    eyebrow: "个人知识",
    category: "creative",
    categoryLabel: "创意娱乐",
    description: "把个人知识库、声音风格和数字形象结合，持续输出观点解读、课程片段和答疑内容。",
    detailIntro: "为专家、创作者和团队负责人建立数字分身，让知识资产以更稳定的视频形态持续输出。",
    route: "FlashTalk / OmniRT",
    features: ["个人知识库", "音色克隆", "记忆系统"],
    image: "/images/cases/creative-performance-preview.png",
    accent: "slate",
    statusLabel: "方案筹备中",
    sections: [
      { title: "业务场景", body: "知识型创作者需要持续输出观点和课程内容，但真人录制占用大量时间，表达风格也需要保持一致。" },
      { title: "OpenTalking 方案", body: "把个人知识库、表达风格、音色和数字形象组织成数字分身，用于短视频、课程和问答内容。" },
      { title: "推荐模型", body: "推荐 FlashTalk / OmniRT：适合对外发布和长期品牌化运营的高质量数字分身。" },
    ],
    outcomes: ["知识资产视频化", "个人表达风格可复用", "适合长期内容运营"],
  },
];

export const deploymentRoutes: DeploymentRoute[] = [
  {
    name: "快速试用与方案演示",
    badge: "No GPU",
    description:
      "不准备模型权重和推理服务，也能先跑通对话、语音、字幕和浏览器播放，适合快速确认产品方向。",
    models: "静态数字人画面 + 真实 LLM/TTS/WebRTC 链路",
    bestFor: "产品经理、售前演示、第一次评估 OpenTalking 的团队",
    outcome: "10 分钟内看到可演示的原型",
  },
  {
    name: "本地离线与私有化验证",
    badge: "Local GPU",
    description:
      "在自己的GPU机器或工作站上运行实时数字人渲染模型，支持素材、音频和会话等各样功能。",
    models: "QuickTalk / Wav2Lip / MuseTalk 本地后端",
    bestFor: "内容团队、私有化验证、需要离线运行和自定义形象的项目",
    outcome: "单机环境里生成真实数字人渲染",
  },
  {
    name: "高质量生产与交付",
    badge: "Inference Serer",
    description:
      "部署分离数字服务和模型推理服务，获取更高质量的数字人渲染效果，适合企业交付、多卡推理和长期服务。",
    models: "FlashTalk / FlashHead",
    bestFor: "画质要求高、并发更高、需要稳定服务边界的团队",
    outcome: "高质量、生产级数字人效果",
  },
];

export const architectureNodes = [
  { label: "Browser", description: "输入、字幕、音视频播放" },
  { label: "API / Session", description: "会话状态与事件编排" },
  { label: "LLM / STT / TTS", description: "理解、回复与语音合成" },
  { label: "Synthesis", description: "Mock、Local 或 OmniRT" },
  { label: "WebRTC", description: "实时音视频回传" },
];

export const docsGroups: DocsGroup[] = [
  {
    title: "快速开始",
    description:
      "从 Mock 模式开始，不需要模型权重，先验证前端、API、LLM、TTS、STT 和 WebRTC。",
    links: [
      { label: "中文快速开始", href: productLinks.docsZh },
      { label: "English Quickstart", href: productLinks.docsEn },
    ],
  },
  {
    title: "部署路线",
    description:
      "按算力和质量需求选择 Mock、本地模型、全本地音频或 OmniRT 高质量远端推理。",
    links: [
      {
        label: "模型部署文档",
        href: `${productLinks.docsZh}zh/model-deployment/local-quicktalk-audio/`,
      },
      { label: "GitHub README", href: productLinks.github },
    ],
  },
  {
    title: "开发者入口",
    description:
      "查看 API、配置文件、脚本和社区贡献方式，把 OpenTalking 集成进自己的数字人产品。",
    links: [
      { label: "GitHub 仓库", href: productLinks.github },
      { label: "英文文档", href: productLinks.docsEn },
    ],
  },
];

export const configItems = [
  { key: "LLM", value: "OpenAI-compatible endpoint" },
  { key: "STT", value: "DashScope or local SenseVoice" },
  { key: "TTS", value: "Edge, DashScope, CosyVoice" },
  { key: "Backend", value: "mock, local, omnirt, direct_ws" },
];

export const roadmapItems = [
  "更丰富的数字人驱动模型接入",
  "更顺滑的本地与私有化部署体验",
  "更多可复用的产品场景 Demo",
  "更完善的社区文档、示例和贡献流程",
];

export const trustBadges = ["Python 3.10+", "React 18", "FastAPI", "WebRTC"];

export const testimonials: Testimonial[] = [
  {
    quote:
      "我们先用 Mock 模式确认交互和脚本，再切到本地模型验证画面效果，整条链路很适合做数字人产品原型。",
    name: "内容创作团队",
    role: "短视频与直播场景",
    avatar: "/images/avatars/content-team.svg",
  },
  {
    quote:
      "OpenTalking 把 LLM、语音、字幕和 WebRTC 播放整理得比较清楚，做私有化演示和客户交付时沟通成本低了很多。",
    name: "企业交付团队",
    role: "本地部署与方案验证",
    avatar: "/images/avatars/delivery-team.svg",
  },
  {
    quote:
      "后端模型可以替换，前端事件也足够透明，我们能在现有工程里快速接入自己的数字人模型和业务流程。",
    name: "社区开发者",
    role: "模型适配与二次开发",
    avatar: "/images/avatars/developer.svg",
  },
];

export const contactChannels = [
  {
    title: "QQ 交流群",
    description: "讨论实时数字人、FlashTalk、OmniRT、模型部署和产品场景。",
    value: "",
    href: "",
    kind: "qq",
  },
  {
    title: "交流合作",
    description: "私有化部署、场景共创、模型接入和企业合作咨询。",
    value: "opentalking-ai@outlook.com",
    href: "mailto:opentalking-ai@outlook.com",
    kind: "email",
  },
  {
    title: "GitHub",
    description: "提交 issue、PR、场景建议和文档反馈。",
    value: "datascale-ai/opentalking",
    href: productLinks.github,
    kind: "github",
  },
];
