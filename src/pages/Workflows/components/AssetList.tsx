
import React from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, DollarSign } from 'lucide-react';
import { formatDate } from '@/components/workflows/utils/dealUtils';
import { getAssetTypeIcon, getAssetStatusLabel, formatAssetAmount } from '@/pages/Workflows/components/asset-modal/utils/assetTypeUtils';
import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface AssetListProps {
  assets: Asset[];
  onAssetClick: (asset: Asset) => void;
}

const AssetList: React.FC<AssetListProps> = ({ assets, onAssetClick }) => {
  if (!assets || assets.length === 0) {
    return (
      <div className="p-4 text-center bg-muted/30 rounded-md">
        <p className="text-sm text-muted-foreground">Nenhum asset disponível</p>
      </div>
    );
  }

  // Função para obter ícone do Lucide dinamicamente
  const getIcon = (iconName: string): LucideIcon => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.File;
    return Icon;
  };

  // Função para obter cor de status
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'open': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'processing': return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'completed': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-3">
      {assets.map((asset) => {
        const IconComponent = getIcon(getAssetTypeIcon(asset.type));
        
        return (
          <Card 
            key={asset.id} 
            className="hover:shadow-md transition-shadow cursor-pointer border-l-4"
            style={{ borderLeftColor: `var(--${asset.type?.toLowerCase()?.includes('contrato') ? 'red' : 'blue'}-500)` }}
            onClick={() => onAssetClick(asset)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-muted">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  
                  <div>
                    <h4 className="font-medium">{asset.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {asset.type} · {formatAssetAmount(asset.amount || 0)}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{formatDate(asset.startDate)}</span>
                      </div>
                      
                      <Badge className={`${getStatusColor(asset.status)}`}>
                        {getAssetStatusLabel(asset.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AssetList;
