"use client";

import { Back, Logo, Person, Video } from "@/assets/icons";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { WorkbenchMode } from "@/types/dashboard/mode.type";
import { WORKBENCH_TABS } from "@/constants/dashboard/tab";
import { PATHS, QUERY_KEYS } from "@/constants/common/paths";
import { useLocale, useTranslations } from "next-intl";

interface HeaderProps {
  back?: boolean;
  tab?: boolean;
  video?: boolean;
}

const Header = ({ back = false, tab = false, video = false }: HeaderProps) => {
  const t = useTranslations("dashboard.header");
  const locale = useLocale();

  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isUserClicked, setIsUserClicked] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const mode =
    (searchParams.get(QUERY_KEYS.WORKBENCH_MODE) as WorkbenchMode | null) ??
    "studio";
  const activeIndex = mode === "model" ? 1 : 0;

  const setModeQuery = (nextMode: WorkbenchMode) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set(QUERY_KEYS.WORKBENCH_MODE, nextMode);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const getTabWidth = (m: WorkbenchMode) => {
    const tab = WORKBENCH_TABS.find((x) => x.mode === m);
    if (!tab) return "0px";
    return tab.widthByLocale[locale as "ko" | "en"] ?? tab.widthByLocale.ko;
  };

  const activeWidth = useMemo(() => getTabWidth(mode), [mode, locale]);

  const pillTranslateX = useMemo(() => {
    if (activeIndex === 0) return "0px";
    return `calc(${getTabWidth("studio")})`;
  }, [activeIndex, locale]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserOpen(false);
        setIsUserClicked(false);
      }
    };

    if (isUserOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserOpen]);

  const onUserClick = () => {
    if (!isUserClicked) {
      setIsUserClicked(true);
      setIsUserOpen(true);
      return;
    }

    setIsUserOpen((prev) => !prev);
    if (isUserOpen) setIsUserClicked(false);
  };

  const userHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isUserClicked) return;
    if (e.type === "mouseenter") setIsUserOpen(true);
    if (e.type === "mouseleave") setIsUserOpen(false);
  };

  return (
    <header className="px-[6.125rem] pt-5 py-3 flex border-b-Grey-800 bg-Black z-[999] border-b-[1.5px] sticky top-0 left-0 h-[var(--header-height)] items-center">
      <div className="flex gap-4 items-center">
        {back && (
          <button type="button" onClick={() => router.back()} aria-label={t("backLabel")}>
            <Back className="w-7 h-7" />
          </button>
        )}

        <button
          type="button"
          onClick={() => router.push(PATHS.DASHBOARD)}
          aria-label={t("goDashboardLabel")}
        >
          <Logo className="w-[5.3125rem]" />
        </button>
      </div>

      {/* 탭 */}
      <div className="flex-1 flex justify-center">
        {tab && (
          <div className="relative rounded-[100px] bg-Grey-800 px-1 py-1">
            <div
              className="absolute top-1 bottom-1 left-1 rounded-[100px] bg-Grey-600 will-change-[transform,width] transition-[transform,width] duration-300 ease-out"
              style={{
                width: activeWidth,
                transform: `translateX(${pillTranslateX})`,
              }}
            />

            <div className="relative flex">
              {WORKBENCH_TABS.map((tabItem, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={tabItem.mode}
                    type="button"
                    onClick={() => setModeQuery(tabItem.mode)}
                    className={clsx(
                      "relative z-10 rounded-[100px] px-4 py-[2px] transition-colors duration-200 whitespace-nowrap",
                      isActive ? "text-Grey-50 Body_2_semibold" : "text-Grey-500 Body_2_medium",
                    )}
                    style={{ width: getTabWidth(tabItem.mode) }}
                  >
                    {t(`workbenchTabs.${tabItem.mode}`)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-10 items-center">
        {video && (
          <button type="button" className="flex gap-1 items-center">
            <Video className="w-7 h-7" />
            <span className="Body_1_medium text-Grey-400">{t("howToUse")}</span>
          </button>
        )}

        <div ref={userMenuRef} className="relative" onMouseEnter={userHover} onMouseLeave={userHover}>
          <Person className="w-7 h-7 cursor-pointer" onClick={onUserClick} />

          {isUserOpen && (
            <div className="absolute top-full right-0 pt-5">
              <div className="px-3 py-4 bg-[rgba(40,44,52,0.90)] backdrop-blur-[5px] rounded-[8px] flex flex-col gap-3 Caption_medium text-Grey-100 min-w-[252px] transition-opacity">
                <div className="px-5 py-2">cnskdjnksc@gmail.com</div>
                <div className="Body_2_medium text-Grey-300 flex flex-col gap-14">
                  <div className="border-t-Grey-500 border-t pt-2">
                    <button
                      type="button"
                      className="py-2 pl-5 w-full text-left"
                      onClick={() => router.push(PATHS.MYPAGE)}
                    >
                      {t("settings")}
                    </button>
                    <button type="button" className="py-2 pl-5 w-full text-left">
                      {t("planManage")}
                    </button>
                  </div>
                  <button
                    type="button"
                    className="pt-4 pb-2 pl-5 border-t-Grey-500 border-t w-full text-left"
                  >
                    {t("logout")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
