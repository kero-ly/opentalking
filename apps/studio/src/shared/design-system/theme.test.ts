import { describe, expect, it } from "vitest";
import { studioTheme } from "./theme";

describe("studio theme", () => {
  it("uses the original fresh teal action palette", () => {
    expect(studioTheme.color.action).toBe("#0F766E");
    expect(studioTheme.color.actionStrong).toBe("#115E59");
    expect(studioTheme.color.actionSoft).toBe("#ECFDF5");
    expect(studioTheme.color.actionStart).toBe("#0F766E");
    expect(studioTheme.color.actionEnd).toBe("#22C7B8");
  });
});
