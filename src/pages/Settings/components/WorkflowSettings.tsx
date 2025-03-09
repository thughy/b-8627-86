
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
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { getWorkflows } from "../services/settingsService";
import { Workflow } from "@/pages/Workflows/models/WorkflowModels";
import WorkflowConfigModal from "./modals/WorkflowConfigModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const WorkflowSettings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [workflows, setWorkflows] = useState<Workflow[]>(getWorkflows());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | undefined>(undefined);

  const filteredWorkflows = workflows.filter((workflow) => 
    workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddWorkflow = () => {
    setSelectedWorkflow(undefined);
    setIsModalOpen(true);
  };

  const handleEditWorkflow = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    setIsModalOpen(true);
  };

  const handleDeleteWorkflow = (workflow: Workflow) => {
    toast({
      title: "Remover Workflow",
      description: `Tem certeza que deseja remover o workflow: ${workflow.title}?`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            setWorkflows(prev => prev.filter(w => w.id !== workflow.id));
            toast({
              title: "Workflow removido",
              description: `O workflow ${workflow.title} foi removido com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

  const handleSaveWorkflow = (workflowData: Partial<Workflow>) => {
    if (selectedWorkflow) {
      setWorkflows(prev => 
        prev.map(w => 
          w.id === selectedWorkflow.id 
            ? { ...w, ...workflowData, updatedAt: new Date() } 
            : w
        )
      );
    } else {
      const newWorkflow: Workflow = {
        id: `workflow-${Date.now()}`,
        title: workflowData.title || "Novo Workflow",
        description: workflowData.description || "",
        status: workflowData.status || "draft",
        departmentId: `dept-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setWorkflows(prev => [...prev, newWorkflow]);
    }
  };

  const getStatusBadge = (status: Workflow['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Ativo</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500 hover:bg-gray-600">Inativo</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Rascunho</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Gerenciamento de Workflows</CardTitle>
            <CardDescription>
              Configure e gerencie todos os seus workflows
            </CardDescription>
          </div>
          <Button onClick={handleAddWorkflow} className="flex-shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Workflow
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar workflows..."
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
          <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
            <div className="col-span-2">Nome</div>
            <div className="col-span-2 hidden md:block">Descrição</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-right">Ações</div>
          </div>

          <div className="divide-y">
            {filteredWorkflows.length > 0 ? (
              filteredWorkflows.map((workflow) => (
                <div key={workflow.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                  <div className="col-span-2">
                    <div className="font-medium">{workflow.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Atualizado em {formatDate(workflow.updatedAt)}
                    </div>
                  </div>
                  <div className="col-span-2 hidden md:block truncate text-muted-foreground">
                    {workflow.description}
                  </div>
                  <div className="col-span-1">
                    {getStatusBadge(workflow.status)}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditWorkflow(workflow)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteWorkflow(workflow)}
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
                Nenhum workflow encontrado
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <WorkflowConfigModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workflow={selectedWorkflow}
        onSave={handleSaveWorkflow}
      />
    </Card>
  );
};

export default WorkflowSettings;
