
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
import { Search, Filter, Upload } from "lucide-react";
import { getTemplates } from "../../services/settingsService";
import { Template } from "@/pages/Workflows/models/WorkflowModels";
import { TemplateList } from "./TemplateList";
import { TemplateSpecificationsDialog } from "./TemplateSpecificationsDialog";

export const TemplateLibraryContainer = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [templates, setTemplates] = useState<Template[]>(getTemplates());
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showSpecifications, setShowSpecifications] = useState(false);

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

  const handleExportTemplate = (template: Template) => {
    toast({
      title: "Exportar Template",
      description: `Exportando template: ${template.name}`,
    });
  };

  const handleGenerateTemplateReport = (template: Template) => {
    toast({
      title: "Relatório de Template",
      description: `Gerando relatório para o template: ${template.name}`,
    });
  };

  const handleShowSpecifications = (template: Template) => {
    setSelectedTemplate(template);
    setShowSpecifications(true);
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

        <TemplateList 
          templates={filteredTemplates} 
          onShowSpecifications={handleShowSpecifications}
          onTemplateAction={handleTemplateAction}
          onExportTemplate={handleExportTemplate}
          onGenerateTemplateReport={handleGenerateTemplateReport}
        />

        {selectedTemplate && (
          <TemplateSpecificationsDialog
            template={selectedTemplate}
            open={showSpecifications}
            onOpenChange={setShowSpecifications}
          />
        )}
      </CardContent>
    </Card>
  );
};
