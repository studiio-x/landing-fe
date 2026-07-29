"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { useStudioMarkStore } from "@/stores/useStudioMarkStore";
import { usePaintCapture } from "@/hooks/usePaintCapture";
import { clamp01, getContainedImageRect, inRect } from "@/utils/canvasUtils";

interface MarkCanvasProps {
  imageContainerRef: React.RefObject<HTMLElement | null>;
  naturalSize: { w: number; h: number };
}

const BRUSH = {
  radius: 40,
  step: 2,
  fill: "rgba(255,134,134,0.25)",
};

const MarkCanvas = ({ imageContainerRef, naturalSize }: MarkCanvasProps) => {
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const pointerIdRef = useRef<number | null>(null);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);
  const hasPaintRef = useRef(false);

  const { isEditMode, setHasPaint, resetPaint, setCommitPaint } =
    useStudioMarkStore();

  const enabled = isEditMode;

  const { capturePaintedArea } = usePaintCapture(
    imageContainerRef,
    maskCanvasRef,
    { tightCrop: true },
  );

  useEffect(() => {
    const container = imageContainerRef.current;
    const mask = maskCanvasRef.current;
    const preview = previewCanvasRef.current;
    if (!container || !mask || !preview) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      mask.style.width = `${rect.width}px`;
      mask.style.height = `${rect.height}px`;
      mask.width = rect.width;
      mask.height = rect.height;

      const mctx = mask.getContext("2d");
      if (mctx) {
        mctx.setTransform(1, 0, 0, 1, 0, 0);
        mctx.lineCap = "round";
        mctx.lineJoin = "round";
      }

      preview.style.width = `${rect.width}px`;
      preview.style.height = `${rect.height}px`;
      preview.width = rect.width * dpr;
      preview.height = rect.height * dpr;

      const pctx = preview.getContext("2d");
      if (pctx) {
        pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      renderPreview();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => ro.disconnect();
  }, [imageContainerRef]);

  const getLocalPoint = (clientX: number, clientY: number) => {
    const c = maskCanvasRef.current;
    const container = imageContainerRef.current;
    if (!c || !container) return null;

    const r = c.getBoundingClientRect();
    const x = clamp01((clientX - r.left) / r.width) * r.width;
    const y = clamp01((clientY - r.top) / r.height) * r.height;

    const rect = container.getBoundingClientRect();
    const imgRect = getContainedImageRect(
      rect.width,
      rect.height,
      naturalSize.w,
      naturalSize.h,
    );

    if (!inRect(x, y, imgRect)) return null;

    return { x, y, w: r.width, h: r.height, imgRect };
  };

  const stampMaskCircle = (x: number, y: number) => {
    const c = maskCanvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;

    ctx.beginPath();
    ctx.arc(x, y, BRUSH.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    if (!hasPaintRef.current) {
      hasPaintRef.current = true;
      setHasPaint(true);
    }
  };

  const stampMaskBetween = (
    a: { x: number; y: number },
    b: { x: number; y: number },
  ) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.hypot(dx, dy);
    const steps = Math.max(1, Math.floor(dist / BRUSH.step));

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      stampMaskCircle(a.x + dx * t, a.y + dy * t);
    }
  };

  const renderPreview = () => {
    const mask = maskCanvasRef.current;
    const preview = previewCanvasRef.current;
    const container = imageContainerRef.current;
    if (!mask || !preview || !container) return;

    const pctx = preview.getContext("2d");
    if (!pctx) return;

    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const imgRect = getContainedImageRect(w, h, naturalSize.w, naturalSize.h);

    pctx.clearRect(0, 0, w, h);

    pctx.save();
    pctx.beginPath();
    pctx.rect(imgRect.x, imgRect.y, imgRect.w, imgRect.h);
    pctx.clip();

    pctx.drawImage(mask, 0, 0, w, h);
    pctx.globalCompositeOperation = "source-in";
    pctx.fillStyle = BRUSH.fill;
    pctx.fillRect(imgRect.x, imgRect.y, imgRect.w, imgRect.h);
    pctx.restore();
  };

  const clearPreview = () => {
    const preview = previewCanvasRef.current;
    const container = imageContainerRef.current;
    const ctx = preview?.getContext("2d");
    if (!preview || !container || !ctx) return;

    const r = container.getBoundingClientRect();
    ctx.clearRect(0, 0, r.width, r.height);
  };

  useEffect(() => {
    setCommitPaint(async () => {
      const imageUrl = await capturePaintedArea();
      if (!imageUrl) return null;

      clearPreview();
      resetPaint();
      hasPaintRef.current = false;

      return { id: crypto.randomUUID(), imageUrl };
    });

    return () => setCommitPaint(null);
  }, [setCommitPaint, capturePaintedArea, resetPaint]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!enabled) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    const p = getLocalPoint(e.clientX, e.clientY);
    if (!p) return;

    pointerIdRef.current = e.pointerId;
    lastPtRef.current = { x: p.x, y: p.y };

    stampMaskCircle(p.x, p.y);
    renderPreview();

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!enabled) return;
    if (pointerIdRef.current !== e.pointerId) return;

    const last = lastPtRef.current;
    if (!last) return;

    const p = getLocalPoint(e.clientX, e.clientY);
    if (!p) return;

    const next = { x: p.x, y: p.y };
    stampMaskBetween(last, next);
    lastPtRef.current = next;

    renderPreview();
  };

  const finish = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!enabled) return;
    if (pointerIdRef.current !== e.pointerId) return;

    pointerIdRef.current = null;
    lastPtRef.current = null;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div className="absolute inset-0 z-20">
      <canvas
        ref={maskCanvasRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
      />

      <canvas
        ref={previewCanvasRef}
        data-capture-ignore="true"
        className={clsx(
          "absolute inset-0",
          enabled ? "pointer-events-auto" : "pointer-events-none",
        )}
        style={
          enabled
            ? {
                cursor:
                  'url("/images/dashboard/edit-cursor.png") 20 20, crosshair',
              }
            : undefined
        }
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finish}
        onPointerCancel={finish}
      />
    </div>
  );
};

export default MarkCanvas;
