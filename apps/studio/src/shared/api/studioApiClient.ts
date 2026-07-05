import {
  getAssetById,
  getReadyAssetsByKind,
  listAssetsByWorkflow as listLocalAssetsByWorkflow,
  studioAssets,
  type AssetKind,
  type AssetStorage,
  type AssetWorkflow,
  type StudioAsset,
  type StudioTask,
} from "../../entities/asset";
import type { StudioProject } from "../../entities/project";
import type { SolutionKit } from "../../entities/solution-kit";
import type { RealtimeWorkflowConfiguration, VideoWorkflowConfiguration } from "../../entities/workflow";
import * as mockApi from "./studioMockApi";

export const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";

type BackendAvatar = {
  id: string;
  name?: string | null;
  model_type: string;
  width: number;
  height: number;
  is_custom?: boolean;
  has_preview_video?: boolean;
  matting_status?: string;
};

type BackendVoice = {
  id: number;
  user_id: number;
  provider: string;
  voice_id: string;
  display_label: string;
  target_model: string | null;
  source: string;
};

type BackendSceneBackground = {
  id: string;
  name: string;
  kind: string;
  mime_type: string;
  filename: string;
  size_bytes: number;
  url: string;
  created_at: string;
};

type AssetListFilters = {
  kind?: AssetKind;
  workflow?: AssetWorkflow;
  status?: StudioAsset["status"];
};

export type UploadIntentInput = mockApi.UploadIntentInput;
export type UploadIntent = mockApi.UploadIntent;
export type ConfirmedUpload = mockApi.ConfirmedUpload;
export type CreateProjectInput = mockApi.CreateProjectInput;
export type CreateTaskInput = mockApi.CreateTaskInput;

function buildApiUrl(path: string): string {
  return `${API_BASE}${path}`;
}

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(buildApiUrl(path));
  if (!response.ok) {
    throw new Error(`OpenTalking API ${path} failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

async function apiPostJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(buildApiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`OpenTalking API ${path} failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

async function apiPostForm<T>(path: string, form: FormData): Promise<T> {
  const response = await fetch(buildApiUrl(path), {
    method: "POST",
    body: form,
  });
  if (!response.ok) {
    throw new Error(`OpenTalking API ${path} failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

function localStorage(params: {
  key: string;
  publicUrl: string;
  sizeBytes: number;
  contentType: string;
  checksum: string;
}): AssetStorage {
  return {
    provider: "local",
    bucket: "opentalking-api",
    region: "local-dev",
    key: params.key,
    publicUrl: params.publicUrl,
    previewUrl: params.publicUrl,
    thumbnailUrl: params.publicUrl,
    sourcePath: params.publicUrl,
    checksum: params.checksum,
    sizeBytes: params.sizeBytes,
    contentType: params.contentType,
  };
}

function backendAvatarToAsset(avatar: BackendAvatar): StudioAsset {
  const publicUrl = buildApiUrl(`/avatars/${encodeURIComponent(avatar.id)}/preview`);
  return {
    id: `avatar-${avatar.id}`,
    kind: "avatar",
    scope: avatar.is_custom ? "personal" : "system",
    status: "ready",
    name: avatar.name || avatar.id,
    description: `${avatar.model_type} 数字形象，来自现有 OpenTalking /avatars 后端。`,
    thumbnailTone: avatar.is_custom ? "mixed" : "mint",
    tags: [avatar.model_type, avatar.matting_status || "avatar"].filter(Boolean),
    workflows: ["asset_center", "video", "realtime", "solution_kit"],
    storage: localStorage({
      key: `avatars/${avatar.id}/preview`,
      publicUrl,
      sizeBytes: 0,
      contentType: "image/png",
      checksum: `api-avatar-${avatar.id}`,
    }),
    upload: {
      status: "local",
      progress: 100,
      message: "来自现有 OpenTalking 形象资产接口。",
      lastUpdatedAt: "2026-07-05T10:00:00.000Z",
    },
    preview: {
      imageUrl: publicUrl,
      videoUrl: avatar.has_preview_video ? buildApiUrl(`/avatars/${encodeURIComponent(avatar.id)}/preview-video`) : undefined,
      aspectRatio: avatar.height > avatar.width ? "9:16" : "16:9",
    },
    technical: {
      width: avatar.width,
      height: avatar.height,
      modelType: avatar.model_type,
    },
    usageCount: avatar.is_custom ? 12 : 180,
    createdAt: "2026-07-05T10:00:00.000Z",
    updatedAt: "2026-07-05T10:00:00.000Z",
  };
}

function backendVoiceToAsset(voice: BackendVoice): StudioAsset {
  const publicUrl = buildApiUrl(`/voice-uploads/${encodeURIComponent(voice.voice_id)}`);
  return {
    id: `voice-${voice.voice_id}`,
    kind: "voice",
    scope: voice.source === "clone" ? "personal" : "system",
    status: "ready",
    name: voice.display_label || voice.voice_id,
    description: `${voice.provider} 音色，来自现有 OpenTalking /voices 后端。`,
    thumbnailTone: voice.source === "clone" ? "mixed" : "blue",
    tags: [voice.provider, voice.source].filter(Boolean),
    workflows: ["asset_center", "video", "realtime", "solution_kit"],
    storage: localStorage({
      key: `voices/${voice.voice_id}`,
      publicUrl,
      sizeBytes: 0,
      contentType: "audio/wav",
      checksum: `api-voice-${voice.voice_id}`,
    }),
    upload: {
      status: "local",
      progress: 100,
      message: "来自现有 OpenTalking 音色目录接口。",
      lastUpdatedAt: "2026-07-05T10:00:00.000Z",
    },
    preview: {
      audioUrl: publicUrl,
      textExcerpt: voice.display_label,
    },
    technical: {
      provider: voice.provider,
      targetModel: voice.target_model ?? undefined,
    },
    usageCount: voice.source === "clone" ? 36 : 160,
    createdAt: "2026-07-05T10:00:00.000Z",
    updatedAt: "2026-07-05T10:00:00.000Z",
  };
}

function backendBackgroundToAsset(background: BackendSceneBackground): StudioAsset {
  const publicUrl = background.url.startsWith("/api") ? background.url : buildApiUrl(background.url);
  return {
    id: `background-${background.id}`,
    kind: "background",
    scope: "team",
    status: "ready",
    name: background.name,
    description: `背景文件 ${background.filename}，来自现有 OpenTalking /scene-assets/backgrounds 后端。`,
    thumbnailTone: "mixed",
    tags: ["背景", background.kind],
    workflows: ["asset_center", "video", "realtime", "solution_kit"],
    storage: localStorage({
      key: `scene-assets/backgrounds/${background.id}`,
      publicUrl,
      sizeBytes: background.size_bytes,
      contentType: background.mime_type,
      checksum: `api-background-${background.id}`,
    }),
    upload: {
      status: "local",
      progress: 100,
      message: "来自现有 OpenTalking 场景资产接口。",
      lastUpdatedAt: background.created_at,
    },
    preview: {
      imageUrl: publicUrl,
      aspectRatio: "16:9",
    },
    usageCount: 80,
    createdAt: background.created_at,
    updatedAt: background.created_at,
  };
}

function localFallbackAssets(filters: AssetListFilters): StudioAsset[] {
  const base = filters.workflow ? listLocalAssetsByWorkflow(filters.workflow) : studioAssets;
  return base.filter((asset) => {
    if (filters.kind && asset.kind !== filters.kind) return false;
    if (filters.status && asset.status !== filters.status) return false;
    return true;
  });
}

async function listBackendAssets(filters: AssetListFilters): Promise<StudioAsset[]> {
  if (filters.kind === "avatar") {
    return (await apiGet<BackendAvatar[]>("/avatars")).map(backendAvatarToAsset);
  }

  if (filters.kind === "voice") {
    const response = await apiGet<{ items: BackendVoice[] }>("/voices");
    return response.items.map(backendVoiceToAsset);
  }

  if (filters.kind === "background") {
    const response = await apiGet<{ items: BackendSceneBackground[] }>("/scene-assets/backgrounds");
    return response.items.map(backendBackgroundToAsset);
  }

  const [avatars, voices, backgrounds] = await Promise.all([
    apiGet<BackendAvatar[]>("/avatars").then((items) => items.map(backendAvatarToAsset)),
    apiGet<{ items: BackendVoice[] }>("/voices").then((response) => response.items.map(backendVoiceToAsset)),
    apiGet<{ items: BackendSceneBackground[] }>("/scene-assets/backgrounds").then((response) => response.items.map(backendBackgroundToAsset)),
  ]);

  return [...avatars, ...voices, ...backgrounds, ...studioAssets.filter((asset) => !["avatar", "voice", "background"].includes(asset.kind))];
}

export async function listAssets(filters: AssetListFilters = {}): Promise<StudioAsset[]> {
  try {
    const backendAssets = await listBackendAssets(filters);
    return backendAssets.filter((asset) => {
      if (filters.workflow && !asset.workflows.includes(filters.workflow)) return false;
      if (filters.status && asset.status !== filters.status) return false;
      return true;
    });
  } catch {
    return localFallbackAssets(filters);
  }
}

export async function getAsset(id: string): Promise<StudioAsset | undefined> {
  const local = getAssetById(id);
  if (local) return local;
  const assets = await listAssets();
  return assets.find((asset) => asset.id === id);
}

export const listSolutionKits = mockApi.listSolutionKits;
export const getSolutionKit = mockApi.getSolutionKit;
export const createUploadIntent = mockApi.createUploadIntent;
export const confirmUpload = mockApi.confirmUpload;
export const getTaskStatus = mockApi.getTaskStatus;
export const getTaskStatusLabel = mockApi.getTaskStatusLabel;

export async function getDefaultVideoConfiguration(options: { kitId?: string } = {}): Promise<VideoWorkflowConfiguration> {
  return mockApi.getDefaultVideoConfiguration(options);
}

export async function getDefaultRealtimeConfiguration(options: { kitId?: string } = {}): Promise<RealtimeWorkflowConfiguration> {
  return mockApi.getDefaultRealtimeConfiguration(options);
}

function toBackendAvatarId(assetId: string | undefined): string {
  if (!assetId) return "office-woman";
  return assetId.startsWith("avatar-") ? assetId.slice("avatar-".length) : assetId;
}

function toBackendVoiceId(assetId: string | undefined): string | undefined {
  if (!assetId) return undefined;
  return assetId.startsWith("voice-") ? assetId.slice("voice-".length) : assetId;
}

function firstAssetId(assetIds: string[], kind: AssetKind): string | undefined {
  return assetIds.find((id) => id.startsWith(`${kind}-`));
}

export async function createProject(input: CreateProjectInput): Promise<StudioProject> {
  return mockApi.createProject(input);
}

export async function createTask(input: CreateTaskInput): Promise<StudioTask> {
  if (input.type === "video_render") {
    try {
      const form = new FormData();
      const avatarId = firstAssetId(input.assetIds, "avatar");
      const voiceId = firstAssetId(input.assetIds, "voice");
      const scriptAsset = input.assetIds.map(getAssetById).find((asset) => asset?.kind === "script_template");
      form.set("model", "wav2lip");
      form.set("avatar_id", toBackendAvatarId(avatarId));
      form.set("audio_source", "tts_text");
      form.set("title", input.message);
      form.set("text", scriptAsset?.preview.textExcerpt || input.message);
      form.set("tts_provider", "local_cosyvoice");
      const backendVoiceId = toBackendVoiceId(voiceId);
      if (backendVoiceId) form.set("voice", backendVoiceId);
      const response = await apiPostForm<{ job_id?: string; id?: string }>("/video-creation/jobs", form);
      return {
        id: response.job_id || response.id || `video-job-${Date.now()}`,
        type: input.type,
        status: "queued",
        progress: 0,
        assetIds: input.assetIds,
        createdAt: "2026-07-05T10:00:00.000Z",
        updatedAt: "2026-07-05T10:00:00.000Z",
        message: input.message,
      };
    } catch {
      return mockApi.createTask(input);
    }
  }

  if (input.type === "realtime_session") {
    try {
      const avatarId = firstAssetId(input.assetIds, "avatar");
      const voiceId = firstAssetId(input.assetIds, "voice");
      const response = await apiPostJson<{ session_id?: string; status?: string }>("/sessions", {
        avatar_id: toBackendAvatarId(avatarId),
        model: "wav2lip",
        tts_provider: "local_cosyvoice",
        tts_voice: toBackendVoiceId(voiceId),
        agent_enabled: true,
        knowledge_enabled: input.assetIds.some((assetId) => assetId.startsWith("knowledge-")),
        knowledge_base_id: input.assetIds.find((assetId) => assetId.startsWith("knowledge-")),
      });
      return {
        id: response.session_id || `session-${Date.now()}`,
        type: input.type,
        status: "queued",
        progress: 0,
        assetIds: input.assetIds,
        createdAt: "2026-07-05T10:00:00.000Z",
        updatedAt: "2026-07-05T10:00:00.000Z",
        message: input.message,
      };
    } catch {
      return mockApi.createTask(input);
    }
  }

  return mockApi.createTask(input);
}

export type { SolutionKit };
