"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import TabContent from "@/components/dashboard/studio/TabContent";
import TabPanel from "@/components/dashboard/studio/TabPanel";
import StudioHistoryPanel, {
  StudioHistoryItem,
} from "@/components/dashboard/studio/StudioHistoryPanel";

const DUMMY_HISTORY: StudioHistoryItem[] = [
  {
    id: "dummy-1",
    imageUrls: ["/images/dashboard/model.png", "/images/dashboard/studio.png"],
  },
];

const StudioPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [history, setHistory] = useState<StudioHistoryItem[]>(DUMMY_HISTORY);

  useEffect(() => {
    if (!uploadedImage) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(uploadedImage);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [uploadedImage]);

  return (
    <div className="flex justify-center h-screen relative overflow-hidden">
      <div className="fixed rounded-full opacity-15 -z-10 w-[97.4375rem] h-[97.4375rem] -right-[48.71875rem] -bottom-[48.71875rem] blur-[1.5625rem] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,48,48,0.50)_0%,rgba(153,29,29,0.00)_100%)]" />
      <main className="flex justify-center mt-[2.81rem]">
        <div className="flex flex-col">
          <TabPanel activeTab={activeTab} onChange={setActiveTab} />
          <TabContent
            activeTab={activeTab}
            setUploadedImage={setUploadedImage}
          />
        </div>

        <section className="w-[36.875rem] h-[40.375rem] flex items-center justify-center bg-Grey-800/75 rounded-lg ml-[1.75rem] overflow-hidden">
          {previewUrl ? (
            <Image
              width={590}
              height={646}
              src={previewUrl}
              alt="업로드 이미지"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex flex-col gap-3 items-center">
              <h2 className="Subhead_1_semibold text-Grey-300">
                추천 아이디어
              </h2>
              <div className="h-6 w-px bg-Grey-300" />
              <div className="flex flex-col gap-1 text-Grey-400 Body_2_medium items-center">
                <span>제품을 강조한 고급 프로모션 이미지</span>
                <span>
                  소셜 미디어 캠페인을 위한 라이프스타일 컨텍스트 이미지
                </span>
                <span>달에서 촬영한 자동차 광고 이미지</span>
              </div>
            </div>
          )}
        </section>

        <StudioHistoryPanel history={history} />
      </main>
    </div>
  );
};

export default StudioPage;
