import { useInfiniteQuery } from "@tanstack/react-query";
import type { Category, ItemsResponse } from "@/types/item";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const FIRST_PAGE = 0;

function buildUrl(category: Category, page: number, limit: number) {
  const qs = new URLSearchParams();
  if (category !== "all") {
    qs.set("category", category);
  }
  qs.set("pageNum", String(page));
  qs.set("limit", String(limit));
  return `${BASE}/items?${qs.toString()}`;
}

export function useItemsInfinite(category: Category, limit = 15) {
  return useInfiniteQuery({
    queryKey: ["items", category, limit],
    queryFn: async ({ pageParam = FIRST_PAGE, signal }) => {
      const res = await fetch(buildUrl(category, pageParam as number, limit), {
        cache: "no-store",
        signal,
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json: ItemsResponse = await res.json();
      return json.data;
    },
    initialPageParam: FIRST_PAGE,
    getNextPageParam: (lastPage) => {
      const { pageNum, totalPages } = lastPage.pageInfo;
      return pageNum < totalPages ? pageNum + 1 : undefined;
    },
  });
}
