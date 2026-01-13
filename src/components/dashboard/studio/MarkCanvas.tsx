"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useStudioMarkStore } from "@/stores/useStudioMarkStore";

type RectDraft = { x: number; y: number; w: number; h: number };

const MIN_SIZE_PX = 6;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const MarkCanvas = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const { isMarkMode, rects, addRect } = useStudioMarkStore();

  const [draft, setDraft] = useState<RectDraft | null>(null);

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
    }));
  }, [rects]);

  useEffect(() => {
    // 마킹 모드 꺼지면 임시 드래그 상태 초기화
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

    // 마우스 왼쪽 버튼만
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

  const finish = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    if (pointerIdRef.current !== e.pointerId) return;

    const el = wrapRef.current;
    const start = startRef.current;
    const d = draft;

    pointerIdRef.current = null;
    startRef.current = null;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    if (!el || !start || !d) {
      setDraft(null);
      return;
    }

    // 너무 작은 드래그는 무시 (px 기준)
    const { width, height } = el.getBoundingClientRect();
    const wPx = d.w * width;
    const hPx = d.h * height;

    if (wPx < MIN_SIZE_PX || hPx < MIN_SIZE_PX) {
      setDraft(null);
      return;
    }

    addRect({
      id: crypto.randomUUID(),
      x: d.x,
      y: d.y,
      w: d.w,
      h: d.h,
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
      {/* 기존 rect 렌더 */}
      {rectPxList.map((r) => (
          <div
            key={r.id}
            className="absolute rounded-full border border-Red-300/25 bg-Red-300/25"
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
  draft: RectDraft;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const el = containerRef.current;
  if (!el) return null;

  const { width, height } = el.getBoundingClientRect();

  return (
    <div
      className="absolute rounded-full border border-Red-300/25 bg-Red-300/25"
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
