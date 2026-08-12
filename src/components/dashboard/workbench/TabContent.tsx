import type { WorkbenchMode } from "@/types/dashboard/mode.type";
import BackgroundTab from "@/components/dashboard/workbench/background/BackgroundTab";
import OptionsTab from "@/components/dashboard/workbench/video/OptionsTab";
import ChatbotTab from "@/components/dashboard/workbench/chatbot/ChatbotTab";
import ProductTab from "@/components/dashboard/workbench/product/ProductTab";

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
  onVideoGenerated: (videoUrl: string, imageId: number) => void;
  videoImageId: number | null;
  initialTemplateId?: number | null;
}

const TabContent = ({ activeTab, uploadedImage, setUploadedImage, mode, folderId, cutoutImageObjectKey, projectId, onGenerated, onGeneratingChange, onVideoGenerated, videoImageId, initialTemplateId }: TabContentProps) => {
  switch (activeTab) {
    case 0:
      return <ProductTab setUploadedImage={setUploadedImage} />;
    case 1:
      return mode === "video"
        ? <OptionsTab uploadedImage={uploadedImage} folderId={folderId} onGenerated={onVideoGenerated} onGeneratingChange={onGeneratingChange} />
        : <BackgroundTab uploadedImage={uploadedImage} cutoutImageObjectKey={cutoutImageObjectKey} projectId={projectId} mode={mode} onGenerated={onGenerated} onGeneratingChange={onGeneratingChange} initialTemplateId={initialTemplateId} />;
    case 2:
      return <ChatbotTab projectId={projectId} onGenerated={onGenerated} mode={mode} videoImageId={videoImageId} />;
    default:
      return null;
  }
};


export default TabContent;
