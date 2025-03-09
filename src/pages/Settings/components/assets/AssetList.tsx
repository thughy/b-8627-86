
import React from "react";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import { Button } from "@/components/ui/button";
import { Edit, Trash, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface AssetListProps {
  assets: Asset[];
  onEditAsset: (asset: Asset) => void;
  onDeleteAsset: (assetId: string) => void;
}

const AssetList = ({ assets, onEditAsset, onDeleteAsset }: AssetListProps) => {
  if (assets.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md bg-muted/10">
        <p className="text-muted-foreground">Nenhum asset encontrado.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 font-medium text-sm">
        <div>Asset</div>
        <div>Tipo</div>
        <div>Status</div>
        <div className="text-right">Ações</div>
      </div>

      {assets.map((asset) => (
        <div
          key={asset.id}
          className="grid grid-cols-4 gap-4 p-4 items-center border-t"
        >
          <div>
            <div className="font-medium">{asset.title}</div>
            <div className="text-sm text-muted-foreground">
              Criado em: {formatDate(asset.createdAt)}
            </div>
          </div>

          <div className="text-sm">
            {asset.type}
          </div>

          <div>
            <Badge
              className={
                asset.status === 'completed' ? 'bg-green-500' :
                asset.status === 'processing' ? 'bg-amber-500' :
                asset.status === 'cancelled' ? 'bg-red-500' : 'bg-blue-500'
              }
            >
              {asset.status === 'completed' ? 'Concluído' :
               asset.status === 'processing' ? 'Processando' :
               asset.status === 'cancelled' ? 'Cancelado' : 'Aberto'}
            </Badge>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEditAsset(asset)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteAsset(asset.id)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
            >
              <a href="#" className="text-blue-500">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssetList;
