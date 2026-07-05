import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { StudioLayout } from "./StudioLayout";

describe("StudioLayout", () => {
  it("shows one primary login entry in the unauthenticated top bar", () => {
    const markup = renderToStaticMarkup(
      <StudioLayout activeRouteId="workspace" onNavigate={() => undefined} onSignOut={() => undefined} session={null}>
        <main>Workspace preview</main>
      </StudioLayout>,
    );

    expect(markup).toContain(">登录</button>");
    expect(markup).not.toContain(">注册</button>");
    expect(markup).toContain("bg-studio-action");
    expect(markup).toContain("bg-[radial-gradient");
    expect(markup).not.toContain("#22C7B8");
  });
});
