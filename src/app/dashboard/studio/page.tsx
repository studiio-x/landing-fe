"use client";

import { useState } from "react";

import TabContent from "@/components/dashboard/studio/TabContent";
import TabPanel from "@/components/dashboard/studio/TabPanel";

const StudioPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex justify-center">
      <main className="flex justify-center mt-[2.81rem]">
        <div className="flex flex-col">
          <TabPanel activeTab={activeTab} onChange={setActiveTab} />
          <TabContent activeTab={activeTab} />
        </div>

        <section className="w-[36.875rem] h-[40.375rem] flex items-center justify-center bg-Grey-800/75 rounded-lg ml-[1.75rem]">
          <div className="flex flex-col gap-3 items-center">
            <h2 className="Subhead_1_semibold text-Grey-300">추천 아이디어</h2>
            <div className="h-6 w-px bg-Grey-300" />
            <div className="flex flex-col gap-1 text-Grey-400 Body_2_medium items-center">
              <span>제품을 강조한 고급 프로모션 이미지</span>
              <span>
                소셜 미디어 캠페인을 위한 라이프스타일 컨텍스트 이미지
              </span>
              <span>달에서 촬영한 자동차 광고 이미지</span>
            </div>
          </div>
        </section>

        <section className="w-[12.375rem] h-[28.125rem] flex flex-col gap-3 text-center items-center justify-center ml-8 rounded-lg bg-Grey-900">
          <h2 className="Body_2_semibold text-Grey-400">
            첫 번째 이미지를 <br />
            생성해 보세요
          </h2>
          <span className="Body_3_medium text-Grey-500">
            텍스트 하나로 <br />
            이미지를 만들어 보세요.
          </span>
        </section>
      </main>
    </div>
  );
};

export default StudioPage;
