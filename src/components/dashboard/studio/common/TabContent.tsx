import BackgroundTab from "../background/BackgroundTab";
import ChatbotTab from "../chatbot/ChatbotTab";
import ProductTab from "../product/ProductTab";

interface TabContentProps {
  activeTab: number;
  uploadedImage: File | null;          
  setUploadedImage: (file: File | null) => void;
}

const TabContent = ({ activeTab, uploadedImage,setUploadedImage }: TabContentProps) => {
  switch (activeTab) {
    case 0:
      return <ProductTab setUploadedImage={setUploadedImage} />;
    case 1:
      return <BackgroundTab uploadedImage={uploadedImage} />; 
    case 2:
      return <ChatbotTab />;
    default:
      return null;
  }
};


export default TabContent;
