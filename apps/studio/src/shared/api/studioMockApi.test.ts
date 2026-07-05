import { describe, expect, it } from "vitest";
import {
  confirmUpload,
  createProject,
  createTask,
  createUploadIntent,
  getDefaultRealtimeConfiguration,
  getDefaultVideoConfiguration,
  getTaskStatus,
  listAssets,
} from "./studioMockApi";

describe("studio mock api", () => {
  it("provides asset-backed default video configuration", async () => {
    const video = await getDefaultVideoConfiguration();

    expect(video.avatar.kind).toBe("avatar");
    expect(video.voice.kind).toBe("voice");
    expect(video.script.kind).toBe("script_template");
    expect(video.background.kind).toBe("background");
    expect(video.scene.kind).toBe("scene");
    expect(video.output.aspectRatio).toBe("9:16");
  });

  it("applies solution kit presets to default video configuration", async () => {
    const video = await getDefaultVideoConfiguration({ kitId: "healthcare-guide" });

    expect(video.avatar.id).toBe("avatar-office-woman");
    expect(video.voice.id).toBe("voice-local-office-serena");
    expect(video.scene.id).toBe("scene-medical-guide-zh");
  });

  it("provides asset-backed default realtime configuration", async () => {
    const realtime = await getDefaultRealtimeConfiguration();

    expect(realtime.avatar.kind).toBe("avatar");
    expect(realtime.voice.kind).toBe("voice");
    expect(realtime.knowledge.kind).toBe("knowledge");
    expect(realtime.persona.kind).toBe("persona");
    expect(realtime.runtime.kind).toBe("runtime_preset");
    expect(realtime.session.transport).toBe("websocket");
  });

  it("applies solution kit presets to default realtime configuration", async () => {
    const realtime = await getDefaultRealtimeConfiguration({ kitId: "healthcare-guide" });

    expect(realtime.avatar.id).toBe("avatar-office-woman");
    expect(realtime.knowledge.id).toBe("knowledge-hospital-guide");
    expect(realtime.runtime.id).toBe("runtime-flashtalk-quality");
  });

  it("creates deterministic cloud-ready upload intents", async () => {
    const upload = await createUploadIntent({
      kind: "voice",
      fileName: "demo.wav",
      contentType: "audio/wav",
      sizeBytes: 1234,
    });

    expect(upload.id).toBe("upload-voice-demo-wav");
    expect(upload.targetPrefix).toBe("voices/uploads/");
    expect(upload.storage.provider).toBe("local");
    expect(upload.status).toBe("pending");
  });

  it("confirms uploads and exposes task lifecycle state", async () => {
    const upload = await createUploadIntent({
      kind: "avatar",
      fileName: "demo.mp4",
      contentType: "video/mp4",
      sizeBytes: 4321,
    });
    const confirmed = await confirmUpload(upload.id);
    const task = await createTask({
      type: "avatar_training",
      assetIds: [confirmed.assetId],
      message: "训练自定义数字人",
    });

    expect(confirmed.status).toBe("processing");
    expect(task.status).toBe("queued");
    expect((await getTaskStatus(task.id))?.assetIds).toEqual([confirmed.assetId]);
  });

  it("creates projects from selected local assets", async () => {
    const assets = await listAssets({ workflow: "video" });
    const project = await createProject({
      name: "新品介绍短视频",
      type: "video",
      linkedAssetIds: assets.slice(0, 3).map((asset) => asset.id),
      solutionKitId: "commerce-live",
    });

    expect(project.id).toBe("project-video-xin-pin-jie-shao-duan-shi-pin");
    expect(project.status).toBe("draft");
    expect(project.linkedAssetIds).toHaveLength(3);
  });
});
