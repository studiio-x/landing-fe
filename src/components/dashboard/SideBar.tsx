"use client";

import { Down } from "@/assets/icons";
import Link from "next/link";
import { useActivePage } from "@/hooks/useActivePage";

const PAGE_CONFIG = {
  대시보드: "/dashboard",
  프로젝트: "/dashboard/project",
} as const;

type PageName = keyof typeof PAGE_CONFIG;

const PAGE_NAMES = Object.keys(PAGE_CONFIG) as PageName[];

export default function SideBar() {
  const currentPage = useActivePage(PAGE_CONFIG);

  return (
    <aside className="bg-Grey-800 max-w-[17.625rem] w-full left-0 sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))] px-7 pt-7 pb-[3.25rem] border-r border-Grey-600">
      <div className="flex flex-col">
        {PAGE_NAMES.map((pageName, index) => {
          const isActive = currentPage === pageName;
          return (
            <Link
              href={PAGE_CONFIG[pageName]}
              key={pageName}
              className={`py-2 pl-8 rounded-[4px] ${index > 0 ? "mt-4" : ""} ${
                isActive
                  ? "bg-Grey-700 Subhead_2_semibold text-white"
                  : "Subhead_2_medium text-Grey-300"
              }`}
            >
              {pageName}
            </Link>
          );
        })}

        <div className="flex flex-col Body_2_medium">
          <div className="pt-3 pb-2 pl-9 flex items-center gap-2">
            <span className="text-Grey-300">⋅</span>
            <span className="text-Grey-300">내 프로젝트</span>
          </div>
          <span className="self-end w-[11.625rem] h-px bg-Grey-700" />

          <div className="pt-3 pb-2 pl-9 flex items-center gap-2">
            <span className="text-Grey-300">⋅</span>
            <span className="text-Grey-300 flex-1">공유된 프로젝트</span>
            <Down className="text-Grey-300 w-5 h-5" />
          </div>
        </div>
      </div>
    </aside>
  );
}
