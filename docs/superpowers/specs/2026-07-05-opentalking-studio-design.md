# OpenTalking Studio Design Specification

Date: 2026-07-05

## Goal

OpenTalking already has a public website at `https://www.opentalking.net/`. The website should continue to handle brand introduction, cases, documentation, deployment guidance, open-source positioning, and conversion entry points.

This specification defines a separate logged-in product application: **OpenTalking Studio**, a TypeScript web app for digital-human video creation, real-time digital-human management, asset hosting, and reusable solution packages.

The chosen direction is **Option B** from the product architecture discussion:

- Keep `apps/homepage` as the public website.
- Keep the current `apps/web` as the open-source WebUI / model validation console for real-time dialogue and local deployment workflows.
- Add a new formal product app under `apps/studio`.
- Reuse API contracts, domain types, and selected workflow components from `apps/web`, but do not continue growing the current large `apps/web/src/App.tsx` into the commercial Studio shell.

## Product Positioning

OpenTalking Studio is not only a digital-human video generator. It should be positioned as a **real-time digital-human creation and asset operation platform**.

The product must support three connected jobs:

1. Create digital-human videos from text, audio, PPT/PDF, or reusable scripts.
2. Create, test, and publish real-time conversational digital humans.
3. Host and combine assets such as avatars, voices, backgrounds, scenes, personas, knowledge bases, and workflow presets into reusable solution packages.

The key differentiator is the combination of **video generation + real-time conversation + reusable solution assets**.

## Application Boundary

Recommended deployment target:

- Primary: `studio.opentalking.net`
- Acceptable alternative: `app.opentalking.net`
- Fallback route: `www.opentalking.net/workspace`

The public website should link into Studio through actions such as:

- Free trial
- Create digital human
- Try real-time demo
- View solution package
- Contact for private deployment

Studio owns authenticated user flows, workspace state, assets, project history, quota, billing, team management, and publishing/integration controls.

## Technical Choice

Use the repository's existing frontend foundation:

- React 18
- TypeScript
- Vite
- Tailwind CSS
- `lucide-react` for icons

Do not use one-off static HTML for implementation. The HTML mockups created during brainstorming are visual references only.

Do not introduce Next.js for the first Studio version. Studio is a logged-in app where SEO is not important, and the repository already has a Vite-based frontend stack.

## Proposed Source Structure

```text
apps/studio/
  index.html
  package.json
  postcss.config.js
  tailwind.config.js
  tsconfig.json
  vite.config.ts
  src/
    app/
      App.tsx
      routes.tsx
      StudioLayout.tsx
      AuthLayout.tsx
    pages/
      LoginPage.tsx
      RegisterPage.tsx
      TrialPage.tsx
      WorkspacePage.tsx
      CreateVideoPage.tsx
      CreateRealtimePage.tsx
      AssetLibraryPage.tsx
      AvatarAssetsPage.tsx
      VoiceAssetsPage.tsx
      SceneAssetsPage.tsx
      BackgroundAssetsPage.tsx
      KnowledgeAssetsPage.tsx
      SolutionKitsPage.tsx
      SolutionKitDetailPage.tsx
      ProjectsPage.tsx
      ProjectDetailPage.tsx
      BillingPage.tsx
      TeamPage.tsx
      ApiAccessPage.tsx
      SettingsPage.tsx
    features/
      assets/
      avatars/
      voices/
      scenes/
      video-creation/
      realtime-human/
      solution-kits/
      projects/
      quota/
      auth/
      team/
    entities/
      asset.ts
      project.ts
      solution-kit.ts
      user.ts
      quota.ts
    shared/
      api/
      hooks/
      ui/
      utils/
      design-system/
```

The structure should keep app shell, pages, domain features, domain entities, and shared UI utilities separate. Feature modules may reuse existing `apps/web` logic after extraction, but the Studio app should own its navigation, product language, and route-level composition.

## Routes

Initial route map:

```text
/login
/register
/trial
/workspace
/create/video
/create/realtime
/assets
/assets/avatars
/assets/voices
/assets/scenes
/assets/backgrounds
/assets/knowledge
/solutions
/solutions/:id
/projects
/projects/:id
/billing
/team
/api-access
/settings
```

`/workspace` is the default authenticated landing page.

## Navigation Model

Use a left sidebar plus top account bar.

Sidebar groups:

- Main
  - Home
  - Create Video
  - Real-time Human
  - Projects
- Assets
  - Avatars
  - Voices
  - Scenes
  - Backgrounds
  - Knowledge
  - Solution Kits
- Workspace
  - Team
  - Billing
  - API Access
  - Settings

The sidebar should include a persistent primary create button near the top. The top bar should include global search, quota/coin balance, notifications/help, and user account status.

## Core Pages

### Workspace

The workspace page is the product home after login. It should show:

- Primary creation entry points:
  - Create digital-human video
  - Create real-time conversational demo
  - PPT/PDF to video
  - Voice clone
- Trial or account quota
- Recent projects
- Recommended assets
- Recommended solution kits
- Runtime readiness summary if connected to a deployment backend

### Create Video

The video creation workflow should support:

- Text-to-video
- Uploaded audio-driven video
- Voice-clone-driven video
- PPT/PDF-to-video as a later extension
- Output aspect ratios: 16:9, 9:16, 1:1
- Avatar selection
- Voice selection
- Background or scene selection
- Script editing
- Preview and generation job status
- Export to projects

Existing `VideoCreationWorkspace` behavior from `apps/web` is a candidate for extraction, but the Studio page should use a clearer creation workflow and user-facing labels.

### Real-Time Human

The real-time digital-human workflow should support:

- Avatar selection
- Voice selection
- Persona/system prompt
- Knowledge base binding
- Scene/background binding
- Model/backend readiness
- Real-time test conversation
- Recording/export
- Publish options:
  - Share demo link
  - Embed widget
  - API integration
  - Private deployment request

The current real-time conversation UI in `apps/web` can provide technical logic, but Studio should present it as a product setup and testing flow rather than a low-level model console.

### Asset Center

The asset center is a first-class product area. It should treat assets as reusable business objects rather than plain files.

Asset categories:

- Avatar
- Voice
- Background
- Scene composition
- Knowledge base
- Persona
- Script template
- Model/runtime preset
- Exported video

Each asset should expose:

- Name
- Type
- Thumbnail or preview
- Ownership scope: personal, team, system, marketplace
- Status: draft, processing, ready, failed, archived
- Usage count or linked projects
- Tags
- Created and updated timestamps
- Permission and license metadata when needed

### Solution Kits

Solution kits are the strategic differentiator.

A solution kit combines multiple assets into an industry-ready package:

```text
SolutionKit
  avatar
  voice
  background
  scene composition
  persona
  knowledge base
  script templates
  model/runtime preset
  example output
  recommended publish mode
```

Example kits:

- E-commerce livestream
- Healthcare guidance
- Tourism guide
- Enterprise training
- Customer service
- Government service assistant

Users should be able to:

- Preview a kit
- Use a kit to create a project
- Replace individual assets
- Save a customized copy to their workspace
- Request enterprise customization

### Projects

Projects should group generated videos, real-time demo configurations, exports, and assets used together.

Project types:

- Video project
- Real-time digital-human project
- Solution-kit-derived project

Project detail should show:

- Current configuration
- Generated outputs
- Linked assets
- Job history
- Share/export options
- Version or duplicate action

## Domain Model Draft

```ts
type AssetKind =
  | "avatar"
  | "voice"
  | "background"
  | "scene"
  | "knowledge"
  | "persona"
  | "script_template"
  | "runtime_preset"
  | "export_video";

type AssetScope = "system" | "personal" | "team" | "marketplace";
type AssetStatus = "draft" | "processing" | "ready" | "failed" | "archived";

type StudioAsset = {
  id: string;
  kind: AssetKind;
  scope: AssetScope;
  status: AssetStatus;
  name: string;
  description?: string;
  thumbnailUrl?: string;
  previewUrl?: string;
  tags: string[];
  ownerId?: string;
  teamId?: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
};

type SolutionKit = {
  id: string;
  name: string;
  industry: string;
  description: string;
  coverUrl?: string;
  assetIds: string[];
  personaId?: string;
  knowledgeBaseId?: string;
  scriptTemplateIds: string[];
  runtimePresetId?: string;
  recommendedAspectRatios: Array<"16:9" | "9:16" | "1:1">;
  exampleProjectId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

type StudioProject = {
  id: string;
  name: string;
  type: "video" | "realtime" | "solution_kit";
  status: "draft" | "ready" | "generating" | "published" | "failed" | "archived";
  solutionKitId?: string;
  linkedAssetIds: string[];
  createdAt: string;
  updatedAt: string;
};
```

These types are intentionally product-facing. API adapters may map existing backend objects such as avatars, voices, scene compositions, exports, and knowledge bases into these Studio entities.

## Visual Direction

Use a light, fresh, product-grade UI. Avoid a dark technology-heavy website.

Approved visual direction:

- Base direction: mint professional style from option B.
- Main brand/environment color: teal/mint.
- Primary action color: low-saturation warm apricot / clay, not bright orange.
- Blue should be used sparingly for links, API/developer affordances, and informational states.
- UI should feel clean, calm, capable, and slightly warm.

Suggested token draft:

```ts
const studioTheme = {
  color: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceMint: "#F6FBFA",
    sidebar: "#ECFDF5",
    primary: "#0F766E",
    primaryStrong: "#115E59",
    primarySoft: "#CCFBF1",
    action: "#D98B5F",
    actionStrong: "#C8754F",
    actionSoft: "#FFF4ED",
    info: "#2563EB",
    text: "#102033",
    muted: "#64748B",
    border: "#DBE7E8",
    borderSoft: "#EAF2F3",
  },
  radius: {
    control: "8px",
    card: "10px",
    panel: "12px",
  },
};
```

Use the warm action color only for high-priority actions such as create, confirm, upgrade, and publish. It should not dominate the page.

## UI Rules

- Use real application screens as the first post-login experience, not a marketing landing page.
- Keep page sections unframed unless they are actual panels, tables, lists, or repeated cards.
- Use cards for assets, solution kits, projects, and modals.
- Avoid nested cards.
- Use icons from `lucide-react`.
- Do not use emojis as icons.
- Keep controls dense enough for repeated work.
- Use stable sizing for asset cards, side navigation, toolbars, and action buttons.
- Ensure mobile layouts do not horizontally scroll.
- Maintain visible focus states and keyboard accessibility.

## Relationship To Existing Code

Reusable candidates from `apps/web`:

- API client patterns from `src/lib/api.ts`
- Avatar listing and upload concepts
- Voice catalog and voice clone concepts
- Scene background and composition concepts
- Knowledge base and memory concepts
- Export video concepts
- Video creation workflow logic
- Real-time WebRTC/SSE session logic

Areas that should not be copied directly:

- The large all-in-one `apps/web/src/App.tsx` state structure
- Debug-console-oriented navigation
- Low-level model labels where a product-facing label is needed
- Prototype-only `StudioPrototype.tsx`

The first implementation pass should extract or duplicate only the smallest useful API/type pieces into `apps/studio`, then refactor shared code after the Studio shape is validated.

## MVP Scope

Phase 1 should build the Studio shell and product information architecture:

- `apps/studio` scaffold
- Auth shell routes for login, register, and trial entry
- Studio layout with sidebar and topbar
- Workspace page
- Asset center page with mock/adapted data
- Solution kits page and detail page
- Projects page
- Shared UI primitives and design tokens
- API adapter layer prepared for real backend integration

Phase 2 should wire existing backend capabilities:

- Avatars
- Voices
- Scene backgrounds
- Scene compositions
- Knowledge bases
- Export videos
- Video creation jobs

Phase 3 should integrate real-time digital-human creation:

- Session setup flow
- Avatar/voice/persona/knowledge binding
- WebRTC/SSE test panel
- Recording/export
- Publish/share/API entry points

Phase 4 should add commercial and team capabilities:

- Login/register real integration
- Trial quota
- Billing
- Team workspace
- Permissions
- Enterprise/private deployment contact flows

## Testing Strategy

For the first implementation plan:

- Run TypeScript typecheck for `apps/studio`.
- Run production build for `apps/studio`.
- Add focused unit tests only where domain adapters or state transforms are non-trivial.
- Use browser verification for responsive layout at 375px, 768px, 1024px, and 1440px.
- Verify no text overlap, no horizontal scroll on mobile, and no unreadable contrast.

## Open Decisions

The following choices are intentionally fixed for the first implementation:

- Studio is a new app under `apps/studio`.
- The visual direction is light mint with low-saturation warm action buttons.
- The first page after login is `/workspace`.
- Solution kits are first-class product objects.
- HTML mockups are not implementation artifacts.

Future implementation may still decide whether to share code through a workspace package or by local extraction after the first Studio app is in place.
