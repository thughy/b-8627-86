
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, Ear, Mic, Phone, Video, Calendar, Mail, FileText, Database, MessageSquare, Search } from "lucide-react";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";

interface Tool {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AgentToolsTabProps {
  tools: Agent['tools'];
  onToolToggle: (toolId: string, enabled: boolean) => void;
}

const AVAILABLE_TOOLS: Tool[] = [
  { id: "vision", name: "Visão", icon: Eye },
  { id: "audio", name: "Audição", icon: Ear },
  { id: "speech", name: "Fala", icon: Mic },
  { id: "telephony", name: "Telefonia", icon: Phone },
  { id: "meeting", name: "Meeting", icon: Video },
  { id: "calendar", name: "Agenda", icon: Calendar },
  { id: "email", name: "Email", icon: Mail },
  { id: "pdf", name: "PDF", icon: FileText },
  { id: "chat", name: "Chat", icon: MessageSquare },
  { id: "webSearch", name: "Pesquisa Web", icon: Search }
];

const AgentToolsTab = ({ tools, onToolToggle }: AgentToolsTabProps) => {
  return (
    <div className="space-y-2">
      <Label>Ferramentas disponíveis</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        {AVAILABLE_TOOLS.map(tool => {
          const isActive = tools && tools[tool.id as keyof typeof tools];
          return (
            <div key={tool.id} className={`p-3 rounded-md border ${isActive ? 'border-primary bg-primary/5' : 'border-input'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <tool.icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`font-medium ${isActive ? 'text-primary' : ''}`}>{tool.name}</span>
                </div>
                <Switch 
                  checked={!!isActive}
                  onCheckedChange={(checked) => onToolToggle(tool.id, checked)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentToolsTab;
