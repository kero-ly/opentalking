import {
  getAssetById,
  listAssetsByWorkflow,
  studioAssets,
  type AssetKind,
  type AssetStorage,
  type AssetWorkflow,
  type StudioAsset,
  type StudioTask,
  type TaskStatus,
  type UploadStatus,
} from "../../entities/asset";
import { studioProjects, type StudioProject } from "../../entities/project";
import { getSolutionKitById, solutionKits, type SolutionKit } from "../../entities/solution-kit";
import type { RealtimeWorkflowConfiguration, VideoWorkflowConfiguration } from "../../entities/workflow";

type AssetListFilters = {
  kind?: AssetKind;
  workflow?: AssetWorkflow;
  status?: StudioAsset["status"];
};

type WorkflowDefaultOptions = {
  kitId?: string;
};

export type UploadIntentInput = {
  kind: AssetKind;
  fileName: string;
  contentType: string;
  sizeBytes: number;
};

export type UploadIntent = {
  id: string;
  kind: AssetKind;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  targetPrefix: string;
  uploadUrl: string;
  assetId: string;
  status: UploadStatus;
  progress: number;
  storage: AssetStorage;
};

export type ConfirmedUpload = UploadIntent & {
  status: "processing";
  progress: 100;
};

export type CreateProjectInput = {
  name: string;
  type: StudioProject["type"];
  linkedAssetIds: string[];
  solutionKitId?: string;
};

export type CreateTaskInput = {
  type: StudioTask["type"];
  assetIds: string[];
  message: string;
};

const mockProjects = new Map<string, StudioProject>(studioProjects.map((project) => [project.id, project]));
const mockUploads = new Map<string, UploadIntent>();
const mockTasks = new Map<string, StudioTask>([
  [
    "task-avatar-clone-demo",
    {
      id: "task-avatar-clone-demo",
      type: "avatar_training",
      status: "running",
      progress: 68,
      assetIds: ["avatar-processing-clone"],
      createdAt: "2026-07-05T08:00:00.000Z",
      updatedAt: "2026-07-05T08:20:00.000Z",
      message: "形象训练中，预计还需要 12 分钟。",
    },
  ],
]);

const uploadPrefixByKind: Partial<Record<AssetKind, string>> = {
  avatar: "avatars/uploads/",
  voice: "voices/uploads/",
  background: "backgrounds/uploads/",
  scene: "scenes/uploads/",
  knowledge: "knowledge/uploads/",
  persona: "personas/uploads/",
  script_template: "scripts/uploads/",
};

function requireAsset(id: string): StudioAsset {
  const asset = getAssetById(id);
  if (!asset) {
    throw new Error(`Missing Studio asset fixture: ${id}`);
  }
  return asset;
}

function slugifyFileName(fileName: string): string {
  return fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function slugifyProjectName(name: string): string {
  const known: Record<string, string> = {
    新品介绍短视频: "xin-pin-jie-shao-duan-shi-pin",
  };
  return (
    known[name] ??
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") ??
    "untitled"
  );
}

function nowIso(): string {
  return "2026-07-05T10:00:00.000Z";
}

function assetsForKit(kitId?: string): StudioAsset[] {
  const kit = kitId ? getSolutionKitById(kitId) : undefined;
  if (!kit) return [];
  return kit.assetIds.map(requireAsset);
}

function findKitAsset(assets: StudioAsset[], kind: AssetKind): StudioAsset | undefined {
  return assets.find((asset) => asset.kind === kind);
}

export async function listAssets(filters: AssetListFilters = {}): Promise<StudioAsset[]> {
  const workflowAssets = filters.workflow ? listAssetsByWorkflow(filters.workflow) : studioAssets;
  return workflowAssets.filter((asset) => {
    if (filters.kind && asset.kind !== filters.kind) return false;
    if (filters.status && asset.status !== filters.status) return false;
    return true;
  });
}

export async function getAsset(id: string): Promise<StudioAsset | undefined> {
  return getAssetById(id);
}

export async function listSolutionKits(): Promise<SolutionKit[]> {
  return solutionKits;
}

export async function getSolutionKit(id: string): Promise<SolutionKit | undefined> {
  return getSolutionKitById(id);
}

export async function getDefaultVideoConfiguration(options: WorkflowDefaultOptions = {}): Promise<VideoWorkflowConfiguration> {
  const kitAssets = assetsForKit(options.kitId);
  return {
    avatar: findKitAsset(kitAssets, "avatar") ?? requireAsset("avatar-live-broadcast"),
    voice: findKitAsset(kitAssets, "voice") ?? requireAsset("voice-local-anchor-cherry"),
    background: findKitAsset(kitAssets, "background") ?? requireAsset("background-default-data-wall"),
    scene: findKitAsset(kitAssets, "scene") ?? requireAsset("scene-commerce-live-front"),
    script: findKitAsset(kitAssets, "script_template") ?? requireAsset("script-product-launch"),
    output: {
      aspectRatio: "9:16",
      resolution: "1080p",
      durationSec: 45,
      subtitleEnabled: true,
      format: "mp4",
    },
  };
}

export async function getDefaultRealtimeConfiguration(options: WorkflowDefaultOptions = {}): Promise<RealtimeWorkflowConfiguration> {
  const kitAssets = assetsForKit(options.kitId);
  return {
    avatar: findKitAsset(kitAssets, "avatar") ?? requireAsset("avatar-office-woman"),
    voice: findKitAsset(kitAssets, "voice") ?? requireAsset("voice-local-office-serena"),
    background: findKitAsset(kitAssets, "background") ?? findKitAsset(kitAssets, "scene") ?? requireAsset("background-default-data-wall"),
    knowledge: findKitAsset(kitAssets, "knowledge") ?? requireAsset("knowledge-hospital-guide"),
    persona: findKitAsset(kitAssets, "persona") ?? requireAsset("persona-service-guide"),
    runtime: findKitAsset(kitAssets, "runtime_preset") ?? requireAsset("runtime-flashtalk-quality"),
    session: {
      transport: "websocket",
      latencyTargetMs: 800,
      interruptible: true,
      vadEnabled: true,
    },
  };
}

export async function createUploadIntent(input: UploadIntentInput): Promise<UploadIntent> {
  const safeName = slugifyFileName(input.fileName) || "asset";
  const targetPrefix = uploadPrefixByKind[input.kind] ?? "assets/uploads/";
  const key = `${targetPrefix}${safeName}`;
  const id = `upload-${input.kind}-${safeName.replace(/-/g, "-")}`;
  const storageKey = key;
  const publicUrl = `/studio-assets/${storageKey}`;

  const upload: UploadIntent = {
    id,
    kind: input.kind,
    fileName: input.fileName,
    contentType: input.contentType,
    sizeBytes: input.sizeBytes,
    targetPrefix,
    uploadUrl: `mock://local-upload/${storageKey}`,
    assetId: `${input.kind}-upload-${safeName}`,
    status: "pending",
    progress: 0,
    storage: {
      provider: "local",
      bucket: "opentalking-studio-local",
      region: "local-dev",
      key: storageKey,
      publicUrl,
      previewUrl: publicUrl,
      thumbnailUrl: publicUrl,
      sourcePath: `apps/studio/public${publicUrl}`,
      checksum: `sha256:pending-${safeName}`,
      sizeBytes: input.sizeBytes,
      contentType: input.contentType,
    },
  };

  mockUploads.set(upload.id, upload);
  return upload;
}

export async function confirmUpload(uploadId: string): Promise<ConfirmedUpload> {
  const upload = mockUploads.get(uploadId);
  if (!upload) {
    throw new Error(`Missing upload intent: ${uploadId}`);
  }

  const confirmed: ConfirmedUpload = {
    ...upload,
    status: "processing",
    progress: 100,
  };
  mockUploads.set(uploadId, confirmed);
  return confirmed;
}

export async function createProject(input: CreateProjectInput): Promise<StudioProject> {
  const project: StudioProject = {
    id: `project-${input.type}-${slugifyProjectName(input.name) || "untitled"}`,
    name: input.name,
    type: input.type,
    status: "draft",
    solutionKitId: input.solutionKitId,
    linkedAssetIds: input.linkedAssetIds,
    updatedAt: nowIso(),
  };
  mockProjects.set(project.id, project);
  return project;
}

export async function createTask(input: CreateTaskInput): Promise<StudioTask> {
  const task: StudioTask = {
    id: `task-${input.type}-${mockTasks.size + 1}`,
    type: input.type,
    status: "queued",
    progress: 0,
    assetIds: input.assetIds,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    message: input.message,
  };
  mockTasks.set(task.id, task);
  return task;
}

export async function getTaskStatus(taskId: string): Promise<StudioTask | undefined> {
  return mockTasks.get(taskId);
}

export function getTaskStatusLabel(status: TaskStatus): string {
  const labels: Record<TaskStatus, string> = {
    queued: "排队中",
    running: "运行中",
    succeeded: "已完成",
    failed: "失败",
    cancelled: "已取消",
  };
  return labels[status];
}
