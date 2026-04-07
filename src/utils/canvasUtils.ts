export type Rect = { x: number; y: number; w: number; h: number };

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const getContainedImageRect = (
  containerW: number,
  containerH: number,
  imageW: number,
  imageH: number
): Rect => {
  if (imageW <= 0 || imageH <= 0 || containerW <= 0 || containerH <= 0) {
    return { x: 0, y: 0, w: 0, h: 0 };
  }
  const scale = Math.min(containerW / imageW, containerH / imageH);
  const w = imageW * scale;
  const h = imageH * scale;
  const x = (containerW - w) / 2;
  const y = (containerH - h) / 2;
  return { x, y, w, h };
};

export const inRect = (px: number, py: number, r: Rect) =>
  px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
