
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
import { Plus, Search, Filter, MessageSquare, CreditCard, Brain, Phone, Mail, Code, Edit, Power } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { formatDate } from "@/lib/utils";
import { getIntegrations } from "../services/settingsService";
import { Integration } from "@/pages/Workflows/models/WorkflowModels";

const IntegrationsSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [integrations, setIntegrations] = useState<Integration[]>(getIntegrations());

  const getFilteredIntegrations = () => {
    return integrations.filter((integration) => {
      // Filter by search term
      const matchesSearch = 
        integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.provider.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by tab
      const matchesTab = 
        activeTab === "all" || 
        activeTab === integration.type;
      
      return matchesSearch && matchesTab;
    });
  };

  const filteredIntegrations = getFilteredIntegrations();

  const handleAddIntegration = () => {
    toast({
      title: "Adicionar Integração",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handleEditIntegration = (integration: Integration) => {
    toast({
      title: "Editar Integração",
      description: `Editar integração: ${integration.name}`,
    });
  };

  const handleToggleStatus = (integration: Integration) => {
    const newStatus = !integration.isActive;
    toast({
      title: `Integração ${newStatus ? 'ativada' : 'desativada'}`,
      description: `${integration.name} foi ${newStatus ? 'ativada' : 'desativada'}`,
    });
  };

  const getIntegrationIcon = (type: Integration['type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'payment':
        return <CreditCard className="h-5 w-5 text-green-500" />;
      case 'llm':
        return <Brain className="h-5 w-5 text-purple-500" />;
      case 'call':
        return <Phone className="h-5 w-5 text-yellow-500" />;
      case 'email':
        return <Mail className="h-5 w-5 text-red-500" />;
      case 'custom':
        return <Code className="h-5 w-5 text-orange-500" />;
      default:
        return null;
    }
  };

  const getTypeName = (type: Integration['type']) => {
    switch (type) {
      case 'message': return 'Mensagem';
      case 'payment': return 'Pagamento';
      case 'llm': return 'LLM';
      case 'call': return 'Telefonia';
      case 'email': return 'Email';
      case 'custom': return 'Personalizado';
      default: return type;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Integrações</CardTitle>
            <CardDescription>
              Configure integrações com serviços externos
            </CardDescription>
          </div>
          <Button onClick={handleAddIntegration} className="flex-shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Integração
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="message">Mensagens</TabsTrigger>
              <TabsTrigger value="payment">Pagamentos</TabsTrigger>
              <TabsTrigger value="llm">IA</TabsTrigger>
              <TabsTrigger value="call">Telefonia</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="custom">Outras</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar integrações..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-0 border-0 p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredIntegrations.length > 0 ? (
                filteredIntegrations.map((integration) => (
                  <Card key={integration.id} className="overflow-hidden">
                    <div className="flex items-center p-4">
                      <div className="mr-4">
                        {getIntegrationIcon(integration.type)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {integration.provider} • {getTypeName(integration.type)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={integration.isActive}
                          onCheckedChange={() => handleToggleStatus(integration)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditIntegration(integration)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 border-t text-xs">
                      Última atualização: {formatDate(integration.updatedAt)}
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-full p-4 text-center text-muted-foreground">
                  Nenhuma integração encontrada
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IntegrationsSettings;
