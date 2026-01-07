"use client";
import { Back, Logo, Person, Video } from "@/assets/icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

const Header = ({ back = false, tap = false, video = false }: HeaderProps) => {
  const [activePage, setActivePage] = useState<TabName>("스튜디오");
  const [userIsOpen, setUserIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/dashboard/studio") {
      setActivePage("스튜디오");
    } else if (pathname === "/dashboard/model") {
      setActivePage("모델");
    }
  }, [pathname]);

  const handleTabClick = (tabName: TabName) => {
    router.push(TAB_CONFIG[tabName]);
  };

  return (
    <header className="px-[6.125rem] pt-5 py-3 flex relative border-b-Grey-800 border-b-[1.5px]">
      <div className="flex gap-4 items-center">
        {back && (
          <Back
            className="w-[1.5625rem] h-[1.5625rem] cursor-pointer"
            onClick={() => router.back()}
          />
        )}
        <Logo
          className="w-[5.3125rem] cursor-pointer"
          onClick={() => router.push("/dashboard")}
        />
      </div>

      {/* 탭  */}
      <div className="flex-1 flex justify-center">
        {tap && (
          <div className="rounded-[100px] bg-Grey-800 px-1 py-[2px]">
            <div>
              {Object.keys(TAB_CONFIG).map((tabName) => (
                <button
                  key={tabName}
                  type="button"
                  onClick={() => handleTabClick(tabName as TabName)}
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
          </div>
        )}
      </div>

      <div className="flex gap-10 items-center">
        {/* 사용방법 */}
        {video && (
          <button type="button" className="flex gap-1 items-center">
            <Video className="w-7 h-7" />
            <span className="Body_1_medium text-Grey-400">사용방법</span>
          </button>
        )}
        <div
          className="relative"
          onMouseEnter={() => setUserIsOpen(true)}
          onMouseLeave={() => setUserIsOpen(false)}
        >
          <Person
            className="w-[1.16875rem] h-[1.16875rem] cursor-pointer"
            onClick={() => setUserIsOpen((pre) => !pre)}
          />

          {userIsOpen && (
            <div className="absolute top-full right-0 pt-6">
              <div className="px-3 py-4 bg-[rgba(40,44,52,0.90)] rounded-[8px] flex flex-col gap-3 Caption_medium text-Grey-100 min-w-[228px] transition-opacity">
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
