
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
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
  const [availableAssets, setAvailableAssets] = useState<Asset[]>([]);
  
  // Load available assets for dropdown
  useEffect(() => {
    const loadAssets = () => {
      const assetData = getAssets();
      setAvailableAssets(assetData);
    };
    
    loadAssets();
  }, []);
  
  const stageAssets = assets.filter(a => a.dealId === stageId);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <select 
          className="flex-1 p-2 rounded-md border"
        >
          <option value="">Selecionar asset</option>
          {availableAssets.map(asset => (
            <option key={asset.id} value={asset.id}>{asset.title}</option>
          ))}
        </select>
        <Button size="sm">
          Adicionar
        </Button>
      </div>
      
      {stageAssets.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <div className="divide-y">
            {stageAssets.map(asset => (
              <div
                key={asset.id}
                className={`flex items-center justify-between p-3 cursor-pointer hover:bg-muted ${
                  selectedAsset?.id === asset.id ? "bg-primary/5" : ""
                }`}
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`h-2 w-2 rounded-full ${
                    asset.status === 'completed' ? 'bg-green-500' :
                    asset.status === 'processing' ? 'bg-yellow-500' :
                    asset.status === 'cancelled' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <span>{asset.title}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAsset(asset.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center p-4 border rounded-md text-muted-foreground">
          Nenhum asset adicionado a este estágio
        </div>
      )}
    </div>
  );
};

export default AssetList;
