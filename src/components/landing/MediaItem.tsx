"use client";

import { useEffect, useState, useRef } from "react";

export default function MediaItem({ src }: { src: string }) {
  const ext = src.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
  const isVideo = ["mp4", "webm", "mov", "m4v"].includes(ext);

  const [span, setSpan] = useState(300);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  useEffect(() => {
    const updateSpan = () => {
      if (!mediaRef.current) return;

      const height = mediaRef.current.getBoundingClientRect().height;
      const calculatedSpan = Math.ceil(height + 8);

      setSpan(calculatedSpan);
    };

    const setupMediaListener = () => {
      if (isVideo) {
        const video = mediaRef.current as HTMLVideoElement;
        if (video) {
          video.addEventListener("loadeddata", updateSpan);
        }
      } else {
        const img = mediaRef.current as HTMLImageElement;
        if (img) {
          if (img.complete && img.naturalHeight !== 0) {
            updateSpan();
          } else {
            img.addEventListener("load", updateSpan);
          }
        }
      }
    };

    setupMediaListener();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", updateSpan);

    // cleanup
    return () => {
      window.removeEventListener("resize", updateSpan);

      if (isVideo) {
        const video = mediaRef.current as HTMLVideoElement;
        if (video) {
          video.removeEventListener("loadeddata", updateSpan);
        }
      } else {
        const img = mediaRef.current as HTMLImageElement;
        if (img) {
          img.removeEventListener("load", updateSpan);
        }
      }
    };
  }, [isVideo]); // isVideo만 의존성에 포함

  try {
    new URL(src);
  } catch (e) {
    console.error("Invalid URL:", src);
    return null;
  }

  return (
    <div style={{ gridRowEnd: `span ${span}` }}>
      {isVideo ? (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          className="w-full rounded-xl bg-black block mb-2"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img
          ref={mediaRef as React.RefObject<HTMLImageElement>}
          className="w-full rounded-xl bg-black object-cover block mb-2"
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}
