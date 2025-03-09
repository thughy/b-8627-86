
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, List, Columns, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { Workflow } from "@/pages/Workflows/models/WorkflowModels";
import { getWorkflows } from "../services/settingsService";
import WorkflowConfigModal from "./modals/WorkflowConfigModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const WorkflowSettings = () => {
  const { toast } = useToast();
  const [workflows, setWorkflows] = React.useState<Workflow[]>([]);
  const [filteredWorkflows, setFilteredWorkflows] = React.useState<Workflow[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [viewMode, setViewMode] = React.useState("grid");
  const [selectedWorkflow, setSelectedWorkflow] = React.useState<Workflow | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    const loadWorkflows = () => {
      const workflowData = getWorkflows();
      setWorkflows(workflowData);
      setFilteredWorkflows(workflowData);
    };
    
    loadWorkflows();
  }, []);

  useEffect(() => {
    const filtered = workflows.filter((workflow) => {
      const matchesSearch = workflow.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || workflow.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    setFilteredWorkflows(filtered);
  }, [searchTerm, statusFilter, workflows]);

  const handleAddWorkflow = () => {
    setSelectedWorkflow(null);
    setIsModalOpen(true);
  };

  const handleEditWorkflow = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    setIsModalOpen(true);
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== workflowId));
    toast({
      title: "Workflow excluído",
      description: "O workflow foi excluído com sucesso",
    });
  };

  const handleSaveWorkflow = (workflow: Workflow) => {
    if (selectedWorkflow) {
      // Update existing workflow
      setWorkflows((prev) =>
        prev.map((w) => (w.id === workflow.id ? workflow : w))
      );
      toast({
        title: "Workflow atualizado",
        description: `O workflow "${workflow.title}" foi atualizado com sucesso`,
      });
    } else {
      // Create new workflow
      setWorkflows((prev) => [...prev, workflow]);
      toast({
        title: "Workflow criado",
        description: `O workflow "${workflow.title}" foi criado com sucesso`,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Workflows</CardTitle>
              <CardDescription>
                Gerencie os fluxos de trabalho da sua plataforma
              </CardDescription>
            </div>
            <Button onClick={handleAddWorkflow}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Workflow
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar workflows..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center space-x-1 border rounded-md">
                <Toggle
                  pressed={viewMode === "grid"}
                  onPressedChange={() => setViewMode("grid")}
                  size="sm"
                  className="px-3"
                >
                  <Columns className="h-4 w-4" />
                </Toggle>
                <Toggle
                  pressed={viewMode === "list"}
                  onPressedChange={() => setViewMode("list")}
                  size="sm"
                  className="px-3"
                >
                  <List className="h-4 w-4" />
                </Toggle>
              </div>

              <select
                className="border rounded-md p-2 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="active">Ativos</option>
                <option value="inactive">Inativos</option>
                <option value="draft">Rascunhos</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filteredWorkflows.map((workflow) => (
                <Card key={workflow.id} className="overflow-hidden">
                  <div
                    className="cursor-pointer p-4"
                    onClick={() => handleEditWorkflow(workflow)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{workflow.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {workflow.description}
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Badge
                          variant={
                            workflow.status === "active"
                              ? "default"
                              : workflow.status === "draft"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {workflow.status === "active"
                            ? "Ativo"
                            : workflow.status === "draft"
                            ? "Rascunho"
                            : "Inativo"}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditWorkflow(workflow);
                              }}
                            >
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteWorkflow(workflow.id);
                              }}
                            >
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted p-3">
                    <div className="text-xs">
                      Criado em:{" "}
                      <span className="font-medium">
                        {workflow.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}

              {filteredWorkflows.length === 0 && (
                <div className="col-span-full text-center p-8 border rounded-md bg-muted/20">
                  <p className="text-muted-foreground">
                    Nenhum workflow encontrado
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4">
              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted p-3 grid grid-cols-12 gap-4 font-medium text-sm">
                  <div className="col-span-5">Nome</div>
                  <div className="col-span-4">Descrição</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1"></div>
                </div>
                {filteredWorkflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="p-3 grid grid-cols-12 gap-4 items-center border-t hover:bg-muted/20 cursor-pointer"
                    onClick={() => handleEditWorkflow(workflow)}
                  >
                    <div className="col-span-5 font-medium">
                      {workflow.title}
                    </div>
                    <div className="col-span-4 text-sm text-muted-foreground truncate">
                      {workflow.description}
                    </div>
                    <div className="col-span-2">
                      <Badge
                        variant={
                          workflow.status === "active"
                            ? "default"
                            : workflow.status === "draft"
                            ? "outline"
                            : "secondary"
                        }
                      >
                        {workflow.status === "active"
                          ? "Ativo"
                          : workflow.status === "draft"
                          ? "Rascunho"
                          : "Inativo"}
                      </Badge>
                    </div>
                    <div className="col-span-1 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditWorkflow(workflow);
                            }}
                          >
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteWorkflow(workflow.id);
                            }}
                          >
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}

                {filteredWorkflows.length === 0 && (
                  <div className="p-8 text-center border-t">
                    <p className="text-muted-foreground">
                      Nenhum workflow encontrado
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {isModalOpen && (
        <WorkflowConfigModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveWorkflow}
          workflow={selectedWorkflow}
        />
      )}
    </div>
  );
};

export default WorkflowSettings;
