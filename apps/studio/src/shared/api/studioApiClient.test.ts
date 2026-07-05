import { afterEach, describe, expect, it, vi } from "vitest";
import { createTask, listAssets } from "./studioApiClient";

describe("studio API client", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("loads avatars from the existing OpenTalking /avatars API", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify([
          {
            id: "office-woman",
            name: "职场女",
            model_type: "wav2lip",
            width: 540,
            height: 900,
            is_custom: false,
            has_preview_video: false,
            matting_status: "opaque",
          },
        ]),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const avatars = await listAssets({ kind: "avatar" });

    expect(fetchMock).toHaveBeenCalledWith("/api/avatars");
    expect(avatars[0]).toMatchObject({
      id: "avatar-office-woman",
      kind: "avatar",
      name: "职场女",
      preview: { imageUrl: "/api/avatars/office-woman/preview", aspectRatio: "9:16" },
      technical: { modelType: "wav2lip", width: 540, height: 900 },
    });
  });

  it("loads voices from the existing OpenTalking /voices API", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({
          items: [
            {
              id: 1,
              user_id: 0,
              provider: "local_cosyvoice",
              voice_id: "local-office-serena",
              display_label: "职场女声 Serena",
              target_model: "FunAudioLLM/Fun-CosyVoice3-0.5B-2512",
              source: "system",
            },
          ],
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const voices = await listAssets({ kind: "voice" });

    expect(fetchMock).toHaveBeenCalledWith("/api/voices");
    expect(voices[0]).toMatchObject({
      id: "voice-local-office-serena",
      kind: "voice",
      preview: { audioUrl: "/api/voice-uploads/local-office-serena" },
      technical: { provider: "local_cosyvoice", targetModel: "FunAudioLLM/Fun-CosyVoice3-0.5B-2512" },
    });
  });

  it("falls back to local fixtures when the backend is unavailable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("backend offline");
      }),
    );

    const avatars = await listAssets({ kind: "avatar" });

    expect(avatars.some((asset) => asset.id === "avatar-office-woman")).toBe(true);
  });

  it("uses /video-creation/jobs for video render tasks", async () => {
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) => new Response(JSON.stringify({ job_id: "job-1" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const task = await createTask({
      type: "video_render",
      assetIds: ["avatar-office-woman", "voice-local-office-serena", "script-product-launch"],
      message: "创建视频",
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/video-creation/jobs", expect.objectContaining({ method: "POST", body: expect.any(FormData) }));
    const form = fetchMock.mock.calls[0][1]?.body as FormData;
    expect(form.get("avatar_id")).toBe("office-woman");
    expect(form.get("audio_source")).toBe("tts_text");
    expect(form.get("voice")).toBe("local-office-serena");
    expect(task.id).toBe("job-1");
  });

  it("uses /sessions for realtime session tasks", async () => {
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) => new Response(JSON.stringify({ session_id: "session-1", status: "created" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const task = await createTask({
      type: "realtime_session",
      assetIds: ["avatar-office-woman", "voice-local-office-serena", "knowledge-hospital-guide"],
      message: "创建实时会话",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/sessions",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toMatchObject({
      avatar_id: "office-woman",
      model: "wav2lip",
      tts_voice: "local-office-serena",
      knowledge_enabled: true,
    });
    expect(task.id).toBe("session-1");
  });
});
