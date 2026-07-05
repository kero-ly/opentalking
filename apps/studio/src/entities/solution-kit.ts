export type SolutionKitIndustry = "ecommerce" | "healthcare" | "tourism" | "training" | "service";

export type SolutionKit = {
  id: string;
  name: string;
  industry: SolutionKitIndustry;
  description: string;
  coverTone: "mint" | "blue" | "warm" | "mixed";
  assetIds: string[];
  personaId?: string;
  knowledgeBaseId?: string;
  scriptTemplateIds: string[];
  runtimePresetId?: string;
  recommendedAspectRatios: Array<"16:9" | "9:16" | "1:1">;
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
    assetIds: ["avatar-medical-guide", "voice-anchor-clear-cn", "knowledge-hospital-guide", "persona-service-guide"],
    personaId: "persona-service-guide",
    knowledgeBaseId: "knowledge-hospital-guide",
    scriptTemplateIds: [],
    runtimePresetId: "runtime-flashtalk-quality",
    recommendedAspectRatios: ["16:9", "9:16"],
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
    assetIds: ["avatar-commerce-host", "voice-anchor-clear-cn", "background-commerce-live-room", "script-product-launch"],
    personaId: "persona-service-guide",
    scriptTemplateIds: ["script-product-launch"],
    runtimePresetId: "runtime-flashtalk-quality",
    recommendedAspectRatios: ["9:16", "16:9"],
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
    assetIds: ["scene-training-classroom", "voice-anchor-clear-cn", "runtime-flashtalk-quality"],
    scriptTemplateIds: [],
    runtimePresetId: "runtime-flashtalk-quality",
    recommendedAspectRatios: ["16:9"],
    tags: ["培训", "课程", "PPT"],
    createdAt: "2026-06-28T08:00:00.000Z",
    updatedAt: "2026-07-01T08:00:00.000Z",
  },
];

export function getSolutionKitById(id: string): SolutionKit | undefined {
  return solutionKits.find((kit) => kit.id === id);
}
