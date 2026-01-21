"use client";

import { Check } from "@/assets/icons";
import Link from "next/link";
import { useActivePage } from "@/hooks/useActivePage";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PAGE_CONFIG } from "@/constants/dashboard/sideBar";
import ProjectListItem from "./projectListItem";
import CreateButton from "./CreatButton";
import { useRouter, useSearchParams } from "next/navigation";

const MotionLink = motion(Link);

type PageName = keyof typeof PAGE_CONFIG;

const PAGE_NAMES = Object.keys(PAGE_CONFIG) as PageName[];

const mockSharedProjects = [
  {
    name: "임셈",
  },
  {
    name: "류원",
  },
  {
    name: "semin",
  },
  {
    name: "임세민",
  },
];

export default function SideBar() {
  const currentPage = useActivePage(PAGE_CONFIG);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const sharedProjectFromQuery = searchParams.get("shared");

  console.log("sharedProjectFromQuery", sharedProjectFromQuery);

  const CreatOnClick = () => {
    setIsCreateOpen((pre) => !pre);
  };
  const shareOnClick = () => {
    setIsShareOpen((pre) => !pre);
  };

  const handleSharedProject = (projectName: string) => {
    router.push(`/dashboard/project?shared=${projectName}`);
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
              <span className="relative z-10 hover:text-white  transition-colors">
                {pageName}
              </span>
            </MotionLink>
          );
        })}

        {/* 내 프로젝트 ~ 공유된 프로젝트*/}
        <div className="flex flex-col Body_2_medium flex-1">
          <ProjectListItem
            onClick={() => router.push("/dashboard/project?shared=my")}
            currentSharedProject={sharedProjectFromQuery}
          >
            내 프로젝트
          </ProjectListItem>
          <span className="self-end w-[11.625rem] h-px bg-Grey-700" />
          <ProjectListItem isShareOpen={isShareOpen} onClick={shareOnClick}>
            공유된 프로젝트
          </ProjectListItem>

          {/* 공유된 프로젝트 리스트 */}
          {isShareOpen && (
            <>
              <span className="self-end w-[11.625rem] h-px bg-Grey-700" />
              {mockSharedProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  onClick={() => handleSharedProject(project.name)}
                  className="flex w-full"
                >
                  <div
                    className={`pl-12 py-2 text-Grey-300 hover:text-white  transition-colors cursor-pointer w-full
                    ${sharedProjectFromQuery === project.name ? "text-white" : " text-Grey-300"}
                    `}
                  >
                    {project.name}의 프로젝트
                  </div>
                  {sharedProjectFromQuery === project.name && (
                    <Check className="w-[1.25rem] justify-self-end" />
                  )}
                </motion.div>
              ))}
            </>
          )}
        </div>

        {/* 하단 생성하기 버튼 */}
        <CreateButton isCreateOpen={isCreateOpen} onClick={CreatOnClick} />
      </div>
    </aside>
  );
}
