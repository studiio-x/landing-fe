"use client";

import { useState } from "react";
import clsx from "clsx";
import { Premium, Video } from "@/assets/icons";

interface OptionsTabProps {
  uploadedImage: File | null;
}

const QUALITY_OPTIONS = [
  { key: "basic", credits: 1, label: "기본 품질", icon: Video },
  { key: "premium", credits: 5, label: "고급 품질", icon: Premium },
] as const;

type QualityKey = (typeof QUALITY_OPTIONS)[number]["key"];

const OptionsTab = ({ uploadedImage }: OptionsTabProps) => {
  const [selected, setSelected] = useState<QualityKey>("basic");
  const [hovered, setHovered] = useState<QualityKey | null>(null);

  return (
    <div className="mt-5">
      <p className="pl-2 text-Grey-100 Body_2_medium">
        비디오 화질을 선택하세요
      </p>

      <div
        role="radiogroup"
        aria-label="비디오 화질 선택"
        className="mt-3 mb-5 flex gap-[0.625rem] w-full"
      >
        {QUALITY_OPTIONS.map(({ key, credits, label, icon: Icon }) => {
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
              <div className="flex flex-col gap-1 items-center rounded bg-Grey-800 pt-[0.81rem] pb-[0.9375rem] px-[1.12rem]">
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
                    {label}
                  </span>
                </div>

                <span className="Caption_medium text-Grey-300">
                  영상 크레딧 {credits}개가 소모됩니다.
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionsTab;
