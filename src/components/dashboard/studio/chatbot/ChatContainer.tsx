"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { LogoRed } from "@/assets/icons";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { CHAT_RECOMMENDATIONS } from "@/constants/dashboard/chat-recommendations";
import type {
  ChatAttachment,
  ChatItem,
  ChatSendPayload,
} from "@/types/dashboard/chat.type";
import clsx from "clsx";
import GlassButton from "@/components/common/GlassButton";
import { useStudioMarkStore } from "@/stores/useStudioMarkStore";

const ChatContainer = () => {
  const t = useTranslations("dashboard.studio.chatbot");
  const { isEditMode, hasPaint, commitPaint, setEditMode } =
    useStudioMarkStore();
  const canSubmit = hasPaint && !!commitPaint;

  const [messages, setMessages] = useState<ChatItem[]>([]);
  const timersRef = useRef<number[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const recommendations = [
    t("recommendations.0"),
    t("recommendations.1"),
    t("recommendations.2"),
  ] as const;

  const isEmpty = messages.length === 0;

  useEffect(() => {
    return () => timersRef.current.forEach((t) => clearTimeout(t));
  }, []);

  const sendUserMessage = useCallback((payload: ChatSendPayload) => {
    const text = payload.text?.trim() ?? "";
    const attachments = payload.attachments ?? [];

    if (!text && attachments.length === 0) return;

    const userId = crypto.randomUUID();
    const typingId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", text, status: "sent", attachments },
      { id: typingId, role: "assistant", text: "", status: "typing" },
    ]);

    const t = window.setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId
            ? {
                ...m,
                status: "done",
                text: "알겠어. 전달해준 내용을 기준으로 이어서 진행할게.",
              }
            : m,
        ),
      );
    }, 1200);

    timersRef.current.push(t);
  }, []);

  const sendMarkImages = useCallback(async () => {
    if (!commitPaint) return;

    const region = await commitPaint();
    if (!region) return;

    const attachments: ChatAttachment[] = [
      { id: region.id, imageUrl: region.imageUrl },
    ];

    sendUserMessage({ attachments });
    setEditMode(false);
  }, [commitPaint, sendUserMessage, setEditMode]);

  const handleClickRecommendation = useCallback(
    (text: string) => sendUserMessage({ text }),
    [sendUserMessage],
  );

  useEffect(() => {
    const isTyping = messages.some(
      (m) => m.role === "assistant" && m.status === "typing",
    );
    bottomRef.current?.scrollIntoView({
      behavior: isTyping ? "smooth" : "auto",
    });
  }, [messages]);

  return (
    <div className="relative w-[24.75rem] h-[35.8125rem] rounded-lg border border-Grey-600 bg-Grey-900 p-5 pb-4 flex flex-col overflow-hidden">
      <div className="flex gap-1 flex-col pb-2 border-b border-Grey-600 shrink-0">
        <div className="flex gap-3 items-center">
          <div className="rounded-full h-[3.25rem] w-[3.25rem] p-[1px] bg-gradient-to-b from-Grey-400 to-Grey-700">
            <div className="h-full w-full rounded-full bg-Black flex items-center justify-center">
              <LogoRed className="w-[2.0625rem] h-[0.4368rem]" />
            </div>
          </div>
          <span className="Subhead_2_semibold text-Grey-100">{t("title")}</span>
        </div>
        <span className="py-1 px-2 Body_3_medium text-Grey-300">
          {t("subtitle")}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pt-5 pb-2 -mr-2">
        {isEmpty ? (
          <ChatMessage.Recommendations
            items={recommendations}
            onClickItem={handleClickRecommendation}
          />
        ) : (
          <>
            <ChatMessage.List messages={messages} />
            <div ref={bottomRef} />
          </>
        )}
      </div>

      <div className="flex flex-col gap-[0.65rem] items-center mt-5">
        <ChatInput onSend={(payload) => sendUserMessage(payload)} />
        <span className="Caption_medium text-Grey-500">{t("disclaimer")}</span>
      </div>

      {isEditMode && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center rounded-lg bg-Grey-900/90">
          <p className="text-center Body_1_medium text-Grey-50 whitespace-pre-line">
            {t("editModeGuide")}
          </p>

          <div className="mt-9 flex items-center justify-center gap-3">
            <GlassButton
              variant="default"
              size="sm"
              className="Body_2_semibold"
              onClick={() => setEditMode(false)}
            >
              {t("cancel")}
            </GlassButton>

            <GlassButton
              variant="red"
              size="sm"
              className={clsx(
                "Body_2_semibold",
                !canSubmit && "cursor-not-allowed",
              )}
              disabled={!canSubmit}
              onClick={sendMarkImages}
            >
              {t("submitInput")}
            </GlassButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
