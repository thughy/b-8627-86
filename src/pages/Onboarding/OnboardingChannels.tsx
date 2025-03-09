
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import ChannelCard from "./components/ChannelCard";
import NoChannelsWarning from "./components/NoChannelsWarning";
import { getChannelsData } from "./services/channelsService";

interface OnboardingChannelsProps {
  onComplete: () => void;
}

const OnboardingChannels = ({ onComplete }: OnboardingChannelsProps) => {
  const { toast } = useToast();
  const [enabledChannels, setEnabledChannels] = useState<string[]>([]);
  const [channelConfigs, setChannelConfigs] = useState<Record<string, Record<string, string>>>({});

  const channels = getChannelsData();

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
          <ChannelCard
            key={channel.id}
            channel={channel}
            enabled={enabledChannels.includes(channel.id)}
            toggleChannel={toggleChannel}
            config={channelConfigs[channel.id] || {}}
            onConfigChange={(fieldId, value) => 
              handleInputChange(channel.id, fieldId, value)
            }
          />
        ))}
      </div>

      {enabledChannels.length === 0 && <NoChannelsWarning />}

      <div className="flex justify-end">
        <Button onClick={handleContinue} className="flex items-center">
          Continuar <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingChannels;
