
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';

interface DealListViewProps {
  deals: Deal[];
  onDealClick: (deal: Deal) => void;
}

const DealListView: React.FC<DealListViewProps> = ({ deals, onDealClick }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="text-center p-8">
        <p className="text-muted-foreground">Visualização de deals será implementada futuramente</p>
      </div>
    </div>
  );
};

export default DealListView;
