
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Workflow,
  Plus,
  MoreVertical,
  ArrowRight,
  Search,
  Filter,
  LayoutGrid,
  List,
  ChevronDown,
} from "lucide-react";

const WorkflowsPage = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  const handleAction = (action: string) => {
    toast({
      title: `Ação: ${action}`,
      description: "Esta funcionalidade está em desenvolvimento",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Workflows</h1>
            <p className="text-muted-foreground">
              Gerencie e visualize seus workflows de processos empresariais.
            </p>
          </div>
          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <Button onClick={() => handleAction("Criar novo workflow")} className="flex-1 sm:flex-none">
              <Plus className="h-4 w-4 mr-2" />
              Novo workflow
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <Tabs defaultValue="all" className="w-full max-w-md">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="active">Ativos</TabsTrigger>
              <TabsTrigger value="archived">Arquivados</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none md:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar workflows..."
                className="pl-8 pr-4 py-2 bg-muted w-full rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <div className="flex items-center rounded-md border bg-card shadow-sm">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-r-none ${viewMode === "grid" && "bg-muted"}`}
                onClick={() => setViewMode("kanban")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-l-none ${viewMode === "list" && "bg-muted"}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value="all" className="space-y-6 mt-0">
          <div className="flex items-center justify-between">
            <Button variant="outline" className="flex items-center gap-2">
              <span>Departamento</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {viewMode === "kanban" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Comercial", "Suporte", "Marketing"].map((workflow, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3 flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Workflow className="h-5 w-5 text-primary" />
                        <span>{workflow}</span>
                      </CardTitle>
                      <CardDescription>
                        Workflow para gerenciamento de {workflow.toLowerCase()}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleAction(`Editar ${workflow}`)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction(`Duplicar ${workflow}`)}>
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction(`Arquivar ${workflow}`)}>
                          Arquivar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleAction(`Excluir ${workflow}`)}
                          className="text-destructive"
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Departamento:</p>
                          <p>{workflow}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Pipelines:</p>
                          <p>2</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Deals:</p>
                          <p>{10 - index * 2}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status:</p>
                          <p className="text-emerald-500">Ativo</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <div className="px-6 py-4 bg-muted/30 flex justify-end rounded-b-lg">
                    <Button 
                      variant="ghost" 
                      className="text-primary" 
                      onClick={() => handleAction(`Visualizar ${workflow}`)}
                    >
                      Visualizar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {["Comercial", "Suporte", "Marketing", "Financeiro"].map((workflow, index) => (
                <Card key={index} className="hover:bg-muted/20 transition-colors">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Workflow className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{workflow}</h3>
                        <p className="text-sm text-muted-foreground">
                          {index % 2 === 0 ? "Ativo" : "Em desenvolvimento"} • {10 - index} deals
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" onClick={() => handleAction(`Editar ${workflow}`)}>
                        Editar
                      </Button>
                      <Button variant="outline" onClick={() => handleAction(`Visualizar ${workflow}`)}>
                        Visualizar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </div>
    </DashboardLayout>
  );
};

export default WorkflowsPage;
