
import React from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import {
  getAssetTypeColor,
  formatAssetAmount
} from '@/pages/Workflows/components/asset-modal/utils/assetTypeUtils';
import { LucideIcon, FileText, Package, Tool, User, FileCheck, Briefcase, Home, Car, Scale, File, Ticket, ShoppingCart, CreditCard, Box } from 'lucide-react';

interface AssetListProps {
  assets?: Asset[];
  onAssetClick?: (asset: Asset) => void;
}

// Helper function to get icon based on asset type
const getIconForAssetType = (type: string): LucideIcon => {
  const normalizedType = type.toLowerCase();
  
  if (normalizedType.includes('contract')) return FileText;
  if (normalizedType.includes('product')) return Package;
  if (normalizedType.includes('service')) return Tool;
  if (normalizedType.includes('lead')) return User;
  if (normalizedType.includes('proposal')) return FileCheck;
  if (normalizedType.includes('project')) return Briefcase;
  if (normalizedType.includes('property')) return Home;
  if (normalizedType.includes('vehicle')) return Car;
  if (normalizedType.includes('legal')) return Scale;
  if (normalizedType.includes('document')) return File;
  if (normalizedType.includes('ticket')) return Ticket;
  if (normalizedType.includes('order')) return ShoppingCart;
  if (normalizedType.includes('payment')) return CreditCard;
  
  return Box; // default icon
};

const AssetList: React.FC<AssetListProps> = ({ assets = [], onAssetClick }) => {
  if (!assets || assets.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        Nenhum asset cadastrado.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {assets.map((asset) => {
        const Icon = getIconForAssetType(asset.type);
        const assetTypeColor = getAssetTypeColor(asset.type);
        
        return (
          <div
            key={asset.id}
            className="flex items-center p-3 rounded-md border hover:bg-accent/30 cursor-pointer"
            onClick={() => onAssetClick && onAssetClick(asset)}
          >
            <div className={`${assetTypeColor} text-white p-2 rounded-md mr-3`}>
              <Icon className="h-5 w-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{asset.title}</div>
              <div className="text-sm text-muted-foreground">
                {asset.type} {asset.amount && `• ${formatAssetAmount(asset.amount)}`}
              </div>
            </div>
            
            <div className="flex items-center">
              <div className={`
                px-2 py-1 rounded-full text-xs 
                ${asset.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  asset.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  asset.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'}
              `}>
                {asset.status === 'open' ? 'Aberto' : 
                 asset.status === 'processing' ? 'Processando' :
                 asset.status === 'completed' ? 'Concluído' : 'Cancelado'}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssetList;
