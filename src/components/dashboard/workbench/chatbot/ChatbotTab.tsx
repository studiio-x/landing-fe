"use client";

import ChatContainer from "./ChatContainer";

interface ChatbotTabProps {
  projectId: number | null;
}

const ChatbotTab = ({ projectId }: ChatbotTabProps) => {
  return (
    <div className="mt-5">
      <ChatContainer projectId={projectId} />
    </div>
  );
};

export default ChatbotTab;
