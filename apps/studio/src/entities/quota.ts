export type StudioQuota = {
  planName: string;
  coinBalance: number;
  totalMinutes: number;
  remainingMinutes: number;
};

export const demoQuota: StudioQuota = {
  planName: "个人试用版",
  coinBalance: 300,
  totalMinutes: 60,
  remainingMinutes: 42,
};

export function quotaUsagePercent(quota: StudioQuota): number {
  if (quota.totalMinutes <= 0) return 0;
  return Math.round(((quota.totalMinutes - quota.remainingMinutes) / quota.totalMinutes) * 100);
}
