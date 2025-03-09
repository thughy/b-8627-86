
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
import { Plus, Search, Filter, Download, Upload, FileText, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";
import { getTemplates } from "../services/settingsService";
import { Template } from "@/pages/Workflows/models/WorkflowModels";

const TemplateLibrary = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [templates, setTemplates] = useState<Template[]>(getTemplates());

  const filteredTemplates = templates.filter((template) => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImportTemplate = () => {
    toast({
      title: "Importar Template",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handleGenerateTemplateReport = (template: Template) => {
    toast({
      title: "Relatório de Template",
      description: `Gerando relatório para o template: ${template.name}`,
    });
  };

  const handleExportTemplate = (template: Template) => {
    toast({
      title: "Exportar Template",
      description: `Exportando template: ${template.name}`,
    });
  };

  const handleTemplateAction = (template: Template, action: 'install' | 'uninstall' | 'update') => {
    const actionMessages = {
      install: `Instalando template: ${template.name}`,
      uninstall: `Desinstalando template: ${template.name}`,
      update: `Atualizando template: ${template.name}`
    };
    
    toast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Template`,
      description: actionMessages[action],
    });
  };

  const getTypeLabel = (type: Template['type']) => {
    switch (type) {
      case 'workflow':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Workflow</Badge>;
      case 'department':
        return <Badge className="bg-green-500 hover:bg-green-600">Departamento</Badge>;
      case 'pipeline':
        return <Badge className="bg-purple-500 hover:bg-purple-600">Pipeline</Badge>;
      case 'stage':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Estágio</Badge>;
      case 'agent':
        return <Badge className="bg-red-500 hover:bg-red-600">Agente</Badge>;
      case 'asset':
        return <Badge className="bg-orange-500 hover:bg-orange-600">Asset</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Biblioteca de Templates</CardTitle>
            <CardDescription>
              Gerencie e aplique templates pré-configurados
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleImportTemplate} className="flex-shrink-0">
              <Upload className="h-4 w-4 mr-2" />
              Importar Template
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar templates..."
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
            <div className="col-span-1">Tipo</div>
            <div className="col-span-1">Versão</div>
            <div className="col-span-1 hidden md:block">Atualizado</div>
            <div className="col-span-2 text-right">Ações</div>
          </div>

          <div className="divide-y">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <div key={template.id} className="grid grid-cols-7 gap-4 p-4 items-center">
                  <div className="col-span-2">
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {Object.keys(template.data).slice(0, 2).join(", ")}
                      {Object.keys(template.data).length > 2 && "..."}
                    </div>
                  </div>
                  <div className="col-span-1">
                    {getTypeLabel(template.type)}
                  </div>
                  <div className="col-span-1 text-muted-foreground">
                    v{template.version}
                  </div>
                  <div className="col-span-1 hidden md:block text-muted-foreground">
                    {formatDate(template.updatedAt)}
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleGenerateTemplateReport(template)}
                      title="Gerar relatório"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Ações
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleTemplateAction(template, 'install')}>
                          Instalar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTemplateAction(template, 'update')}>
                          Atualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTemplateAction(template, 'uninstall')}>
                          Desinstalar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExportTemplate(template)}>
                          Exportar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                Nenhum template encontrado
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateLibrary;
