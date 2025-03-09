
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AgentConfigTabProps {
  llmModel?: string;
  status?: 'active' | 'paused' | 'blocked';
  onLLMModelChange: (value: string) => void;
  onStatusChange: (status: 'active' | 'paused' | 'blocked') => void;
}

const AgentConfigTab = ({ 
  llmModel = "GPT-4", 
  status = "active",
  onLLMModelChange,
  onStatusChange
}: AgentConfigTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="llmModel">Modelo LLM</Label>
        <Select 
          value={llmModel} 
          onValueChange={onLLMModelChange}
        >
          <SelectTrigger id="llmModel">
            <SelectValue placeholder="Selecione o modelo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GPT-4">GPT-4</SelectItem>
            <SelectItem value="GPT-3.5">GPT-3.5</SelectItem>
            <SelectItem value="Claude">Claude</SelectItem>
            <SelectItem value="Claude-2">Claude-2</SelectItem>
            <SelectItem value="Llama-3">Llama-3</SelectItem>
            <SelectItem value="Gemini">Gemini</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Status</Label>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="font-medium">Ativo</span>
            </div>
            <Switch 
              checked={status === 'active'}
              onCheckedChange={() => onStatusChange('active')}
            />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <span className="font-medium">Pausado</span>
            </div>
            <Switch 
              checked={status === 'paused'}
              onCheckedChange={() => onStatusChange('paused')}
            />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <span className="font-medium">Bloqueado</span>
            </div>
            <Switch 
              checked={status === 'blocked'}
              onCheckedChange={() => onStatusChange('blocked')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentConfigTab;
