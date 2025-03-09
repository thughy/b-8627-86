
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Filter, Edit, Trash, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getAssets } from "../services/settingsService";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import AssetConfigModal from "./modals/AssetConfigModal";

const AssetSettings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [assets, setAssets] = useState<Asset[]>(getAssets());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>(undefined);

  const filteredAssets = assets.filter((asset) => 
    asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (asset.description && asset.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddAsset = () => {
    setSelectedAsset(undefined);
    setIsModalOpen(true);
  };

  const handleViewAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleEditAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleDeleteAsset = (asset: Asset) => {
    toast({
      title: "Remover Asset",
      description: `Tem certeza que deseja remover o asset: ${asset.title}?`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            setAssets(prev => prev.filter(a => a.id !== asset.id));
            toast({
              title: "Asset removido",
              description: `O asset ${asset.title} foi removido com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

  const handleSaveAsset = (assetData: Partial<Asset>) => {
    if (selectedAsset) {
      // Update existing asset
      setAssets(prev => 
        prev.map(a => 
          a.id === selectedAsset.id 
            ? { ...a, ...assetData, updatedAt: new Date() } 
            : a
        )
      );
    } else {
      // Add new asset
      const newAsset: Asset = {
        id: `asset-${Date.now()}`,
        dealId: "deal-new",
        title: assetData.title || "Novo Asset",
        description: assetData.description,
        type: assetData.type || "Contrato",
        amount: assetData.amount,
        status: assetData.status || "open",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setAssets(prev => [...prev, newAsset]);
    }
  };

  const getStatusBadge = (status: Asset['status']) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Aberto</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Processando</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Concluído</Badge>;
      case 'canceled':
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelado</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Gerenciamento de Assets</CardTitle>
            <CardDescription>
              Configure e gerencie seus assets
            </CardDescription>
          </div>
          <Button onClick={handleAddAsset} className="flex-shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Asset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar assets..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="border rounded-md">
          <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
            <div className="col-span-2">Nome</div>
            <div className="col-span-1">Tipo</div>
            <div className="col-span-1">Valor</div>
            <div className="col-span-1 hidden md:block">Data</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-right">Ações</div>
          </div>

          <div className="divide-y">
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <div key={asset.id} className="grid grid-cols-7 gap-4 p-4 items-center">
                  <div className="col-span-2">
                    <div className="font-medium">{asset.title}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {asset.description}
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
                  <div className="col-span-1">
                    {getStatusBadge(asset.status)}
                  </div>
                  <div className="col-span-1 flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleViewAsset(asset)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditAsset(asset)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteAsset(asset)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
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
      </CardContent>

      <AssetConfigModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        asset={selectedAsset}
        onSave={handleSaveAsset}
      />
    </Card>
  );
};

export default AssetSettings;
