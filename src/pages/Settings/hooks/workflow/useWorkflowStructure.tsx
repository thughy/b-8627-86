
import { useState } from "react";

export const useWorkflowStructure = () => {
  const [expandedDepartments, setExpandedDepartments] = useState<Record<string, boolean>>({});
  const [expandedPipelines, setExpandedPipelines] = useState<Record<string, boolean>>({});
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({});

  return {
    expandedDepartments,
    setExpandedDepartments,
    expandedPipelines,
    setExpandedPipelines,
    expandedStages,
    setExpandedStages
  };
};
