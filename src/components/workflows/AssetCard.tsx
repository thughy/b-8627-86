
import React from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Calendar, DollarSign } from 'lucide-react';

interface AssetCardProps {
  asset: Asset;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  const getStatusColor = (status: Asset['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'processing':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{asset.title}</h3>
            <p className="text-sm text-muted-foreground">{asset.description}</p>
          </div>
          <Badge className={getStatusColor(asset.status)}>
            {asset.status === 'completed' ? 'Concluído' : 
             asset.status === 'processing' ? 'Processando' : 
             asset.status === 'cancelled' ? 'Cancelado' : 'Aberto'}
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{asset.type}</span>
          </div>
          {asset.amount && (
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{formatCurrency(asset.amount)}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{formatDate(asset.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;
