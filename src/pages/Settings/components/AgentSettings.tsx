
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Filter, Edit, Trash, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { getAgents } from "../services/settingsService";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";

const AgentSettings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [agents, setAgents] = useState<Agent[]>(getAgents());

  const filteredAgents = agents.filter((agent) => 
    agent.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.profile.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAgent = () => {
    toast({
      title: "Adicionar Agente",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handleEditAgent = (agent: Agent) => {
    toast({
      title: "Editar Agente",
      description: `Editar agente: ${agent.profile.name}`,
    });
  };

  const handleDeleteAgent = (agent: Agent) => {
    toast({
      title: "Remover Agente",
      description: `Remover agente: ${agent.profile.name}`,
      variant: "destructive",
    });
  };

  const handleChangeStatus = (agent: Agent, status: Agent['status']) => {
    toast({
      title: "Alterar Status",
      description: `Alterar status do agente ${agent.profile.name} para ${status}`,
    });
  };

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

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Gerenciamento de Agentes</CardTitle>
            <CardDescription>
              Configure e gerencie seus agentes de IA
            </CardDescription>
          </div>
          <Button onClick={handleAddAgent} className="flex-shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Agente
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar agentes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="border rounded-md">
          <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
            <div className="col-span-2">Nome</div>
            <div className="col-span-1">Função</div>
            <div className="col-span-2 hidden md:block">Alocado em</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-right">Ações</div>
          </div>

          <div className="divide-y">
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <div key={agent.id} className="grid grid-cols-7 gap-4 p-4 items-center">
                  <div className="col-span-2">
                    <div className="font-medium">{agent.profile.name}</div>
                    <div className="text-sm text-muted-foreground">
                      LLM: {agent.llmModel || "Não definido"}
                    </div>
                  </div>
                  <div className="col-span-1 text-muted-foreground">
                    {agent.profile.role}
                  </div>
                  <div className="col-span-2 hidden md:block text-muted-foreground">
                    {agent.workEnvironment.workflowTitle || "Não alocado"} 
                    {agent.workEnvironment.stageTitle && ` > ${agent.workEnvironment.stageTitle}`}
                  </div>
                  <div className="col-span-1">
                    {getStatusBadge(agent.status)}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditAgent(agent)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(agent, 'active')}>
                          Ativar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(agent, 'paused')}>
                          Pausar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(agent, 'blocked')}>
                          Bloquear
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteAgent(agent)}
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Excluir
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
      </CardContent>
    </Card>
  );
};

export default AgentSettings;
