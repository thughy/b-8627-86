
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AgentProfileTab from "./AgentProfileTab";
import AgentEnvironmentTab from "./AgentEnvironmentTab";
import AgentBusinessRulesTab from "./AgentBusinessRulesTab";
import AgentExpertiseTab from "./AgentExpertiseTab";
import AgentRagTab from "./AgentRagTab";
import AgentToolsTab from "./AgentToolsTab";
import AgentConfigTab from "./AgentConfigTab";
import { Agent, Department, Pipeline, Stage } from "@/pages/Workflows/models/WorkflowModels";

interface AgentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  formData: Partial<Agent>;
  handleProfileChange: (field: string, value: string) => void;
  handleWorkEnvironmentChange: (field: string, value: string) => void;
  handleBusinessRulesChange: (field: string, value: string | string[]) => void;
  handleExpertiseChange: (field: string, value: string | string[]) => void;
  handleRagChange: (documents: string[]) => void;
  handleToolsChange: (tool: string, enabled: boolean) => void;
  handleStatusChange: (status: 'active' | 'paused' | 'blocked') => void;
}

const AgentTabs = ({
  activeTab,
  setActiveTab,
  formData,
  handleProfileChange,
  handleWorkEnvironmentChange,
  handleBusinessRulesChange,
  handleExpertiseChange,
  handleRagChange,
  handleToolsChange,
  handleStatusChange
}: AgentTabsProps) => {
  // Mock data for departments, pipelines, and stages
  const departments: Department[] = [
    { id: "dept1", title: "Comercial", description: "Departamento comercial" },
    { id: "dept2", title: "Suporte", description: "Departamento de suporte" }
  ];
  
  const pipelines: Pipeline[] = [
    { id: "pipe1", departmentId: "dept1", title: "Pipeline de Vendas", description: "Pipeline principal de vendas", stages: [] },
    { id: "pipe2", departmentId: "dept2", title: "Pipeline de Atendimento", description: "Pipeline de atendimento ao cliente", stages: [] }
  ];
  
  const stages: Stage[] = [
    { id: "stage1", pipelineId: "pipe1", title: "Prospecção", order: 1 },
    { id: "stage2", pipelineId: "pipe1", title: "Qualificação", order: 2 },
    { id: "stage3", pipelineId: "pipe2", title: "Triagem", order: 1 },
    { id: "stage4", pipelineId: "pipe2", title: "Resolução", order: 2 }
  ];

  // Ensure default values for nested objects
  const profile = formData.profile || {
    agentName: "",
    agentRole: "",
    agentGoal: ""
  };

  const workEnvironment = formData.workEnvironment || {};

  const businessRules = formData.businessRules || {
    rules: "",
    restrictions: "",
    conversationStyle: "professional" as const
  };

  const expertise = formData.expertise || {
    knowledge: "",
    skills: "",
    examples: "",
    tasks: ""
  };

  const rag = formData.rag || [];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-5">
      <TabsList className="grid w-full grid-cols-7">
        <TabsTrigger value="profile">Perfil</TabsTrigger>
        <TabsTrigger value="environment">Ambiente</TabsTrigger>
        <TabsTrigger value="rules">Regras</TabsTrigger>
        <TabsTrigger value="expertise">Expertise</TabsTrigger>
        <TabsTrigger value="rag">RAG</TabsTrigger>
        <TabsTrigger value="tools">Ferramentas</TabsTrigger>
        <TabsTrigger value="configuration">Config</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4 mt-4">
        <AgentProfileTab 
          profile={profile} 
          onProfileChange={handleProfileChange} 
        />
      </TabsContent>

      <TabsContent value="environment" className="space-y-4 mt-4">
        <AgentEnvironmentTab 
          workEnvironment={workEnvironment} 
          onWorkEnvironmentChange={handleWorkEnvironmentChange}
          departments={departments}
          pipelines={pipelines}
          stages={stages}
        />
      </TabsContent>

      <TabsContent value="rules" className="space-y-4 mt-4">
        <AgentBusinessRulesTab 
          businessRules={businessRules} 
          onBusinessRulesChange={handleBusinessRulesChange} 
        />
      </TabsContent>

      <TabsContent value="expertise" className="space-y-4 mt-4">
        <AgentExpertiseTab 
          expertise={expertise} 
          onExpertiseChange={handleExpertiseChange} 
        />
      </TabsContent>

      <TabsContent value="rag" className="space-y-4 mt-4">
        <AgentRagTab 
          ragDocuments={rag} 
          onRagDocumentsChange={handleRagChange} 
        />
      </TabsContent>

      <TabsContent value="tools" className="space-y-4 mt-4">
        <AgentToolsTab 
          tools={formData.tools || {}} 
          onToolToggle={handleToolsChange} 
        />
      </TabsContent>

      <TabsContent value="configuration" className="space-y-4 mt-4">
        <AgentConfigTab 
          llmModel={formData.llmModel || ""}
          status={formData.status || "active"}
          onLLMModelChange={(value) => handleProfileChange("llmModel", value)}
          onStatusChange={handleStatusChange}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AgentTabs;
