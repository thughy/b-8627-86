
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Agent, Stage } from "@/pages/Workflows/models/WorkflowModels";

export const useAgentLogic = (
  agents: Agent[],
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>,
  stages: Stage[],
  selectedAgent: Agent | null,
  setSelectedAgent: React.Dispatch<React.SetStateAction<Agent | null>>
) => {
  const { toast } = useToast();
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({ 
    profile: { agentName: "", agentRole: "", agentGoal: "" },
    workEnvironment: {},
    businessRules: {
      rules: "",
      restrictions: "",
      conversationStyle: "professional"
    },
    expertise: {
      knowledge: "",
      skills: "",
      examples: "",
      tasks: ""
    },
    rag: [],
    tools: {
      vision: false,
      audio: false,
      speech: false,
      telephony: false,
      meeting: false,
      calendar: false,
      email: false,
      pdf: false,
      chat: false,
      webSearch: false
    },
    llmModel: "GPT-4",
    status: "active"
  });

  const handleAddAgent = (stageId: string) => {
    if (!newAgent.profile?.agentName) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe um nome para o agente.",
        variant: "destructive",
      });
      return;
    }

    // Ensure we're not overwriting important fields
    const agent: Agent = {
      id: `agent-${Date.now()}`,
      stageId: stageId,
      profile: {
        agentName: newAgent.profile.agentName,
        agentRole: newAgent.profile.agentRole || "Assistente",
        agentGoal: newAgent.profile.agentGoal || ""
      },
      workEnvironment: {
        stageTitle: stages.find(s => s.id === stageId)?.title || "",
        ...newAgent.workEnvironment
      },
      businessRules: newAgent.businessRules || {
        rules: "",
        restrictions: "",
        conversationStyle: "professional"
      },
      expertise: newAgent.expertise || {
        knowledge: "",
        skills: "",
        examples: "",
        tasks: ""
      },
      rag: newAgent.rag || [],
      tools: newAgent.tools || {
        vision: false,
        audio: false,
        speech: false,
        telephony: false,
        meeting: false,
        calendar: false,
        email: false,
        pdf: false,
        chat: false,
        webSearch: false
      },
      llmModel: newAgent.llmModel || "GPT-4",
      status: newAgent.status || "active",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setAgents(prev => [...prev, agent]);
    setSelectedAgent(agent);
    
    // Reset the new agent form with default values
    setNewAgent({ 
      profile: { agentName: "", agentRole: "", agentGoal: "" },
      workEnvironment: {},
      businessRules: {
        rules: "",
        restrictions: "",
        conversationStyle: "professional"
      },
      expertise: {
        knowledge: "",
        skills: "",
        examples: "",
        tasks: ""
      },
      rag: [],
      tools: {
        vision: false,
        audio: false,
        speech: false,
        telephony: false,
        meeting: false,
        calendar: false,
        email: false,
        pdf: false,
        chat: false,
        webSearch: false
      },
      llmModel: "GPT-4",
      status: "active"
    });
    
    toast({
      title: "Agente adicionado",
      description: `O agente "${agent.profile.agentName}" foi adicionado com sucesso.`,
    });
  };

  const handleDeleteAgent = (agentId: string) => {
    toast({
      title: "Remover Agente",
      description: `Tem certeza que deseja remover este agente?`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            setAgents(prev => prev.filter(a => a.id !== agentId));
            
            if (selectedAgent?.id === agentId) {
              setSelectedAgent(null);
            }
            
            toast({
              title: "Agente removido",
              description: `O agente foi removido com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

  return {
    newAgent,
    setNewAgent,
    handleAddAgent,
    handleDeleteAgent
  };
};
