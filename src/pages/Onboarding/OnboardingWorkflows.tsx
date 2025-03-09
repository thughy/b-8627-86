
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Package, FileText, ArrowRight } from "lucide-react";
import TemplatesSection from "./components/TemplatesSection";
import ManualConfigurationSection from "./components/ManualConfigurationSection";
import { getWorkflowTemplates } from "./services/workflowsService";

interface OnboardingWorkflowsProps {
  onComplete: () => void;
}

const OnboardingWorkflows = ({ onComplete }: OnboardingWorkflowsProps) => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("templates");
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);

  const templates = getWorkflowTemplates();

  const handleTemplateClick = (templateId: string) => {
    if (selectedTemplates.includes(templateId)) {
      setSelectedTemplates(selectedTemplates.filter((id) => id !== templateId));
    } else {
      setSelectedTemplates([...selectedTemplates, templateId]);
    }
  };

  const handleContinue = () => {
    if (selectedTab === "templates" && selectedTemplates.length === 0) {
      toast({
        title: "Selecione ao menos um template",
        description: "Por favor, escolha um ou mais templates para continuar",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: selectedTab === "templates" ? "Templates selecionados!" : "Configuração manual salva!",
      description: selectedTab === "templates" 
        ? `${selectedTemplates.length} templates adicionados à sua biblioteca` 
        : "Suas configurações manuais foram salvas",
    });
    
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>Usar templates prontos</span>
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Configurar manualmente</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="mt-6">
            <TemplatesSection 
              templates={templates}
              selectedTemplates={selectedTemplates}
              onTemplateClick={handleTemplateClick}
            />
          </TabsContent>

          <TabsContent value="manual" className="mt-6">
            <ManualConfigurationSection />
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleContinue} className="flex items-center">
          Continuar <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingWorkflows;
