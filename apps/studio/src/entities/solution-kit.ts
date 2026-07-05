export type SolutionKitIndustry = "ecommerce" | "healthcare" | "tourism" | "training" | "service";

export type SolutionKit = {
  id: string;
  name: string;
  industry: SolutionKitIndustry;
  description: string;
  coverTone: "mint" | "blue" | "warm" | "mixed";
  coverImageUrl: string;
  assetIds: string[];
  personaId?: string;
  knowledgeBaseId?: string;
  scriptTemplateIds: string[];
  runtimePresetId?: string;
  recommendedAspectRatios: Array<"16:9" | "9:16" | "1:1">;
  actions: Array<{
    label: string;
    workflow: "video" | "realtime";
    href: string;
  }>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export const solutionKits: SolutionKit[] = [
  {
    id: "healthcare-guide",
    name: "医疗导诊方案包",
    industry: "healthcare",
    description: "导诊形象、服务人设、医院知识库和横屏讲解场景，适合医院大厅与线上服务入口。",
    coverTone: "mint",
    coverImageUrl: "/studio-assets/cases/medical-guide-zh-preview.png",
    assetIds: [
      "avatar-office-woman",
      "voice-local-office-serena",
      "scene-medical-guide-zh",
      "knowledge-hospital-guide",
      "persona-service-guide",
      "runtime-flashtalk-quality",
    ],
    personaId: "persona-service-guide",
    knowledgeBaseId: "knowledge-hospital-guide",
    scriptTemplateIds: [],
    runtimePresetId: "runtime-flashtalk-quality",
    recommendedAspectRatios: ["16:9", "9:16"],
    actions: [
      { label: "创建导诊视频", workflow: "video", href: "/create/video?kit=healthcare-guide" },
      { label: "创建实时导诊", workflow: "realtime", href: "/create/realtime?kit=healthcare-guide" },
    ],
    tags: ["医疗", "导诊", "实时问答"],
    createdAt: "2026-06-20T08:00:00.000Z",
    updatedAt: "2026-07-04T08:00:00.000Z",
  },
  {
    id: "commerce-live",
    name: "电商带货方案包",
    industry: "ecommerce",
    description: "主播形象、直播间背景、新品口播脚本和实时评论问答配置。",
    coverTone: "warm",
    coverImageUrl: "/studio-assets/cases/ecommerce-live-front-preview.png",
    assetIds: [
      "avatar-live-broadcast",
      "voice-local-anchor-cherry",
      "scene-commerce-live-front",
      "background-default-data-wall",
      "script-product-launch",
      "persona-service-guide",
      "runtime-flashtalk-quality",
    ],
    personaId: "persona-service-guide",
    scriptTemplateIds: ["script-product-launch"],
    runtimePresetId: "runtime-flashtalk-quality",
    recommendedAspectRatios: ["9:16", "16:9"],
    actions: [
      { label: "创建带货视频", workflow: "video", href: "/create/video?kit=commerce-live" },
      { label: "创建直播助手", workflow: "realtime", href: "/create/realtime?kit=commerce-live" },
    ],
    tags: ["电商", "直播", "商品讲解"],
    createdAt: "2026-06-22T08:00:00.000Z",
    updatedAt: "2026-07-03T08:00:00.000Z",
  },
  {
    id: "enterprise-training",
    name: "企业培训方案包",
    industry: "training",
    description: "培训教室场景、清晰主播音色和 PPT 讲解工作流，适合课程和内训。",
    coverTone: "blue",
    coverImageUrl: "/studio-assets/docs/opentalking-makevideo.png",
    assetIds: ["avatar-anchor", "voice-indextts-yunxia-cn", "background-default-data-wall", "script-product-launch", "runtime-flashtalk-quality"],
    scriptTemplateIds: ["script-product-launch"],
    runtimePresetId: "runtime-flashtalk-quality",
    recommendedAspectRatios: ["16:9"],
    actions: [
      { label: "创建培训视频", workflow: "video", href: "/create/video?kit=enterprise-training" },
      { label: "创建课程助手", workflow: "realtime", href: "/create/realtime?kit=enterprise-training" },
    ],
    tags: ["培训", "课程", "PPT"],
    createdAt: "2026-06-28T08:00:00.000Z",
    updatedAt: "2026-07-01T08:00:00.000Z",
  },
];

export function getSolutionKitById(id: string): SolutionKit | undefined {
  return solutionKits.find((kit) => kit.id === id);
}
