"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { DASHBOARD_CARDS } from "@/constants/dashboard/card";
import Header from "@/components/dashboard/Header";
import SideBar from "@/components/dashboard/sidebar/SideBar";
import { PATHS, QUERY_KEYS } from "@/constants/common/paths";
import { useTemplatesByCategory } from "@/hooks/queries/useTemplateApi";
import { TemplateCategory } from "@/types/api/template.type";

const CATEGORY_MAP: TemplateCategory[] = ["STUDIO", "MODEL", "VIDEO"];

const DashboardPage = () => {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);

  const activeIndex = useMemo(
    () => (pinnedIndex !== null ? pinnedIndex : hoverIndex),
    [pinnedIndex, hoverIndex],
  );

  const category = activeIndex !== null ? CATEGORY_MAP[activeIndex] : null;

  const { data, isLoading } = useTemplatesByCategory(
    {
      category: category ?? "STUDIO",
      pageNum: 0,
      limit: 20,
    },
    category !== null,
  );

  const templates = data?.templates ?? [];
  const showSkeleton = isLoading;

  const handleTemplateClick = (templateId: number) => {
    if (activeIndex === null) return;
    const mode = DASHBOARD_CARDS[activeIndex].key;
    const params = new URLSearchParams({
      [QUERY_KEYS.WORKBENCH_MODE]: mode,
      [QUERY_KEYS.TEMPLATE_ID]: String(templateId),
    });
    router.push(`${PATHS.DASHBOARD_WORKBENCH}?${params.toString()}`);
  };

  return (
    <main className="relative min-h-dvh w-full flex flex-col">
      <div className="fixed inset-0 bg-[url('/images/dashboard/background.png')] bg-cover bg-center -z-10 pointer-events-none" />
      <Header />

      <div className="flex">
        <SideBar />
        <div className="mx-auto mt-13">
          <div className="w-full flex flex-col pr-8.5 gap-[1.94rem]">
            <h1 className="Heading_1_bold bg-linear-to-b from-Red-300 to-Red-500 bg-clip-text text-transparent">
              {t("title")}
            </h1>

            <div onMouseLeave={() => setHoverIndex(null)}>
              <div className="flex items-center gap-9">
                {DASHBOARD_CARDS.map((card, idx) => (
                  <div
                    key={card.key}
                    onMouseEnter={() => setHoverIndex(idx)}
                    onClick={() =>
                      setPinnedIndex((prev) => (prev === idx ? null : idx))
                    }
                  >
                    <DashboardCard
                      title={t(`cards.${card.key}.title`)}
                      content={t(`cards.${card.key}.content`)}
                      mediaSrc={card.mediaSrc}
                      isActive={activeIndex === idx}
                    />
                  </div>
                ))}
              </div>

              {activeIndex !== null && (
                <section className="mt-[3.44rem] mb-15">
                  <h2 className="text-Grey-100 Subhead_1_semibold mb-4 ml-4">
                    {t("template.sectionTitle")}
                  </h2>

                  <div className="rounded-lg bg-Grey-800 py-6 px-[1.63rem]">
                    {!isLoading && templates.length === 0 ? (
                      <p className="text-Grey-400 Body_2_medium text-center py-10">
                        {t("template.empty")}
                      </p>
                    ) : (
                      <div className="grid grid-cols-5 gap-x-4 gap-y-6">
                        {showSkeleton
                          ? Array.from({ length: 15 }, (_, i) => (
                              <div
                                key={`skeleton-${i}`}
                                className="w-44 h-44 rounded overflow-hidden"
                              >
                                <div className="w-full h-full bg-Grey-600 animate-pulse" />
                              </div>
                            ))
                          : templates.map((template) => (
                              <div
                                key={template.templateId}
                                tabIndex={0}
                                role="button"
                                className="w-44 h-44 relative aspect-square rounded overflow-hidden bg-Grey-200 group box-border border border-transparent hover:border-Red-400"
                                onClick={() =>
                                  handleTemplateClick(template.templateId)
                                }
                                onKeyDown={(e) =>
                                  (e.key === "Enter" || e.key === " ") &&
                                  handleTemplateClick(template.templateId)
                                }
                              >
                                <Image
                                  src={template.imageUrl}
                                  alt={t("template.imageAlt", {
                                    id: template.templateId,
                                  })}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-Grey-900 opacity-0 transition-opacity duration-150 group-hover:opacity-90">
                                  <span className="Body_3_semibold text-Grey-50 text-center whitespace-pre-line">
                                    {t("template.hoverText")}
                                  </span>
                                </div>
                              </div>
                            ))}
                      </div>
                    )}
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
