"use client";

import { useMemo, useState } from "react";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { DASHBOARD_CARDS } from "@/constants/dashboard/card";

const DashboardPage = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);

  const activeIndex = useMemo(
    () => (pinnedIndex !== null ? pinnedIndex : hoverIndex),
    [pinnedIndex, hoverIndex]
  );

  return (
    <main className="min-h-screen w-full flex">
      <aside className="w-[17.625rem]">
        {/* 추후 사이드바 컴포넌트 추가 */}
      </aside>

      <div className="mx-auto mt-[3.25rem]">
        <div className="w-full flex flex-col pr-[2.125rem] gap-[1.94rem]">
          <h1 className="Heading_1_bold bg-gradient-to-b from-Red-300 to-Red-500 bg-clip-text text-transparent">
            대시보드
          </h1>

          <div onMouseLeave={() => setHoverIndex(null)}>
            <div className="flex items-center gap-9">
              {DASHBOARD_CARDS.map((card, idx) => (
                <div
                  key={card.imageSrc}
                  onMouseEnter={() => setHoverIndex(idx)}
                  onClick={() =>
                    setPinnedIndex((prev) => (prev === idx ? null : idx))
                  }
                >
                  <DashboardCard
                    title={card.title}
                    content={card.content}
                    imageSrc={card.imageSrc}
                    isActive={activeIndex === idx}
                  />
                </div>
              ))}
            </div>

            {activeIndex !== null && (
              <section className="mt-[3.44rem]">
                <h2 className="text-Grey-100 Subhead_1_semibold mb-4 ml-4">
                  예시 템플릿으로 시작하기
                </h2>

                <div className="rounded-lg bg-Grey-800 py-6 px-[1.63rem]">
                  <div className="grid grid-cols-5 gap-x-4 gap-y-6">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        tabIndex={0}
                        role="button"
                        className="w-[11rem] h-[11rem] relative aspect-square rounded overflow-hidden bg-Grey-200 group box-border border border-transparent hover:border-Red-400"
                      >
                        {/* <Image fill className="object-cover" /> */}

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
    </main>
  );
};

export default DashboardPage;
