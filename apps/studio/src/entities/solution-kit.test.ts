import { describe, expect, it } from "vitest";
import { getAssetsByIds } from "./asset";
import { solutionKits } from "./solution-kit";

describe("solution kit fixtures", () => {
  it("resolves every referenced asset from the local asset catalog", () => {
    for (const kit of solutionKits) {
      const resolvedAssets = getAssetsByIds(kit.assetIds);

      expect(resolvedAssets.map((asset) => asset.id).sort()).toEqual([...kit.assetIds].sort());
    }
  });
});
