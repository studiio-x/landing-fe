"use client";

import React, { CSSProperties } from "react";
import clsx from "clsx";

type Direction = "left" | "right";

type Props = {
  children: React.ReactNode;
  gapPx?: number;
  speedSec?: number;
  direction?: Direction;
  pauseOnHover?: boolean;
  className?: string;
  trackClassName?: string;
};

export default function Marquee({
  children,
  gapPx = 16,
  speedSec = 30,
  direction = "left",
  pauseOnHover = false,
  className,
  trackClassName,
}: Props) {
  const items = React.Children.toArray(children);
  const dupA = items.map((child, i) => (
    <React.Fragment key={`a-${i}`}>{child}</React.Fragment>
  ));
  const dupB = items.map((child, i) => (
    <React.Fragment key={`b-${i}`}>{child}</React.Fragment>
  ));

  return (
    <div
      className={clsx(
        "group relative w-full overflow-hidden select-none",
        className
      )}
    >
      <div
        className={clsx(
          "flex min-w-max will-change-transform",
          direction === "left"
            ? "motion-safe:animate-marquee-left"
            : "motion-safe:animate-marquee-right",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          trackClassName
        )}
        style={
          {
            animationDuration: `${speedSec}s`,
            gap: `${gapPx}px`,
          } as CSSProperties
        }
      >
        <div className="flex" style={{ gap: `${gapPx}px` }}>
          {dupA}
        </div>
        <div className="flex" style={{ gap: `${gapPx}px` }} aria-hidden="true">
          {dupB}
        </div>
      </div>
    </div>
  );
}
