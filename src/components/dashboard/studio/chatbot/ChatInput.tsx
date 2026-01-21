"use client";

import { Send } from "@/assets/icons";
import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import PlusMenu from "./PlusMenu";
import { useStudioMarkStore } from "@/stores/useStudioMarkStore";
import { ChatAttachment, ChatSendPayload } from "@/types/dashboard/chat";

const MIN_H = 24;
const MAX_H = 80;

interface ChatInputProps {
  onSend: (payload: ChatSendPayload) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState("");

  const { setEditMode, resetPaint } = useStudioMarkStore();
  const sendMessage = () => {
    const text = value.trim();
    if (!text) return;
    onSend({ text });
    setValue("");
  };

  const handleUploadReferenceImage = (file: File) => {
    const url = URL.createObjectURL(file);

    const attachment: ChatAttachment = {
      id: crypto.randomUUID(),
      imageUrl: url,
    };
    // TODO: URL.revokeObjectURL(imageUrl) when done
    onSend({ attachments: [attachment] });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
          onKeyDown={handleKeyDown}
          placeholder="AI에게 수정하고 싶은 내용을 알려주세요."
          rows={1}
          className="w-[16.375rem] pt-[2px] bg-transparent min-h-6 max-h-20 placeholder:text-Grey-400 text-Grey-100 resize-none outline-none Body_3_medium"
        />

        <div className="flex items-start gap-[0.625rem]">
          <PlusMenu
            onUploadImage={handleUploadReferenceImage}
            onClickMark={() => {
              resetPaint();
              setEditMode(true);
            }}
          />

          <button type="button" aria-label="전송" onClick={sendMessage}>
            <Send className="w-6 h-6 transition-colors text-Grey-200 hover:text-Red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
