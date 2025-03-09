
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, MessageSquare, AlertCircle } from "lucide-react";

interface OnboardingChannelsProps {
  onComplete: () => void;
}

interface ChannelProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  configFields: {
    id: string;
    label: string;
    placeholder: string;
    type: string;
  }[];
}

const OnboardingChannels = ({ onComplete }: OnboardingChannelsProps) => {
  const { toast } = useToast();
  const [enabledChannels, setEnabledChannels] = useState<string[]>([]);
  const [channelConfigs, setChannelConfigs] = useState<Record<string, Record<string, string>>>({});

  const channels: ChannelProps[] = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: <MessageSquare className="h-5 w-5 text-green-500" />,
      configFields: [
        {
          id: "apiKey",
          label: "API Key",
          placeholder: "Insira sua API Key do WhatsApp Business",
          type: "text",
        },
        {
          id: "phoneNumber",
          label: "Número de telefone",
          placeholder: "+55 (11) 99999-9999",
          type: "tel",
        },
      ],
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
      configFields: [
        {
          id: "botToken",
          label: "Bot Token",
          placeholder: "Insira o token do seu bot",
          type: "text",
        },
      ],
    },
    {
      id: "email",
      name: "Email",
      icon: <MessageSquare className="h-5 w-5 text-yellow-500" />,
      configFields: [
        {
          id: "smtpServer",
          label: "Servidor SMTP",
          placeholder: "smtp.example.com",
          type: "text",
        },
        {
          id: "smtpPort",
          label: "Porta SMTP",
          placeholder: "587",
          type: "number",
        },
        {
          id: "emailUser",
          label: "Email",
          placeholder: "seu@email.com",
          type: "email",
        },
        {
          id: "emailPassword",
          label: "Senha",
          placeholder: "******",
          type: "password",
        },
      ],
    },
  ];

  const toggleChannel = (channelId: string) => {
    if (enabledChannels.includes(channelId)) {
      setEnabledChannels(enabledChannels.filter((id) => id !== channelId));
    } else {
      setEnabledChannels([...enabledChannels, channelId]);
    }
  };

  const handleInputChange = (channelId: string, fieldId: string, value: string) => {
    setChannelConfigs({
      ...channelConfigs,
      [channelId]: {
        ...(channelConfigs[channelId] || {}),
        [fieldId]: value,
      },
    });
  };

  const handleContinue = () => {
    if (enabledChannels.length === 0) {
      toast({
        title: "Nenhum canal selecionado",
        description: "Recomendamos configurar pelo menos um canal de comunicação",
        variant: "destructive",
      });
      return;
    }

    // Check if all required fields are filled for enabled channels
    const missingConfigs = enabledChannels.filter((channelId) => {
      const channel = channels.find((c) => c.id === channelId);
      if (!channel) return false;
      
      const config = channelConfigs[channelId] || {};
      return channel.configFields.some((field) => !config[field.id]);
    });

    if (missingConfigs.length > 0) {
      toast({
        title: "Configuração incompleta",
        description: "Preencha todos os campos para os canais selecionados",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Canais configurados!",
      description: `${enabledChannels.length} ${enabledChannels.length === 1 ? 'canal configurado' : 'canais configurados'} com sucesso`,
    });
    
    onComplete();
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground mb-4">
        Configure os canais de comunicação que você deseja utilizar em seus workflows.
        Você pode adicionar mais canais ou editar as configurações posteriormente.
      </p>

      <div className="space-y-4">
        {channels.map((channel) => (
          <Card key={channel.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {channel.icon}
                  <Label htmlFor={`enable-${channel.id}`} className="font-medium">
                    {channel.name}
                  </Label>
                </div>
                <Switch
                  id={`enable-${channel.id}`}
                  checked={enabledChannels.includes(channel.id)}
                  onCheckedChange={() => toggleChannel(channel.id)}
                />
              </div>

              {enabledChannels.includes(channel.id) && (
                <div className="space-y-3 pt-2 border-t border-border">
                  {channel.configFields.map((field) => (
                    <div key={field.id} className="space-y-1.5">
                      <Label htmlFor={`${channel.id}-${field.id}`} className="text-sm">
                        {field.label}
                      </Label>
                      <Input
                        id={`${channel.id}-${field.id}`}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={(channelConfigs[channel.id]?.[field.id] || "")}
                        onChange={(e) => 
                          handleInputChange(channel.id, field.id, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {enabledChannels.length === 0 && (
        <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-md text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <p>
            Recomendamos configurar pelo menos um canal para comunicação com seus clientes.
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={handleContinue} className="flex items-center">
          Continuar <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingChannels;
