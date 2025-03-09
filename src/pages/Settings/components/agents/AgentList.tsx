
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface AgentListProps {
  agents: Agent[];
  onEditAgent?: (agent: Agent) => void;
  onDeleteAgent?: (agent: Agent) => void;
  onEdit?: (agent: Agent) => void;
  onDelete?: (agentId: string) => void;
}

const AgentList = ({ agents, onEditAgent, onDeleteAgent, onEdit, onDelete }: AgentListProps) => {
  const getStatusBadge = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Ativo</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pausado</Badge>;
      case 'blocked':
        return <Badge className="bg-red-500 hover:bg-red-600">Bloqueado</Badge>;
      default:
        return null;
    }
  };

  const handleEdit = (agent: Agent) => {
    if (onEditAgent) {
      onEditAgent(agent);
    } else if (onEdit) {
      onEdit(agent);
    }
  };

  const handleDelete = (agent: Agent) => {
    if (onDeleteAgent) {
      onDeleteAgent(agent);
    } else if (onDelete) {
      onDelete(agent.id);
    }
  };

  return (
    <div className="border rounded-md">
      <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
        <div className="col-span-2">Nome / Função</div>
        <div className="col-span-2 hidden md:block">Ambiente</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-1 text-right">Ações</div>
      </div>

      <div className="divide-y">
        {agents.length > 0 ? (
          agents.map((agent) => (
            <div key={agent.id} className="grid grid-cols-6 gap-4 p-4 items-center">
              <div className="col-span-2">
                <div className="font-medium">{agent.profile.name}</div>
                <div className="text-sm text-muted-foreground">{agent.profile.role}</div>
              </div>
              <div className="col-span-2 hidden md:block">
                <div className="text-sm">
                  <span className="font-medium">Workflow:</span> {agent.workEnvironment.workflowTitle || "N/A"}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Departamento:</span> {agent.workEnvironment.departmentTitle || "N/A"}
                  {agent.workEnvironment.stageTitle && (
                    <span> / <span className="font-medium">Estágio:</span> {agent.workEnvironment.stageTitle}</span>
                  )}
                </div>
              </div>
              <div className="col-span-1">
                {getStatusBadge(agent.status)}
              </div>
              <div className="col-span-1 flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(agent)}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(agent)}
                      className="text-red-500 focus:text-red-500"
                    >
                      Remover
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            Nenhum agente encontrado
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentList;
