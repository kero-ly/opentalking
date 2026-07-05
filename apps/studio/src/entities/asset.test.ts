import { describe, expect, it } from "vitest";
import { getAssetById, getAssetsByIds, getFeaturedAssets, getReadyAssetsByKind, listAssetsByWorkflow, studioAssets } from "./asset";

describe("studio asset fixtures", () => {
  it("returns only ready assets for a requested kind", () => {
    const avatars = getReadyAssetsByKind("avatar");
    expect(avatars.length).toBeGreaterThan(0);
    expect(avatars.every((asset) => asset.kind === "avatar")).toBe(true);
    expect(avatars.every((asset) => asset.status === "ready")).toBe(true);
  });

  it("orders featured assets by usage count", () => {
    const featured = getFeaturedAssets(3);
    expect(featured).toHaveLength(3);
    expect(featured[0].usageCount).toBeGreaterThanOrEqual(featured[1].usageCount);
    expect(featured[1].usageCount).toBeGreaterThanOrEqual(featured[2].usageCount);
  });

  it("contains solution-ready asset categories", () => {
    const kinds = Array.from(new Set(studioAssets.map((asset) => asset.kind)));
    expect(kinds).toEqual(
      expect.arrayContaining(["avatar", "voice", "background", "scene", "knowledge", "persona", "script_template"]),
    );
  });

  it("describes local media with cloud-ready storage fields", () => {
    const avatar = getAssetById("avatar-office-woman");

    expect(avatar?.storage.provider).toBe("local");
    expect(avatar?.storage.key).toBe("avatars/office-woman/preview.png");
    expect(avatar?.preview.imageUrl).toContain("/studio-assets/avatars/office-woman/preview.png");
    expect(avatar?.upload.status).toBe("local");
  });

  it("contains playable voice prompt assets", () => {
    const voices = getReadyAssetsByKind("voice");

    expect(voices.some((asset) => asset.preview.audioUrl?.endsWith("/prompt.wav"))).toBe(true);
    expect(getAssetById("voice-local-office-serena")?.technical?.sampleRate).toBe(24000);
  });

  it("filters assets by compatible workflow", () => {
    const realtimeAssets = listAssetsByWorkflow("realtime");

    expect(realtimeAssets.some((asset) => asset.kind === "knowledge")).toBe(true);
    expect(realtimeAssets.every((asset) => asset.workflows.includes("realtime"))).toBe(true);
  });

  it("resolves assets by id without returning missing entries", () => {
    expect(getAssetsByIds(["avatar-office-woman", "voice-local-office-serena", "missing"])).toHaveLength(2);
  });
});
