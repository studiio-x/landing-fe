import { useCallback } from "react";

interface UsePaintCaptureOptions {
  debug?: boolean;
  tightCrop?: boolean;
  padding?: number;
}

export const usePaintCapture = (
  imageContainerRef: React.RefObject<HTMLElement | null>,
  overlayCanvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: UsePaintCaptureOptions = {},
) => {
  const { debug = false, tightCrop = false, padding = 8 } = options;

  const capturePaintedArea = useCallback(async () => {
    const container = imageContainerRef.current;
    const maskCanvas = overlayCanvasRef.current;

    if (!container || !maskCanvas) return null;

    const img = container.querySelector("img") as HTMLImageElement | null;
    if (!img) return null;

    if (!img.complete || img.naturalWidth === 0) return null;

    const imgRect = img.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const offsetX = imgRect.left - containerRect.left;
    const offsetY = imgRect.top - containerRect.top;

    const renderW = imgRect.width;
    const renderH = imgRect.height;

    const imageCanvas = document.createElement("canvas");
    imageCanvas.width = renderW;
    imageCanvas.height = renderH;

    const ictx = imageCanvas.getContext("2d");
    if (!ictx) return null;

    ictx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      0,
      0,
      renderW,
      renderH,
    );

    const maskCrop = document.createElement("canvas");
    maskCrop.width = renderW;
    maskCrop.height = renderH;

    const mctx = maskCrop.getContext("2d");
    if (!mctx) return null;

    mctx.drawImage(
      maskCanvas,
      offsetX,
      offsetY,
      renderW,
      renderH,
      0,
      0,
      renderW,
      renderH,
    );

    const out = document.createElement("canvas");
    out.width = renderW;
    out.height = renderH;

    const octx = out.getContext("2d");
    if (!octx) return null;

    octx.drawImage(imageCanvas, 0, 0);
    octx.globalCompositeOperation = "destination-in";
    octx.drawImage(maskCrop, 0, 0);
    octx.globalCompositeOperation = "source-over";

    let resultCanvas: HTMLCanvasElement = out;

    if (tightCrop) {
      const bbox = getNonTransparentBBox(out);
      if (!bbox) return null;
      const x = Math.max(0, bbox.x - padding);
      const y = Math.max(0, bbox.y - padding);
      const w = Math.min(out.width - x, bbox.w + padding * 2);
      const h = Math.min(out.height - y, bbox.h + padding * 2);

      const cropped = document.createElement("canvas");
      cropped.width = w;
      cropped.height = h;

      const cctx = cropped.getContext("2d");
      if (!cctx) return null;

      cctx.drawImage(out, x, y, w, h, 0, 0, w, h);
      resultCanvas = cropped;
    }

    const dataUrl = resultCanvas.toDataURL("image/png");

    if (debug) {
      const w = window.open("", "_blank");
      w?.document.write(`
      <html><body style="background:#111;color:#fff;font-family:monospace;padding:16px">
      <h3>image</h3><img src="${imageCanvas.toDataURL()}" style="max-width:520px"/>
      <h3>mask</h3><img src="${maskCrop.toDataURL()}" style="max-width:520px"/>
      <h3>result</h3><img src="${dataUrl}" style="max-width:520px"/>
      </body></html>
      `);
    }

    return dataUrl;
  }, [imageContainerRef, overlayCanvasRef, debug, tightCrop, padding]);

  return { capturePaintedArea };
};

function getNonTransparentBBox(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const { width, height } = canvas;
  const img = ctx.getImageData(0, 0, width, height);
  const data = img.data;

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = data[(y * width + x) * 4 + 3];
      if (a !== 0) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX === -1) return null;

  return {
    x: minX,
    y: minY,
    w: maxX - minX + 1,
    h: maxY - minY + 1,
  };
}
