"use client";

import { Close, Google, Logo } from "@/assets/icons";
import LoginInput from "@/components/dashboard/login/LoginInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PATHS } from "@/constants/common/paths";
import Header from "@/components/dashboard/Header";
import GlassButton from "@/components/common/GlassButton";
import { useTranslations } from "next-intl";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("login");

  const onClick = () => {
    setIsPasswordOpen(!isPasswordOpen);
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 pb-[var(--header-height)]">
        <div className="h-fit max-w-[28.75rem] pt-10 pb-12 px-[3.25rem] border-[1.5px] rounded-[0.5rem] border-[rgba(255,48,48,0.35)] bg-Grey-900 shadow-[0_0_8px_0_rgba(255,82,82,0.10),0_0_20px_0_rgba(8,8,8,0.12)] relative gap-[2.5rem] flex flex-col">
          <button
            onClick={() => router.back()}
            className="absolute top-5 right-5"
            aria-label={t("closeLabel")}
          >
            <Close className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-[0.88rem]">
            <span className="Heading_3_semibold text-Grey-50">
              {t.rich("title", {
                brand: (chunks) => (
                  <span className="font-calSans text-[1.75rem] font-normal mr-[0.875rem]">{chunks}</span>
                ),
              })}
            </span>
          </div>

          <div className="flex flex-col gap-[1.75rem]">
            <button
              type="button"
              className="bg-Grey-700 rounded-[0.25rem] flex py-[0.75rem] w-full justify-center items-center gap-[0.75rem]"
            >
              <Google className="w-[1.75rem] h-[1.75rem]" />
              <span className="text-Grey-100">{t("googleContinue")}</span>
            </button>

            <div className="w-full flex gap-[0.75rem] items-center">
              <div className="flex-1 bg-Grey-600 w-full h-[0.0625rem]"></div>
              <div className="text-Grey-400 Body_1_medium">{t("or")}</div>
              <div className="flex-1 bg-Grey-600 w-full h-[0.0625rem]"></div>
            </div>

            <form action="">
              <div className="flex flex-col gap-3 mb-7">
                <LoginInput
                  placeholder={t("emailPlaceholder")}
                  ariaLabel={t("emailAriaLabel")}
                  value={email}
                  onChange={setEmail}
                />
                <LoginInput
                  placeholder={t("passwordPlaceholder")}
                  ariaLabel={t("passwordAriaLabel")}
                  watchIcon={true}
                  isPasswordOpen={isPasswordOpen}
                  onClick={onClick}
                  value={password}
                  onChange={setPassword}
                />
              </div>

              <GlassButton
                size="xl"
                variant="red"
                className="Body_2_semibold"
                disabled={!email || !password}
              >
                {t("submit")}
              </GlassButton>

              <div className="text-center flex flex-col gap-2 mt-3">
                <button className="Body_3_medium text-Grey-200 underline">
                  {t("forgotPassword")}
                </button>
                <button
                  className="flex gap-2 justify-center"
                  onClick={() => router.push(PATHS.SIGNUP)}
                >
                  <span className="Body_3_regular text-Grey-400">
                    {t("noAccount")}
                  </span>
                  <div className="Body_3_semibold text-Grey-200">
                    {t("signup")}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
