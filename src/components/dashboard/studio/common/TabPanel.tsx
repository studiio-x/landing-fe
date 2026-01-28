import clsx from "clsx";
import { useTranslations } from "next-intl";


interface TabPanelProps {
  activeTab: number;
  onChange: (idx: number) => void;
}

const STUDIO_TAB_KEYS = ["product", "background", "aiChatbot"] as const;

const TabPanel = ({ activeTab, onChange }: TabPanelProps) => {
  const t = useTranslations("dashboard.studio.tabs");

  return (
    <div className="relative pt-4">
      <div className="absolute left-0 right-0 bottom-[-1px] h-px bg-Grey-400" />

      <div className="flex">
        {STUDIO_TAB_KEYS.map((key, idx) => {
          const isActive = activeTab === idx;

          const widthClass = idx === 1 ? "w-[9.94rem]" : "w-[7.41rem]";
          const paddingClass = clsx({
            "pl-[0.47rem]": idx === 0,
            "pr-[0.47rem]": idx === 2,
          });

          return (
            <button
              key={key}
              onClick={() => onChange(idx)}
              className={clsx(
                "Subhead_2_medium text-center relative pb-2 transition-colors",
                widthClass,
                paddingClass,
                isActive ? "text-Red-400" : "text-Grey-400"
              )}
            >
              {t(key)}
              <span
                className={clsx(
                  "absolute left-0 bottom-[-1px] h-px w-full transition-colors",
                  isActive ? "bg-Red-400" : "bg-transparent"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabPanel;
