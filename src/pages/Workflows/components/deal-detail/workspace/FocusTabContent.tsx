
import React from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';

interface FocusTabContentProps {
  deal: Deal;
  assets?: Asset[]; // Tornando assets opcional
  onCreateAsset?: (dealId: string, asset?: Partial<Asset>) => void;
}

const FocusTabContent: React.FC<FocusTabContentProps> = ({ 
  deal, 
  assets = [], // Valor padrão como array vazio
  onCreateAsset 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Assets</h3>
        <div className="space-y-2">
          {assets.map(asset => (
            <div key={asset.id} className="p-3 border rounded-md">
              <div className="font-medium">{asset.title}</div>
              <div className="text-sm text-muted-foreground">{asset.description}</div>
              <div className="flex justify-between mt-2">
                <span className="text-xs bg-primary/10 px-2 py-1 rounded">{asset.type}</span>
                <span className="text-xs bg-primary/10 px-2 py-1 rounded">{asset.status}</span>
              </div>
            </div>
          ))}
          {assets.length === 0 && (
            <div className="text-center p-4 text-muted-foreground">
              Nenhum asset disponível para este negócio.
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Tarefas</h3>
        <div className="text-center p-4 text-muted-foreground">
          Nenhuma tarefa disponível para este negócio.
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Notas</h3>
        <div className="text-center p-4 text-muted-foreground">
          Nenhuma nota disponível para este negócio.
        </div>
      </div>
    </div>
  );
};

export default FocusTabContent;
