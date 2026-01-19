export type Rect = { x: number; y: number; w: number; h: number };

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const getContainedImageRect = (
  containerW: number,
  containerH: number,
  imageW: number,
  imageH: number
): Rect => {
  const scale = Math.min(containerW / imageW, containerH / imageH);
  const w = imageW * scale;
  const h = imageH * scale;
  const x = (containerW - w) / 2;
  const y = (containerH - h) / 2;
  return { x, y, w, h };
};

export const inRect = (px: number, py: number, r: Rect) =>
  px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
