import { STUDIO_TABS } from "@/constants/dashboard/tab";
import clsx from "clsx";


interface TabPanelProps {
  activeTab: number;
  onChange: (idx: number) => void;
}

const TabPanel = ({ activeTab, onChange }: TabPanelProps) => {
  return (
    <div className="relative pt-4">
      <div className="absolute left-0 right-0 bottom-[-1px] h-px bg-Grey-400" />

      <div className="flex">
        {STUDIO_TABS.map((label, idx) => {
          const isActive = activeTab === idx;

          const widthClass = idx === 1 ? "w-[9.94rem]" : "w-[7.41rem]";
          const paddingClass = clsx({
            "pl-[0.47rem]": idx === 0,
            "pr-[0.47rem]": idx === 2,
          });

          return (
            <button
              key={label}
              onClick={() => onChange(idx)}
              className={clsx(
                "Subhead_2_medium text-center relative pb-2 transition-colors",
                widthClass,
                paddingClass,
                isActive ? "text-Red-400" : "text-Grey-400"
              )}
            >
              {label}
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
