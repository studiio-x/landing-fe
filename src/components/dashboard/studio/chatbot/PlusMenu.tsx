"use client";

import { Image, Plus, Scissor } from "@/assets/icons";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface PlusMenuProps {
  onUploadImage: (file: File) => void;
  onClickMark: () => void;
}

const PlusMenu = ({ onUploadImage, onClickMark }: PlusMenuProps) => {
  const plusWrapRef = useRef<HTMLDivElement | null>(null);

  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [isPlusPinned, setIsPlusPinned] = useState(false);

  const openPlus = () => setIsPlusOpen(true);
  const closePlus = () => {
    if (isPlusPinned) return;
    setIsPlusOpen(false);
  };

  const showPlusPopup = isPlusOpen || isPlusPinned;

  useEffect(() => {
    if (!showPlusPopup) return;

    const onDown = (e: MouseEvent) => {
      if (!plusWrapRef.current?.contains(e.target as Node)) {
        setIsPlusPinned(false);
        setIsPlusOpen(false);
      }
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [showPlusPopup]);

  return (
    <div
      ref={plusWrapRef}
      className="relative flex items-start gap-[0.625rem]"
      onMouseEnter={openPlus}
      onMouseLeave={closePlus}
    >
      <button
        type="button"
        aria-label="추가"
        onClick={() => {
          setIsPlusPinned((prev) => !prev);
          setIsPlusOpen(true);
        }}
      >
        <Plus
          className={clsx(
            "w-6 h-6 transition-colors",
            showPlusPopup ? "text-Red-500" : "text-Grey-200"
          )}
        />
      </button>

      <div
        className={clsx(
          "absolute bottom-full -right-[3.125rem] z-50 pb-5 transition duration-150",
          showPlusPopup
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-1 pointer-events-none"
        )}
      >
        <div className="relative w-[13.25rem] rounded-md p-[1px] bg-gradient-to-b from-Red-500/25 backdrop-blur-[8px] to-Red-500/10 shadow-[0_0px_20px_rgba(8,8,8,0.12)]">
          <div className="absolute inset-px bg-Grey-600/75 pointer-events-none rounded-md" />
          <div className="relative px-8 pt-5 pb-4 rounded-md bg-Grey-600/75">
            <div className="grid grid-cols-2 gap-7">
              <label className="group flex flex-col items-center gap-2 cursor-pointer ">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    onUploadImage(file);
                    e.target.value = "";
                  }}
                />

                <div className="rounded-full p-[1px] bg-gradient-to-b from-Grey-500 to-Grey-700 group-hover:from-Red-300 group-hover:to-Red-500">
                  <div className="h-[2.75rem] w-[2.75rem] rounded-full bg-Grey-800 group-hover:bg-Red-500 flex items-center justify-center">
                    <Image className="w-6 h-6" />
                  </div>
                </div>

                <span className="Caption_medium text-Grey-100 text-center">
                  참고 이미지
                  <br />
                  업로드
                </span>
              </label>

              <button
                type="button"
                className="flex flex-col items-center gap-2 group"
                onClick={onClickMark}
              >
                <div className="group rounded-full p-[1px] bg-gradient-to-b from-Grey-500 to-Grey-700 group-hover:from-Red-300 group-hover:to-Red-500">
                  <div className="h-[2.75rem] w-[2.75rem] rounded-full bg-Grey-800 group-hover:bg-Red-500 flex items-center justify-center">
                    <Scissor className="w-6 h-6" />
                  </div>
                </div>

                <span className="Caption_medium text-Grey-100 text-center">
                  수정할 부분
                  <br />
                  표시하기
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlusMenu;
