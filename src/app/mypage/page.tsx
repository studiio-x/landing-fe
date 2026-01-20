"use client";

import Header from "@/components/dashboard/Header";
import SideBar from "@/components/dashboard/SideBar";
import { useState } from "react";
import MyPageTabs from "@/components/mypage/MyPageTabs";
import SettingsContent from "@/components/mypage/SettingsContent";
import UpgradeContent from "@/components/mypage/UpgradeContent";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<"settings" | "upgrade">(
    "settings",
  );

  return (
    <div className="overflow-hidden w-full h-dvh relative flex flex-col">
      <div className="w-[120.8125rem] h-[109.9375rem] opacity-25 blur-[50px] fixed -left-[85.3438rem] -top-[68.2188rem] bg-[radial-gradient(50%_50%_at_68.13%_58.1%,rgba(255,48,48,0.50)_0%,rgba(153,29,29,0)_100%)] -z-10" />
      <div className="w-[97.4375rem] h-[97.4375rem] fixed -bottom-[22.8125remrem] -right-[46.625rem] rounded-[97.4375rem] opacity-20 blur-[1.5625rem] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,48,48,0.5)_0%,rgba(153,29,29,0)_100%)] -z-10" />
      <Header />

      <div className="flex">
        <SideBar />

        <main className="w-full mt-12 mx-auto justify-center flex">
          <div className="flex flex-col pr-[2.125rem] gap-8">
            <h1 className="Heading_1_bold bg-gradient-to-b from-Red-300 to-Red-500 bg-clip-text text-transparent">
              마이페이지
            </h1>

            <div className="flex h-[31.1875rem]">
              <MyPageTabs activeTab={activeTab} onChangeTab={setActiveTab} />

              <section className="w-[47.875rem] bg-Grey-800 py-12 flex flex-col justify-between rounded-r-lg px-8">
                {activeTab === "settings" ? (
                  <SettingsContent />
                ) : (
                  <UpgradeContent />
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyPage;
