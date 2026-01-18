import { useCallback } from "react";
import html2canvas from "html2canvas";

interface UsePaintCaptureOptions {
  scale?: number;
  debug?: boolean;
  tightCrop?: boolean;
  padding?: number;
}

export const usePaintCapture = (
  containerRef: React.RefObject<HTMLElement | null>,
  overlayCanvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: UsePaintCaptureOptions = {}
) => {
  const { scale = 2, debug = false, tightCrop = true, padding = 8 } = options;

  const capturePaintedArea = useCallback(async () => {
    const container = containerRef.current;
    const maskCanvas = overlayCanvasRef.current;
    if (!container || !maskCanvas) return null;

    const containerRect = container.getBoundingClientRect();

    try {
  const fullCanvas = await html2canvas(container, {
    useCORS: true,
    backgroundColor: null,
    scale,
    width: containerRect.width,
    height: containerRect.height,
    ignoreElements: (el) => {
      if ((el as HTMLElement).dataset?.captureIgnore === "true") return true;
      return el === maskCanvas || maskCanvas.contains(el);
    },
  });
      // 마스크 스케일링
      const scaledMask = document.createElement("canvas");
      scaledMask.width = fullCanvas.width;
      scaledMask.height = fullCanvas.height;

      const mctx = scaledMask.getContext("2d");
      if (!mctx) return null;

      mctx.drawImage(
        maskCanvas,
        0,
        0,
        maskCanvas.width,
        maskCanvas.height,
        0,
        0,
        scaledMask.width,
        scaledMask.height
      );

      // 마스크 적용
      const out = document.createElement("canvas");
      out.width = fullCanvas.width;
      out.height = fullCanvas.height;

      const octx = out.getContext("2d");
      if (!octx) return null;

      octx.drawImage(fullCanvas, 0, 0);
      octx.globalCompositeOperation = "destination-in";
      octx.drawImage(scaledMask, 0, 0);
      octx.globalCompositeOperation = "source-over";

      // 타이트 크롭(선택)
      let resultCanvas: HTMLCanvasElement = out;

      if (tightCrop) {
        const bbox = getNonTransparentBBox(out);
        if (bbox) {
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
      }

      const dataUrl = resultCanvas.toDataURL("image/png");

      if (debug) {
        const w = window.open("", "_blank");
        w?.document.write(`
          <html><body style="background:#111;color:#fff;font-family:monospace;padding:16px">
            <h3>full</h3><img src="${fullCanvas.toDataURL("image/png")}" style="max-width:520px;display:block"/>
            <h3>mask</h3><img src="${scaledMask.toDataURL("image/png")}" style="max-width:520px;display:block"/>
            <h3>out</h3><img src="${out.toDataURL("image/png")}" style="max-width:520px;display:block"/>
            <h3>result</h3><img src="${dataUrl}" style="max-width:520px;display:block"/>
          </body></html>
        `);
      }

      return dataUrl;
    } catch (err) {
      console.error("html2canvas paint capture error:", err);
      return null;
    }
  }, [containerRef, overlayCanvasRef, scale, debug, tightCrop, padding]);

  const clearMask = useCallback(() => {
    const c = overlayCanvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
  }, [overlayCanvasRef]);

  return { capturePaintedArea, clearMask };
};

function getNonTransparentBBox(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const { width, height } = canvas;
  const img = ctx.getImageData(0, 0, width, height);
  const data = img.data;

  let minX = width,
    minY = height,
    maxX = -1,
    maxY = -1;

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
  return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
}
