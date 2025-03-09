
import { useState } from "react";

export type WorkflowTab = "workflow" | "structure" | "versions";

export const useWorkflowTabs = () => {
  const [activeTab, setActiveTab] = useState<WorkflowTab>("workflow");
  
  return {
    activeTab,
    setActiveTab
  };
};
