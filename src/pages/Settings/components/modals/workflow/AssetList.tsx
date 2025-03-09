
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";

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
  // Simulating relationship with stage by checking if dealId includes stageId
  const stageAssets = assets.filter(asset => asset.dealId.includes(stageId));
  
  return (
    <div className="space-y-2 pl-2">
      {stageAssets.map(asset => (
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
      ))}
    </div>
  );
};

export default AssetList;
