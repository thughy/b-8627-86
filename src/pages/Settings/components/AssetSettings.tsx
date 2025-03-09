
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { getAssets } from "../services/settingsService";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import AssetConfigModal from "./modals/AssetConfigModal";
import AssetFilters from "./assets/AssetFilters";
import AssetList from "./assets/AssetList";

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
        <AssetFilters 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />

        <AssetList 
          assets={filteredAssets} 
          onViewAsset={handleViewAsset}
          onEditAsset={handleEditAsset} 
          onDeleteAsset={handleDeleteAsset} 
        />
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
