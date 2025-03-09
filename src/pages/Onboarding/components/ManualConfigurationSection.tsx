
import React from "react";
import { CheckCircle2 } from "lucide-react";

const ManualConfigurationSection = () => {
  return (
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
  );
};

export default ManualConfigurationSection;
