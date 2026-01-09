"use client";
import { Back, Logo, Person, Video } from "@/assets/icons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useActivePage } from "@/hooks/useActivePage";
import { on } from "events";
import { i } from "framer-motion/client";

interface HeaderProps {
  back?: boolean;
  tap?: boolean;
  video?: boolean;
}

const TAB_CONFIG = {
  스튜디오: "/dashboard/studio",
  모델: "/dashboard/model",
} as const;

type TabName = keyof typeof TAB_CONFIG;

const TAB_NAMES = Object.keys(TAB_CONFIG) as TabName[];

const Header = ({ back = false, tap = false, video = false }: HeaderProps) => {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isUserClicked, setIsUserClicked] = useState(false);
  const router = useRouter();
  const activePage = useActivePage(TAB_CONFIG);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tabName: TabName) => {
    router.push(TAB_CONFIG[tabName]);
  };

  //외부 클릭감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserOpen(false);
        setIsUserClicked(false);
      }
    };

    if (isUserOpen) document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserOpen]);

  // 유저클릭 이벤트 핸들러
  const onUserClick = () => {
    // 호버 모드에서 클릭 → 클릭 모드로 전환 (열린 상태 유지)
    if (!isUserClicked) {
      setIsUserClicked(true);
      setIsUserOpen(true);
    }
    // 클릭 모드에서 재클릭 → 토글
    else {
      setIsUserOpen(!isUserOpen);
      if (isUserOpen) {
        setIsUserClicked(false);
      }
    }
  };

  //유저 호버 이벤트 핸들러
  const userHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isUserClicked) {
      if (e.type === "mouseenter") {
        setIsUserOpen(true);
      } else if (e.type === "mouseleave") {
        setIsUserOpen(false);
      }
    }
  };

  return (
    <header className="px-[6.125rem] pt-5 py-3 flex bg-Black border-b-Grey-800 border-b-[1.5px] sticky top-0 left-0 h-[var(--header-height)] items-center z-[100]">
      <div className="flex gap-4 items-center">
        {back && (
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="뒤로 가기"
          >
            <Back className="w-7 h-7" />
          </button>
        )}
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          aria-label="대시보드로 이동"
        >
          <Logo className="w-[5.3125rem]" />
        </button>
      </div>

      {/* 탭  */}
      <div className="flex-1 flex justify-center">
        {tap && (
          <div className="rounded-[100px] bg-Grey-800 px-1 py-1 h-[2.1875rem]">
            {TAB_NAMES.map((tabName) => (
              <button
                key={tabName}
                type="button"
                onClick={() => handleTabClick(tabName)}
                className={`px-4 py-[2px] rounded-[100px] Body_2_medium transition-all duration-300 ease-in-out ${
                  activePage === tabName
                    ? "bg-Grey-600 text-Grey-50"
                    : "text-Grey-500"
                }`}
              >
                {tabName}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-10 items-center">
        {/* 사용방법 */}
        {video && (
          <button type="button" className="flex gap-1 items-center">
            <Video className="w-7 h-7" />
            <span className="Body_1_medium text-Grey-400">사용 방법</span>
          </button>
        )}
        <div
          ref={userMenuRef}
          className="relative"
          onMouseEnter={userHover}
          onMouseLeave={userHover}
        >
          <Person className="w-7 h-7 cursor-pointer" onClick={onUserClick} />

          {isUserOpen && (
            <div className="absolute top-full right-0 pt-5">
              <div className="px-3 py-4 bg-[rgba(40,44,52,0.90)] backdrop-blur-[5px] rounded-[8px] flex flex-col gap-3 Caption_medium text-Grey-100 min-w-[252px] transition-opacity">
                <div className="px-5 py-2">cnskdjnksc@gmail.com</div>
                <div className=" Body_2_medium text-Grey-300 flex flex-col gap-14 ">
                  <div className="border-t-Grey-500 border-t pt-2">
                    <button
                      type="button"
                      className="py-2 pl-5 w-full text-left"
                      onClick={() => router.push("/dashboard/mypage")}
                    >
                      설정
                    </button>
                    <button
                      type="button"
                      className="py-2 pl-5 w-full text-left"
                    >
                      플랜 관리
                    </button>
                  </div>
                  <button
                    type="button"
                    className="pt-4 pb-2 pl-5 border-t-Grey-500 border-t w-full text-left"
                  >
                    로그아웃
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
