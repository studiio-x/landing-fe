import { QUALITY_OPTIONS } from "@/constants/dashboard/video-options";

export type ActionKey =
  | "ZOOM_IN"
  | "ZOOM_OUT"
  | "ROTATE_LEFT"
  | "ROTATE_RIGHT"
  | "ROTATE_UP"
  | "ROTATE_DOWN"
  | "MOVE_UP"
  | "MOVE_DOWN";

export type QualityKey = (typeof QUALITY_OPTIONS)[number]["key"];
