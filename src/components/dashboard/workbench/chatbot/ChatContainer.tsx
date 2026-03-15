"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { LogoRed } from "@/assets/icons";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import type {
  ChatItem,
  ChatSendPayload,
} from "@/types/dashboard/chat.type";
import clsx from "clsx";
import GlassButton from "@/components/common/GlassButton";
import { useStudioMarkStore } from "@/stores/useStudioMarkStore";
import {
  usePostChatMessage,
  usePostConceptSelect,
  useGetChatHistory,
} from "@/hooks/queries/useChatApi";
import { getReferencePresign, getMaskPresign } from "@/apis/chatApi";
interface ChatContainerProps {
  projectId: number | null;
}

const ChatContainer = ({ projectId }: ChatContainerProps) => {
  const t = useTranslations("dashboard.workbench.chatbot");
  const { isEditMode, hasPaint, commitPaint, setEditMode } =
    useStudioMarkStore();
  const canSubmit = hasPaint && !!commitPaint;

  const [messages, setMessages] = useState<ChatItem[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const hasInitialized = useRef(false);

  const { mutateAsync: sendMessage } = usePostChatMessage();
  const { mutateAsync: selectConcept } = usePostConceptSelect();
  const { data: historyData } = useGetChatHistory(projectId ?? 0);

  const recommendations = [
    t("recommendations.0"),
    t("recommendations.1"),
    t("recommendations.2"),
  ] as const;

  const isEmpty = messages.length === 0;

  // projectId가 바뀌면 상태 초기화
  useEffect(() => {
    hasInitialized.current = false;
    setMessages([]);
  }, [projectId]);

  // 서버 채팅 내역 최초 1회 로드
  useEffect(() => {
    if (!historyData || hasInitialized.current) return;
    hasInitialized.current = true;
    if (!historyData.messages.length) return;

    setMessages(
      historyData.messages.map((m) => ({
        id: String(m.messageId),
        role: m.role === "USER" ? ("user" as const) : ("assistant" as const),
        text: m.content,
        status: "done" as const,
        imageKeys: m.imageKeys.length > 0 ? m.imageKeys : undefined,
      })),
    );
  }, [historyData]);

  const sendUserMessage = useCallback(
    async (payload: ChatSendPayload) => {
      if (!projectId) return;
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

      try {
        let referenceImageObjectKey: string | undefined;
        if (attachments[0]?.imageUrl) {
          const presign = await getReferencePresign(projectId);
          const blob = await fetch(attachments[0].imageUrl).then((r) =>
            r.blob(),
          );
          await fetch(presign.uploadUrl, {
            method: "PUT",
            body: blob,
            headers: { "Content-Type": blob.type },
          });
          referenceImageObjectKey = presign.objectKey;
        }

        const response = await sendMessage({
          projectId,
          mode: "CONCEPT",
          body: {
            content: text || t("recommendations.0"),
            referenceImageObjectKey,
          },
        });

        setMessages((prev) =>
          prev.map((m) =>
            m.id === typingId
              ? {
                  ...m,
                  status: "done" as const,
                  text: response.aiText,
                  imageKeys:
                    response.imageKeys.length > 0
                      ? response.imageKeys
                      : undefined,
                  conceptSelectable: response.imageKeys.length > 0,
                }
              : m,
          ),
        );
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === typingId
              ? {
                  ...m,
                  status: "done" as const,
                  text: "오류가 발생했습니다. 다시 시도해주세요.",
                }
              : m,
          ),
        );
      }
    },
    [projectId, sendMessage],
  );

  const sendMarkImages = useCallback(async () => {
    if (!commitPaint || !projectId) return;

    const region = await commitPaint();
    if (!region) return;

    setEditMode(false);

    const userId = crypto.randomUUID();
    const typingId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      {
        id: userId,
        role: "user",
        text: "",
        status: "sent",
        attachments: [{ id: region.id, imageUrl: region.imageUrl }],
      },
      { id: typingId, role: "assistant", text: "", status: "typing" },
    ]);

    try {
      const presign = await getMaskPresign(projectId);
      const blob = await fetch(region.imageUrl).then((r) => r.blob());
      await fetch(presign.uploadUrl, {
        method: "PUT",
        body: blob,
        headers: { "Content-Type": "image/png" },
      });

      const response = await sendMessage({
        projectId,
        mode: "REFINE",
        body: { content: t("refineDefaultMessage"), maskImageObjectKey: presign.objectKey },
      });

      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId
            ? {
                ...m,
                status: "done" as const,
                text: response.aiText,
                imageKeys:
                  response.imageKeys.length > 0
                    ? response.imageKeys
                    : undefined,
              }
            : m,
        ),
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId
            ? {
                ...m,
                status: "done" as const,
                text: "오류가 발생했습니다. 다시 시도해주세요.",
              }
            : m,
        ),
      );
    }
  }, [commitPaint, projectId, sendMessage, setEditMode]);

  const handleConceptSelect = useCallback(
    async (messageId: string, index: number) => {
      if (!projectId) return;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, conceptSelectable: false } : m,
        ),
      );
      try {
        await selectConcept({ projectId, body: { selectedIndex: index } });
      } catch {
        console.error("컨셉 선택 실패");
      }
    },
    [projectId, selectConcept],
  );

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
            <ChatMessage.List
              messages={messages}
              onConceptSelect={handleConceptSelect}
            />
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
