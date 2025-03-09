
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
import { Plus, Search, Filter, Edit, Trash, MessageSquare, CreditCard, Zap, Phone, Mail, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { getIntegrations } from "../services/settingsService";
import { Integration } from "@/pages/Workflows/models/WorkflowModels";
import IntegrationConfigModal from "./modals/IntegrationConfigModal";

const IntegrationsSettings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [integrations, setIntegrations] = useState<Integration[]>(getIntegrations());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | undefined>(undefined);

  const filteredIntegrations = integrations.filter((integration) => 
    integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    integration.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    integration.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddIntegration = () => {
    setSelectedIntegration(undefined);
    setIsModalOpen(true);
  };

  const handleEditIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const handleDeleteIntegration = (integration: Integration) => {
    toast({
      title: "Remover integração",
      description: `Tem certeza que deseja remover a integração: ${integration.name}?`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            setIntegrations(prev => prev.filter(i => i.id !== integration.id));
            toast({
              title: "Integração removida",
              description: `A integração ${integration.name} foi removida com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

  const handleSaveIntegration = (integrationData: Partial<Integration>) => {
    if (selectedIntegration) {
      // Update existing integration
      setIntegrations(prev => 
        prev.map(i => 
          i.id === selectedIntegration.id 
            ? { ...i, ...integrationData, updatedAt: new Date() } 
            : i
        )
      );
    } else {
      // Add new integration
      const newIntegration: Integration = {
        id: `integration-${Date.now()}`,
        name: integrationData.name || "Nova Integração",
        type: integrationData.type || "message",
        provider: integrationData.provider || "Provedor",
        credentials: integrationData.credentials || {},
        isActive: integrationData.isActive !== undefined ? integrationData.isActive : true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setIntegrations(prev => [...prev, newIntegration]);
    }
  };

  const getTypeIcon = (type: Integration['type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'payment':
        return <CreditCard className="h-4 w-4 text-green-500" />;
      case 'llm':
        return <Zap className="h-4 w-4 text-purple-500" />;
      case 'call':
        return <Phone className="h-4 w-4 text-orange-500" />;
      case 'email':
        return <Mail className="h-4 w-4 text-red-500" />;
      case 'custom':
        return <Settings className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getTypeName = (type: Integration['type']) => {
    switch (type) {
      case 'message':
        return "Mensagens";
      case 'payment':
        return "Pagamentos";
      case 'llm':
        return "IA";
      case 'call':
        return "Telefonia";
      case 'email':
        return "Email";
      case 'custom':
        return "Personalizado";
      default:
        return type;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Gerenciamento de Integrações</CardTitle>
            <CardDescription>
              Configure e gerencie as integrações com serviços externos
            </CardDescription>
          </div>
          <Button onClick={handleAddIntegration} className="flex-shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Integração
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar integrações..."
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
            <div className="col-span-2">Nome / Provedor</div>
            <div className="col-span-1">Tipo</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 hidden md:block">Atualizado</div>
            <div className="col-span-1 text-right">Ações</div>
          </div>

          <div className="divide-y">
            {filteredIntegrations.length > 0 ? (
              filteredIntegrations.map((integration) => (
                <div key={integration.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                  <div className="col-span-2">
                    <div className="font-medium">{integration.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {integration.provider}
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center gap-1">
                    {getTypeIcon(integration.type)}
                    <span className="text-sm">{getTypeName(integration.type)}</span>
                  </div>
                  <div className="col-span-1">
                    <Badge className={integration.isActive ? "bg-green-500" : "bg-gray-500"}>
                      {integration.isActive ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <div className="col-span-1 hidden md:block text-muted-foreground">
                    {formatDate(integration.updatedAt)}
                  </div>
                  <div className="col-span-1 flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditIntegration(integration)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteIntegration(integration)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                Nenhuma integração encontrada
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <IntegrationConfigModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        integration={selectedIntegration}
        onSave={handleSaveIntegration}
      />
    </Card>
  );
};

export default IntegrationsSettings;
