"use client";

import { Image, Plus, Scissor, Send } from "@/assets/icons";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";

const MIN_H = 24;
const MAX_H = 80;

const ChatInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const plusWrapRef = useRef<HTMLDivElement | null>(null);

  const [value, setValue] = useState("");
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [isPlusPinned, setIsPlusPinned] = useState(false);

  /* textarea autosize */
  const autosize = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "0px";
    const next = Math.min(Math.max(el.scrollHeight, MIN_H), MAX_H);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > MAX_H ? "auto" : "hidden";
  };

  useLayoutEffect(() => {
    autosize();
  }, [value]);

  const hasValue = value.trim().length > 0;

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
      className={clsx(
        "relative rounded-md p-[1px]",
        hasValue
          ? "bg-gradient-to-b from-Red-500/45 to-Red-500/15"
          : "bg-transparent"
      )}
    >
      <div className="bg-Grey-600 px-4 py-3 rounded-md flex gap-1">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="AI에게 수정하고 싶은 내용을 알려주세요."
          rows={1}
          className="w-[16.375rem] pt-[2px] bg-transparent min-h-6 max-h-20 placeholder:text-Grey-400 text-Grey-100 resize-none outline-none Body_3_medium"
        />

        <div className="flex items-start gap-[0.625rem]">
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
              <div className="relative w-[13.25rem] rounded-md">
                <div className="relative px-8 pt-5 pb-4 rounded-md bg-Grey-600/75 backdrop-blur-[8px] shadow-[0_0px_20px_rgba(8,8,8,0.12)]">
                  <div className="grid grid-cols-2 gap-8">
                    <label className="flex flex-col items-center gap-4 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          console.log(file);
                          e.target.value = "";
                        }}
                      />

                      <div className="group/image rounded-full p-[1px] bg-gradient-to-b from-Grey-500 to-Grey-700 hover:from-Red-300 hover:to-Red-500">
                        <div className="h-[2.75rem] w-[2.75rem] rounded-full bg-Grey-800 group-hover/image:bg-Red-500 flex items-center justify-center">
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
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="group/scissor rounded-full p-[1px] bg-gradient-to-b from-Grey-500 to-Grey-700 hover:from-Red-300 hover:to-Red-500">
                        <div className="h-[2.75rem] w-[2.75rem] rounded-full bg-Grey-800 group-hover/scissor:bg-Red-500 flex items-center justify-center">
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

          <button type="button" aria-label="전송">
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
