
import React, { useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { getIntegrations } from "../services/settingsService";
import { Integration } from "@/pages/Workflows/models/WorkflowModels";
import IntegrationConfigModal from "./modals/IntegrationConfigModal";
import { useToast } from "@/hooks/use-toast";

const IntegrationsSettings = () => {
  const { toast } = useToast();
  
  const [integrations, setIntegrations] = React.useState<Integration[]>([]);
  const [filteredIntegrations, setFilteredIntegrations] = React.useState<Integration[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedIntegration, setSelectedIntegration] = React.useState<Partial<Integration> | null>(null);

  // Fetch integrations
  useEffect(() => {
    const loadIntegrations = () => {
      const integrationData = getIntegrations();
      setIntegrations(integrationData);
      setFilteredIntegrations(integrationData);
    };
    
    loadIntegrations();
  }, []);

  // Filter integrations based on search and tab
  useEffect(() => {
    let filtered = integrations;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(integration => 
        integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter(integration => integration.type === activeTab);
    }
    
    setFilteredIntegrations(filtered);
  }, [searchTerm, activeTab, integrations]);

  // Add new integration
  const handleAddIntegration = () => {
    setSelectedIntegration(null);
    setModalOpen(true);
  };

  // Edit integration
  const handleEditIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
    setModalOpen(true);
  };

  // Toggle integration status
  const handleToggleStatus = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, isActive: !integration.isActive, status: !integration.isActive ? 'active' : 'inactive' } 
          : integration
      )
    );
    
    const integration = integrations.find(i => i.id === id);
    
    if (integration) {
      toast({
        title: integration.isActive ? "Integração desativada" : "Integração ativada",
        description: `A integração ${integration.name} foi ${integration.isActive ? "desativada" : "ativada"} com sucesso.`
      });
    }
  };

  // Handle save integration
  const handleSaveIntegration = (integration: Partial<Integration>) => {
    if (selectedIntegration?.id) {
      // Update existing integration
      setIntegrations(prev => 
        prev.map(i => 
          i.id === selectedIntegration.id 
            ? { ...i, ...integration } as Integration 
            : i
        )
      );
      
      toast({
        title: "Integração atualizada",
        description: `A integração ${integration.name} foi atualizada com sucesso.`
      });
    } else {
      // Create new integration
      const newIntegration: Integration = {
        id: `integration-${Date.now()}`,
        name: integration.name || "",
        type: integration.type || "",
        provider: integration.provider || "",
        status: "active",
        isActive: true,
        credentials: integration.credentials || {},
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setIntegrations(prev => [...prev, newIntegration]);
      
      toast({
        title: "Integração adicionada",
        description: `A integração ${newIntegration.name} foi adicionada com sucesso.`
      });
    }
    
    setModalOpen(false);
  };

  // Delete integration
  const handleDeleteIntegration = (id: string) => {
    const integration = integrations.find(i => i.id === id);
    
    setIntegrations(prev => prev.filter(i => i.id !== id));
    
    if (integration) {
      toast({
        title: "Integração removida",
        description: `A integração ${integration.name} foi removida com sucesso.`
      });
    }
    
    if (selectedIntegration?.id === id) {
      setSelectedIntegration(null);
      setModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Integrações</CardTitle>
              <CardDescription>Gerencie integrações com outras plataformas</CardDescription>
            </div>
            <Button onClick={handleAddIntegration}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Integração
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar integrações..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" className="w-full sm:w-auto" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="crm">CRM</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="other">Outros</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{integration.name}</div>
                      <div className="text-sm text-muted-foreground">{integration.provider}</div>
                    </div>
                    <div className="flex space-x-1">
                      <Badge variant={integration.isActive ? "default" : "outline"}>
                        {integration.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditIntegration(integration)}>
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(integration.id)}>
                            {integration.isActive ? "Desativar" : "Ativar"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteIntegration(integration.id)} className="text-red-500">
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
                <div className="bg-muted p-3">
                  <div className="text-xs">Tipo: <span className="font-medium capitalize">{integration.type}</span></div>
                </div>
              </Card>
            ))}
            
            {filteredIntegrations.length === 0 && (
              <div className="col-span-full text-center p-8 border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Nenhuma integração encontrada</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {modalOpen && (
        <IntegrationConfigModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          integration={selectedIntegration}
          onSave={handleSaveIntegration}
          onDelete={handleDeleteIntegration}
        />
      )}
    </div>
  );
};

export default IntegrationsSettings;
