import type { StudioUser } from "./user";

export type InvitationCode = {
  code: string;
  label: string;
  maxSeats: number;
  usedSeats: number;
};

export type StudioSession = {
  invitationCode: string;
  invitationVerified: boolean;
  user: StudioUser & { email: string };
};

export type AuthInput = {
  email: string;
  invitationCode: string;
  password: string;
};

export type AuthResult =
  | { ok: true; session: StudioSession }
  | { ok: false; message: string };

export type InvitationVerification =
  | { ok: true; invitation: InvitationCode; normalizedCode: string }
  | { ok: false; message: string };

const SESSION_STORAGE_KEY = "opentalking-studio-session-v1";

export const invitationCodes: InvitationCode[] = [
  {
    code: "OT-STUDIO-2026",
    label: "OpenTalking Studio 内测码",
    maxSeats: 50,
    usedSeats: 12,
  },
  {
    code: "DIGITAL-HUMAN-TRIAL",
    label: "数字人试用邀请码",
    maxSeats: 30,
    usedSeats: 8,
  },
];

export function normalizeInvitationCode(code: string): string {
  return code.trim().toUpperCase();
}

export function verifyInvitationCode(code: string): InvitationVerification {
  const normalizedCode = normalizeInvitationCode(code);
  const invitation = invitationCodes.find((item) => item.code === normalizedCode);

  if (!invitation) {
    return { ok: false, message: "邀请码无效，请检查后重试。" };
  }

  if (invitation.usedSeats >= invitation.maxSeats) {
    return { ok: false, message: "邀请码名额已满，请联系管理员。" };
  }

  return { ok: true, invitation, normalizedCode };
}

export function createStudioSession(input: AuthInput): AuthResult {
  const email = input.email.trim();
  const password = input.password.trim();

  if (!email) {
    return { ok: false, message: "请输入手机号或邮箱。" };
  }

  if (password.length < 6) {
    return { ok: false, message: "密码至少需要 6 位。" };
  }

  const verification = verifyInvitationCode(input.invitationCode);
  if (!verification.ok) return verification;

  return {
    ok: true,
    session: {
      invitationCode: verification.normalizedCode,
      invitationVerified: true,
      user: {
        email,
        id: `user-${email.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        name: email.split("@")[0] || "体验用户",
        role: "owner",
        trialing: true,
        workspaceName: "OpenTalking 试用空间",
      },
    },
  };
}

export function readStudioSession(): StudioSession | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StudioSession;
    return parsed.invitationVerified ? parsed : null;
  } catch {
    return null;
  }
}

export function saveStudioSession(session: StudioSession): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearStudioSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}
