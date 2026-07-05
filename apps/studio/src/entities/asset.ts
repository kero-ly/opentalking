export type AssetKind =
  | "avatar"
  | "voice"
  | "background"
  | "scene"
  | "knowledge"
  | "persona"
  | "script_template"
  | "runtime_preset"
  | "export_video";

export type AssetScope = "system" | "personal" | "team" | "marketplace";
export type AssetStatus = "draft" | "processing" | "ready" | "failed" | "archived";

export type StudioAsset = {
  id: string;
  kind: AssetKind;
  scope: AssetScope;
  status: AssetStatus;
  name: string;
  description: string;
  thumbnailTone: "mint" | "blue" | "warm" | "mixed";
  tags: string[];
  ownerId?: string;
  teamId?: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
};

export const studioAssets: StudioAsset[] = [
  {
    id: "avatar-medical-guide",
    kind: "avatar",
    scope: "system",
    status: "ready",
    name: "医疗导诊数字人",
    description: "适合医院大厅、线上问诊入口和健康服务平台。",
    thumbnailTone: "mint",
    tags: ["医疗", "导诊", "实时问答"],
    usageCount: 186,
    createdAt: "2026-06-01T08:00:00.000Z",
    updatedAt: "2026-07-01T08:00:00.000Z",
  },
  {
    id: "avatar-commerce-host",
    kind: "avatar",
    scope: "marketplace",
    status: "ready",
    name: "电商直播主播",
    description: "适合商品讲解、优惠播报和评论问答。",
    thumbnailTone: "warm",
    tags: ["电商", "直播", "口播"],
    usageCount: 221,
    createdAt: "2026-06-05T08:00:00.000Z",
    updatedAt: "2026-07-03T08:00:00.000Z",
  },
  {
    id: "voice-anchor-clear-cn",
    kind: "voice",
    scope: "system",
    status: "ready",
    name: "清晰主播音色",
    description: "中文标准口播音色，节奏稳定，适合知识讲解。",
    thumbnailTone: "blue",
    tags: ["中文", "主播", "清晰"],
    usageCount: 244,
    createdAt: "2026-05-28T08:00:00.000Z",
    updatedAt: "2026-07-02T08:00:00.000Z",
  },
  {
    id: "background-commerce-live-room",
    kind: "background",
    scope: "marketplace",
    status: "ready",
    name: "电商直播间背景",
    description: "竖屏直播间、商品展台和优惠氛围元素。",
    thumbnailTone: "mixed",
    tags: ["背景", "直播间", "竖屏"],
    usageCount: 172,
    createdAt: "2026-06-12T08:00:00.000Z",
    updatedAt: "2026-07-02T08:00:00.000Z",
  },
  {
    id: "scene-training-classroom",
    kind: "scene",
    scope: "system",
    status: "ready",
    name: "企业培训教室",
    description: "横屏课程、PPT 讲解和企业内训场景组合。",
    thumbnailTone: "blue",
    tags: ["培训", "PPT", "横屏"],
    usageCount: 153,
    createdAt: "2026-06-08T08:00:00.000Z",
    updatedAt: "2026-06-30T08:00:00.000Z",
  },
  {
    id: "knowledge-hospital-guide",
    kind: "knowledge",
    scope: "team",
    status: "ready",
    name: "医院导诊知识库",
    description: "科室导航、就诊流程、检查注意事项。",
    thumbnailTone: "mint",
    tags: ["知识库", "医疗", "问答"],
    teamId: "team-demo",
    usageCount: 96,
    createdAt: "2026-06-15T08:00:00.000Z",
    updatedAt: "2026-07-04T08:00:00.000Z",
  },
  {
    id: "persona-service-guide",
    kind: "persona",
    scope: "system",
    status: "ready",
    name: "专业服务助手人设",
    description: "语气亲切、回答克制，适合严肃行业问答。",
    thumbnailTone: "mint",
    tags: ["人设", "服务", "问答"],
    usageCount: 131,
    createdAt: "2026-05-30T08:00:00.000Z",
    updatedAt: "2026-06-30T08:00:00.000Z",
  },
  {
    id: "script-product-launch",
    kind: "script_template",
    scope: "system",
    status: "ready",
    name: "新品发布口播脚本",
    description: "卖点、使用场景、行动引导三段式模板。",
    thumbnailTone: "warm",
    tags: ["脚本", "电商", "新品"],
    usageCount: 118,
    createdAt: "2026-06-18T08:00:00.000Z",
    updatedAt: "2026-07-01T08:00:00.000Z",
  },
  {
    id: "runtime-flashtalk-quality",
    kind: "runtime_preset",
    scope: "system",
    status: "ready",
    name: "高质量实时渲染预设",
    description: "适合展示、直播和客户演示的稳定画质配置。",
    thumbnailTone: "blue",
    tags: ["模型", "实时", "高质量"],
    usageCount: 88,
    createdAt: "2026-06-20T08:00:00.000Z",
    updatedAt: "2026-07-02T08:00:00.000Z",
  },
  {
    id: "export-healthcare-sample",
    kind: "export_video",
    scope: "personal",
    status: "ready",
    name: "医疗导诊样片",
    description: "最近生成的 16:9 医疗导诊演示视频。",
    thumbnailTone: "mixed",
    tags: ["导出", "样片", "16:9"],
    ownerId: "user-demo",
    usageCount: 22,
    createdAt: "2026-07-04T08:00:00.000Z",
    updatedAt: "2026-07-04T08:00:00.000Z",
  },
  {
    id: "avatar-processing-clone",
    kind: "avatar",
    scope: "personal",
    status: "processing",
    name: "自定义克隆形象",
    description: "用户上传视频生成中。",
    thumbnailTone: "mixed",
    tags: ["自定义", "处理中"],
    ownerId: "user-demo",
    usageCount: 0,
    createdAt: "2026-07-05T08:00:00.000Z",
    updatedAt: "2026-07-05T08:00:00.000Z",
  },
];

export function getReadyAssetsByKind(kind: AssetKind): StudioAsset[] {
  return studioAssets.filter((asset) => asset.kind === kind && asset.status === "ready");
}

export function getFeaturedAssets(limit = 4): StudioAsset[] {
  return [...studioAssets]
    .filter((asset) => asset.status === "ready")
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, limit);
}
