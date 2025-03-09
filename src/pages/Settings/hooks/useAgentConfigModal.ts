
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
  const [formData, setFormData] = useState<Partial<Agent>>(
    agent || {
      profile: {
        agentName: "",
        agentRole: "",
        agentGoal: ""
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
      rag: {
        documents: []
      },
      tools: {
        vision: false,
        voice: false,
        call: false,
        meeting: false,
        calendar: false,
        email: false,
        pdf: false,
        chat: false,
        search: false
      },
      status: "active"
    }
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

  const handleProfileChange = (field: keyof Agent['profile'], value: string) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...(prev.profile || {}),
        [field]: value
      }
    }));
  };

  const handleWorkEnvironmentChange = (field: keyof Agent['workEnvironment'], value: string) => {
    setFormData(prev => ({
      ...prev,
      workEnvironment: {
        ...(prev.workEnvironment || {}),
        [field]: value
      }
    }));
  };

  const handleBusinessRulesChange = (field: keyof Agent['businessRules'], value: any) => {
    setFormData(prev => ({
      ...prev,
      businessRules: {
        ...(prev.businessRules || {}),
        [field]: value
      }
    }));
  };

  const handleExpertiseChange = (field: keyof Agent['expertise'], value: string[]) => {
    setFormData(prev => ({
      ...prev,
      expertise: {
        ...(prev.expertise || {}),
        [field]: value
      }
    }));
  };

  const handleRagChange = (documents: string[]) => {
    setFormData(prev => ({
      ...prev,
      rag: {
        ...(prev.rag || {}),
        documents
      }
    }));
  };

  const handleToolsChange = (tool: keyof Agent['tools'], enabled: boolean) => {
    setFormData(prev => ({
      ...prev,
      tools: {
        ...(prev.tools || {}),
        [tool]: enabled
      }
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
