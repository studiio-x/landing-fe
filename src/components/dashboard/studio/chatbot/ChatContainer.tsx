"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LogoRed } from "@/assets/icons";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { CHAT_RECOMMENDATIONS } from "@/constants/dashboard/chat-recommendations";
import { ChatItem } from "@/types/chat";

const ChatContainer = () => {
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const timersRef = useRef<number[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const isEmpty = messages.length === 0;

  const sendUserMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userId = crypto.randomUUID();
    const typingId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", text: trimmed, status: "sent" },
      { id: typingId, role: "assistant", text: "", status: "typing" },
    ]);

    // 로딩 상태 확인을 위한 임시 응답, TODO: api 연동
    const t = window.setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId
            ? {
                ...m,
                status: "done",
                text: "알겠어. 전달해준 내용을 기준으로 이어서 진행할게.",
              }
            : m
        )
      );
    }, 1200);

    timersRef.current.push(t);
  }, []);

  const handleClickRecommendation = useCallback(
    (text: string) => sendUserMessage(text),
    [sendUserMessage]
  );

  useEffect(() => {
    const isTyping = messages.some(
      (m) => m.role === "assistant" && m.status === "typing"
    );

    bottomRef.current?.scrollIntoView({
      behavior: isTyping ? "smooth" : "auto",
    });
  }, [messages]);

  return (
    <div className="w-[24.75rem] h-[35.8125rem] rounded-lg border border-Grey-600 bg-Grey-900 p-5 pb-4 flex flex-col">
      <div className="flex gap-1 flex-col pb-2 border-b border-Grey-600 shrink-0">
        <div className="flex gap-3 items-center">
          <div className="rounded-full h-[3.25rem] w-[3.25rem] p-[1px] bg-gradient-to-b from-Grey-400 to-Grey-700">
            <div className="h-full w-full rounded-full bg-Black flex items-center justify-center">
              <LogoRed className="w-[2.0625rem] h-[0.4368rem]" />
            </div>
          </div>
          <span className="Subhead_2_semibold text-Grey-100">StudioX 챗봇</span>
        </div>
        <span className="py-1 px-2 Body_3_medium text-Grey-300">
          원하는 수정 사항을 챗봇에게 요청하세요.
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pt-5 pb-2">
        {isEmpty ? (
          <ChatMessage.Recommendations
            items={CHAT_RECOMMENDATIONS}
            onClickItem={handleClickRecommendation}
          />
        ) : (
          <>
            <ChatMessage.List messages={messages} />
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="flex flex-col gap-[0.65rem] items-center mt-5">
        <ChatInput onSend={sendUserMessage} />
        <span className="Caption_medium text-Grey-500">
          AI가 부정확한 결과를 생성할 수 있어요.
        </span>
      </div>
    </div>
  );
};

export default ChatContainer;
