
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
        <Label htmlFor="name">Nome do Agente</Label>
        <Input 
          id="name"
          value={profile?.name || ""}
          onChange={(e) => onProfileChange("name", e.target.value)}
          placeholder="Ex: Assistente de Vendas"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="role">Função</Label>
        <Input 
          id="role"
          value={profile?.role || ""}
          onChange={(e) => onProfileChange("role", e.target.value)}
          placeholder="Ex: Vendedor, Atendente, Consultor"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="goal">Objetivo</Label>
        <Textarea 
          id="goal"
          value={profile?.goal || ""}
          onChange={(e) => onProfileChange("goal", e.target.value)}
          placeholder="Descreva o objetivo principal deste agente"
          rows={4}
        />
      </div>
    </div>
  );
};

export default AgentProfileTab;
