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
  const category = (searchParams.get(QUERY_KEYS.PORTFOLIO_CATEGORY) as Category) || PORTFOLIO_CATEGORY.ALL;

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 auto-rows-[1px] gap-x-2 [grid-auto-flow:dense]">
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
            className="Body_1_semibold rounded-full px-8 py-3 bg-gradient-to-b from-[#F1F4F8]/30 to-[#1D2025]/50 border border-Grey-500 text-Grey-100 hover:text-Red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
