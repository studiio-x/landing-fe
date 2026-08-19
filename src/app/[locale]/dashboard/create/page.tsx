"use client";

import { Back } from "@/assets/icons";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Header from "@/components/dashboard/Header";
import { DASHBOARD_CARDS } from "@/constants/dashboard/card";
import { PATHS, QUERY_KEYS } from "@/constants/common/paths";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const CreatePage = () => {
  const router = useRouter();
  const t = useTranslations("dashboard");

  return (
    <div className="flex flex-col min-h-dvh relative">
      <div className="fixed inset-0 bg-[url('/images/dashboard/create-background.png')]  bg-no-repeat bg-top bg-size-[100%_auto] -z-10 pointer-events-none" />
      <Header />

      <button
        type="button"
        onClick={() => router.back()}
        aria-label={t("create.backButtonLabel")}
        className="absolute left-[6.13rem] top-28"
      >
        <Back className="w-11 h-11" />
      </button>

      <main className="w-full flex flex-col items-center gap-18 flex-1 mt-33 mb-27">
        <div className="flex flex-col gap-3 items-center">
          <span className="py-2 px-5 border border-Grey-700 bg-[rgba(255,255,255,0.03)] Body_2_medium text-Grey-100 rounded-[5rem]">
            {t("create.badge")}
          </span>
          <h1 className="Heading_1_bold text-White">{t("create.title")}</h1>
        </div>

        <section aria-label={t("create.badge")}>
          <ul className="flex items-center gap-9">
            {DASHBOARD_CARDS.map((card) => (
              <li key={card.key}>
                <DashboardCard
                  title={t(`cards.${card.key}.title`)}
                  content={t(`cards.${card.key}.content`)}
                  mediaSrc={card.mediaSrc}
                  onClick={() =>
                    router.push(
                      `${PATHS.DASHBOARD_WORKBENCH}?${QUERY_KEYS.WORKBENCH_MODE}=${card.key}`,
                    )
                  }
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
