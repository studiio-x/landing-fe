"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useTranslations } from "next-intl";

import TabContent from "./TabContent";
import TabPanel from "./TabPanel";
import HistoryPanel, { HistoryItem } from "./HistoryPanel";
import MarkCanvas from "@/components/dashboard/workbench/chatbot/MarkCanvas";
import { useStudioMarkStore } from "@/stores/useStudioMarkStore";
import ProductImageRequiredModal from "@/components/dashboard/workbench/background/ProductImageRequiredModal";
import { useImageUploadAndCutout } from "@/hooks/useImageUploadAndCutout";
import { useGetFolders } from "@/hooks/queries/useFolderApi";
import { useGetProjects } from "@/hooks/queries/useProjectApi";
import { QUERY_KEYS } from "@/constants/common/paths";
import type { WorkbenchMode } from "@/types/dashboard/mode.type";

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
  const [requiredModalVariant, setRequiredModalVariant] = useState<
    "product" | "background"
  >("product");

  const { isEditMode, hasPaint } = useStudioMarkStore();

  const imageContainerRef = useRef<HTMLElement>(null);

  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null,
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const searchParams = useSearchParams();
  const folderIdParam = searchParams.get("folderId");
  const templateIdParam = searchParams.get(QUERY_KEYS.TEMPLATE_ID);
  const templateId = templateIdParam ? Number(templateIdParam) : null;

  const { data: foldersData } = useGetFolders();
  const folderId = folderIdParam
    ? Number(folderIdParam)
    : (foldersData?.myProject[0]?.folderId ?? 0);

  const { data: projectsData } = useGetProjects(folderId);
  const projects = projectsData?.projects ?? [];

  const [latest, second] = projects;
  const history: HistoryItem[] = latest
    ? [
        {
          id: String(latest.projectId),
          imageUrls: [
            latest.thumbnailObjectKey,
            (second ?? latest).thumbnailObjectKey,
          ],
        },
      ]
    : [];

  const {
    uploadedImage,
    setUploadedImage,
    previewUrl,
    isProcessing,
    processingStage,
    isCutoutImageLoading,
    setIsCutoutImageLoading,
    cutoutImageUrl,
    cutoutImageObjectKey,
    projectId,
    cutoutError,
    isErrorVisible,
  } = useImageUploadAndCutout(folderId, {
    templateId: mode !== "video" ? templateId : null,
    onBackgroundGenerated: setGeneratedImageUrl,
  });

  const handleTabChange = (nextIdx: number) => {
    const isBackgroundTab = nextIdx === 1 && mode !== "video";
    const isChatbotTab = nextIdx === 2;

    if (isBackgroundTab && !cutoutImageObjectKey) {
      setRequiredModalVariant("product");
      setIsProductImageRequiredOpen(true);
      return;
    }

    if (isChatbotTab) {
      if (!uploadedImage) {
        setRequiredModalVariant("product");
        setIsProductImageRequiredOpen(true);
        return;
      }

      if (mode !== "video" && !generatedImageUrl) {
        setRequiredModalVariant("background");
        setIsProductImageRequiredOpen(true);
        return;
      }
    }

    setActiveTab(nextIdx);
  };

  useEffect(() => {
    setNaturalSize(null);
    setGeneratedImageUrl(null);
  }, [uploadedImage]);

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col">
        <TabPanel
          activeTab={activeTab}
          onChange={handleTabChange}
          mode={mode}
        />
        <TabContent
          activeTab={activeTab}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          mode={mode}
          cutoutImageObjectKey={cutoutImageObjectKey}
          projectId={projectId}
          onGenerated={setGeneratedImageUrl}
          onGeneratingChange={setIsGenerating}
          initialTemplateId={templateId}
        />
      </div>

      <div className="relative ml-7 w-147.5 h-161.5 rounded-lg">
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
              <img
                crossOrigin="anonymous"
                src={generatedImageUrl ?? cutoutImageUrl ?? previewUrl}
                alt={t("uploadedImageAlt")}
                className="w-full h-full object-contain"
                onLoad={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  setNaturalSize({
                    w: img.naturalWidth,
                    h: img.naturalHeight,
                  });
                  setIsCutoutImageLoading(false);
                }}
              />

              {(isProcessing || isGenerating || isCutoutImageLoading) && (
                <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center bg-Grey-900/60">
                  <div className="w-10 h-10 border-4 border-Grey-600 border-t-White rounded-full animate-spin" />
                  {processingStage && (
                    <span className="Body_2_medium text-White">
                      {t(`processingStage.${processingStage}`)}
                    </span>
                  )}
                </div>
              )}

              {cutoutError && !isProcessing && (
                <div
                  className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-40 transition-opacity duration-300 ${
                    isErrorVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="rounded-md bg-Grey-900 px-6 py-2 Subhead_2_medium text-White whitespace-nowrap">
                    {cutoutError}
                  </div>
                </div>
              )}

              {isEditMode && naturalSize && !isProcessing && !isGenerating && (
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
          variant={requiredModalVariant}
          onClose={() => setIsProductImageRequiredOpen(false)}
        />
      )}
    </div>
  );
};

export default Workbench;
