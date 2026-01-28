export const DASHBOARD_CARDS = [
  {
    key: "studio",
    mediaSrc: "/images/dashboard/studio.png",
  },
  {
    key: "model",
    mediaSrc: "/images/dashboard/model.png",
  },
  {
    key: "video",
    mediaSrc: "/videos/dashboard-ai-video.mp4",
  },
] as const;

export type DashboardCardKey = (typeof DASHBOARD_CARDS)[number]["key"];
