
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Package, FileText, ArrowRight } from "lucide-react";

interface OnboardingWorkflowsProps {
  onComplete: () => void;
}

interface TemplateCardProps {
  title: string;
  description: string;
  type: string;
  isSelected: boolean;
  onClick: () => void;
}

const TemplateCard = ({ title, description, type, isSelected, onClick }: TemplateCardProps) => (
  <Card
    className={`cursor-pointer transition-all hover:shadow-md ${
      isSelected ? "border-primary ring-2 ring-primary ring-opacity-50" : ""
    }`}
    onClick={onClick}
  >
    <CardHeader className="p-4 pb-2">
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg">{title}</CardTitle>
        {isSelected && <CheckCircle2 className="h-5 w-5 text-primary" />}
      </div>
      <CardDescription className="text-xs">{type}</CardDescription>
    </CardHeader>
    <CardContent className="p-4 pt-2">
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const OnboardingWorkflows = ({ onComplete }: OnboardingWorkflowsProps) => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("templates");
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);

  const templates = [
    {
      id: "comercial",
      title: "Workflow Comercial",
      description: "Gerenciamento completo de leads, oportunidades e vendas",
      type: "Workflow Completo",
    },
    {
      id: "suporte",
      title: "Workflow Suporte",
      description: "Atendimento ao cliente e gestão de tickets",
      type: "Workflow Completo",
    },
    {
      id: "marketing",
      title: "Workflow Marketing",
      description: "Automação de campanhas e nutrição de leads",
      type: "Workflow Completo",
    },
    {
      id: "financeiro",
      title: "Workflow Financeiro",
      description: "Gestão de cobranças e pagamentos",
      type: "Workflow Completo",
    },
  ];

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
            <p className="text-sm text-muted-foreground mb-4">
              Selecione um ou mais templates de workflows para começar. Você pode editar ou personalizar depois.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  title={template.title}
                  description={template.description}
                  type={template.type}
                  isSelected={selectedTemplates.includes(template.id)}
                  onClick={() => handleTemplateClick(template.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Você optou por configurar seus workflows manualmente. Esta opção é recomendada para usuários 
                avançados que desejam criar uma estrutura personalizada.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Configuração manual inclui:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span>Definir seus próprios workflows, departamentos e pipelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span>Criar estágios personalizados para cada pipeline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span>Configurar ativos e agentes específicos para seu negócio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span>Configurar regras de automação e notificações</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Você será redirecionado para as configurações detalhadas após concluir o onboarding.
              </p>
            </div>
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
