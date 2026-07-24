"use client";

import Header from "@/components/dashboard/Header";
import { useState } from "react";
import MyPageTabs from "@/components/mypage/MyPageTabs";
import SettingsContent from "@/components/mypage/SettingsContent";
import UpgradeContent from "@/components/mypage/UpgradeContent";
import { TabKey } from "@/types/mypage/tab.type";
import SideBar from "@/components/dashboard/sidebar/SideBar";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("settings");

  return (
    <div className="w-full min-h-dvh relative flex flex-col">
      <div className="w-[120.8125rem] h-[109.9375rem] opacity-25 blur-[50px] fixed left-[-85.3438rem] top-[-68.2188rem] bg-[radial-gradient(50%_50%_at_68.13%_58.1%,rgba(255,48,48,0.50)_0%,rgba(153,29,29,0)_100%)] -z-10" />
      <div className="w-[97.4375rem] h-[97.4375rem] fixed -bottom-91.25 -right-186.5 rounded-[97.4375rem] opacity-20 blur-[1.5625rem] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,48,48,0.5)_0%,rgba(153,29,29,0)_100%)] -z-10" />
      <Header />

      <div className="flex">
        <SideBar />

        <main className="w-full mt-12 mx-auto justify-center flex">
          <div className="flex flex-col pr-8.5 gap-8">
            <h1 className="Heading_1_bold bg-linear-to-b from-Red-300 to-Red-500 bg-clip-text text-transparent">
              마이페이지
            </h1>

            <div className="flex h-124.75">
              <MyPageTabs activeTab={activeTab} onChangeTab={setActiveTab} />

              <section className="w-191.5 bg-Grey-800 py-12 flex flex-col justify-between rounded-r-lg px-8">
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
