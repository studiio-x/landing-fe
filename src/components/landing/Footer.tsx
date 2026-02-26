import { Logo } from "@/assets/icons";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");

  const footerLinks = [
    {
      title: t("followUs"),
      items: [t("instagram")],
      href: `${process.env.NEXT_PUBLIC_INSTAGRAM_URL}`,
    },
    {
      title: t("company"),
      items: [t("feedback")],
      href: `mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`,
    },
    {
      title: t("resources"),
      items: [t("privacyPolicy")],
      href: `${process.env.NEXT_PUBLIC_PRIVACY_POLICY_NOTION_URL}`,
    },
  ];

  return (
    <footer className="bg-Grey-900 lg:px-[6.12rem] px-6 py-11">
      <div className="flex flex-col sm:flex-row gap-[3.25rem] justify-between mb-8">
        <div className="flex flex-col">
          <Logo className="mb-8 h-6 w-28" />
          <div className="Body_2_medium mb-3 text-Grey-400">
            {t("tagline")}
          </div>
        </div>
        <div className="flex gap-14">
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-1">
              <div className="Body_3_semibold lg:Body_2_semibold">
                {section.title}
              </div>
              {section.items.map((item, itemIndex) => (
                <a
                  href={section.href}
                  key={itemIndex}
                  className="Body_3_medium lg:Body_2_medium text-Grey-300 block"
                >
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Company Information */}
      <div className="border-t border-Grey-700 pt-6">
        <div className="Caption_medium lg:Body_3_regular text-Grey-400 space-y-1">
          <div className="mb-2">
            <span className="text-Grey-300">{t("companyInfo.name")}</span>
            <span className="mx-2">|</span>
            <span>{t("companyInfo.representatives")}</span>
          </div>
          <div>{t("companyInfo.businessNumber")}</div>
          <div>{t("companyInfo.address")}</div>
          <div>{t("companyInfo.phone")}</div>
          <div>
            {t("companyInfo.email", {
              email: process.env.NEXT_PUBLIC_EMAIL_ADDRESS || "",
            })}
          </div>
        </div>
        <div className="Body_3_regular text-Red-400 mt-4">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
