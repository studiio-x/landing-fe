"use client";

import ChatContainer from "./ChatContainer";
import type { WorkbenchMode } from "@/types/dashboard/mode.type";

interface ChatbotTabProps {
  projectId: number | null;
  onGenerated?: (imageUrl: string) => void;
  mode?: WorkbenchMode;
  videoImageId?: number | null;
}

const ChatbotTab = ({ projectId, onGenerated, mode, videoImageId }: ChatbotTabProps) => {
  return (
    <div className="mt-5">
      <ChatContainer
        projectId={projectId}
        onGenerated={onGenerated}
        mode={mode}
        videoImageId={videoImageId}
      />
    </div>
  );
};

export default ChatbotTab;
