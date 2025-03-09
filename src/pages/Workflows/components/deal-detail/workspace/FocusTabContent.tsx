
import React from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Button } from '@/components/ui/button';
import { FileText, CheckSquare, Plus } from 'lucide-react';

interface FocusTabContentProps {
  deal: Deal;
  assets: Asset[];
  onCreateAsset?: (dealId: string, asset: Partial<Asset>) => void;
}

const FocusTabContent: React.FC<FocusTabContentProps> = ({ deal, assets, onCreateAsset }) => {
  const handleCreateAsset = () => {
    if (onCreateAsset) {
      const newAsset: Partial<Asset> = {
        title: 'Novo Asset',
        description: 'Descrição do novo asset',
        type: 'document',
        status: 'open'
      };
      onCreateAsset(deal.id, newAsset);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
      <div>
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Ativos
        </h3>
        {assets.length > 0 ? (
          <div className="space-y-2">
            {assets.map(asset => (
              <div key={asset.id} className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                <div className="font-medium">{asset.title}</div>
                <div className="text-sm text-muted-foreground">{asset.description}</div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">
                    {asset.type}
                  </span>
                  <span className="text-xs bg-blue-500/10 text-blue-500 rounded-full px-2 py-0.5">
                    {asset.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-4 border rounded-md bg-muted/30">
            <p className="text-muted-foreground">Nenhum ativo encontrado</p>
            <Button size="sm" variant="outline" className="mt-2" onClick={handleCreateAsset}>
              <Plus className="h-4 w-4 mr-1" />
              Adicionar Ativo
            </Button>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-primary" />
          Tarefas
        </h3>
        <div className="text-center p-4 border rounded-md bg-muted/30">
          <p className="text-muted-foreground">Nenhuma tarefa encontrada</p>
          <Button size="sm" variant="outline" className="mt-2">
            <Plus className="h-4 w-4 mr-1" />
            Adicionar Tarefa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FocusTabContent;
