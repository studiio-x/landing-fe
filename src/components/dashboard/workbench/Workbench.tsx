"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import TabContent from "./TabContent";
import TabPanel from "./TabPanel";
import HistoryPanel, {
  HistoryItem} from "./HistoryPanel";
import MarkCanvas from "@/components/dashboard/workbench/chatbot/MarkCanvas";
import { useStudioMarkStore } from "@/stores/useStudioMarkStore";
import ProductImageRequiredModal from "@/components/dashboard/workbench/background/ProductImageRequiredModal";
import type { WorkbenchMode } from "@/types/dashboard/mode.type";

const DUMMY_HISTORY: HistoryItem[] = [
  {
    id: "dummy-1",
    imageUrls: ["/images/dashboard/model.png", "/images/dashboard/studio.png"],
  },
];

interface WorkbenchProps {
  mode: WorkbenchMode;
}

const Workbench = ({ mode }: WorkbenchProps) => {
  const t = useTranslations("dashboard.workbench");
  const [activeTab, setActiveTab] = useState(0);
  const [naturalSize, setNaturalSize] = useState<{
    w: number;
    h: number;
  } | null>(null);
  const [isProductImageRequiredOpen, setIsProductImageRequiredOpen] =
    useState(false);

  const { isEditMode, hasPaint } = useStudioMarkStore();

  const imageContainerRef = useRef<HTMLElement>(null);

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [history] = useState<HistoryItem[]>(DUMMY_HISTORY);

  const handleTabChange = (nextIdx: number) => {
    const isChatbotTab = nextIdx === 2;

    if (isChatbotTab && !uploadedImage) {
      setIsProductImageRequiredOpen(true);
      return;
    }

    setActiveTab(nextIdx);
  };

  useEffect(() => {
    setNaturalSize(null);
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
        <TabPanel activeTab={activeTab} onChange={handleTabChange} mode={mode} />
        <TabContent
          activeTab={activeTab}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          mode={mode}
        />
      </div>

      <div className="relative ml-[1.75rem] w-[36.875rem] h-[40.375rem] rounded-lg">
        {isEditMode && !hasPaint && (
          <div className="absolute left-1/2 bottom-6 -translate-x-1/2 z-40">
            <div className="rounded-md bg-Grey-900 px-6 py-2 Subhead_2_medium text-White whitespace-nowrap">
              {t("editModeGuide")}
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
                alt={t("uploadedImageAlt")}
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
                {t("emptyState.title")}
              </h2>
              <div className="h-6 w-px bg-Grey-300" />
              <div className="flex flex-col gap-1 text-Grey-400 Body_2_medium items-center">
                <span>{t("emptyState.ideas.promotion")}</span>
                <span>{t("emptyState.ideas.lifestyle")}</span>
                <span>{t("emptyState.ideas.creative")}</span>
              </div>
            </div>
          )}
        </section>
      </div>

      <HistoryPanel history={history} mode={mode} />

      {isProductImageRequiredOpen && (
        <ProductImageRequiredModal
          onClose={() => setIsProductImageRequiredOpen(false)}
        />
      )}
    </div>
  );
};

export default Workbench;
