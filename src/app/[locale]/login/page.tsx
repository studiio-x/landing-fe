"use client";

import { Close } from "@/assets/icons";
import LoginInput from "@/components/login/LoginInput";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PATHS } from "@/constants/common/paths";
import Header from "@/components/dashboard/Header";
import GlassButton from "@/components/common/GlassButton";
import { useTranslations } from "next-intl";
import { useLogin } from "@/hooks/queries/useAuthApi";
import GoogleLoginButton from "@/components/login/GoogleLoginButton";
import { getSafeCallbackDestination } from "@/utils/authUtils";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("login");
  const { mutate: login, isPending } = useLogin();

  const onClick = () => {
    setIsPasswordOpen(!isPasswordOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || isPending) return;

    login(
      { email, password },
      {
        onSuccess: () => {
          const callbackUrl = searchParams.get("callbackUrl");
          router.push(getSafeCallbackDestination(callbackUrl, PATHS.DASHBOARD));
        },
      },
    );
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 pb-(--header-height)">
        <div className="h-fit max-w-115 pt-10 pb-12 px-13 border-[1.5px] rounded-[0.5rem] border-[rgba(255,48,48,0.35)] bg-Grey-900 shadow-[0_0_8px_0_rgba(255,82,82,0.10),0_0_20px_0_rgba(8,8,8,0.12)] relative gap-10 flex flex-col">
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
                  <span className="font-calSans text-[1.75rem] font-normal mr-3.5">
                    {chunks}
                  </span>
                ),
              })}
            </span>
          </div>

          <div className="flex flex-col gap-7">
            <GoogleLoginButton />

            <div className="w-full flex gap-3 items-center">
              <div className="flex-1 bg-Grey-600 w-full h-px"></div>
              <div className="text-Grey-400 Body_1_medium">{t("or")}</div>
              <div className="flex-1 bg-Grey-600 w-full h-px"></div>
            </div>

            <form onSubmit={handleSubmit}>
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
                type="submit"
                size="xl"
                variant="red"
                className="Body_2_semibold"
                disabled={!email || !password || isPending}
              >
                {t("submit")}
              </GlassButton>

              <div className="text-center flex flex-col gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => router.push(PATHS.PASSWORD_RESET)}
                  className="Body_3_medium text-Grey-200 underline"
                >
                  {t("forgotPassword")}
                </button>
                <div className="flex gap-2 justify-center">
                  <span className="Body_3_regular text-Grey-400">
                    {t("noAccount")}
                  </span>
                  <button
                    type="button"
                    onClick={() => router.push(PATHS.SIGNUP)}
                    className="Body_3_semibold text-Grey-200"
                  >
                    {t("signup")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
