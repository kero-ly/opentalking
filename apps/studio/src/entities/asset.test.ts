import { describe, expect, it } from "vitest";
import { getFeaturedAssets, getReadyAssetsByKind, studioAssets } from "./asset";

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
});
