
import { useState, useEffect } from "react";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";

interface UseAgentConfigModalProps {
  agent: Agent | null;
  onSave: (agent: Agent) => void;
  onClose: () => void;
}

export const useAgentConfigModal = ({ 
  agent, 
  onSave, 
  onClose 
}: UseAgentConfigModalProps) => {
  const defaultAgent: Partial<Agent> = {
    profile: {
      name: "",
      role: "",
      goal: ""
    },
    workEnvironment: {
      workflowTitle: "",
      workflowDescription: "",
      departmentTitle: "",
      departmentDescription: "",
      stageTitle: "",
      stageDescription: ""
    },
    businessRules: {
      rules: [],
      restrictions: [],
      conversationStyle: "professional"
    },
    expertise: {
      knowledge: [],
      skills: [],
      examples: [],
      tasks: []
    },
    ragDocuments: [],
    tools: [],
    llmModel: "GPT-4",
    status: "active"
  };

  const [formData, setFormData] = useState<Partial<Agent>>(
    agent || defaultAgent
  );

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (agent) {
      setFormData(agent);
    }
  }, [agent]);

  const handleSubmit = () => {
    onSave(formData as Agent);
    onClose();
  };

  const handleChange = <K extends keyof Agent>(section: K, value: Agent[K]) => {
    setFormData(prev => ({ ...prev, [section]: value }));
  };

  const handleProfileChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...((prev?.profile as any) || {}),
        [field]: value
      } as Agent['profile']
    }));
  };

  const handleWorkEnvironmentChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      workEnvironment: {
        ...((prev?.workEnvironment as any) || {}),
        [field]: value
      } as Agent['workEnvironment']
    }));
  };

  const handleBusinessRulesChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      businessRules: {
        ...((prev?.businessRules as any) || {}),
        [field]: value
      } as Agent['businessRules']
    }));
  };

  const handleExpertiseChange = (field: string, value: string[]) => {
    setFormData(prev => ({
      ...prev,
      expertise: {
        ...((prev?.expertise as any) || {}),
        [field]: value
      } as Agent['expertise']
    }));
  };

  const handleRagChange = (documents: string[]) => {
    setFormData(prev => ({
      ...prev,
      ragDocuments: documents
    }));
  };

  const handleToolsChange = (tool: string, enabled: boolean) => {
    const updatedTools = [...(formData.tools || [])];
    
    if (enabled && !updatedTools.includes(tool)) {
      updatedTools.push(tool);
    } else if (!enabled) {
      const index = updatedTools.indexOf(tool);
      if (index !== -1) {
        updatedTools.splice(index, 1);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      tools: updatedTools
    }));
  };

  const handleStatusChange = (status: Agent['status']) => {
    setFormData(prev => ({ ...prev, status }));
  };

  return {
    formData,
    activeTab,
    setActiveTab,
    handleChange,
    handleProfileChange,
    handleWorkEnvironmentChange,
    handleBusinessRulesChange,
    handleExpertiseChange,
    handleRagChange,
    handleToolsChange,
    handleStatusChange,
    handleSubmit,
    isEditMode: !!agent
  };
};
