
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Integration } from "@/pages/Workflows/models/WorkflowModels";

interface IntegrationConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  integration?: Integration;
  onSave: (integration: Partial<Integration>) => void;
}

const IntegrationConfigModal = ({ 
  isOpen, 
  onClose, 
  integration, 
  onSave 
}: IntegrationConfigModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState<Partial<Integration>>(
    integration || {
      name: "",
      type: "message",
      provider: "",
      credentials: {},
      isActive: true
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: 'message' | 'payment' | 'llm' | 'call' | 'email' | 'custom') => {
    setFormData(prev => ({ ...prev, type }));
  };

  const handleCredentialsChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      credentials: {
        ...prev.credentials,
        [key]: value
      }
    }));
  };

  const handleStatusChange = (isActive: boolean) => {
    setFormData(prev => ({ ...prev, isActive }));
  };

  const handleSubmit = () => {
    if (!formData.name) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe um nome para a integração.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.provider) {
      toast({
        title: "Provedor obrigatório",
        description: "Por favor, informe o provedor da integração.",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
    toast({
      title: integration ? "Integração atualizada" : "Integração criada",
      description: `A integração "${formData.name}" foi ${integration ? "atualizada" : "criada"} com sucesso.`,
    });
    onClose();
  };

  // Renderiza os campos específicos com base no tipo de integração
  const renderTypeSpecificFields = () => {
    switch (formData.type) {
      case 'message':
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={formData.credentials?.apiKey || ""}
                onChange={(e) => handleCredentialsChange("apiKey", e.target.value)}
                placeholder="Chave API do serviço de mensagens"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Número de Telefone</Label>
              <Input
                id="phoneNumber"
                value={formData.credentials?.phoneNumber || ""}
                onChange={(e) => handleCredentialsChange("phoneNumber", e.target.value)}
                placeholder="+5511999999999"
              />
            </div>
          </>
        );
      case 'payment':
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={formData.credentials?.apiKey || ""}
                onChange={(e) => handleCredentialsChange("apiKey", e.target.value)}
                placeholder="Chave API do serviço de pagamento"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="webhookSecret">Webhook Secret</Label>
              <Input
                id="webhookSecret"
                type="password"
                value={formData.credentials?.webhookSecret || ""}
                onChange={(e) => handleCredentialsChange("webhookSecret", e.target.value)}
                placeholder="Chave secreta para webhooks"
              />
            </div>
          </>
        );
      case 'llm':
        return (
          <div className="grid gap-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={formData.credentials?.apiKey || ""}
              onChange={(e) => handleCredentialsChange("apiKey", e.target.value)}
              placeholder="Chave API do serviço de IA"
            />
          </div>
        );
      case 'call':
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="accountSid">Account SID</Label>
              <Input
                id="accountSid"
                value={formData.credentials?.accountSid || ""}
                onChange={(e) => handleCredentialsChange("accountSid", e.target.value)}
                placeholder="SID da conta do serviço de telefonia"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="authToken">Auth Token</Label>
              <Input
                id="authToken"
                type="password"
                value={formData.credentials?.authToken || ""}
                onChange={(e) => handleCredentialsChange("authToken", e.target.value)}
                placeholder="Token de autenticação"
              />
            </div>
          </>
        );
      case 'email':
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={formData.credentials?.smtpHost || ""}
                onChange={(e) => handleCredentialsChange("smtpHost", e.target.value)}
                placeholder="smtp.example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                value={formData.credentials?.smtpPort || ""}
                onChange={(e) => handleCredentialsChange("smtpPort", e.target.value)}
                placeholder="587"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                value={formData.credentials?.username || ""}
                onChange={(e) => handleCredentialsChange("username", e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={formData.credentials?.password || ""}
                onChange={(e) => handleCredentialsChange("password", e.target.value)}
                placeholder="Senha da conta de email"
              />
            </div>
          </>
        );
      case 'custom':
        return (
          <div className="grid gap-2">
            <Label htmlFor="customConfig">Configuração Personalizada</Label>
            <Textarea
              id="customConfig"
              rows={5}
              value={formData.credentials?.config || ""}
              onChange={(e) => handleCredentialsChange("config", e.target.value)}
              placeholder="Configure o JSON personalizado"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{integration ? "Editar Integração" : "Nova Integração"}</DialogTitle>
          <DialogDescription>
            {integration 
              ? "Edite as informações da integração existente." 
              : "Configure uma nova integração para o seu sistema."}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="configuration">Configuração</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="Nome da integração"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="provider">Provedor</Label>
                <Input 
                  id="provider"
                  name="provider"
                  placeholder="Nome do provedor (ex: Stripe, WhatsApp, OpenAI)"
                  value={formData.provider}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label>Tipo de Integração</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleTypeChange(value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="message">Mensagens</SelectItem>
                    <SelectItem value="payment">Pagamentos</SelectItem>
                    <SelectItem value="llm">Modelos de IA</SelectItem>
                    <SelectItem value="call">Telefonia</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Status</Label>
                <div className="flex space-x-4">
                  <Button 
                    type="button" 
                    variant={formData.isActive ? "default" : "outline"}
                    onClick={() => handleStatusChange(true)}
                    className="flex-1"
                  >
                    Ativo
                  </Button>
                  <Button 
                    type="button" 
                    variant={!formData.isActive ? "default" : "outline"}
                    onClick={() => handleStatusChange(false)}
                    className="flex-1"
                  >
                    Inativo
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-4 mt-4">
            <div className="space-y-4">
              {renderTypeSpecificFields()}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationConfigModal;
