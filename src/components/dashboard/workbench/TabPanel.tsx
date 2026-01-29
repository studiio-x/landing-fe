import clsx from "clsx";
import { useTranslations } from "next-intl";
import type { WorkbenchMode } from "@/types/dashboard/mode.type";

interface TabPanelProps {
  activeTab: number;
  onChange: (idx: number) => void;
  mode: WorkbenchMode;
}

const TAB_KEYS: Record<WorkbenchMode, readonly string[]> = {
  studio: ["product", "background", "aiChatbot"],
  model: ["product", "background", "aiChatbot"],
  video: ["product", "options", "aiChatbot"],
};

const TabPanel = ({ activeTab, onChange, mode }: TabPanelProps) => {
  const t = useTranslations("dashboard.workbench.tabs");
  const tabKeys = TAB_KEYS[mode];

  return (
    <div className="relative pt-4">
      <div className="absolute left-0 right-0 bottom-[-1px] h-px bg-Grey-400" />

      <div className="flex">
        {tabKeys.map((key, idx) => {
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
