import { Premium, Video } from "@/assets/icons";
import type { ActionKey } from "@/types/dashboard/video-option.type";

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

const ACTION_KEYS = ACTION_OPTIONS.map(
  (option) => option.key,
) as readonly string[];

export const parseActionKey = (value: string | null): ActionKey | null =>
  value !== null && ACTION_KEYS.includes(value) ? (value as ActionKey) : null;

export const getMotionTypeFromTemplateUrl = (url: string): ActionKey | null => {
  const filename =
    url
      .split(/[?#]/, 1)[0]
      .split("/")
      .pop()
      ?.replace(/\.[a-z0-9]+$/i, "") ?? "";
  const normalized = filename.toUpperCase();

  return parseActionKey(normalized);
};
