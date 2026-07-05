import type { StudioAsset } from "./asset";

export type StudioAspectRatio = "16:9" | "9:16" | "1:1";

export type VideoOutputSettings = {
  aspectRatio: StudioAspectRatio;
  resolution: "720p" | "1080p" | "2k";
  durationSec: number;
  subtitleEnabled: boolean;
  format: "mp4";
};

export type VideoWorkflowConfiguration = {
  avatar: StudioAsset;
  voice: StudioAsset;
  background: StudioAsset;
  scene: StudioAsset;
  script: StudioAsset;
  output: VideoOutputSettings;
};

export type RealtimeSessionSettings = {
  transport: "websocket";
  latencyTargetMs: number;
  interruptible: boolean;
  vadEnabled: boolean;
};

export type RealtimeWorkflowConfiguration = {
  avatar: StudioAsset;
  voice: StudioAsset;
  background: StudioAsset;
  knowledge: StudioAsset;
  persona: StudioAsset;
  runtime: StudioAsset;
  session: RealtimeSessionSettings;
};

export type WorkflowPresetQuery = {
  kitId?: string;
  assetId?: string;
};
