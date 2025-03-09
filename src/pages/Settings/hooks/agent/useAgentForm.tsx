
import { useState, useEffect } from "react";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";

export const useAgentForm = (agent?: Agent) => {
  const [formData, setFormData] = useState<Partial<Agent>>(
    agent || {
      profile: {
        name: "",
        role: "",
        goal: ""
      },
      workEnvironment: {},
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
    }
  );

  useEffect(() => {
    if (agent) {
      setFormData(agent);
    }
  }, [agent]);

  const handleProfileChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile!,
        [field]: value
      }
    }));
  };

  const handleWorkEnvironmentChange = (field: string, value: string) => {
    let newWorkEnvironment = {
      ...formData.workEnvironment!,
      [field]: value
    };

    if (field === "workflowTitle") {
      newWorkEnvironment.departmentTitle = "";
      newWorkEnvironment.stageTitle = "";
    } else if (field === "departmentTitle") {
      newWorkEnvironment.stageTitle = "";
    }

    setFormData(prev => ({
      ...prev,
      workEnvironment: newWorkEnvironment
    }));
  };

  const handleBusinessRulesChange = (field: string, value: string | string[]) => {
    if (field === "rules" || field === "restrictions") {
      const itemsArray = typeof value === 'string' 
        ? value.split('\n').filter(r => r.trim()) 
        : value;
      
      setFormData(prev => ({
        ...prev,
        businessRules: {
          ...prev.businessRules!,
          [field]: itemsArray
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        businessRules: {
          ...prev.businessRules!,
          [field]: value
        }
      }));
    }
  };

  const handleExpertiseChange = (field: string, value: string | string[]) => {
    if (field === "knowledge" || field === "skills" || field === "examples" || field === "tasks") {
      const itemsArray = typeof value === 'string' 
        ? value.split('\n').filter(item => item.trim()) 
        : value;
      
      setFormData(prev => ({
        ...prev,
        expertise: {
          ...prev.expertise!,
          [field]: itemsArray
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        expertise: {
          ...prev.expertise!,
          [field]: value
        }
      }));
    }
  };

  const handleRagDocumentsChange = (value: string) => {
    const documents = value.split('\n').map(d => d.trim()).filter(d => d);
    setFormData(prev => ({
      ...prev,
      ragDocuments: documents
    }));
  };

  const handleToolToggle = (toolId: string) => {
    const currentTools = formData.tools || [];
    
    if (currentTools.includes(toolId)) {
      setFormData(prev => ({
        ...prev,
        tools: currentTools.filter(t => t !== toolId)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        tools: [...currentTools, toolId]
      }));
    }
  };

  const handleLLMModelChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      llmModel: value
    }));
  };

  const handleStatusChange = (status: 'active' | 'paused' | 'blocked') => {
    setFormData(prev => ({
      ...prev,
      status
    }));
  };

  return {
    formData,
    setFormData,
    handleProfileChange,
    handleWorkEnvironmentChange,
    handleBusinessRulesChange,
    handleExpertiseChange,
    handleRagDocumentsChange,
    handleToolToggle,
    handleLLMModelChange,
    handleStatusChange
  };
};
