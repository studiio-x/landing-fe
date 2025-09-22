"use client";

export default function MediaItem({ src }: { src: string }) {
  try {
    new URL(src);
  } catch (e) {
    console.error("Invalid URL:", src);
    return null;
  }

  const ext = src.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
  const isVideo = ["mp4", "webm", "mov", "m4v"].includes(ext);

  return isVideo ? (
    <video
      className="mb-2 inline-block w-full break-inside-avoid overflow-hidden rounded-xl bg-black"
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
      className="mb-2 inline-block w-full break-inside-avoid overflow-hidden rounded-xl bg-black object-cover"
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}
