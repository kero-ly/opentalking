import { describe, expect, it } from "vitest";
import { findStudioRoute, getRoutePath, isRoutePublic, STUDIO_ROUTES } from "./routes";

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

  it("keeps discovery pages public before login", () => {
    expect(isRoutePublic("workspace")).toBe(true);
    expect(isRoutePublic("assets")).toBe(true);
    expect(isRoutePublic("solutions")).toBe(true);
    expect(isRoutePublic("solutionDetail")).toBe(true);
  });

  it("requires login for creation and workspace administration routes", () => {
    expect(isRoutePublic("createVideo")).toBe(false);
    expect(isRoutePublic("createRealtime")).toBe(false);
    expect(isRoutePublic("projects")).toBe(false);
    expect(isRoutePublic("projectDetail")).toBe(false);
    expect(isRoutePublic("team")).toBe(false);
    expect(isRoutePublic("billing")).toBe(false);
    expect(isRoutePublic("apiAccess")).toBe(false);
    expect(isRoutePublic("settings")).toBe(false);
  });
});
