"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { LogoRed } from "@/assets/icons";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import GlassButton from "@/components/common/GlassButton";
import { useStudioMarkStore } from "@/stores/useStudioMarkStore";
import { useChatMessages } from "@/hooks/useChatMessages";

interface ChatContainerProps {
  projectId: number | null;
  onGenerated?: (imageUrl: string) => void;
}

const ChatContainer = ({ projectId, onGenerated }: ChatContainerProps) => {
  const t = useTranslations("dashboard.workbench.chatbot");
  const { isEditMode, hasPaint, commitPaint, setEditMode } =
    useStudioMarkStore();
  const canSubmit = hasPaint && !!commitPaint;

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { messages, sendUserMessage, sendMarkImages, handleConceptSelect } =
    useChatMessages(
      projectId,
      t("recommendations.0"),
      t("refineDefaultMessage"),
      onGenerated,
    );

  const recommendations = [t("recommendations.0")] as const;

  const isEmpty = messages.length === 0;
  const isPendingConceptSelect = messages.some((m) => m.conceptSelectable);
  const [isSubmittingPaint, setIsSubmittingPaint] = useState(false);

  const handleSubmitPaint = useCallback(async () => {
    if (!commitPaint) return;
    setIsSubmittingPaint(true);
    try {
      const region = await commitPaint();
      if (!region) return;
      setEditMode(false);
      await sendMarkImages(region);
    } finally {
      setIsSubmittingPaint(false);
    }
  }, [commitPaint, setEditMode, sendMarkImages]);

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
    <div className="relative w-99 h-143.25 rounded-lg border border-Grey-600 bg-Grey-900 p-5 pb-4 flex flex-col overflow-hidden">
      <div className="flex gap-1 flex-col pb-2 border-b border-Grey-600 shrink-0">
        <div className="flex gap-3 items-center">
          <div className="rounded-full h-13 w-13 p-px bg-linear-to-b from-Grey-400 to-Grey-700">
            <div className="h-full w-full rounded-full bg-Black flex items-center justify-center">
              <LogoRed className="w-8.25 h-[0.4368rem]" />
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
            <ChatMessage.List
              messages={messages}
              onConceptSelect={handleConceptSelect}
            />
            <div ref={bottomRef} />
          </>
        )}
      </div>

      <div className="flex flex-col gap-[0.65rem] items-center mt-5">
        <ChatInput
          onSend={(payload) => sendUserMessage(payload)}
          disabled={isPendingConceptSelect}
        />
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
              disabled={!canSubmit || isSubmittingPaint}
              onClick={handleSubmitPaint}
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
