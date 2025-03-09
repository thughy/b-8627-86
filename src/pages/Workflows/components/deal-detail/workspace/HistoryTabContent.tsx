
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';

interface HistoryTabContentProps {
  deal: Deal;
}

const HistoryTabContent: React.FC<HistoryTabContentProps> = ({ deal }) => {
  return (
    <div className="space-y-4">
      <div className="text-center p-4 text-muted-foreground">
        Histórico de atividades para este negócio será exibido aqui.
      </div>
    </div>
  );
};

export default HistoryTabContent;
