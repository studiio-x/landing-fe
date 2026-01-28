"use client";

import { Back } from "@/assets/icons";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Header from "@/components/dashboard/Header";
import { DASHBOARD_CARDS } from "@/constants/dashboard/card";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const CreatePage = () => {
  const router = useRouter();
  const t = useTranslations("dashboard");

  return (
    <div className="flex flex-col h-screen relative">
      <div className="fixed inset-0 bg-[url('/images/dashboard/create-background.png')]  bg-no-repeat bg-top [background-size:100%_auto] -z-10 pointer-events-none" />
      <Header />

      <button
        type="button"
        onClick={() => router.back()}
        aria-label={t("create.backButtonLabel")}
        className="absolute left-[6.13rem] top-[7rem]"
      >
        <Back className="w-11 h-11" />
      </button>

      <main className="w-full flex flex-col items-center gap-[4.5rem] flex-1 justify-center mb-[6.75rem]">
        <div className="flex flex-col gap-3 items-center">
          <span className="py-2 px-5 border border-Grey-700 bg-[rgba(255,255,255,0.03)] Body_2_medium text-Grey-100 rounded-[5rem]">
            {t("create.badge")}
          </span>
          <h1 className="Heading_1_bold text-White">
            {t("create.title")}
          </h1>
        </div>

        <section aria-label={t("create.badge")}>
          <ul className="flex items-center gap-9">
            {DASHBOARD_CARDS.map((card) => (
              <li key={card.key}>
                <DashboardCard
                  title={t(`cards.${card.key}.title`)}
                  content={t(`cards.${card.key}.content`)}
                  mediaSrc={card.mediaSrc}
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CreatePage;
