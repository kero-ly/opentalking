# OpenTalking Studio Local Assets And Creation Workflows

Date: 2026-07-05

## Goal

Turn the current Studio shell into a realistic local-asset-driven creation console. Users should be able to browse real repository assets, understand what each asset can be used for, combine assets into a digital-human video or real-time digital-human configuration, and preview the chosen combination before generation or publishing.

This version is still frontend-only. It must use local repository assets and mock services, while defining storage fields, upload states, task states, and API contracts that can connect to cloud object storage and backend generation services in a future phase.

## Scope

In scope:

- Create a unified local Studio asset catalog under `apps/studio/public/studio-assets/`.
- Copy or reference existing repository media into the catalog:
  - `examples/avatars/*` for digital-human avatars.
  - `opentalking/assets/voices/system/*` for voice presets.
  - `opentalking/assets/scene_backgrounds/*` for backgrounds.
  - `apps/homepage/public/images/cases/*` for solution and case previews.
  - selected `docs/assets/images/*` screenshots for workflow documentation and legacy WebUI reference.
- Extend asset, project, upload, storage, and task domain types.
- Add a mock Studio asset API layer that reads fixture data and simulates upload/generation state.
- Upgrade Asset Center into a usable asset management console.
- Upgrade Create Video into a configuration workflow with asset selectors and visual preview.
- Upgrade Real-Time Human into a session configuration workflow with asset selectors, runtime settings, and live-preview style status.
- Update Workspace quick-start cards so they deep-link into workflows with preselected local assets or solution kits.

Out of scope for this phase:

- Real cloud upload.
- Real file writing from the browser.
- Real generation jobs.
- Real WebRTC session startup.
- Backend authentication or permission enforcement.
- Billing enforcement.

## Local Asset Directory

Studio should expose static local assets from:

```text
apps/studio/public/studio-assets/
  catalog.json
  avatars/
    office-woman/
      manifest.json
      preview.png
      reference.png
    anchor/
      manifest.json
      preview.png
      reference.png
  voices/
    local-office-serena/
      meta.json
      prompt.txt
      prompt.wav
  backgrounds/
    default-data-wall.jpg
  cases/
    ecommerce-live-front-preview.png
    medical-guide-zh-preview.png
  docs/
    opentalking-makevideo.png
    opentalking-webui.png
```

`catalog.json` is the frontend fixture source of truth for the Studio app. It should list every local asset with normalized metadata and URLs relative to `/studio-assets/`.

Repository source paths should be recorded in metadata so it is clear where local assets came from. The local copy exists to make the Vite app self-contained and easy to deploy in preview mode.

## Future Cloud Storage Shape

Every asset should include storage metadata even when the current provider is local:

```ts
export type StorageProvider = "local" | "s3" | "oss" | "cos" | "r2";

export type AssetStorage = {
  provider: StorageProvider;
  bucket?: string;
  region?: string;
  key: string;
  publicUrl: string;
  previewUrl?: string;
  thumbnailUrl?: string;
  sourcePath?: string;
  checksum?: string;
  sizeBytes?: number;
  contentType?: string;
};
```

For local assets:

- `provider` is `"local"`.
- `bucket` and `region` are absent.
- `key` is the relative catalog key, such as `avatars/office-woman/preview.png`.
- `publicUrl` is a browser-accessible path, such as `/studio-assets/avatars/office-woman/preview.png`.
- `sourcePath` records the repository source path, such as `examples/avatars/office-woman/preview.png`.

## Upload State

Uploads are mock-only in this phase. They still need a real state model so the UI behaves like a production console:

```ts
export type UploadStatus =
  | "local"
  | "queued"
  | "uploading"
  | "processing"
  | "ready"
  | "failed";

export type AssetUploadState = {
  status: UploadStatus;
  progress: number;
  message: string;
  acceptedTypes: string[];
  targetPrefix: string;
  mockDurationMs?: number;
};
```

Behavior:

- Existing built-in assets use `status: "local"` or `status: "ready"`.
- The upload drawer accepts avatar images, voice WAV files, backgrounds, knowledge files, and script documents.
- Dropping a file creates a mock item with `queued -> uploading -> processing -> ready` progress.
- Failed uploads can be represented with one mock example, but the happy path is the default.

## Task State

Generation and publishing actions are mock-only but must show realistic states:

```ts
export type StudioTaskType =
  | "video_generation"
  | "realtime_session"
  | "asset_upload"
  | "voice_clone"
  | "avatar_clone";

export type StudioTaskStatus =
  | "draft"
  | "queued"
  | "running"
  | "preview_ready"
  | "completed"
  | "failed";

export type StudioTask = {
  id: string;
  type: StudioTaskType;
  status: StudioTaskStatus;
  progress: number;
  title: string;
  projectId?: string;
  assetIds: string[];
  startedAt?: string;
  completedAt?: string;
  message: string;
};
```

Create Video uses a `video_generation` task. Real-Time Human uses a `realtime_session` task. Upload flows use `asset_upload`.

## Asset Model

Extend `StudioAsset` so cards, details, pickers, and creation workflows share one source:

```ts
export type AssetWorkflow = "video" | "realtime" | "solution_kit";

export type StudioAsset = {
  id: string;
  kind: AssetKind;
  scope: AssetScope;
  status: AssetStatus;
  name: string;
  description: string;
  tags: string[];
  ownerId?: string;
  teamId?: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  storage: AssetStorage;
  upload: AssetUploadState;
  workflows: AssetWorkflow[];
  preview: {
    title: string;
    subtitle: string;
    imageUrl?: string;
    audioUrl?: string;
    videoUrl?: string;
    aspectRatio?: "16:9" | "9:16" | "1:1";
    durationSec?: number;
    resolution?: string;
  };
  technical?: {
    modelType?: string;
    fps?: number;
    sampleRate?: number;
    width?: number;
    height?: number;
    provider?: string;
  };
};
```

The app should stop relying on abstract thumbnail tones as the main visual. Tones can remain as fallback, but real previews should be primary.

## Mock API Contract

Create a frontend mock service that mirrors future backend boundaries:

```ts
export type ListAssetsInput = {
  kind?: AssetKind;
  status?: AssetStatus;
  workflow?: AssetWorkflow;
  query?: string;
  tag?: string;
};

export type CreateUploadIntentInput = {
  kind: AssetKind;
  fileName: string;
  contentType: string;
  sizeBytes: number;
};

export type CreateProjectInput = {
  type: "video" | "realtime" | "solution_kit";
  name: string;
  selectedAssetIds: string[];
  solutionKitId?: string;
};

export type CreateTaskInput = {
  type: StudioTaskType;
  projectId: string;
  assetIds: string[];
};
```

Required mock functions:

```ts
listAssets(input?: ListAssetsInput): Promise<StudioAsset[]>
getAsset(id: string): Promise<StudioAsset | undefined>
listSolutionKits(): Promise<SolutionKit[]>
getSolutionKit(id: string): Promise<SolutionKit | undefined>
createUploadIntent(input: CreateUploadIntentInput): Promise<AssetUploadState>
confirmUpload(assetId: string): Promise<StudioAsset>
createProject(input: CreateProjectInput): Promise<StudioProject>
createTask(input: CreateTaskInput): Promise<StudioTask>
getTaskStatus(taskId: string): Promise<StudioTask>
```

The functions may resolve immediately or with small simulated delays. They should not call a network service.

## Asset Center UX

Asset Center should become an operational console:

- Header: summary metrics for total assets, ready assets, processing assets, and local storage provider.
- Left rail or top filters: asset type, workflow compatibility, status, scope, and tags.
- Main grid: cards with real image/audio/case thumbnails, status, tags, storage provider, and workflow badges.
- Detail panel: selected asset preview, metadata, source path, storage key, compatible workflows, linked projects, and primary actions.
- Upload drawer: drag-and-drop mock upload with target directory, accepted file types, and progress.

The first screen should show enough real content that users understand this is a reusable asset library, not just a static menu.

## Create Video UX

Create Video should work like a guided configurator:

1. Choose a workflow mode:
   - Text script to video.
   - Audio-driven avatar video.
   - PPT/PDF explainer entry for UI wiring.
2. Select assets:
   - Avatar.
   - Voice.
   - Background or scene.
   - Script template.
3. Configure output:
   - Aspect ratio.
   - Duration target.
   - Quality preset.
   - Subtitle on/off.
4. Preview:
   - Show selected avatar image.
   - Show background/case context.
   - Show selected voice prompt with audio control when available.
   - Show script excerpt and estimated generation time.
5. Generate:
   - Create a mock project.
   - Create a mock `video_generation` task.
   - Show progress and a mock generated output card.

Default state should preselect a complete sample combination so the page is immediately meaningful.

## Real-Time Human UX

Real-Time Human should work like a session configuration console:

1. Select avatar.
2. Select voice.
3. Select persona.
4. Select knowledge base.
5. Select background or scene.
6. Select runtime preset.
7. Preview session:
   - Avatar preview.
   - Voice sample.
   - Knowledge/persona summary.
   - Runtime indicators such as latency, FPS, transport, and status.
8. Start test session:
   - Create a mock project.
   - Create a mock `realtime_session` task.
   - Show connection log and session-ready status.

Default state should preselect the medical guide demo from existing assets.

## Workspace UX

Workspace should connect the whole experience:

- Quick starts:
  - Start from solution kit.
  - Start from avatar.
  - Upload new asset.
  - Continue recent project.
- Recommended local assets with real thumbnails.
- Recent projects that show linked assets and project type.
- Task queue showing mock upload/generation/session tasks.
- Storage summary showing the local provider now and cloud-ready structure for future storage.

Each quick start should navigate to the relevant page with a preset selection in route state or query params.

## Solution Kits UX

Solution kits should become bundled asset recipes:

- Kit card shows real case preview image.
- Detail page lists included avatar, voice, background, persona, knowledge, scripts, and runtime preset.
- Primary actions:
  - Use for video.
  - Use for real-time demo.
  - Save as custom kit.
- Using a kit preselects assets in Create Video or Real-Time Human.

## Local-To-Cloud Migration Assumptions

The frontend should treat storage as provider-agnostic:

- UI reads `asset.storage.publicUrl`, not hard-coded local source paths.
- Local asset paths are implementation details of the fixture catalog.
- Upload UI calls `createUploadIntent()` even though it is mocked.
- Task UI calls `createTask()` and `getTaskStatus()` even though they are mocked.
- Replacing mock services with real HTTP clients should not require rewriting page components.

## Testing Requirements

Add focused tests for:

- Catalog contains real local avatar and voice assets.
- Asset filtering by kind and workflow.
- Solution kit resolves included asset ids.
- Create Video default selection contains avatar, voice, script/background, and can create a mock task.
- Real-Time default selection contains avatar, voice, persona/knowledge, runtime preset, and can create a mock task.
- Upload intent returns a target key under the correct local prefix.

## Acceptance Criteria

- Asset Center shows real images/audio metadata from the repository.
- Create Video is usable without login and shows a complete default configuration with visual preview.
- Real-Time Human is usable without login and shows a complete default configuration with session preview.
- Workspace quick starts link into configured creation pages.
- Local asset files live under a single Studio public asset root.
- Mock services expose API-shaped functions ready to replace with real backend calls.
- Tests, typecheck, and production build pass.
