"use client";

import ChatContainer from "./ChatContainer";
import type { WorkbenchMode } from "@/types/dashboard/mode.type";
import { Download } from "@/assets/icons";

interface ChatbotTabProps {
  projectId: number | null;
  onGenerated?: (imageUrl: string) => void;
  mode?: WorkbenchMode;
  videoImageId?: number | null;
  generatedImageUrl?: string | null;
}

const ChatbotTab = ({
  projectId,
  onGenerated,
  mode,
  videoImageId,
  generatedImageUrl,
}: ChatbotTabProps) => {
  const handleDownload = async () => {
    if (!generatedImageUrl) return;
    try {
      const response = await fetch(generatedImageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `studiox_${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(generatedImageUrl, "_blank");
    }
  };

  return (
    <div className="mt-5 flex flex-col gap-3">
      {generatedImageUrl && (
        <div className="flex justify-end">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-lg bg-Grey-700 px-4 py-2 Body_3_medium text-Grey-200 hover:bg-Grey-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            다운로드
          </button>
        </div>
      )}
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
