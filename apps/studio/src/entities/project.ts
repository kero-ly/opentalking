export type StudioProject = {
  id: string;
  name: string;
  type: "video" | "realtime" | "solution_kit";
  status: "draft" | "ready" | "generating" | "published" | "failed" | "archived";
  solutionKitId?: string;
  linkedAssetIds: string[];
  updatedAt: string;
};

export const studioProjects: StudioProject[] = [
  {
    id: "project-medical-demo",
    name: "医疗导诊实时 Demo",
    type: "realtime",
    status: "ready",
    solutionKitId: "healthcare-guide",
    linkedAssetIds: ["avatar-office-woman", "voice-local-office-serena", "knowledge-hospital-guide"],
    updatedAt: "2026-07-05T09:20:00.000Z",
  },
  {
    id: "project-commerce-video",
    name: "新品介绍短视频",
    type: "video",
    status: "generating",
    solutionKitId: "commerce-live",
    linkedAssetIds: ["avatar-live-broadcast", "scene-commerce-live-front", "script-product-launch"],
    updatedAt: "2026-07-05T08:45:00.000Z",
  },
  {
    id: "project-training-course",
    name: "企业培训课程样片",
    type: "solution_kit",
    status: "published",
    solutionKitId: "enterprise-training",
    linkedAssetIds: ["avatar-anchor", "voice-indextts-yunxia-cn", "background-default-data-wall"],
    updatedAt: "2026-07-04T17:30:00.000Z",
  },
];
