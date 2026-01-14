"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useStudioMarkStore } from "@/stores/useStudioMarkStore";
import { useCropCapture } from "@/hooks/useCropCapture";
import type { MarkRect } from "@/types/mark";

const MIN_SIZE_PX = 6;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

type MarkCanvasProps = {
  imageContainerRef: React.RefObject<HTMLElement | null>;
};

const MarkCanvas = ({ imageContainerRef }: MarkCanvasProps) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const { isMarkMode, rects, addRect } = useStudioMarkStore();
  const [draft, setDraft] = useState<Omit<MarkRect, "id" | "imageUrl"> | null>(null);

  const { cropFromRect } = useCropCapture(
    imageContainerRef,
    wrapRef,
    { scale: 2, debug: true }
  );

  const enabled = isMarkMode;

  const rectPxList = useMemo(() => {
    const el = wrapRef.current;
    if (!el) return [];
    const { width, height } = el.getBoundingClientRect();

    return rects.map((r) => ({
      id: r.id,
      left: r.x * width,
      top: r.y * height,
      width: r.w * width,
      height: r.h * height,
      raw: r,
    }));
  }, [rects]);

  useEffect(() => {
    if (!enabled) {
      setDraft(null);
      startRef.current = null;
      pointerIdRef.current = null;
    }
  }, [enabled]);

  const getLocalPoint = (clientX: number, clientY: number) => {
    const el = wrapRef.current;
    if (!el) return null;

    const r = el.getBoundingClientRect();
    const x = clamp01((clientX - r.left) / r.width);
    const y = clamp01((clientY - r.top) / r.height);
    return { x, y, r };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    const p = getLocalPoint(e.clientX, e.clientY);
    if (!p) return;

    pointerIdRef.current = e.pointerId;
    startRef.current = { x: p.x, y: p.y };
    setDraft({ x: p.x, y: p.y, w: 0, h: 0 });

    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    if (pointerIdRef.current !== e.pointerId) return;
    if (!startRef.current) return;

    const p = getLocalPoint(e.clientX, e.clientY);
    if (!p) return;

    const sx = startRef.current.x;
    const sy = startRef.current.y;
    const ex = p.x;
    const ey = p.y;

    const x = Math.min(sx, ex);
    const y = Math.min(sy, ey);
    const w = Math.abs(ex - sx);
    const h = Math.abs(ey - sy);

    setDraft({ x, y, w, h });
  };

  const finish = async (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    if (pointerIdRef.current !== e.pointerId) return;

    const el = wrapRef.current;
    const d = draft;

    pointerIdRef.current = null;
    startRef.current = null;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    if (!el || !d) {
      setDraft(null);
      return;
    }

    const { width, height } = el.getBoundingClientRect();
    const wPx = d.w * width;
    const hPx = d.h * height;

    if (wPx < MIN_SIZE_PX || hPx < MIN_SIZE_PX) {
      setDraft(null);
      return;
    }

    const imageUrl = await cropFromRect(d);
    if (!imageUrl) {
      setDraft(null);
      return;
    }

    addRect({
      id: crypto.randomUUID(),
      x: d.x,
      y: d.y,
      w: d.w,
      h: d.h,
      imageUrl,
    });

    setDraft(null);
  };

  return (
    <div
      ref={wrapRef}
      className={clsx(
        "absolute inset-0 z-20",
        enabled ? "pointer-events-auto cursor-crosshair" : "pointer-events-none"
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finish}
      onPointerCancel={finish}
    >
      {rectPxList.map((r) => (
        <div
          key={r.id}
          className="absolute rounded-lg border border-Red-300/25 bg-Red-300/25"
          style={{
            left: r.left,
            top: r.top,
            width: r.width,
            height: r.height,
          }}
        />
      ))}

      {draft && <DraftRect draft={draft} containerRef={wrapRef} />}
    </div>
  );
};

const DraftRect = ({
  draft,
  containerRef,
}: {
  draft: Omit<MarkRect, "id" | "imageUrl">;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const el = containerRef.current;
  if (!el) return null;

  const { width, height } = el.getBoundingClientRect();

  return (
    <div
      className="absolute rounded-lg border border-Red-300/25 bg-Red-300/25"
      style={{
        left: draft.x * width,
        top: draft.y * height,
        width: draft.w * width,
        height: draft.h * height,
      }}
    />
  );
};

export default MarkCanvas;
