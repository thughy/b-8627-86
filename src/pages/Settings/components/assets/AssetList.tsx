
import React from "react";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import { Button } from "@/components/ui/button";
import { Edit, Trash, ExternalLink, FileText, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

interface AssetListProps {
  assets: Asset[];
  onEditAsset: (asset: Asset) => void;
  onDeleteAsset: (assetId: string) => void;
  viewMode?: 'grid' | 'list';
}

const AssetList = ({ 
  assets, 
  onEditAsset, 
  onDeleteAsset,
  viewMode = 'list'
}: AssetListProps) => {
  if (assets.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md bg-muted/10">
        <p className="text-muted-foreground">Nenhum asset encontrado.</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-500">Concluído</Badge>;
      case 'processing':
        return <Badge className="bg-amber-500">Processando</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelado</Badge>;
      default:
        return <Badge className="bg-blue-500">Aberto</Badge>;
    }
  };

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => (
          <Card key={asset.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{asset.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {asset.type}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditAsset(asset)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-500 focus:text-red-500"
                      onClick={() => onDeleteAsset(asset.id)}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <div className="text-sm">
                  {getStatusBadge(asset.status)}
                </div>
                {asset.amount && (
                  <div className="text-sm font-medium">
                    {formatCurrency(asset.amount)}
                  </div>
                )}
              </div>
              
              <div className="mt-3 text-xs text-muted-foreground">
                Criado em: {formatDate(asset.createdAt)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50 font-medium text-sm">
        <div className="col-span-2">Asset</div>
        <div>Tipo</div>
        <div>Status</div>
        <div className="text-right">Ações</div>
      </div>

      {assets.map((asset) => (
        <div
          key={asset.id}
          className="grid grid-cols-5 gap-4 p-4 items-center border-t hover:bg-muted/10"
        >
          <div className="col-span-2">
            <div className="font-medium">{asset.title}</div>
            <div className="text-sm text-muted-foreground">
              Criado em: {formatDate(asset.createdAt)}
            </div>
            {asset.amount && (
              <div className="text-sm font-medium mt-1">
                {formatCurrency(asset.amount)}
              </div>
            )}
          </div>

          <div className="text-sm">
            {asset.type}
          </div>

          <div>
            {getStatusBadge(asset.status)}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEditAsset(asset)}
              title="Editar"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteAsset(asset.id)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              title="Excluir"
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              title="Abrir asset"
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
