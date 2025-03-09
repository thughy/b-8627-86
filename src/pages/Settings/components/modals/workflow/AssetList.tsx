
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Search } from "lucide-react";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getAssets } from "@/pages/Settings/services/settingsService";

interface AssetListProps {
  stageId: string;
  assets: Asset[];
  selectedAsset: Asset | null;
  setSelectedAsset: React.Dispatch<React.SetStateAction<Asset | null>>;
  handleDeleteAsset: (assetId: string) => void;
}

const AssetList = ({
  stageId,
  assets,
  selectedAsset,
  setSelectedAsset,
  handleDeleteAsset
}: AssetListProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [allAssets] = useState<Asset[]>(getAssets());
  const [selectedAssetId, setSelectedAssetId] = useState<string>("");
  
  // Filter existing assets by stage (using dealId as a proxy for stageId)
  const stageAssets = assets.filter(asset => asset.dealId.includes(stageId));
  
  // Filter available assets (not already assigned to this stage)
  const availableAssets = allAssets.filter(asset => 
    !stageAssets.some(a => a.id === asset.id) && 
    asset.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExistingAsset = () => {
    if (!selectedAssetId) {
      toast({
        title: "Selecione um asset",
        description: "Por favor, selecione um asset para adicionar a este estágio.",
        variant: "destructive"
      });
      return;
    }

    const assetToAdd = allAssets.find(asset => asset.id === selectedAssetId);
    if (assetToAdd) {
      // Create a copy of the asset with the new stageId
      const newAsset = {
        ...assetToAdd,
        dealId: stageId, // Use dealId to associate with the stage
        updatedAt: new Date()
      };
      
      // This would add the asset to the list
      // In a real implementation, this would be handled by the parent component
      
      toast({
        title: "Asset adicionado",
        description: `${assetToAdd.title} foi adicionado a este estágio.`,
      });
      
      // Clear the selection
      setSelectedAssetId("");
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <h4 className="text-sm font-medium">Adicionar Asset Existente</h4>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar assets..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedAssetId} onValueChange={setSelectedAssetId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar asset" />
            </SelectTrigger>
            <SelectContent>
              {availableAssets.length > 0 ? (
                availableAssets.map(asset => (
                  <SelectItem key={asset.id} value={asset.id}>
                    {asset.title}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>
                  Nenhum asset disponível
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <Button size="sm" onClick={handleAddExistingAsset}>
            <Plus className="h-4 w-4 mr-1" />
            Adicionar
          </Button>
        </div>
      </div>

      <div className="space-y-2 pl-2">
        <h4 className="text-sm font-medium">Assets neste estágio</h4>
        {stageAssets.length > 0 ? (
          stageAssets.map(asset => (
            <div 
              key={asset.id}
              className={`p-2 border rounded-md flex justify-between items-center hover:bg-accent/30 cursor-pointer transition-colors ${selectedAsset?.id === asset.id ? 'border-l-4 border-primary' : ''}`}
              onClick={() => setSelectedAsset(asset)}
            >
              <div>
                <div className="font-medium">{asset.title}</div>
                <div className="text-xs text-muted-foreground">{asset.type}</div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteAsset(asset.id);
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))
        ) : (
          <div className="text-sm text-muted-foreground p-2">
            Nenhum asset adicionado
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetList;
