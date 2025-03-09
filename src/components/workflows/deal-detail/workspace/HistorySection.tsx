
import React from 'react';

interface HistorySectionProps {
  dealId?: string;
}

const HistorySection: React.FC<HistorySectionProps> = ({ dealId }) => {
  return (
    <div className="h-full p-4">
      <h3 className="font-medium mb-3">Histórico de Atividades</h3>
      <div className="text-muted-foreground text-sm">
        {dealId ? 
          `Histórico para o negócio #${dealId.slice(0, 8)}. Nenhuma atividade registrada.` : 
          'Selecione um negócio para ver o histórico de atividades.'
        }
      </div>
    </div>
  );
};

export default HistorySection;
