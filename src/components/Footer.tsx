import { Logo } from "@/assets/icons";

const Footer = () => {
  const footerLinks = [
    {
      title: "Follow us",
      items: ["Instagram"],
    },
    {
      title: "Company",
      items: ["Feedback"],
    },
    {
      title: "Resources",
      items: ["Privacy policy"],
    },
  ];

  return (
    <div className="flex justify-between bg-Grey-900 px-[6.12rem] py-11">
      <div className="flex flex-col">
        <Logo className="mb-8 h-6 w-28" />
        <div className="Body_2_medium mb-3 text-Grey-400">
          No prompts needed <br /> — just talk to your AI studio.
        </div>
        <div className="Body_3_regular text-red-400">
          © 2025 All Rights Reserved
        </div>
      </div>
      <div className="flex gap-14">
        {footerLinks.map((section, index) => (
          <div key={index} className="space-y-1">
            <div className="Body_2_semibold">{section.title}</div>
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="Body_2_medium text-Grey-300">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
