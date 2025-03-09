
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";

interface ConversationStyle {
  id: string;
  name: string;
}

interface AgentBusinessRulesTabProps {
  businessRules: Agent['businessRules'];
  onBusinessRulesChange: (field: string, value: string | string[]) => void;
}

const CONVERSATION_STYLES: ConversationStyle[] = [
  { id: "formal", name: "Formal" },
  { id: "informal", name: "Informal" },
  { id: "funny", name: "Engraçado" },
  { id: "friendly", name: "Amigável" },
  { id: "technical", name: "Técnico" },
  { id: "professional", name: "Profissional" }
];

const AgentBusinessRulesTab = ({ businessRules, onBusinessRulesChange }: AgentBusinessRulesTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="rules">Regras de Negócio</Label>
        <Textarea 
          id="rules"
          value={businessRules?.rules || ""}
          onChange={(e) => onBusinessRulesChange("rules", e.target.value)}
          placeholder="Uma regra por linha"
          rows={3}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="restrictions">Restrições</Label>
        <Textarea 
          id="restrictions"
          value={businessRules?.restrictions || ""}
          onChange={(e) => onBusinessRulesChange("restrictions", e.target.value)}
          placeholder="Uma restrição por linha"
          rows={3}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="conversationStyle">Estilo de Conversação</Label>
        <Select 
          value={businessRules?.conversationStyle || "professional"} 
          onValueChange={(value) => onBusinessRulesChange("conversationStyle", value)}
        >
          <SelectTrigger id="conversationStyle">
            <SelectValue placeholder="Selecione o estilo" />
          </SelectTrigger>
          <SelectContent>
            {CONVERSATION_STYLES.map(style => (
              <SelectItem key={style.id} value={style.id}>
                {style.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AgentBusinessRulesTab;
