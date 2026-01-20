"use client";

type Props = {
  activeTab: "settings" | "upgrade";
  onChangeTab: (tab: "settings" | "upgrade") => void;
};

const MyPageTabs = ({ activeTab, onChangeTab }: Props) => {
  return (
    <aside className="w-[14.375rem] bg-Grey-700 border-r border-Grey-600 rounded-l-lg">
      <nav className="flex flex-col gap-1">
        <button
          onClick={() => onChangeTab("settings")}
          className={`w-full h-fit text-left pl-9 py-4 rounded-tl-lg transition-colors ${
            activeTab === "settings"
              ? "Subhead_2_semibold bg-Grey-600 text-white"
              : "Subhead_2_medium text-Grey-300"
          }`}
        >
          설정
        </button>

        <button
          onClick={() => onChangeTab("upgrade")}
          className={`w-full h-fit text-left pl-9 py-4 transition-colors ${
            activeTab === "upgrade"
              ? "Subhead_2_semibold bg-Grey-600 text-white"
              : "Subhead_2_medium text-Grey-300"
          }`}
        >
          요금제 업그레이드
        </button>
      </nav>
    </aside>
  );
};

export default MyPageTabs;
