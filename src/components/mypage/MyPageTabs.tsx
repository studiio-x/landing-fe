import clsx from "clsx";
import { useRouter } from "next/navigation";
import { MYPAGE_TABS } from "@/constants/mypage/tab";
import { PATHS } from "@/constants/common/paths";
import { TabKey } from "@/types/mypage/tab.type";

interface MyPageTabsProps {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
}

const MyPageTabs = ({ activeTab, onChangeTab }: MyPageTabsProps) => {
  const router = useRouter();

  const handleTabClick = (tab: TabKey) => {
    if (tab === "upgrade") {
      router.push(PATHS.SUBSCRIBE);
      return;
    }
    onChangeTab(tab);
  };

  return (
    <nav
      aria-label="마이페이지 탭"
      className="w-57.5 bg-Grey-700 border-r border-Grey-600 rounded-l-lg"
    >
      <ul className="flex flex-col gap-1">
        {MYPAGE_TABS.map((tab, idx) => {
          const isActive = activeTab === tab.key;

          return (
            <li key={tab.key}>
              <button
                type="button"
                onClick={() => handleTabClick(tab.key)}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  "w-full h-fit text-left pl-9 py-4 transition-colors",
                  idx === 0 && "rounded-tl-lg",
                  isActive
                    ? "Subhead_2_semibold bg-Grey-600 text-white"
                    : "Subhead_2_medium text-Grey-300",
                )}
              >
                {tab.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MyPageTabs;
