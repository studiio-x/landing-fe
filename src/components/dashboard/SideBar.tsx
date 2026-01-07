"use client";

import { Down } from "@/assets/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";

const PAGE_CONFIG = {
  대시보드: "/dashboard",
  프로젝트: "/dashboard/project",
} as const;

type PageName = keyof typeof PAGE_CONFIG;

export default function SideBar() {
  const [currentPage, setCurrentPage] = useState<PageName>();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/dashboard") {
      setCurrentPage("대시보드");
    } else if (pathname === "/dashboard/project") {
      setCurrentPage("프로젝트");
    }
  }, [pathname]);

  return (
    <aside className="bg-Grey-800 max-w-[17.625rem] h-screen px-7 pt-7 pb-[3.25rem] border-r border-Grey-600">
      <div className="flex flex-col">
        {Object.keys(PAGE_CONFIG).map((pageName, index) => {
          const isActive = currentPage === pageName;
          return (
            <Link
              href={PAGE_CONFIG[pageName as PageName]}
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

        <div className="flex flex-col Body_2_medium ">
          <div className="pt-3 pb-2 pl-8 flex items-center gap-2">
            <span className="text-Grey-300">⋅</span>
            <span className=" text-Grey-300">내 프로젝트</span>
          </div>
          <div className="pt-3 pb-2 pl-8  flex items-center gap-2">
            <span className="text-Grey-300">⋅</span>
            <span className=" text-Grey-300 flex-1">공유된 프로젝트</span>
            <Down className="text-Grey-300 w-5 h-5 text-right" />
          </div>
        </div>
      </div>
      <div></div>
    </aside>
  );
}
