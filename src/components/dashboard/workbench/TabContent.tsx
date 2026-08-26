import type { WorkbenchMode } from "@/types/dashboard/mode.type";
import BackgroundTab from "@/components/dashboard/workbench/background/BackgroundTab";
import OptionsTab from "@/components/dashboard/workbench/video/OptionsTab";
import ChatbotTab from "@/components/dashboard/workbench/chatbot/ChatbotTab";
import ProductTab from "@/components/dashboard/workbench/product/ProductTab";
import type { VideoGeneratedResult } from "@/hooks/useVideoGeneration";
import type { ActionKey } from "@/types/dashboard/video-option.type";
import type { ProcessingStage } from "@/types/dashboard/processing-stage.type";

interface TabContentProps {
  activeTab: number;
  uploadedImage: File | null;
  setUploadedImage: (file: File | null) => void;
  mode: WorkbenchMode;
  folderId: number;
  cutoutImageObjectKey: string | null;
  projectId: number | null;
  onGenerated: (imageUrl: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onStageChange: (stage: ProcessingStage) => void;
  onVideoGenerated: (result: VideoGeneratedResult) => void;
  videoImageId: number | null;
  // 비디오 모드는 생성마다 새 프로젝트가 만들어지므로 채팅에 이 projectId를 써야 한다.
  videoProjectId: number | null;
  initialTemplateId?: number | null;
  // 대시보드에서 비디오 템플릿을 골라 들어온 경우의 초기 모션
  initialMotionType?: ActionKey | null;
  onGenerateComplete?: () => void;
  generatedImageUrl?: string | null;
}

const TabContent = ({
  activeTab,
  uploadedImage,
  setUploadedImage,
  mode,
  folderId,
  cutoutImageObjectKey,
  projectId,
  onGenerated,
  onGeneratingChange,
  onStageChange,
  onVideoGenerated,
  videoImageId,
  videoProjectId,
  initialTemplateId,
  initialMotionType,
  onGenerateComplete,
  generatedImageUrl,
}: TabContentProps) => {
  const chatProjectId = mode === "video" ? videoProjectId : projectId;

  switch (activeTab) {
    case 0:
      return <ProductTab setUploadedImage={setUploadedImage} />;
    case 1:
      return mode === "video" ? (
        <OptionsTab
          uploadedImage={uploadedImage}
          folderId={folderId}
          onGenerated={onVideoGenerated}
          onGeneratingChange={onGeneratingChange}
          onStageChange={onStageChange}
          initialMotionType={initialMotionType}
        />
      ) : (
        <BackgroundTab
          uploadedImage={uploadedImage}
          cutoutImageObjectKey={cutoutImageObjectKey}
          projectId={projectId}
          mode={mode}
          onGenerated={onGenerated}
          onGeneratingChange={onGeneratingChange}
          onStageChange={onStageChange}
          onGenerateComplete={onGenerateComplete}
          initialTemplateId={initialTemplateId}
        />
      );
    case 2:
      return (
        <ChatbotTab
          projectId={chatProjectId}
          onGenerated={onGenerated}
          mode={mode}
          videoImageId={videoImageId}
          generatedImageUrl={generatedImageUrl}
        />
      );
    default:
      return null;
  }
};

export default TabContent;
