
import React from 'react';
import { FolderKanban, MoreVertical } from 'lucide-react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import {
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface AssetModalHeaderProps {
  asset: Asset;
  onCompleteAsset?: (assetId: string) => void;
  onCancelAsset?: (assetId: string) => void;
  onDeleteAsset?: (assetId: string) => void;
}

const AssetModalHeader: React.FC<AssetModalHeaderProps> = ({
  asset,
  onCompleteAsset,
  onCancelAsset,
  onDeleteAsset
}) => {
  return (
    <DialogHeader className="p-6 pb-2 flex-shrink-0">
      <div className="flex items-center justify-between">
        <DialogTitle className="text-xl font-bold flex items-center gap-2">
          <FolderKanban className="h-5 w-5 text-primary" />
          {asset.title}
        </DialogTitle>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4 mr-2" />
                Ações
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onCompleteAsset && (
                <DropdownMenuItem onClick={() => onCompleteAsset(asset.id)}>
                  Concluir
                </DropdownMenuItem>
              )}
              {onCancelAsset && (
                <DropdownMenuItem onClick={() => onCancelAsset(asset.id)}>
                  Cancelar
                </DropdownMenuItem>
              )}
              {onDeleteAsset && (
                <DropdownMenuItem 
                  className="text-red-500 focus:text-red-500" 
                  onClick={() => onDeleteAsset(asset.id)}
                >
                  Excluir
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </DialogHeader>
  );
};

export default AssetModalHeader;
