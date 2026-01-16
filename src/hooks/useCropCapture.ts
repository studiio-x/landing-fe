import { useCallback } from "react";
import html2canvas from "html2canvas";
import type { MarkRect } from "@/types/dashboard/mark";

interface UseCropCaptureOptions {
  scale?: number;
  debug?: boolean;
}

export const useCropCapture = (
  containerRef: React.RefObject<HTMLElement | null>,
  overlayRef: React.RefObject<HTMLElement | null>,
  options: UseCropCaptureOptions = {}
) => {
  const { scale = 2, debug = false } = options;

  const getImageDisplayInfo = useCallback(
    (containerRect: DOMRect, imgEl: HTMLImageElement | null) => {
      let offsetX = 0;
      let offsetY = 0;
      let displayW = containerRect.width;
      let displayH = containerRect.height;

      if (imgEl?.naturalWidth && imgEl?.naturalHeight) {
        const containerRatio = containerRect.width / containerRect.height;
        const imageRatio = imgEl.naturalWidth / imgEl.naturalHeight;

        if (imageRatio > containerRatio) {
          displayW = containerRect.width;
          displayH = containerRect.width / imageRatio;
          offsetY =
            (containerRect.height - displayH) / 2 / containerRect.height;
        } else {
          displayH = containerRect.height;
          displayW = containerRect.height * imageRatio;
          offsetX = (containerRect.width - displayW) / 2 / containerRect.width;
        }
      }

      return {
        offsetX,
        offsetY,
        scaleW: displayW / containerRect.width,
        scaleH: displayH / containerRect.height,
      };
    },
    []
  );

  const cropFromRect = useCallback(
    async (r: Omit<MarkRect, "id" | "imageUrl">) => {
      const container = containerRef.current;
      const overlay = overlayRef.current;
      if (!container) return null;

      const containerRect = container.getBoundingClientRect();
      if (r.w * containerRect.width <= 1 || r.h * containerRect.height <= 1)
        return null;

      try {
        const fullCanvas = await html2canvas(container, {
          useCORS: true,
          backgroundColor: null,
          scale,
          width: containerRect.width,
          height: containerRect.height,
          ignoreElements: (el) =>
            el === overlay || overlay?.contains(el) || false,
        });

        const imgEl = container.querySelector("img") as HTMLImageElement | null;
        const { offsetX, offsetY, scaleW, scaleH } = getImageDisplayInfo(
          containerRect,
          imgEl
        );

        const adjustedX = (r.x - offsetX) / scaleW;
        const adjustedY = (r.y - offsetY) / scaleH;
        const adjustedW = r.w / scaleW;
        const adjustedH = r.h / scaleH;

        const srcX = Math.round(Math.max(0, adjustedX) * fullCanvas.width);
        const srcY = Math.round(Math.max(0, adjustedY) * fullCanvas.height);
        const srcW = Math.round(adjustedW * fullCanvas.width);
        const srcH = Math.round(adjustedH * fullCanvas.height);

        const cropCanvas = document.createElement("canvas");
        cropCanvas.width = srcW;
        cropCanvas.height = srcH;

        const ctx = cropCanvas.getContext("2d");
        if (!ctx) return null;

        ctx.drawImage(fullCanvas, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);

        const dataUrl = cropCanvas.toDataURL("image/png");

        // 캡쳐 화면 확인용, TODO: API 연동 후 제거
        if (debug) {
          const fullDataUrl = fullCanvas.toDataURL("image/png");
          const newWindow = window.open("", "_blank");
          if (newWindow) {
            newWindow.document.write(`
              <html>
                <head><title>Debug Preview</title></head>
                <body style="margin:0;padding:20px;background:#1a1a1a;color:white;font-family:monospace;">
                  <h3>Full Canvas (${fullCanvas.width}x${fullCanvas.height})</h3>
                  <div style="position:relative;border:2px solid red;display:inline-block;">
                    <img src="${fullDataUrl}" style="display:block;max-width:590px;" />
                    <div style="position:absolute;left:${srcX / 2}px;top:${srcY / 2}px;width:${srcW / 2}px;height:${srcH / 2}px;border:2px solid lime;pointer-events:none;"></div>
                  </div>
                  <h3>Cropped (${srcW}x${srcH}) from (${srcX}, ${srcY})</h3>
                  <div style="border:2px solid green;display:inline-block;">
                    <img src="${dataUrl}" style="display:block;" />
                  </div>
                </body>
              </html>
            `);
          }
        }

        return dataUrl;
      } catch (err) {
        console.error("html2canvas crop error:", err);
        return null;
      }
    },
    [containerRef, overlayRef, scale, debug, getImageDisplayInfo]
  );

  return { cropFromRect };
};
