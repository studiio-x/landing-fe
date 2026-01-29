"use client";

import { useState } from "react";
import clsx from "clsx";
import { Plus, Video } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";
import { useLocale, useTranslations } from "next-intl";
import OptionCard from "./OptionCard";
import { ACTION_OPTIONS, QUALITY_OPTIONS } from "@/constants/dashboard/video-options";
import { ActionKey, QualityKey } from "@/types/dashboard/video-option.type";

interface OptionsTabProps {
  uploadedImage: File | null;
}


const OptionsTab = ({ uploadedImage }: OptionsTabProps) => {
  const locale = useLocale();
  const t = useTranslations("dashboard.workbench.optionsTab");
  const [selected, setSelected] = useState<QualityKey>("basic");
  const [hovered, setHovered] = useState<QualityKey | null>(null);
  const [selectedAction, setSelectedAction] = useState<ActionKey | null>(null);

  return (
    <div className="mt-5">
      <p className="pl-2 text-Grey-100 Body_2_medium">{t("selectQuality")}</p>

      <div
        role="radiogroup"
        aria-label={t("qualityAriaLabel")}
        className="mt-3 mb-5 flex gap-[0.625rem] w-full"
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
              onClick={() => setSelected(key)}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              className={clsx(
                "w-1/2 bg-gradient-to-b p-px rounded",
                isSelected
                  ? "from-Red-350 to-Red-500"
                  : "from-Grey-300 to-Grey-700 hover:from-Red-350 hover:to-Red-500",
              )}
            >
              <div className="flex flex-col gap-1 items-center rounded bg-Grey-800 h-full justify-center pt-[0.81rem] pb-[0.9375rem] px-[1.12rem]">
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
          locale === "ko" ? "max-h-[366px]" : "max-h-[350px]",
        )}
      >
        {ACTION_OPTIONS.map(({ key, label }) => (
          <OptionCard
            key={key}
            label={label}
            isSelected={selectedAction === key}
            onClick={() => {
              setSelectedAction(key);
              console.log("action:", key);
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6 Body_2_semibold">
        <GlassButton
          size="md"
          gap="sm"
          className="Body_3_semibold"
          leftIcon={<Plus className="w-[1.375rem] h-[1.375rem]" />}
        >
          {t("uploadBackground")}
        </GlassButton>

        <GlassButton
          size="md"
          variant="red"
          type="button"
          className="Body_2_semibold"
        >
          {t("generate")}
        </GlassButton>
      </div>
    </div>
  );
};

export default OptionsTab;
