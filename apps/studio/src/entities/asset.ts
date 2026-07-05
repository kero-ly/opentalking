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
export type AssetWorkflow = "asset_center" | "video" | "realtime" | "solution_kit";
export type StorageProvider = "local" | "s3" | "oss" | "cos" | "r2";
export type UploadStatus = "local" | "pending" | "uploading" | "processing" | "ready" | "failed";
export type TaskStatus = "queued" | "running" | "succeeded" | "failed" | "cancelled";

export type AssetStorage = {
  provider: StorageProvider;
  bucket: string;
  region: string;
  key: string;
  publicUrl: string;
  previewUrl: string;
  thumbnailUrl: string;
  sourcePath: string;
  checksum: string;
  sizeBytes: number;
  contentType: string;
};

export type AssetUploadState = {
  status: UploadStatus;
  progress: number;
  message: string;
  taskId?: string;
  lastUpdatedAt: string;
};

export type StudioTask = {
  id: string;
  type: "upload" | "avatar_training" | "video_render" | "realtime_session";
  status: TaskStatus;
  progress: number;
  assetIds: string[];
  createdAt: string;
  updatedAt: string;
  message: string;
};

export type AssetPreview = {
  imageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  documentUrl?: string;
  textExcerpt?: string;
  aspectRatio?: "16:9" | "9:16" | "1:1" | "4:3";
};

export type AssetTechnicalMetadata = {
  width?: number;
  height?: number;
  fps?: number;
  sampleRate?: number;
  durationSec?: number;
  modelType?: string;
  provider?: string;
  targetModel?: string;
  locale?: string;
};

export type StudioAsset = {
  id: string;
  kind: AssetKind;
  scope: AssetScope;
  status: AssetStatus;
  name: string;
  description: string;
  thumbnailTone: "mint" | "blue" | "warm" | "mixed";
  tags: string[];
  workflows: AssetWorkflow[];
  storage: AssetStorage;
  upload: AssetUploadState;
  preview: AssetPreview;
  technical?: AssetTechnicalMetadata;
  ownerId?: string;
  teamId?: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
};

const LOCAL_BUCKET = "opentalking-studio-local";
const LOCAL_REGION = "local-dev";
const LOCAL_PUBLIC_PREFIX = "/studio-assets";
const READY_AT = "2026-07-05T08:00:00.000Z";

function localStorage(params: {
  key: string;
  sizeBytes: number;
  contentType: string;
  checksum: string;
  previewKey?: string;
  thumbnailKey?: string;
}): AssetStorage {
  const publicUrl = `${LOCAL_PUBLIC_PREFIX}/${params.key}`;
  const previewUrl = `${LOCAL_PUBLIC_PREFIX}/${params.previewKey ?? params.key}`;
  const thumbnailUrl = `${LOCAL_PUBLIC_PREFIX}/${params.thumbnailKey ?? params.previewKey ?? params.key}`;

  return {
    provider: "local",
    bucket: LOCAL_BUCKET,
    region: LOCAL_REGION,
    key: params.key,
    publicUrl,
    previewUrl,
    thumbnailUrl,
    sourcePath: `apps/studio/public${publicUrl}`,
    checksum: params.checksum,
    sizeBytes: params.sizeBytes,
    contentType: params.contentType,
  };
}

function localUpload(message = "本地内置资产，可直接引用。"): AssetUploadState {
  return {
    status: "local",
    progress: 100,
    message,
    lastUpdatedAt: READY_AT,
  };
}

export const studioAssets: StudioAsset[] = [
  {
    id: "avatar-office-woman",
    kind: "avatar",
    scope: "system",
    status: "ready",
    name: "职场女数字人",
    description: "职业感半身形象，适合客服、商务讲解和产品介绍。",
    thumbnailTone: "mint",
    tags: ["商务", "客服", "口播"],
    workflows: ["asset_center", "video", "realtime", "solution_kit"],
    storage: localStorage({
      key: "avatars/office-woman/preview.png",
      previewKey: "avatars/office-woman/preview.png",
      thumbnailKey: "avatars/office-woman/reference.png",
      sizeBytes: 256955,
      contentType: "image/png",
      checksum: "sha256:d9e3ca517cb937584b13dd94494f8ece8d883f51b1ee9875dceaf548052f09dd",
    }),
    upload: localUpload(),
    preview: {
      imageUrl: "/studio-assets/avatars/office-woman/preview.png",
      aspectRatio: "9:16",
    },
    technical: {
      width: 540,
      height: 900,
      fps: 30,
      sampleRate: 16000,
      modelType: "wav2lip",
      locale: "zh-CN",
    },
    usageCount: 286,
    createdAt: "2026-06-01T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "avatar-live-broadcast",
    kind: "avatar",
    scope: "marketplace",
    status: "ready",
    name: "直播带货主播",
    description: "明亮亲和的直播形象，适合商品讲解、优惠播报和评论互动。",
    thumbnailTone: "warm",
    tags: ["电商", "直播", "商品讲解"],
    workflows: ["asset_center", "video", "realtime", "solution_kit"],
    storage: localStorage({
      key: "avatars/live-broadcast/preview.png",
      sizeBytes: 481902,
      contentType: "image/png",
      checksum: "sha256:local-live-broadcast-preview",
      thumbnailKey: "avatars/live-broadcast/reference.png",
    }),
    upload: localUpload(),
    preview: {
      imageUrl: "/studio-assets/avatars/live-broadcast/preview.png",
      aspectRatio: "9:16",
    },
    technical: {
      width: 540,
      height: 900,
      fps: 30,
      sampleRate: 16000,
      modelType: "wav2lip",
      locale: "zh-CN",
    },
    usageCount: 244,
    createdAt: "2026-06-05T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "avatar-anchor",
    kind: "avatar",
    scope: "system",
    status: "ready",
    name: "新闻主播数字人",
    description: "稳重清晰的播报形象，适合新闻、政企资讯和知识栏目。",
    thumbnailTone: "blue",
    tags: ["主播", "新闻", "知识讲解"],
    workflows: ["asset_center", "video", "realtime"],
    storage: localStorage({
      key: "avatars/anchor/preview.png",
      sizeBytes: 4871715,
      contentType: "image/png",
      checksum: "sha256:local-anchor-preview",
      thumbnailKey: "avatars/anchor/reference.png",
    }),
    upload: localUpload(),
    preview: {
      imageUrl: "/studio-assets/avatars/anchor/preview.png",
      aspectRatio: "9:16",
    },
    technical: {
      width: 540,
      height: 900,
      fps: 30,
      sampleRate: 16000,
      modelType: "wav2lip",
      locale: "zh-CN",
    },
    usageCount: 232,
    createdAt: "2026-06-06T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "avatar-fitness-coach",
    kind: "avatar",
    scope: "marketplace",
    status: "ready",
    name: "健身教练数字人",
    description: "运动课程和健康生活方式内容的活力讲解形象。",
    thumbnailTone: "mint",
    tags: ["健身", "课程", "生活方式"],
    workflows: ["asset_center", "video"],
    storage: localStorage({
      key: "avatars/fitness-coach/preview.png",
      sizeBytes: 269754,
      contentType: "image/png",
      checksum: "sha256:local-fitness-coach-preview",
      thumbnailKey: "avatars/fitness-coach/reference.png",
    }),
    upload: localUpload(),
    preview: {
      imageUrl: "/studio-assets/avatars/fitness-coach/preview.png",
      aspectRatio: "9:16",
    },
    technical: {
      width: 540,
      height: 900,
      fps: 30,
      sampleRate: 16000,
      modelType: "wav2lip",
      locale: "zh-CN",
    },
    usageCount: 148,
    createdAt: "2026-06-08T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "voice-local-office-serena",
    kind: "voice",
    scope: "system",
    status: "ready",
    name: "职场女声 Serena",
    description: "自然清晰的中文女声，语气稳重，适合客服和商务说明。",
    thumbnailTone: "blue",
    tags: ["中文", "女声", "商务"],
    workflows: ["asset_center", "video", "realtime", "solution_kit"],
    storage: localStorage({
      key: "voices/local-office-serena/prompt.wav",
      sizeBytes: 265004,
      contentType: "audio/wav",
      checksum: "sha256:81a907f4570ab7b52c4204b8e7c91369312fe0157b3cff6d4488c8b9f28e3f59",
      thumbnailKey: "voices/local-office-serena/meta.json",
    }),
    upload: localUpload("本地内置音色样本，可用于零样本克隆和预览播放。"),
    preview: {
      audioUrl: "/studio-assets/voices/local-office-serena/prompt.wav",
      textExcerpt: "你好，欢迎来到OpenTalking。我会用自然清晰的声音，为你介绍今天的内容。",
    },
    technical: {
      sampleRate: 24000,
      durationSec: 5.52,
      provider: "local_cosyvoice",
      targetModel: "FunAudioLLM/Fun-CosyVoice3-0.5B-2512",
      locale: "zh-CN",
    },
    usageCount: 264,
    createdAt: "2026-05-28T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "voice-local-anchor-cherry",
    kind: "voice",
    scope: "system",
    status: "ready",
    name: "主播女声 Cherry",
    description: "音色明亮、节奏有活力，适合短视频口播和直播带货。",
    thumbnailTone: "warm",
    tags: ["中文", "主播", "电商"],
    workflows: ["asset_center", "video", "realtime", "solution_kit"],
    storage: localStorage({
      key: "voices/local-anchor-cherry/prompt.wav",
      sizeBytes: 303404,
      contentType: "audio/wav",
      checksum: "sha256:local-anchor-cherry-prompt",
      thumbnailKey: "voices/local-anchor-cherry/meta.json",
    }),
    upload: localUpload("本地内置音色样本，可用于试听和创作引用。"),
    preview: {
      audioUrl: "/studio-assets/voices/local-anchor-cherry/prompt.wav",
      textExcerpt: "你好，欢迎来到OpenTalking。我会用自然清晰的声音，为你介绍今天的内容。",
    },
    technical: {
      sampleRate: 24000,
      durationSec: 6.32,
      provider: "local_cosyvoice",
      locale: "zh-CN",
    },
    usageCount: 239,
    createdAt: "2026-05-29T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "voice-indextts-yunxia-cn",
    kind: "voice",
    scope: "system",
    status: "ready",
    name: "云霞轻快男声",
    description: "轻快亲切的中文男声，适合产品介绍和互动欢迎语。",
    thumbnailTone: "mint",
    tags: ["中文", "男声", "亲切"],
    workflows: ["asset_center", "video", "realtime"],
    storage: localStorage({
      key: "voices/indextts-yunxia-cn/prompt.wav",
      sizeBytes: 500046,
      contentType: "audio/wav",
      checksum: "sha256:local-yunxia-prompt",
      thumbnailKey: "voices/indextts-yunxia-cn/meta.json",
    }),
    upload: localUpload("本地 IndexTTS 音色样本，可用于试听和创作引用。"),
    preview: {
      audioUrl: "/studio-assets/voices/indextts-yunxia-cn/prompt.wav",
      textExcerpt: "你好，我是云霞。现在我会用轻快活泼、带一点亲切感的声音，介绍视频创作和实时互动体验。",
    },
    technical: {
      provider: "local_indextts",
      targetModel: "IndexTeam/IndexTTS-2",
      locale: "zh-CN",
    },
    usageCount: 202,
    createdAt: "2026-06-02T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "background-default-data-wall",
    kind: "background",
    scope: "system",
    status: "ready",
    name: "默认数据墙背景",
    description: "科技感但保持明亮的横屏背景，适合产品演示、实时会话和案例预览。",
    thumbnailTone: "mixed",
    tags: ["背景", "横屏", "演示"],
    workflows: ["asset_center", "video", "realtime", "solution_kit"],
    storage: localStorage({
      key: "backgrounds/default-data-wall.jpg",
      sizeBytes: 316668,
      contentType: "image/jpeg",
      checksum: "sha256:5a98a3c082b4a2c8a630dab8b6c83e196d3407132fce4127b650e6de5f2b2f12",
    }),
    upload: localUpload(),
    preview: {
      imageUrl: "/studio-assets/backgrounds/default-data-wall.jpg",
      aspectRatio: "16:9",
    },
    technical: {
      locale: "zh-CN",
    },
    usageCount: 198,
    createdAt: "2026-06-12T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "scene-commerce-live-front",
    kind: "scene",
    scope: "marketplace",
    status: "ready",
    name: "电商直播间正面机位",
    description: "商品台、直播背景和主播站位已经组合好的竖屏案例场景。",
    thumbnailTone: "warm",
    tags: ["电商", "直播间", "竖屏"],
    workflows: ["asset_center", "video", "solution_kit"],
    storage: localStorage({
      key: "cases/ecommerce-live-front-preview.png",
      sizeBytes: 1664411,
      contentType: "image/png",
      checksum: "sha256:a7792a4037833a55e3d528762ae129640da21f723443ec94057c5602b1f516ba",
    }),
    upload: localUpload("由本地案例图生成的场景资产，可作为视频创作背景引用。"),
    preview: {
      imageUrl: "/studio-assets/cases/ecommerce-live-front-preview.png",
      aspectRatio: "9:16",
    },
    usageCount: 188,
    createdAt: "2026-06-15T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "scene-medical-guide-zh",
    kind: "scene",
    scope: "marketplace",
    status: "ready",
    name: "中文医疗导诊案例场景",
    description: "医院导诊风格的案例预览，可复用为导诊视频和实时咨询背景。",
    thumbnailTone: "mint",
    tags: ["医疗", "导诊", "案例"],
    workflows: ["asset_center", "video", "realtime", "solution_kit"],
    storage: localStorage({
      key: "cases/medical-guide-zh-preview.png",
      sizeBytes: 892975,
      contentType: "image/png",
      checksum: "sha256:0ea602d970a929aae843dbb378fd313e1297a25f86219f8c5de3738c0e370a06",
    }),
    upload: localUpload("由本地案例图生成的医疗导诊场景资产。"),
    preview: {
      imageUrl: "/studio-assets/cases/medical-guide-zh-preview.png",
      aspectRatio: "16:9",
    },
    usageCount: 176,
    createdAt: "2026-06-16T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "knowledge-hospital-guide",
    kind: "knowledge",
    scope: "team",
    status: "ready",
    name: "医院导诊知识库",
    description: "包含科室导航、就诊流程、检查注意事项和常见问题问答。",
    thumbnailTone: "mint",
    tags: ["知识库", "医疗", "问答"],
    workflows: ["asset_center", "realtime", "solution_kit"],
    storage: localStorage({
      key: "docs/opentalking-knowledge.png",
      sizeBytes: 161561,
      contentType: "image/png",
      checksum: "sha256:local-opentalking-knowledge-doc",
    }),
    upload: localUpload("本地文档截图模拟知识库来源，后续可替换为云端向量库。"),
    preview: {
      imageUrl: "/studio-assets/docs/opentalking-knowledge.png",
      documentUrl: "/studio-assets/docs/opentalking-knowledge.png",
      textExcerpt: "导诊流程、科室位置、检查须知、挂号与报告查询说明。",
      aspectRatio: "16:9",
    },
    technical: {
      provider: "local_mock_vector_store",
      locale: "zh-CN",
    },
    teamId: "team-demo",
    usageCount: 156,
    createdAt: "2026-06-15T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "persona-service-guide",
    kind: "persona",
    scope: "system",
    status: "ready",
    name: "专业服务助手人设",
    description: "语气亲切、回答克制，适合医疗、政企和服务行业问答。",
    thumbnailTone: "mint",
    tags: ["人设", "服务", "问答"],
    workflows: ["asset_center", "realtime", "solution_kit"],
    storage: localStorage({
      key: "docs/opentalking-webui.png",
      sizeBytes: 913137,
      contentType: "image/png",
      checksum: "sha256:local-opentalking-webui-doc",
    }),
    upload: localUpload("本地预设人设，后续可由云端 persona 配置接口管理。"),
    preview: {
      imageUrl: "/studio-assets/docs/opentalking-webui.png",
      textExcerpt: "请以专业、温和、可信赖的语气回答用户问题；不确定时引导用户联系人工服务。",
      aspectRatio: "16:9",
    },
    usageCount: 142,
    createdAt: "2026-05-30T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "script-product-launch",
    kind: "script_template",
    scope: "system",
    status: "ready",
    name: "新品发布口播脚本",
    description: "卖点、使用场景、行动引导三段式模板，可快速生成商品讲解视频。",
    thumbnailTone: "warm",
    tags: ["脚本", "电商", "新品"],
    workflows: ["asset_center", "video", "solution_kit"],
    storage: localStorage({
      key: "docs/opentalking-makevideo.png",
      sizeBytes: 279328,
      contentType: "image/png",
      checksum: "sha256:6fd69e4399cfde3df88351afe94add146d21a8f711caed091a957d2bae800ec6",
    }),
    upload: localUpload("本地脚本模板，可由视频创作页直接引用并编辑。"),
    preview: {
      imageUrl: "/studio-assets/docs/opentalking-makevideo.png",
      textExcerpt: "开场吸引注意，说明核心卖点，展示使用场景，最后给出清晰行动引导。",
      aspectRatio: "16:9",
    },
    usageCount: 136,
    createdAt: "2026-06-18T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "runtime-flashtalk-quality",
    kind: "runtime_preset",
    scope: "system",
    status: "ready",
    name: "高质量实时渲染预设",
    description: "面向展示、直播和客户演示的稳定画质配置，优先保障口型同步和画面稳定。",
    thumbnailTone: "blue",
    tags: ["模型", "实时", "高质量"],
    workflows: ["asset_center", "realtime", "solution_kit"],
    storage: localStorage({
      key: "docs/opentalking-webui.png",
      sizeBytes: 913137,
      contentType: "image/png",
      checksum: "sha256:local-runtime-flashtalk-quality",
    }),
    upload: localUpload("本地运行预设，未来映射到云端推理资源和队列配置。"),
    preview: {
      imageUrl: "/studio-assets/docs/opentalking-webui.png",
      textExcerpt: "延迟目标 800ms 内，优先画质与稳定口型，适合演示和直播。",
      aspectRatio: "16:9",
    },
    technical: {
      provider: "local_mock_runtime",
      targetModel: "FlashTalk",
      fps: 30,
      locale: "zh-CN",
    },
    usageCount: 118,
    createdAt: "2026-06-20T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "export-healthcare-sample",
    kind: "export_video",
    scope: "personal",
    status: "ready",
    name: "医疗导诊样片",
    description: "最近生成的 16:9 医疗导诊演示视频，占位为案例预览图。",
    thumbnailTone: "mixed",
    tags: ["导出", "样片", "16:9"],
    workflows: ["asset_center"],
    storage: localStorage({
      key: "cases/medical-guide-zh-preview.png",
      sizeBytes: 892975,
      contentType: "image/png",
      checksum: "sha256:0ea602d970a929aae843dbb378fd313e1297a25f86219f8c5de3738c0e370a06",
    }),
    upload: localUpload("本地样片记录，未来将指向云端渲染产物。"),
    preview: {
      imageUrl: "/studio-assets/cases/medical-guide-zh-preview.png",
      aspectRatio: "16:9",
    },
    ownerId: "user-demo",
    usageCount: 22,
    createdAt: "2026-07-04T08:00:00.000Z",
    updatedAt: READY_AT,
  },
  {
    id: "avatar-processing-clone",
    kind: "avatar",
    scope: "personal",
    status: "processing",
    name: "自定义克隆形象",
    description: "用户上传视频生成中，显示 mock 训练进度和未来云端任务字段。",
    thumbnailTone: "mixed",
    tags: ["自定义", "处理中"],
    workflows: ["asset_center", "video", "realtime"],
    storage: localStorage({
      key: "avatars/woman/preview.png",
      sizeBytes: 495017,
      contentType: "image/png",
      checksum: "sha256:local-user-clone-preview",
      thumbnailKey: "avatars/woman/reference.png",
    }),
    upload: {
      status: "processing",
      progress: 68,
      message: "形象训练中，预计还需要 12 分钟。",
      taskId: "task-avatar-clone-demo",
      lastUpdatedAt: READY_AT,
    },
    preview: {
      imageUrl: "/studio-assets/avatars/woman/preview.png",
      aspectRatio: "9:16",
    },
    technical: {
      width: 540,
      height: 900,
      fps: 30,
      sampleRate: 16000,
      modelType: "wav2lip",
      locale: "zh-CN",
    },
    ownerId: "user-demo",
    usageCount: 0,
    createdAt: "2026-07-05T08:00:00.000Z",
    updatedAt: READY_AT,
  },
];

export function getAssetById(id: string): StudioAsset | undefined {
  return studioAssets.find((asset) => asset.id === id);
}

export function getAssetsByIds(ids: string[]): StudioAsset[] {
  const assetById = new Map(studioAssets.map((asset) => [asset.id, asset]));
  return ids.flatMap((id) => {
    const asset = assetById.get(id);
    return asset ? [asset] : [];
  });
}

export function getReadyAssetsByKind(kind: AssetKind): StudioAsset[] {
  return studioAssets.filter((asset) => asset.kind === kind && asset.status === "ready");
}

export function getFeaturedAssets(limit = 4): StudioAsset[] {
  return [...studioAssets]
    .filter((asset) => asset.status === "ready")
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, limit);
}

export function listAssetsByWorkflow(workflow: AssetWorkflow): StudioAsset[] {
  return studioAssets.filter((asset) => asset.workflows.includes(workflow));
}
