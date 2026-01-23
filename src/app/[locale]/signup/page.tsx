"use client";
import { Checkbox, LogoRed, SelectedCheckbox } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";
import Header from "@/components/dashboard/Header";
import { useTranslations, useLocale } from "next-intl";

import { useState } from "react";

const SignUp = () => {
  const t = useTranslations("signup");
  const locale = useLocale();
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);
  const [email, setEmail] = useState("");

  const isSubmitDisabled = !isCheckboxClicked || !email.trim();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {/* 좌측 영상 */}
        <section className="flex-[56%] relative flex justify-center items-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/landing/main-poster.png"
          >
            <source src="/videos/guide-optimized.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,8,8,0.80)] to-[rgba(8,8,8,0.45)]" />
          <LogoRed className=" z-50 w-[21rem] h-auto" />
        </section>

        {/* 우측 로그인 */}
        <section className="flex-[44%] pb-[5.75rem] flex flex-col justify-center px-[8.5rem]">
          <div className="Heading_1_semibold text-Grey-50 mb-10">{t("title")}</div>
          <form>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className="bg-Grey-800 py-3 px-4 mb-4 placeholder:text-Grey-400 text-Grey-100 Body_2_medium w-full rounded-[4px]"
            />
            <button
              type="button"
              className={`flex gap-3 pl-4 cursor-pointer ${locale === "ko" ? "items-center" : ""}`}
              onClick={() => setIsCheckboxClicked((pre) => !pre)}
            >
              {isCheckboxClicked ? (
                <SelectedCheckbox className="w-6 h-6" />
              ) : (
                <Checkbox className="w-6 h-6" />
              )}

              <span className="Body_3_regular text-Grey-300 text-left whitespace-pre-line">
                {t("termsAgreement")}
              </span>
            </button>

            <GlassButton type="submit" variant="red" size="xl" className="Body_2_semibold mt-10 w-full" disabled={isSubmitDisabled}>
              {t("submit")}
           </GlassButton>
           
          </form>
          <div className="mt-3 flex gap-2 justify-center">
            <span className="Body_3_regular text-Grey-400">
              {t("hasAccount")}
            </span>
            <button className="Body_3_semibold text-Grey-200">
              {t("login")}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignUp;
