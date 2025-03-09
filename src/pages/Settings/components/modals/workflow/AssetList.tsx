
import React, { useState } from "react";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [allAssets] = useState<Asset[]>(getAssets());
  
  // Filter existing assets by stage (using dealId as a proxy for stageId)
  const stageAssetIds = assets
    .filter(asset => asset.dealId.includes(stageId))
    .map(asset => asset.id);
  
  // Get the current asset for this stage (should be only one)
  const currentStageAsset = assets.find(asset => asset.dealId.includes(stageId));
  
  // Filter available assets (not already assigned to this stage)
  const availableAssets = allAssets.filter(asset => 
    !stageAssetIds.includes(asset.id)
  );
  
  // Combined list for dropdown (current asset + available assets)
  const dropdownAssets = [
    ...(currentStageAsset ? [currentStageAsset] : []),
    ...availableAssets
  ];

  const handleAssetChange = (assetId: string) => {
    // If we already have an asset assigned to this stage, remove it
    if (currentStageAsset) {
      handleDeleteAsset(currentStageAsset.id);
    }
    
    // Find the new asset and set it as selected
    const newAsset = allAssets.find(asset => asset.id === assetId);
    if (newAsset) {
      setSelectedAsset(newAsset);
      
      // In a real implementation, this would add the asset to the stage
      // The parent component would handle this with the handleAddAsset function
    }
  };

  return (
    <div>
      <Select 
        value={currentStageAsset?.id || ""} 
        onValueChange={handleAssetChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecionar asset" />
        </SelectTrigger>
        <SelectContent>
          {dropdownAssets.length > 0 ? (
            dropdownAssets.map(asset => (
              <SelectItem key={asset.id} value={asset.id}>
                {asset.title} - {asset.type}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="none" disabled>
              Nenhum asset disponível
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AssetList;
