import BackgroundTab from "./BackgroundTab";
import ChatbotTab from "./ChatbotTab";
import ProductTab from "./ProductTab";

interface TabContentProps {
  activeTab: number;
}

const TAB_COMPONENTS = [ProductTab, BackgroundTab, ChatbotTab] as const;

const TabContent = ({ activeTab }: TabContentProps) => {
  const ActiveComponent = TAB_COMPONENTS[activeTab];
  return ActiveComponent ? <ActiveComponent /> : null;
};

export default TabContent;
