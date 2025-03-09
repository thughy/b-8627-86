
import React from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';

interface AssetCardProps {
  asset: Asset;
  onViewAsset?: (asset: Asset) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  onViewAsset,
}) => {
  const handleViewClick = () => {
    if (onViewAsset) onViewAsset(asset);
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleViewClick}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base font-medium">{asset.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="text-sm text-muted-foreground mb-3">
          {asset.description || 'Sem descrição'}
        </div>
        
        <div className="flex justify-between items-center">
          <Badge>
            {asset.status === 'open' ? 'Aberto' : 
             asset.status === 'processing' ? 'Processando' : 
             asset.status === 'completed' ? 'Concluído' : 
             asset.status === 'cancelled' ? 'Cancelado' : 'Desconhecido'}
          </Badge>
          <div className="text-sm">{asset.type}</div>
        </div>
        
        {(asset.amount !== undefined || asset.startDate) && (
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t text-sm">
            {asset.amount !== undefined && (
              <div>
                <span>{formatCurrency(asset.amount)}</span>
              </div>
            )}
            
            {asset.startDate && (
              <div>
                <span>{formatDate(asset.startDate)}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssetCard;
