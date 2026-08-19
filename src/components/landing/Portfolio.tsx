"use client";

import MediaItem from "@/components/landing/MediaItem";
import { useItemsInfinite } from "@/hooks/useItemsInfinite";
import type { Category } from "@/types/landing/item.type";
import { useSearchParams, useRouter } from "next/navigation";
import { QUERY_KEYS, PORTFOLIO_CATEGORY } from "@/constants/common/paths";

const CATEGORIES: Category[] = [
  PORTFOLIO_CATEGORY.ALL,
  PORTFOLIO_CATEGORY.STUDIO,
  PORTFOLIO_CATEGORY.MODEL,
  PORTFOLIO_CATEGORY.IMAGE,
];

export default function Portfolio() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get(QUERY_KEYS.PORTFOLIO_CATEGORY);

  const category =
    CATEGORIES.find((category) => category === categoryParam) ??
    PORTFOLIO_CATEGORY.ALL;

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useItemsInfinite(category, 20);

  const allUrls = data?.pages.flatMap((page) => page.urls) ?? [];

  const handleCategoryChange = (c: Category) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (c === PORTFOLIO_CATEGORY.ALL) {
      newParams.delete(QUERY_KEYS.PORTFOLIO_CATEGORY);
    } else {
      newParams.set(QUERY_KEYS.PORTFOLIO_CATEGORY, c);
    }
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 2xl:px-[6.12rem] py-8">
      <div className="mb-8 flex gap-2">
        {CATEGORIES.map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              type="button"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 auto-rows-0.25 gap-x-2 grid-flow-dense">
          {allUrls.map((u, i) => (
            <MediaItem key={`${u}-${i}`} src={u} />
          ))}
        </div>
      )}

      {hasNextPage && (
        <div className="flex justify-center mt-12 mb-8">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-fit h-fit rounded-[2.25rem] bg-linear-to-b from-[#F1F4F8]/50 to-[#1D2025]/50 p-px disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="Body_2_semibold flex items-center justify-center rounded-[2.25rem] bg-[rgb(23,24,27)] px-6 py-3 text-White transition-colors duration-300 hover:bg-[rgb(33,34,37)]">
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
