
import React from 'react';
import { Asset } from '../models/WorkflowModels';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { getAssetTypeColor, getAssetTypeIcon, formatAssetAmount } from './asset-modal/utils/assetTypeUtils';
import { cn } from '@/lib/utils';

interface AssetListProps {
  assets: Asset[];
  onAssetClick: (asset: Asset) => void;
  onCreateAsset?: (dealId: string) => void;
  dealId?: string;
  className?: string;
  maxHeight?: string;
}

const AssetList = ({
  assets = [],
  onAssetClick,
  onCreateAsset,
  dealId,
  className,
  maxHeight = '300px'
}: AssetListProps) => {
  if (!assets || assets.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-4", className)}>
        <p className="text-muted-foreground text-sm mb-4">Nenhum asset encontrado</p>
        {onCreateAsset && dealId && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onCreateAsset(dealId)}
            className="flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Criar Asset
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <ScrollArea className={`pr-4 ${maxHeight ? `max-h-[${maxHeight}]` : ''}`}>
        <div className="space-y-2">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center p-2 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => onAssetClick(asset)}
            >
              <div className={cn("w-2 h-10 rounded-full mr-3", getAssetTypeColor(asset.type))}></div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium truncate">{asset.title}</h4>
                  <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded-full ml-2">
                    {asset.type}
                  </span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span>{formatAssetAmount(asset.amount)}</span>
                  <span className="mx-2">•</span>
                  <span className="capitalize">{asset.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      {onCreateAsset && dealId && (
        <div className="mt-4 flex justify-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onCreateAsset(dealId)}
            className="w-full flex items-center justify-center"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar Asset
          </Button>
        </div>
      )}
    </div>
  );
};

export default AssetList;
