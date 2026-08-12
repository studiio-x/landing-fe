"use client";

import ChatContainer from "./ChatContainer";
import type { WorkbenchMode } from "@/types/dashboard/mode.type";

interface ChatbotTabProps {
  projectId: number | null;
  onGenerated?: (imageUrl: string) => void;
  mode?: WorkbenchMode;
}

const ChatbotTab = ({ projectId, onGenerated, mode }: ChatbotTabProps) => {
  return (
    <div className="mt-5">
      <ChatContainer projectId={projectId} onGenerated={onGenerated} mode={mode} />
    </div>
  );
};

export default ChatbotTab;
