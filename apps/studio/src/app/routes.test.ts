import { describe, expect, it } from "vitest";
import { findStudioRoute, getRoutePath, STUDIO_ROUTES } from "./routes";

describe("studio routes", () => {
  it("uses workspace as the authenticated default route", () => {
    expect(getRoutePath("workspace")).toBe("/workspace");
    expect(findStudioRoute("/")).toMatchObject({ id: "workspace", path: "/workspace" });
    expect(findStudioRoute("/unknown")).toMatchObject({ id: "workspace", path: "/workspace" });
  });

  it("contains primary Studio product routes", () => {
    const paths = STUDIO_ROUTES.map((route) => route.path);
    expect(paths).toContain("/create/video");
    expect(paths).toContain("/create/realtime");
    expect(paths).toContain("/assets/avatars");
    expect(paths).toContain("/solutions");
    expect(paths).toContain("/projects");
  });

  it("matches solution kit detail paths with an id parameter", () => {
    expect(findStudioRoute("/solutions/healthcare-guide")).toMatchObject({
      id: "solutionDetail",
      path: "/solutions/:id",
    });
  });
});
