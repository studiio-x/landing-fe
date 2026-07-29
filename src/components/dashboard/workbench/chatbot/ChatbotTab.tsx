"use client";

import ChatContainer from "./ChatContainer";

interface ChatbotTabProps {
  projectId: number | null;
  onGenerated?: (imageUrl: string) => void;
}

const ChatbotTab = ({ projectId, onGenerated }: ChatbotTabProps) => {
  return (
    <div className="mt-5">
      <ChatContainer projectId={projectId} onGenerated={onGenerated} />
    </div>
  );
};

export default ChatbotTab;
