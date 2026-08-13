"use client";

import { useState } from "react";
import clsx from "clsx";
import { Plus, Video } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";
import { useLocale, useTranslations } from "next-intl";
import OptionCard from "./OptionCard";
import ProductImageRequiredModal from "@/components/dashboard/workbench/background/ProductImageRequiredModal";
import {
  useVideoGeneration,
  VideoGeneratedResult,
} from "@/hooks/useVideoGeneration";
import { useTemplatesByCategory } from "@/hooks/queries/useTemplateApi";
import {
  ACTION_OPTIONS,
  QUALITY_OPTIONS,
  getMotionTypeFromTemplateUrl,
} from "@/constants/dashboard/video-options";
import { ActionKey, QualityKey } from "@/types/dashboard/video-option.type";
import type { QualityType } from "@/types/api/video.type";
import type { ProcessingStage } from "@/types/dashboard/processing-stage.type";

const QUALITY_TYPE_MAP: Record<QualityKey, QualityType> = {
  basic: "STANDARD",
  premium: "HIGH",
};

// 카드에 보여줄 라벨만 이 상수에서 가져온다. 실제로 어떤 모션이 보이는지는 백엔드 템플릿 목록이 결정한다.
const ACTION_LABEL_MAP: Record<string, string> = Object.fromEntries(
  ACTION_OPTIONS.map(({ key, label }) => [key, label]),
);

interface OptionsTabProps {
  uploadedImage: File | null;
  folderId: number;
  onGenerated: (result: VideoGeneratedResult) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onStageChange?: (stage: ProcessingStage) => void;
  initialMotionType?: ActionKey | null;
}

const OptionsTab = ({
  uploadedImage,
  folderId,
  onGenerated,
  onGeneratingChange,
  onStageChange,
  initialMotionType,
}: OptionsTabProps) => {
  const locale = useLocale();
  const t = useTranslations("dashboard.workbench.optionsTab");
  const [selected, setSelected] = useState<QualityKey>("basic");
  const [hovered, setHovered] = useState<QualityKey | null>(null);
  const [selectedAction, setSelectedAction] = useState<ActionKey | null>(
    initialMotionType ?? null,
  );
  const [isProductImageModalOpen, setIsProductImageModalOpen] = useState(false);

  const { generate, isGenerating } = useVideoGeneration({
    folderId,
    onGenerated,
    onGeneratingChange,
    onStageChange,
  });

  const { data: videoTemplateData, isLoading: isMotionOptionsLoading } =
    useTemplatesByCategory({ category: "VIDEO", pageNum: 0, limit: 20 });

  const motionOptions = (videoTemplateData?.templates ?? [])
    .map((template) => {
      const motionType = getMotionTypeFromTemplateUrl(template.imageUrl);
      return motionType ? { motionType, imageUrl: template.imageUrl } : null;
    })
    .filter(
      (option): option is { motionType: ActionKey; imageUrl: string } =>
        option !== null,
    );

  const handleClickGenerate = () => {
    if (!uploadedImage) {
      setIsProductImageModalOpen(true);
      return;
    }
    if (!selectedAction) return;

    generate(uploadedImage, selectedAction, QUALITY_TYPE_MAP[selected]);
  };

  return (
    <div className="mt-5">
      <p className="pl-2 text-Grey-100 Body_2_medium">{t("selectQuality")}</p>

      <div
        role="radiogroup"
        aria-label={t("qualityAriaLabel")}
        className="mt-3 mb-5 flex gap-2.5 w-full"
      >
        {QUALITY_OPTIONS.map(({ key, credits, labelKey, icon: Icon }) => {
          const isSelected = selected === key;
          const isActive = isSelected || hovered === key;
          const isVideoIcon = Icon === Video;

          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(key)}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              className={clsx(
                "w-1/2 bg-linear-to-b p-px rounded",
                isSelected
                  ? "from-Red-350 to-Red-500"
                  : "from-Grey-300 to-Grey-700 hover:from-Red-350 hover:to-Red-500",
              )}
            >
              <div className="flex flex-col gap-1 items-center rounded bg-Grey-800 h-full justify-center pt-[0.81rem] pb-3.75 px-[1.12rem]">
                <div className="flex items-center gap-1">
                  {Icon && (
                    <Icon
                      className={clsx(
                        "w-6 h-6",
                        isVideoIcon && !isActive && "[&_path]:stroke-white",
                        !isVideoIcon && isActive && "[&_path]:fill-Red-300",
                      )}
                    />
                  )}

                  <span
                    className={clsx(
                      "Body_3_semibold",
                      isActive ? "text-Red-300" : "text-White",
                    )}
                  >
                    {t(labelKey)}
                  </span>
                </div>

                <span className="Caption_medium text-Grey-300 whitespace-pre-line">
                  {t("creditsConsumed", { credits })}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div
        className={clsx(
          "grid grid-cols-3 gap-3 overflow-y-auto",
          locale === "ko" ? "max-h-91.5" : "max-h-87.5",
        )}
      >
        {isMotionOptionsLoading
          ? Array.from({ length: 6 }, (_, i) => (
              <div
                key={`motion-skeleton-${i}`}
                className="w-31 h-40 rounded bg-Grey-800 animate-pulse"
              />
            ))
          : motionOptions.map(({ motionType, imageUrl }) => (
              <OptionCard
                key={motionType}
                label={ACTION_LABEL_MAP[motionType] ?? motionType}
                imageUrl={imageUrl}
                isSelected={selectedAction === motionType}
                onClick={() => {
                  setSelectedAction(motionType);
                }}
              />
            ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6 Body_2_semibold">
        <GlassButton
          size="md"
          gap="sm"
          type="button"
          className="Body_3_semibold"
          leftIcon={<Plus className="w-5.5 h-5.5" />}
        >
          {t("uploadBackground")}
        </GlassButton>

        <GlassButton
          size="md"
          variant="red"
          type="button"
          className="Body_2_semibold"
          onClick={handleClickGenerate}
          disabled={isGenerating || !selectedAction}
        >
          {t("generate")}
        </GlassButton>
      </div>

      {isProductImageModalOpen && (
        <ProductImageRequiredModal
          onClose={() => setIsProductImageModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OptionsTab;
