
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";

interface AgentProfileTabProps {
  profile: Agent['profile'];
  onProfileChange: (field: string, value: string) => void;
}

const AgentProfileTab = ({ profile, onProfileChange }: AgentProfileTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="agentName">Nome do Agente</Label>
        <Input 
          id="agentName"
          value={profile?.agentName || ""}
          onChange={(e) => onProfileChange("agentName", e.target.value)}
          placeholder="Ex: Assistente de Vendas"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="agentRole">Função</Label>
        <Input 
          id="agentRole"
          value={profile?.agentRole || ""}
          onChange={(e) => onProfileChange("agentRole", e.target.value)}
          placeholder="Ex: Vendedor, Atendente, Consultor"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="agentGoal">Objetivo</Label>
        <Textarea 
          id="agentGoal"
          value={profile?.agentGoal || ""}
          onChange={(e) => onProfileChange("agentGoal", e.target.value)}
          placeholder="Descreva o objetivo principal deste agente"
          rows={4}
        />
      </div>
    </div>
  );
};

export default AgentProfileTab;
