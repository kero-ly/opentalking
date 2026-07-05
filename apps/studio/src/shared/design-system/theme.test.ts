import { describe, expect, it } from "vitest";
import { studioTheme } from "./theme";

describe("studio theme", () => {
  it("uses the homepage-inspired pink purple palette", () => {
    expect(studioTheme.color.background).toBe("#F8F5FF");
    expect(studioTheme.color.primary).toBe("#6C63FF");
    expect(studioTheme.color.primaryStrong).toBe("#20184F");
    expect(studioTheme.color.primarySoft).toBe("#EDEBFF");
    expect(studioTheme.color.action).toBe("#FF6B86");
    expect(studioTheme.color.actionStrong).toBe("#F5577A");
    expect(studioTheme.color.actionSoft).toBe("#FFE8EF");
    expect(studioTheme.color.actionStart).toBe("#6C63FF");
    expect(studioTheme.color.actionEnd).toBe("#D85AD8");
  });
});
