import { Premium, Video } from "@/assets/icons";

export const ACTION_OPTIONS = [
  { key: "ZOOM_IN", label: "Zoom in" },
  { key: "ZOOM_OUT", label: "Zoom out" },
  { key: "ROTATE_LEFT", label: "Rotate left" },
  { key: "ROTATE_RIGHT", label: "Rotate right" },
  { key: "ROTATE_UP", label: "Rotate up" },
  { key: "ROTATE_DOWN", label: "Rotate down" },
  { key: "MOVE_UP", label: "Move up" },
  { key: "MOVE_DOWN", label: "Move down" },
] as const;

export const QUALITY_OPTIONS = [
  { key: "basic", credits: 1, labelKey: "basicQuality", icon: Video },
  { key: "premium", credits: 5, labelKey: "premiumQuality", icon: Premium },
] as const;
