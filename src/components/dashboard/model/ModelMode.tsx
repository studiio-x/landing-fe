"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import TabContent from "@/components/dashboard/studio/common/TabContent";
import TabPanel from "@/components/dashboard/studio/common/TabPanel";
import StudioHistoryPanel, {
  StudioHistoryItem,
} from "@/components/dashboard/studio/StudioHistoryPanel";
import MarkCanvas from "@/components/dashboard/studio/MarkCanvas";
import { useStudioMarkStore } from "@/stores/useStudioMarkStore";

const DUMMY_HISTORY: StudioHistoryItem[] = [
  {
    id: "dummy-1",
    imageUrls: ["/images/dashboard/model.png", "/images/dashboard/studio.png"],
  },
];

const ModelMode = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [naturalSize, setNaturalSize] = useState<{
    w: number;
    h: number;
  } | null>(null);

  const { isEditMode, hasPaint } = useStudioMarkStore();

  const imageContainerRef = useRef<HTMLElement>(null);

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [history] = useState<StudioHistoryItem[]>(DUMMY_HISTORY);

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
    <div className="flex justify-center w-full">
      <div className="flex flex-col">
        <TabPanel activeTab={activeTab} onChange={setActiveTab} />
        <TabContent
          activeTab={activeTab}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
        />
      </div>

      <div className="relative ml-[1.75rem] w-[36.875rem] h-[40.375rem] rounded-lg">
        {isEditMode && !hasPaint && (
          <div className="absolute left-1/2 bottom-6 -translate-x-1/2 z-40">
            <div className="rounded-md bg-Grey-900 px-6 py-2 Subhead_2_medium text-White whitespace-nowrap">
              수정하고 싶은 모든 부분을 표시해 주세요.
            </div>
          </div>
        )}

        {isEditMode && (
          <svg
            className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none z-30"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <rect
              x="0.5"
              y="0.5"
              width="99"
              height="99"
              rx="1.5"
              ry="1.5"
              fill="none"
              stroke="#FF3030"
              strokeWidth="1"
              strokeDasharray="10 6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}

        <section
          ref={imageContainerRef}
          className="relative w-full h-full flex items-center justify-center bg-Grey-800/75 rounded-lg overflow-hidden"
        >
          {previewUrl ? (
            <>
              <Image
                width={590}
                height={646}
                src={previewUrl}
                alt="업로드 이미지"
                className="w-full h-full object-contain"
                onLoad={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  setNaturalSize({
                    w: img.naturalWidth,
                    h: img.naturalHeight,
                  });
                }}
              />

              {isEditMode && naturalSize && (
                <MarkCanvas
                  imageContainerRef={imageContainerRef}
                  naturalSize={naturalSize}
                />
              )}
            </>
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
      </div>

      <StudioHistoryPanel history={history} />
    </div>
  );
};

export default ModelMode;
