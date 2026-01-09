import BackgroundTab from "./BackgroundTab";
import ChatbotTab from "./ChatbotTab";
import ProductTab from "./ProductTab";

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
