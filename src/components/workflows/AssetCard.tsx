
import React from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Calendar, CreditCard } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface AssetCardProps {
  asset: Asset;
  onViewAsset?: (asset: Asset) => void;
  onEditAsset?: (asset: Asset) => void;
  onDeleteAsset?: (assetId: string) => void;
  onCancelAsset?: (assetId: string) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  onViewAsset,
  onEditAsset,
  onDeleteAsset,
  onCancelAsset
}) => {
  const statusColors = {
    open: 'bg-blue-500',
    processing: 'bg-amber-500',
    completed: 'bg-green-500',
    cancelled: 'bg-red-500'
  };

  const statusLabels = {
    open: 'Aberto',
    processing: 'Processando',
    completed: 'Concluído',
    cancelled: 'Cancelado'
  };

  const handleViewClick = () => {
    if (onViewAsset) onViewAsset(asset);
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4" 
      style={{ borderLeftColor: 
        asset.status === 'open' ? '#3b82f6' : 
        asset.status === 'processing' ? '#f59e0b' : 
        asset.status === 'completed' ? '#10b981' : 
        asset.status === 'cancelled' ? '#ef4444' : '#6b7280' }}
      onClick={handleViewClick}>
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
        <CardTitle className="text-base font-medium">{asset.title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              if (onEditAsset) onEditAsset(asset);
            }}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              if (onCancelAsset) onCancelAsset(asset.id);
            }}>
              Cancelar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              if (onDeleteAsset) onDeleteAsset(asset.id);
            }} className="text-red-500 focus:text-red-500">
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="text-sm text-muted-foreground mb-3">
          {asset.description || 'Sem descrição'}
        </div>
        
        <div className="flex justify-between items-center">
          <Badge className={statusColors[asset.status] || 'bg-gray-500'}>
            {statusLabels[asset.status] || 'Desconhecido'}
          </Badge>
          <div className="text-sm">{asset.type}</div>
        </div>
        
        {(asset.amount !== undefined || asset.startDate || asset.endDate) && (
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t text-sm">
            {asset.amount !== undefined && (
              <div className="flex items-center gap-1">
                <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{formatCurrency(asset.amount)}</span>
              </div>
            )}
            
            {asset.startDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
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
