
import { useState } from "react";

export const useWorkflowTabs = () => {
  const [activeTab, setActiveTab] = useState<"workflow" | "structure" | "versions">("workflow");
  
  return {
    activeTab,
    setActiveTab
  };
};
