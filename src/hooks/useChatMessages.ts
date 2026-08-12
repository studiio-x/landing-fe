"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";

import { getReferencePresign, getMaskPresign } from "@/apis/chatApi";
import { queryKeys } from "@/hooks/queries/queryKeys";
import {
  usePostChatMessage,
  usePostConceptSelect,
  useGetChatHistory,
} from "@/hooks/queries/useChatApi";
import type { ChatItem, ChatSendPayload } from "@/types/dashboard/chat.type";
import type { WorkbenchMode } from "@/types/dashboard/mode.type";
import { getErrorMessage } from "@/utils/apiUtils";
import { uploadBlobToPresignedUrl } from "@/utils/uploadUtils";

export const useChatMessages = (
  projectId: number | null,
  defaultConceptMessage: string,
  refineDefaultMessage: string,
  onGenerated?: (imageUrl: string) => void,
  mode: WorkbenchMode = "studio",
) => {
  const isVideoMode = mode === "video";

  const t = useTranslations("dashboard.workbench.chatbot");
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const hasInitialized = useRef(false);

  const { mutateAsync: sendMessage } = usePostChatMessage();
  const { mutateAsync: selectConcept } = usePostConceptSelect();
  const { data: historyData } = useGetChatHistory(projectId ?? 0);

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

    const isPending = historyData.status !== "IDLE";
    const mapped: ChatItem[] = historyData.messages.map((m) => ({
      id: String(m.messageId),
      role: m.role === "USER" ? ("user" as const) : ("assistant" as const),
      text: m.content,
      status: "done" as const,
      imageKeys: m.imageKeys.length > 0 ? m.imageKeys : undefined,
    }));

    if (isPending) {
      const lastWithImages = [...mapped]
        .reverse()
        .find((m) => m.role === "assistant" && m.imageKeys);
      if (lastWithImages) lastWithImages.conceptSelectable = true;
    }

    setMessages(mapped);
  }, [historyData]);

  const resolveTypingMessage = useCallback(
    (typingId: string, patch: Partial<ChatItem>) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId ? { ...m, status: "done" as const, ...patch } : m,
        ),
      );
    },
    [],
  );

  const failTypingMessage = useCallback(
    (typingId: string, error: unknown) => {
      resolveTypingMessage(typingId, {
        text: getErrorMessage(error, t("errorRetry")),
      });
    },
    [resolveTypingMessage, t],
  );

  // 유저 메시지(선택) + typing 플레이스홀더를 추가한 뒤 execute를 호출해
  // 성공 시 응답으로, 실패 시 에러 메시지로 typing 메시지를 교체한다.
  const runExchange = useCallback(
    async (
      buildMessages: (prev: ChatItem[], typingId: string) => ChatItem[],
      execute: () => Promise<Partial<ChatItem>>,
    ) => {
      const typingId = crypto.randomUUID();
      setMessages((prev) => buildMessages(prev, typingId));

      try {
        const patch = await execute();
        resolveTypingMessage(typingId, patch);
      } catch (error) {
        failTypingMessage(typingId, error);
      }
    },
    [resolveTypingMessage, failTypingMessage],
  );

  const sendUserMessage = useCallback(
    async (payload: ChatSendPayload) => {
      if (!projectId) return;
      const text = payload.text?.trim() ?? "";
      const attachments = payload.attachments ?? [];

      if (!text && attachments.length === 0) return;

      const content = text || defaultConceptMessage;

      await runExchange(
        (prev, typingId) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "user",
            text: content,
            status: "sent",
            attachments,
          },
          { id: typingId, role: "assistant", text: "", status: "typing" },
        ],
        async () => {
          let referenceImageObjectKey: string | undefined;
          if (attachments[0]?.imageUrl) {
            const presign = await getReferencePresign(projectId);
            referenceImageObjectKey = await uploadBlobToPresignedUrl(
              attachments[0].imageUrl,
              presign.uploadUrl,
              presign.objectKey,
            );
          }

          const response = await sendMessage({
            projectId,
            mode: isVideoMode ? "VIDEO_REFINE" : "CONCEPT",
            body: {
              content,
              referenceImageObjectKey,
            },
          });

          return {
            text: response.aiText,
            imageKeys:
              response.imageKeys.length > 0 ? response.imageKeys : undefined,
            conceptSelectable: !isVideoMode && response.imageKeys.length > 0,
          };
        },
      );
    },
    [projectId, sendMessage, defaultConceptMessage, runExchange, isVideoMode],
  );

  const sendMarkImages = useCallback(
    async (region: { id: string; imageUrl: string }) => {
      if (!projectId) return;

      await runExchange(
        (prev, typingId) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "user",
            text: refineDefaultMessage,
            status: "sent",
            attachments: [{ id: region.id, imageUrl: region.imageUrl }],
          },
          { id: typingId, role: "assistant", text: "", status: "typing" },
        ],
        async () => {
          const presign = await getMaskPresign(projectId);
          const maskImageObjectKey = await uploadBlobToPresignedUrl(
            region.imageUrl,
            presign.uploadUrl,
            presign.objectKey,
            "image/png",
          );

          const response = await sendMessage({
            projectId,
            mode: isVideoMode ? "VIDEO_REFINE" : "REFINE",
            body: { content: refineDefaultMessage, maskImageObjectKey },
          });

          if (response.imageKeys.length > 0) {
            onGenerated?.(response.imageKeys[0]);
          }

          return {
            text: response.aiText,
            imageKeys:
              response.imageKeys.length > 0 ? response.imageKeys : undefined,
          };
        },
      );
    },
    [
      projectId,
      sendMessage,
      refineDefaultMessage,
      runExchange,
      onGenerated,
      isVideoMode,
    ],
  );

  const handleConceptSelect = useCallback(
    async (messageId: string, index: number) => {
      if (!projectId) return;

      await runExchange(
        (prev, typingId) => [
          ...prev.map((m) =>
            m.id === messageId ? { ...m, conceptSelectable: false } : m,
          ),
          { id: typingId, role: "assistant", text: "", status: "typing" },
        ],
        async () => {
          const response = await selectConcept({
            projectId,
            body: { selectedIndex: index },
          });

          if (response.imageKeys.length > 0) {
            queryClient.invalidateQueries({ queryKey: queryKeys.project.all });
            onGenerated?.(response.imageKeys[0]);
          }

          return {
            text: response.content,
            imageKeys:
              response.imageKeys.length > 0 ? response.imageKeys : undefined,
          };
        },
      );
    },
    [projectId, selectConcept, queryClient, runExchange, onGenerated],
  );

  return {
    messages,
    sendUserMessage,
    sendMarkImages,
    handleConceptSelect,
  };
};
