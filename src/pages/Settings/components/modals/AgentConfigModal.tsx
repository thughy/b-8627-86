
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import { getDepartments, getPipelines, getStages } from "@/pages/Settings/services/workflowDataService";
import AgentTabs from "./agent/AgentTabs";

interface AgentConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent?: Agent;
  onSave: (agent: Partial<Agent>) => void;
}

const AgentConfigModal = ({ 
  isOpen, 
  onClose, 
  agent, 
  onSave 
}: AgentConfigModalProps) => {
  const { toast } = useToast();
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
    setDepartments(getDepartments());
    setPipelines(getPipelines());
    setStages(getStages());
  }, []);
  
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

  const handleSubmit = () => {
    if (!formData.profile?.name) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe um nome para o agente.",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
    toast({
      title: agent ? "Agente atualizado" : "Agente criado",
      description: `O agente "${formData.profile?.name}" foi ${agent ? "atualizado" : "criado"} com sucesso.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{agent ? "Editar Agente" : "Novo Agente"}</DialogTitle>
          <DialogDescription>
            {agent 
              ? "Edite as informações do agente existente." 
              : "Configure um novo agente de IA para seu workflow."}
          </DialogDescription>
        </DialogHeader>

        <AgentTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          formData={formData}
          departments={departments}
          pipelines={pipelines}
          stages={stages}
          handleProfileChange={handleProfileChange}
          handleWorkEnvironmentChange={handleWorkEnvironmentChange}
          handleBusinessRulesChange={handleBusinessRulesChange}
          handleExpertiseChange={handleExpertiseChange}
          handleRagDocumentsChange={handleRagDocumentsChange}
          handleToolToggle={handleToolToggle}
          handleLLMModelChange={handleLLMModelChange}
          handleStatusChange={handleStatusChange}
        />

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgentConfigModal;
