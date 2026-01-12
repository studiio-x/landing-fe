"use client";

import { Plus, Send } from "@/assets/icons";
import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";

const MIN_H = 24;
const MAX_H = 80;

const ChatInput = () => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState("");

  const autosize = () => {
    const el = ref.current;
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

  return (
    <div
      className={clsx(
        "rounded-md p-[1px]",
        hasValue
          ? "bg-gradient-to-b from-Red-500/45 to-Red-500/15"
          : "bg-transparent"
      )}
    >
      <div className="bg-Grey-600 px-4 py-3 rounded-md flex gap-1">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="AI에게 수정하고 싶은 내용을 알려주세요."
          rows={1}
          className="w-[16.375rem] pt-[2px] bg-transparent min-h-6 max-h-20 placeholder:text-Grey-400 text-Grey-100 resize-none outline-none Body_3_medium"
        />

        <div className="flex items-center self-start gap-[0.625rem]">
          <button>
            <Plus className="w-6 h-6 text-Grey-200 hover:text-Red-500" />
          </button>
          <button>
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
