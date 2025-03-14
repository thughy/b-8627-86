
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";

interface AgentExpertiseTabProps {
  expertise: Agent['expertise'];
  onExpertiseChange: (field: string, value: string | string[]) => void;
}

const AgentExpertiseTab = ({ expertise, onExpertiseChange }: AgentExpertiseTabProps) => {
  // Handle text area changes
  const handleTextChange = (field: string, value: string) => {
    onExpertiseChange(field, value);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="knowledge">Conhecimentos</Label>
        <Textarea 
          id="knowledge"
          value={expertise?.knowledge || ""}
          onChange={(e) => handleTextChange("knowledge", e.target.value)}
          placeholder="Um conhecimento por linha"
          rows={3}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="skills">Habilidades</Label>
        <Textarea 
          id="skills"
          value={expertise?.skills || ""}
          onChange={(e) => handleTextChange("skills", e.target.value)}
          placeholder="Uma habilidade por linha"
          rows={3}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="examples">Exemplos</Label>
        <Textarea 
          id="examples"
          value={expertise?.examples || ""}
          onChange={(e) => handleTextChange("examples", e.target.value)}
          placeholder="Um exemplo por linha"
          rows={3}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="tasks">Tarefas</Label>
        <Textarea 
          id="tasks"
          value={expertise?.tasks || ""}
          onChange={(e) => handleTextChange("tasks", e.target.value)}
          placeholder="Uma tarefa por linha"
          rows={3}
        />
      </div>
    </div>
  );
};

export default AgentExpertiseTab;
