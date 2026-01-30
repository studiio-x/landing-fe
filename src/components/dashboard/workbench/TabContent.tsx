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
}

const TabContent = ({ activeTab, uploadedImage, setUploadedImage, mode }: TabContentProps) => {
  switch (activeTab) {
    case 0:
      return <ProductTab setUploadedImage={setUploadedImage} />;
    case 1:
      return mode === "video"
        ? <OptionsTab uploadedImage={uploadedImage} />
        : <BackgroundTab uploadedImage={uploadedImage} />;
    case 2:
      return <ChatbotTab />;
    default:
      return null;
  }
};


export default TabContent;
