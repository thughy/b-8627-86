
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
import { getIntegrations } from "../services/settingsService";
import { Integration } from "@/pages/Workflows/models/WorkflowModels";
import IntegrationConfigModal from "./modals/IntegrationConfigModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

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
      title: "Remover Integração",
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
        provider: integrationData.provider || "",
        status: "active",
        config: integrationData.config || {},
        credentials: integrationData.credentials || {},
        isActive: integrationData.isActive !== undefined ? integrationData.isActive : true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setIntegrations(prev => [...prev, newIntegration]);
    }
  };

  const getIntegrationTypeBadge = (type: Integration['type']) => {
    switch (type) {
      case 'message':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Mensagem</Badge>;
      case 'payment':
        return <Badge className="bg-green-500 hover:bg-green-600">Pagamento</Badge>;
      case 'llm':
        return <Badge className="bg-purple-500 hover:bg-purple-600">IA</Badge>;
      case 'call':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Telefonia</Badge>;
      case 'email':
        return <Badge className="bg-orange-500 hover:bg-orange-600">Email</Badge>;
      case 'custom':
        return <Badge className="bg-gray-500 hover:bg-gray-600">Personalizado</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Gerenciamento de Integrações</CardTitle>
            <CardDescription>
              Configure e gerencie as integrações do sistema
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
            <div className="col-span-1 hidden md:block">Status</div>
            <div className="col-span-1 hidden md:block">Criado em</div>
            <div className="col-span-1 text-right">Ações</div>
          </div>

          <div className="divide-y">
            {filteredIntegrations.length > 0 ? (
              filteredIntegrations.map((integration) => (
                <div key={integration.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                  <div className="col-span-2">
                    <div className="font-medium">{integration.name}</div>
                    <div className="text-sm text-muted-foreground">{integration.provider}</div>
                  </div>
                  <div className="col-span-1">
                    {getIntegrationTypeBadge(integration.type)}
                  </div>
                  <div className="col-span-1 hidden md:block">
                    <Badge className={integration.isActive ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                      {integration.isActive ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <div className="col-span-1 hidden md:block text-muted-foreground">
                    {formatDate(integration.createdAt)}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditIntegration(integration)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteIntegration(integration)}
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
