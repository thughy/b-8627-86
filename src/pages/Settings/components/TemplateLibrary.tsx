
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
import { Plus, Search, Filter, Upload, FileText, MoreHorizontal, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { getTemplates, installTemplate } from "../services/settingsService";
import { Template } from "@/pages/Workflows/models/WorkflowModels";

const TemplateLibrary = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [templates, setTemplates] = useState<Template[]>(getTemplates());
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showSpecifications, setShowSpecifications] = useState(false);
  const [showConfirmInstall, setShowConfirmInstall] = useState(false);
  const [installingTemplate, setInstallingTemplate] = useState<Template | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);

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

  const confirmTemplateInstallation = (template: Template) => {
    setInstallingTemplate(template);
    setShowConfirmInstall(true);
  };

  const handleTemplateInstallation = async () => {
    if (!installingTemplate) return;
    
    setIsInstalling(true);
    
    try {
      // Simulate installation process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the installation service
      const result = await installTemplate(installingTemplate.id);
      
      if (result.success) {
        toast({
          title: "Template Instalado",
          description: `O template "${installingTemplate.name}" foi instalado com sucesso.`,
        });
        
        // Update template status if needed or refresh list
        const updatedTemplates = templates.map(t => 
          t.id === installingTemplate.id 
            ? { ...t, installed: true } 
            : t
        );
        setTemplates(updatedTemplates);
      } else {
        throw new Error(result.error || "Falha na instalação");
      }
    } catch (error) {
      toast({
        title: "Erro na Instalação",
        description: error instanceof Error ? error.message : "Erro desconhecido na instalação do template",
        variant: "destructive",
      });
    } finally {
      setIsInstalling(false);
      setShowConfirmInstall(false);
      setInstallingTemplate(null);
    }
  };

  const handleTemplateAction = (template: Template, action: 'install' | 'uninstall' | 'update') => {
    if (action === 'install') {
      confirmTemplateInstallation(template);
      return;
    }
    
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

  const handleShowSpecifications = (template: Template) => {
    setSelectedTemplate(template);
    setShowSpecifications(true);
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

  // Recursive function to flatten nested objects for display
  const flattenObject = (obj: Record<string, any>, prefix = '') => {
    return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        // Recursively flatten nested objects
        Object.assign(acc, flattenObject(obj[key], prefixedKey));
      } else {
        // Handle arrays and primitive values
        acc[prefixedKey] = obj[key];
      }
      
      return acc;
    }, {});
  };

  const renderSpecificationItems = (data: Record<string, any>) => {
    // Flatten nested objects for display
    const flattenedData = flattenObject(data);
    
    return Object.entries(flattenedData).map(([key, value]) => (
      <div key={key} className="py-2 border-b last:border-0">
        <div className="font-medium">{key}</div>
        <div className="text-sm text-muted-foreground">
          {Array.isArray(value) 
            ? value.join(', ')
            : typeof value === 'object' && value !== null
              ? JSON.stringify(value, null, 2)
              : String(value)}
        </div>
      </div>
    ));
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
          <div className="grid grid-cols-8 gap-4 p-4 font-medium border-b">
            <div className="col-span-2">Nome</div>
            <div className="col-span-1">Tipo</div>
            <div className="col-span-1">Versão</div>
            <div className="col-span-2 text-center">Especificações</div>
            <div className="col-span-1 hidden md:block">Atualizado</div>
            <div className="col-span-1 text-right">Ações</div>
          </div>

          <div className="divide-y">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <div key={template.id} className="grid grid-cols-8 gap-4 p-4 items-center">
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
                  <div className="col-span-2 flex justify-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleShowSpecifications(template)}
                      className="h-8 w-8"
                      title="Ver especificações"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="col-span-1 hidden md:block text-muted-foreground">
                    {formatDate(template.updatedAt)}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
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
                        <DropdownMenuItem onClick={() => handleGenerateTemplateReport(template)}>
                          Gerar relatório
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

        {/* Installation confirmation dialog */}
        <Dialog open={showConfirmInstall} onOpenChange={setShowConfirmInstall}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirmar Instalação</DialogTitle>
              <DialogDescription>
                {installingTemplate && (
                  <>
                    Você está prestes a instalar o template <strong>{installingTemplate.name}</strong>.
                    Este processo criará novos workflows, pipelines, estágios e outros componentes em seu sistema.
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Tem certeza que deseja prosseguir com a instalação?
              </p>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowConfirmInstall(false)}
                disabled={isInstalling}
              >
                Cancelar
              </Button>
              <Button 
                type="button" 
                onClick={handleTemplateInstallation}
                disabled={isInstalling}
                className="flex items-center gap-2"
              >
                {isInstalling ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Instalando...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Confirmar Instalação
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {selectedTemplate && (
          <Dialog open={showSpecifications} onOpenChange={setShowSpecifications}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <span className="mr-2">Especificações do Template</span>
                  {getTypeLabel(selectedTemplate.type)}
                </DialogTitle>
                <DialogDescription>
                  {selectedTemplate.name} (v{selectedTemplate.version})
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="bg-muted p-4 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Dados do Template</h3>
                  <div className="divide-y">
                    {renderSpecificationItems(selectedTemplate.data)}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Atualizado em: {formatDate(selectedTemplate.updatedAt)}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default TemplateLibrary;
