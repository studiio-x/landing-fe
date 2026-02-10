"use client";

import Header from "@/components/dashboard/Header";
import GlassButton from "./GlassButton";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/common/paths";
import { useTranslations } from "next-intl";

const NotFound = () => {
  const router = useRouter();
  const t = useTranslations("notFound");

  return (
    <main className="flex flex-col min-h-dvh">
      <Header />
      <div className="fixed inset-0 bg-[url('/images/dashboard/create-background.png')] bg-no-repeat bg-top [background-size:100%_auto] -z-10 pointer-events-none opacity-50" />

      <div className="flex flex-col items-center justify-center flex-1 pb-[7.8125rem]">
        <div className="py-2 px-5 bg-White/[0.03] border border-Grey-700 rounded-[80px] text-Grey-100 mb-7 Subhead_2_medium">
          {t("badge")}
        </div>

        <div className="flex flex-col gap-5 text-center mb-[4.5rem]">
          <h1 className="Heading_1_bold text-White">{t("title")}</h1>
          <p className="Subhead_2_medium text-Grey-300 whitespace-pre-line">
            {t("description")}
          </p>
        </div>

        <GlassButton
          size="xl"
          variant="red"
          className="Body_2_semibold"
          onClick={() => router.push(PATHS.HOME)}
        >
          {t("homeButton")}
        </GlassButton>
      </div>
    </main>
  );
};

export default NotFound;