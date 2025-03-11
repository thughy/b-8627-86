
import React from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';

interface AssetFocusTabProps {
  asset: Asset;
}

const AssetFocusTab: React.FC<AssetFocusTabProps> = ({ asset }) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">Foco do Asset</h3>
      
      <div className="bg-muted p-6 rounded-md text-center">
        <p className="text-muted-foreground">
          Aqui serão exibidas as tarefas, notas e documentos associados a este asset.
        </p>
      </div>
    </div>
  );
};

export default AssetFocusTab;
