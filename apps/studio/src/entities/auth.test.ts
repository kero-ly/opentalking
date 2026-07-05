import { describe, expect, it } from "vitest";
import { createStudioSession, verifyInvitationCode } from "./auth";

describe("studio invitation gate", () => {
  it("accepts a known invitation code with lowercase and whitespace", () => {
    const result = verifyInvitationCode("  ot-studio-2026  ");

    expect(result).toMatchObject({
      ok: true,
      normalizedCode: "OT-STUDIO-2026",
    });
  });

  it("rejects an unknown invitation code", () => {
    const result = verifyInvitationCode("BAD-CODE");

    expect(result).toMatchObject({
      ok: false,
      message: "邀请码无效，请检查后重试。",
    });
  });

  it("creates a verified session only when the invitation code is valid", () => {
    const result = createStudioSession({
      email: "trial@example.com",
      invitationCode: "OT-STUDIO-2026",
      password: "studio-demo",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.session.invitationVerified).toBe(true);
      expect(result.session.invitationCode).toBe("OT-STUDIO-2026");
      expect(result.session.user.email).toBe("trial@example.com");
    }
  });
});
