
import React from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import FocusTabContent from './workspace/FocusTabContent';
import HistoryTabContent from './workspace/HistoryTabContent';

interface WorkspaceTabProps {
  deal: Deal;
  assets?: Asset[];
  onCreateAsset?: (dealId: string, asset?: Partial<Asset>) => void;
}

const WorkspaceTab: React.FC<WorkspaceTabProps> = ({ 
  deal, 
  assets = [],
  onCreateAsset 
}) => {
  const [filter, setFilter] = React.useState('all');

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold">Workspace</h3>
        
        <div className="flex gap-2">
          <select 
            className="border rounded px-2 py-1 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="notes">Notas</option>
            <option value="tasks">Tarefas</option>
            <option value="assets">Assets</option>
            <option value="documents">Anexos</option>
            <option value="emails">Emails</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <h4 className="text-md font-medium mb-2">Em Foco</h4>
          <div className="bg-background/60 backdrop-blur-sm border rounded-md p-4">
            <FocusTabContent 
              deal={deal} 
              assets={assets}
              filter={filter}
              onCreateAsset={onCreateAsset} 
            />
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-medium mb-2">Histórico de Atividades</h4>
          <div className="bg-background/60 backdrop-blur-sm border rounded-md p-4">
            <HistoryTabContent 
              deal={deal}
              filter={filter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceTab;
