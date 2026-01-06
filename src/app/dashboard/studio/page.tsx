"use client";

import { useState } from "react";

import TabContent from "@/components/dashboard/studio/TabContent";
import TabPanel from "@/components/dashboard/studio/TabPanel";

const StudioPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex justify-center">
      <main>
        <TabPanel activeTab={activeTab} onChange={setActiveTab} />
        <TabContent activeTab={activeTab} />
      </main>
    </div>
  );
};

export default StudioPage;
