import { Logo } from "@/assets/icons";

const Footer = () => {
  const footerLinks = [
    {
      title: "Follow us",
      items: ["Instagram"],
      href: `${process.env.NEXT_PUBLIC_INSTAGRAM_URL}`,
    },
    {
      title: "Company",
      items: ["Feedback"],
      href: `mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`,
    },
    {
      title: "Resources",
      items: ["Privacy policy"],
      href: `${process.env.NEXT_PUBLIC_PRIVACY_POLICY_NOTION_URL}`,
    },
  ];

  return (
    <footer className="bg-Grey-900 lg:px-[6.12rem] px-6 py-11">
      <div className="flex flex-col sm:flex-row gap-[3.25rem] justify-between mb-8">
        <div className="flex flex-col">
          <Logo className="mb-8 h-6 w-28" />
          <div className="Body_2_medium mb-3 text-Grey-400">
            No prompts needed <br /> — just talk to your AI studio.
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
            <span className="text-Grey-300">주식회사 렐엑스</span>
            <span className="mx-2">|</span>
            <span>대표: 임세인, 김류원</span>
          </div>
          <div>사업자등록번호: 432-81-03889</div>
          <div>주소: 서울특별시 마포구 마포대로 78, 11층 1113호(도화동, 자람빌딩)</div>
        </div>
        <div className="Body_3_regular text-Red-400 mt-4">
          © 2025 Relex Inc. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
