"use client";

import { Close, Down, Pencil, Plus } from "@/assets/icons";
import Link from "next/link";
import { useActivePage } from "@/hooks/useActivePage";
import { AnimatePresence, motion } from "framer-motion";
import GlassButton from "../common/GlassButton";
import { useState } from "react";

const MotionLink = motion(Link);

const PAGE_CONFIG = {
  대시보드: "/dashboard",
  프로젝트: "/dashboard/project",
} as const;

type PageName = keyof typeof PAGE_CONFIG;

const PAGE_NAMES = Object.keys(PAGE_CONFIG) as PageName[];

export default function SideBar() {
  const currentPage = useActivePage(PAGE_CONFIG);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const onClick = () => {
    setIsCreateOpen((pre) => !pre);
  };

  return (
    <aside className="bg-Grey-800 max-w-[17.625rem] w-full left-0 sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))] px-7 pt-7 pb-[3.25rem] border-r border-Grey-600">
      <div className="flex flex-col h-full">
        {PAGE_NAMES.map((pageName, index) => {
          const isActive = currentPage === pageName;
          return (
            <MotionLink
              href={PAGE_CONFIG[pageName]}
              key={pageName}
              className={`py-2 pl-8 rounded-[4px] relative ${index > 0 ? "mt-4" : ""} ${
                isActive
                  ? "Subhead_2_semibold text-white"
                  : "Subhead_2_medium text-Grey-300"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-Grey-700 rounded-[4px]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{pageName}</span>
            </MotionLink>
          );
        })}

        {/* 내 프로젝트 ~ 공유된 프로젝트*/}
        <div className="flex flex-col Body_2_medium flex-1">
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
        {/* 생성하기 버튼 */}
        <div className="flex flex-col gap-[0.75rem] w-full">
          <AnimatePresence>
            {isCreateOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden Body_2_semibold text-grey-50"
                >
                  <GlassButton className="w-full bg-[rgba(255,48,48,0.45)] rounded-[0.25rem] hover:bg-[rgba(255,48,48,0.75)] Body_2_semibold flex gap-[0.62rem]">
                    <Plus className="w-[1.125rem]" />
                    <span>새 프로젝트 시작하기</span>
                  </GlassButton>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }}
                  className="overflow-hidden Body_2_semibold text-grey-50 flex gap-[1.125rem]"
                >
                  <GlassButton className="w-full">
                    <Pencil className="w-[1.125rem]" />
                    프로젝트 이어하기
                  </GlassButton>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="flex justify-center w-full">
            <motion.button
              type="button"
              onClick={onClick}
              aria-label={isCreateOpen ? "close button" : "create button"}
              animate={{
                width: isCreateOpen ? "3.125rem" : "100%",
                borderRadius: isCreateOpen ? "6.25rem" : "0.25rem",
                backgroundColor: isCreateOpen
                  ? "#282C34"
                  : "rgba(255, 48, 48, 0.45)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`flex items-center justify-center h-[3.0625rem] ${
                isCreateOpen
                  ? "shadow-[0_1px_8px_0_rgba(18,18,18,0.12)]"
                  : "hover:bg-[rgba(255,48,48,0.75)] Body_1_semibold"
              }`}
            >
              <AnimatePresence mode="wait">
                {isCreateOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className=" bg-Grey-700"
                  >
                    <Close color="white" className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="plus"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex gap-[0.62rem] items-center"
                  >
                    <Plus className="w-[1.125rem] h-[1.125rem]" color="white" />
                    <span>생성하기</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </aside>
  );
}
