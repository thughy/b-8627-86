
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface AssetListProps {
  assets: Asset[];
  onViewAsset: (asset: Asset) => void;
  onEditAsset: (asset: Asset) => void;
  onDeleteAsset: (asset: Asset) => void;
}

const AssetList = ({ 
  assets, 
  onViewAsset, 
  onEditAsset, 
  onDeleteAsset 
}: AssetListProps) => {
  
  const getStatusBadge = (status: Asset['status']) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Aberto</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Processando</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Concluído</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelado</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-md">
      <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
        <div className="col-span-2">Nome</div>
        <div className="col-span-1">Tipo</div>
        <div className="col-span-1">Valor</div>
        <div className="col-span-1 hidden md:block">Data</div>
        <div className="col-span-1">Ações</div>
      </div>

      <div className="divide-y">
        {assets.length > 0 ? (
          assets.map((asset) => (
            <div key={asset.id} className="grid grid-cols-6 gap-4 p-4 items-center">
              <div className="col-span-2">
                <div className="font-medium">{asset.title}</div>
                <div className="text-sm text-muted-foreground truncate">
                  {asset.description}
                </div>
                <div className="mt-1">
                  {getStatusBadge(asset.status)}
                </div>
              </div>
              <div className="col-span-1 text-muted-foreground">
                {asset.type}
              </div>
              <div className="col-span-1 text-muted-foreground">
                {asset.amount ? formatCurrency(asset.amount) : "—"}
              </div>
              <div className="col-span-1 hidden md:block text-muted-foreground">
                {formatDate(asset.createdAt)}
              </div>
              <div className="col-span-1 flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewAsset(asset)}>
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditAsset(asset)}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDeleteAsset(asset)}
                      className="text-red-500 focus:text-red-500"
                    >
                      Remover
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            Nenhum asset encontrado
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetList;
