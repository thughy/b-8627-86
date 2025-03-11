
import React from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HistoryIcon, Calendar } from 'lucide-react';

interface AssetHistoryTabProps {
  asset: Asset;
}

const AssetHistoryTab: React.FC<AssetHistoryTabProps> = ({ asset }) => {
  // For demonstration purposes, creating mock history data
  const historyItems = [
    {
      id: '1',
      action: 'Criação',
      date: asset.createdAt,
      description: 'Asset foi criado'
    },
    {
      id: '2',
      action: 'Atualização',
      date: asset.updatedAt,
      description: 'Atualização dos parâmetros'
    }
  ];

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">Histórico do Asset</h3>
      
      <ScrollArea className="h-[300px] border rounded-md">
        <div className="p-4 space-y-4">
          {historyItems.map((item) => (
            <div key={item.id} className="flex items-start gap-3 pb-4 border-b">
              <div className="bg-primary/10 p-2 rounded-full mt-1">
                <HistoryIcon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <h4 className="text-sm font-medium">{item.action}</h4>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(item.date).toLocaleString('pt-BR')}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AssetHistoryTab;
