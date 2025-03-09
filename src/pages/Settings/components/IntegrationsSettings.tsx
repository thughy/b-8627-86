
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, ChevronRight, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Integration } from "@/pages/Workflows/models/WorkflowModels";
import { getIntegrations } from "../services/settingsService";
import { useToast } from "@/hooks/use-toast";
import IntegrationConfigModal from "./modals/IntegrationConfigModal";

interface IntegrationItemProps {
  integration: Integration;
  onSelect: (integration: Integration) => void;
  onDelete: (integrationId: string) => void;
}

const IntegrationItem = ({ integration, onSelect, onDelete }: IntegrationItemProps) => {
  return (
    <div className="border rounded-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${integration.isActive ? 'bg-primary/10' : 'bg-gray-200'}`}>
          <span className="text-lg font-semibold">{integration.name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="font-medium">{integration.name}</h3>
          <p className="text-sm text-muted-foreground">{integration.provider}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Badge variant={integration.isActive ? "default" : "outline"}>
          {integration.isActive ? "Ativo" : "Inativo"}
        </Badge>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" onClick={() => onSelect(integration)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => onDelete(integration.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const IntegrationsSettings = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [filteredIntegrations, setFilteredIntegrations] = useState<Integration[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  useEffect(() => {
    loadIntegrations();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = integrations.filter(
        (integration) =>
          integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          integration.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          integration.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredIntegrations(filtered);
    } else {
      setFilteredIntegrations(integrations);
    }
  }, [searchTerm, integrations]);

  const loadIntegrations = () => {
    const integrationsData = getIntegrations();
    setIntegrations(integrationsData);
    setFilteredIntegrations(integrationsData);
  };

  const handleAddIntegration = () => {
    const newIntegration: Partial<Integration> = {
      name: "",
      type: "",
      provider: "",
      status: "active",
      credentials: {},
      isActive: true,
    };
    setSelectedIntegration(null);
    setIsModalOpen(true);
  };

  const handleEditIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const handleDeleteIntegration = (integrationId: string) => {
    toast({
      title: "Confirmar exclusão",
      description: "Tem certeza que deseja excluir esta integração?",
      variant: "destructive",
      action: (
        <Button
          variant="outline"
          onClick={() => {
            const updatedIntegrations = integrations.filter(
              (item) => item.id !== integrationId
            );
            setIntegrations(updatedIntegrations);
            setFilteredIntegrations(
              filteredIntegrations.filter((item) => item.id !== integrationId)
            );
            toast({
              title: "Integração excluída",
              description: "A integração foi excluída com sucesso.",
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
      const updatedIntegrations = integrations.map((item) =>
        item.id === selectedIntegration.id
          ? { ...item, ...integrationData, updatedAt: new Date() }
          : item
      );
      setIntegrations(updatedIntegrations);
      toast({
        title: "Integração atualizada",
        description: "A integração foi atualizada com sucesso.",
      });
    } else {
      // Create new integration
      const newIntegration: Integration = {
        id: `integration-${Date.now()}`,
        name: integrationData.name || "Nova Integração",
        type: integrationData.type || "api",
        provider: integrationData.provider || "Personalizado",
        status: integrationData.status || "active",
        credentials: integrationData.credentials || {},
        isActive: integrationData.isActive !== undefined ? integrationData.isActive : true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setIntegrations([...integrations, newIntegration]);
      toast({
        title: "Integração criada",
        description: "A nova integração foi criada com sucesso.",
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="text-xl font-semibold">Integrações</div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar integrações..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={handleAddIntegration}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Integração
              </Button>
            </div>
          </div>

          {filteredIntegrations.length === 0 ? (
            <div className="border rounded-md p-8 text-center">
              <p className="text-muted-foreground">
                {searchTerm
                  ? "Nenhuma integração encontrada para esta busca."
                  : "Nenhuma integração configurada. Clique em 'Nova Integração' para adicionar."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredIntegrations.map((integration) => (
                <IntegrationItem
                  key={integration.id}
                  integration={integration}
                  onSelect={handleEditIntegration}
                  onDelete={handleDeleteIntegration}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {isModalOpen && (
        <IntegrationConfigModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          integration={selectedIntegration}
          onSave={handleSaveIntegration}
        />
      )}
    </div>
  );
};

export default IntegrationsSettings;
