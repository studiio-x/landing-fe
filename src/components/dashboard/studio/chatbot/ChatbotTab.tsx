"use client";

import ChatContainer from "./ChatContainer";
import { useStudioMarkStore } from "@/stores/useStudioMarkStore";

const ChatbotTab = () => {
  const { rects, setMarkMode } = useStudioMarkStore();

  const onOpenContentInput = () => {
    if (rects.length === 0) return;
    // TODO: 모달/드로어 열기
    setMarkMode(false);
    console.log("open content input");
  };

  return (
    <div className="mt-5">
      <ChatContainer onOpenContentInput={onOpenContentInput} />
    </div>
  );
};

export default ChatbotTab;
