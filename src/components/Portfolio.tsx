"use client";

import { useEffect, useRef } from "react";
import MediaItem from "@/components/MediaItem";
import { useItemsInfinite } from "@/hooks/useItemsInfinite";
import type { Category } from "@/types/item";
import { useSearchParams, useRouter } from "next/navigation";
import { pages } from "next/dist/build/templates/app-page";

const CATEGORIES: Category[] = ["all", "studio", "model", "image"];

export default function Portfolio() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = (searchParams.get("category") as Category) || "all";

  // const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
  //   useItemsInfinite(category, 20);

  const data = {
    pageParams: [0, 1],
    pages: [
      {
        pageInfo: { pageNum: 0, limit: 20, totalPages: 7, totalElements: 140 },
        urls: [
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/models/1.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/studios/1.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image1.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image5.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/models/2.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/studios/2.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image14.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image19.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/models/3.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/studios/3.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image32.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image36.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/models/4.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/studios/4.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image52.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image56.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/models/5.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/studios/5.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image61.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image62.png",
        ],
      },
      {
        pageInfo: { pageNum: 0, limit: 20, totalPages: 7, totalElements: 140 },
        urls: [
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/models/1.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/studios/1.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image1.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image5.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/models/2.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/studios/2.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image14.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image19.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/models/3.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/studios/3.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image32.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image36.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/models/4.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/studios/4.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image52.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image56.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/models/5.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/videos/studios/5.mp4",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image61.png",
          "https://studioxs3bucket.s3.ap-northeast-2.amazonaws.com/images/image/image62.png",
        ],
      },
    ],
  };
  const hasNextPage = true;
  const fetchNextPage = () => {
    console.log("fetchNextPage 호출됨");
  };
  const isFetchingNextPage = false;

  const allUrls = data?.pages.flatMap((page) => page.urls) ?? [];

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "0px 0px 400px 0px" }
    );

    io.observe(el);

    return () => io.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleCategoryChange = (c: Category) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (c === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", c);
    }
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="px-[6.12rem] py-8">
      <div className="mb-8 flex gap-2">
        {CATEGORIES.map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              onClick={() => handleCategoryChange(c)}
              className={[
                "Body_2_medium rounded-full px-5 py-2 capitalize transition",
                active
                  ? "bg-[rgba(255,134,134,0.03)] text-Red-400"
                  : "bg-[rgba(255,255,255,0.03)] text-Grey-100",
              ].join(" ")}
            >
              {c}
            </button>
          );
        })}
      </div>

      {allUrls.length > 0 && (
        <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 min-[1440px]:grid-cols-4 auto-rows-[1px] gap-x-2 [grid-auto-flow:dense]">
          {allUrls.map((u, i) => (
            <MediaItem key={`${u}-${i}`} src={u} />
          ))}
        </div>
      )}
      <div ref={sentinelRef} className="h-1" />
    </div>
  );
}
