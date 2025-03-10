
import React from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Clock, FileText, Paperclip } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface AssetSummaryInfoProps {
  asset: Asset;
}

const AssetSummaryInfo: React.FC<AssetSummaryInfoProps> = ({ asset }) => {
  // Define counters based on Asset properties
  const counters = {
    notes: asset.parameters?.notes?.length || 0,
    documents: asset.files?.length || 0
  };

  return (
    <div className="px-6 pt-2 pb-4 flex-shrink-0">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-background/80 backdrop-blur-sm p-3 rounded-md border">
          <div className="text-xs text-muted-foreground mb-1">Tipo</div>
          <div className="font-medium">{asset.type || "Não definido"}</div>
        </div>
        <div className="bg-background/80 backdrop-blur-sm p-3 rounded-md border">
          <div className="text-xs text-muted-foreground mb-1">Status</div>
          <div className="font-medium capitalize">{asset.status || "Não definido"}</div>
        </div>
        <div className="bg-background/80 backdrop-blur-sm p-3 rounded-md border">
          <div className="text-xs text-muted-foreground mb-1">Valor</div>
          <div className="font-medium">{formatCurrency(asset.amount)}</div>
        </div>
        <div className="bg-background/80 backdrop-blur-sm p-3 rounded-md border">
          <div className="text-xs text-muted-foreground mb-1">Data de início</div>
          <div className="font-medium">{formatDate(asset.startDate)}</div>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div className="flex gap-3">
          <div className="flex items-center gap-1 text-sm">
            <FileText className="h-4 w-4 text-yellow-500" />
            <span>{counters.notes || 0} notas</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Paperclip className="h-4 w-4 text-purple-500" />
            <span>{counters.documents || 0} anexos</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          Criado em {formatDate(asset.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default AssetSummaryInfo;
