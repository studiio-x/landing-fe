"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { DASHBOARD_CARDS } from "@/constants/dashboard/card";
import Header from "@/components/dashboard/Header";
import SideBar from "@/components/dashboard/SideBar";
import { useTemplatesByCategory } from "@/hooks/queries/useTemplateApi";
import { TemplateCategory } from "@/types/api/template.type";

const CATEGORY_MAP: TemplateCategory[] = ["STUDIO", "MODEL", "VIDEO"];

const DashboardPage = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);

  const activeIndex = useMemo(
    () => (pinnedIndex !== null ? pinnedIndex : hoverIndex),
    [pinnedIndex, hoverIndex]
  );

  const category = activeIndex !== null ? CATEGORY_MAP[activeIndex] : null;

  const { data, isLoading } = useTemplatesByCategory(
    {
      category: category ?? "STUDIO",
      pageNum: 1,
      limit: 20,
    },
    category !== null
  );

  const templates = data?.templates ?? [];
  const showSkeleton = isLoading || templates.length === 0;

  return (
    <main className="relative min-h-dvh w-full flex flex-col">
      <div className="fixed inset-0 bg-[url('/images/dashboard/background.png')] bg-cover bg-center -z-10 pointer-events-none" />
      <Header />
      
      <div className="flex">
        <SideBar />
        <div className="mx-auto mt-[3.25rem]">
          <div className="w-full flex flex-col pr-[2.125rem] gap-[1.94rem]">
            <h1 className="Heading_1_bold bg-gradient-to-b from-Red-300 to-Red-500 bg-clip-text text-transparent">
              대시보드
            </h1>

            <div onMouseLeave={() => setHoverIndex(null)}>
              <div className="flex items-center gap-9">
                {DASHBOARD_CARDS.map((card, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoverIndex(idx)}
                    onClick={() =>
                      setPinnedIndex((prev) => (prev === idx ? null : idx))
                    }
                  >
                    <DashboardCard
                      title={card.title}
                      content={card.content}
                      mediaSrc={card.mediaSrc}
                      isActive={activeIndex === idx}
                    />
                  </div>
                ))}
              </div>

              {activeIndex !== null && (
                <section className="mt-[3.44rem] mb-[3.75rem]">
                  <h2 className="text-Grey-100 Subhead_1_semibold mb-4 ml-4">
                    예시 템플릿으로 시작하기
                  </h2>

                  <div className="rounded-lg bg-Grey-800 py-6 px-[1.63rem]">
                    <div className="grid grid-cols-5 gap-x-4 gap-y-6">
                      {showSkeleton
                        ? Array.from({ length: 15 }, (_, i) => (
                            <div
                              key={`skeleton-${i}`}
                              className="w-[11rem] h-[11rem] rounded overflow-hidden"
                            >
                              <div className="w-full h-full bg-Grey-600 animate-pulse" />
                            </div>
                          ))
                        : templates.map((template) => (
                            <div
                              key={template.templateId}
                              tabIndex={0}
                              role="button"
                              className="w-[11rem] h-[11rem] relative aspect-square rounded overflow-hidden bg-Grey-200 group box-border border border-transparent hover:border-Red-400"
                            >
                              <Image
                                src={template.imageUrl}
                                alt={`템플릿 ${template.templateId}`}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-Grey-900 opacity-0 transition-opacity duration-150 group-hover:opacity-90">
                                <span className="Body_3_semibold text-Grey-50 text-center">
                                  이 배경으로
                                  <br />
                                  이미지 생성하기
                                </span>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
