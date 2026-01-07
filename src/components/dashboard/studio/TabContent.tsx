import BackgroundTab from "./BackgroundTab";
import ChatbotTab from "./ChatbotTab";
import ProductTab from "./ProductTab";

interface TabContentProps {
  activeTab: number;
  setUploadedImage: (file: File | null) => void;
}

const TabContent = ({ activeTab, setUploadedImage }: TabContentProps) => {
  switch (activeTab) {
    case 0:
      return <ProductTab setUploadedImage={setUploadedImage} />;
    case 1:
      return <BackgroundTab />;
    case 2:
      return <ChatbotTab />;
    default:
      return null;
  }
};


export default TabContent;
