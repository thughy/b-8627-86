
import { useState, useEffect } from "react";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import { getStages, getPipelines, getDepartments } from "@/pages/Settings/services/workflowDataService";

export const useAgentConfigModal = (
  onSave: (agent: Partial<Agent>) => void,
  agent?: Agent
) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [departments, setDepartments] = useState([]);
  const [pipelines, setPipelines] = useState([]);
  const [stages, setStages] = useState([]);
  const [formData, setFormData] = useState<Partial<Agent>>(
    agent || {
      profile: {
        name: "",
        role: "",
        goal: ""
      },
      workEnvironment: {},
      businessRules: {},
      expertise: {},
      ragDocuments: [],
      tools: [],
      llmModel: "gpt-4o",
      status: "active"
    }
  );

  useEffect(() => {
    setDepartments(getDepartments());
    setPipelines(getPipelines());
    setStages(getStages());
  }, []);

  const handleProfileChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value
      }
    }));
  };

  const handleWorkEnvironmentChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      workEnvironment: {
        ...prev.workEnvironment,
        [key]: value
      }
    }));
  };

  const handleBusinessRulesChange = (key: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      businessRules: {
        ...prev.businessRules,
        [key]: value
      }
    }));
  };

  const handleExpertiseChange = (key: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      expertise: {
        ...prev.expertise,
        [key]: value
      }
    }));
  };

  const handleRagDocumentsChange = (documents: string[]) => {
    setFormData((prev) => ({
      ...prev,
      ragDocuments: documents
    }));
  };

  const handleToolToggle = (tool: string, enabled: boolean) => {
    setFormData((prev) => {
      const currentTools = prev.tools || [];
      if (enabled && !currentTools.includes(tool)) {
        return { ...prev, tools: [...currentTools, tool] };
      } else if (!enabled && currentTools.includes(tool)) {
        return { ...prev, tools: currentTools.filter((t) => t !== tool) };
      }
      return prev;
    });
  };

  const handleLLMModelChange = (model: string) => {
    setFormData((prev) => ({
      ...prev,
      llmModel: model
    }));
  };

  const handleStatusChange = (status: "active" | "paused" | "blocked") => {
    setFormData((prev) => ({
      ...prev,
      status
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return {
    activeTab,
    setActiveTab,
    departments,
    pipelines,
    stages,
    formData,
    handleProfileChange,
    handleWorkEnvironmentChange,
    handleBusinessRulesChange,
    handleExpertiseChange,
    handleRagDocumentsChange,
    handleToolToggle,
    handleLLMModelChange,
    handleStatusChange,
    handleSubmit
  };
};
