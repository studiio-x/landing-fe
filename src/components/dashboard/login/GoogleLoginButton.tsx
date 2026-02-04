import { Google } from "@/assets/icons";
import { useTranslations } from "next-intl";

const GoogleLoginButton = () => {
  const t = useTranslations("login");
  return (
    <button
      type="button"
      className="bg-Grey-700 rounded-[0.25rem] flex py-[0.75rem] w-full justify-center items-center gap-[0.75rem]"
    >
      <Google className="w-[1.75rem] h-[1.75rem]" />
      <span className="text-Grey-100">{t("googleContinue")}</span>
    </button>
  );
};

export default GoogleLoginButton;
