"use client";

import { Back } from "@/assets/icons";
import Header from "@/components/dashboard/Header";
import FolderItem from "@/components/dashboard/project/FolderItem";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { mockData } from "@/mocks/dashboard/continue.mock";

const ContinuePage = () => {
  const router = useRouter();
  const t = useTranslations("dashboard");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-dvh relative">
      <div className="fixed inset-0 bg-[url('/images/dashboard/continue-background.png')]  bg-no-repeat bg-top [background-size:100%_auto] -z-10 pointer-events-none" />
      <div className="fixed inset-0 bg-black/75 -z-10 pointer-events-none" />
      <Header />

      <button
        type="button"
        onClick={() => router.back()}
        aria-label={t("continue.backButtonLabel")}
        className="absolute left-[6.13rem] top-[7rem]"
      >
        <Back className="w-11 h-11" />
      </button>

      <main className="w-full flex flex-col items-center gap-[4.5rem] flex-1 mt-[8.25rem] mb-[6.75rem]">
        <div className="flex flex-col gap-3 items-center">
          <span className="py-2 px-5 border border-Grey-700 bg-[rgba(255,255,255,0.03)] Body_2_medium text-Grey-100 rounded-[5rem]">
            {t("continue.badge")}
          </span>
          <h1 className="Heading_1_bold text-White">{t("continue.title")}</h1>
        </div>

        <section aria-label={t("continue.badge")}>
          <ul className="grid grid-cols-3 gap-x-9 gap-y-11">
            {mockData.map((item, index) => (
              <li key={index}>
                <FolderItem
                  lists={item}
                  index={index}
                  setDeleteModalOpen={setDeleteModalOpen}
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default ContinuePage;
