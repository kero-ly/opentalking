export type StudioUser = {
  id: string;
  name: string;
  role: "owner" | "admin" | "member";
  workspaceName: string;
  trialing: boolean;
};

export const demoUser: StudioUser = {
  id: "user-demo",
  name: "体验用户",
  role: "owner",
  workspaceName: "OpenTalking 试用空间",
  trialing: true,
};
