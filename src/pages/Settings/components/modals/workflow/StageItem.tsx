
import React from "react";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash, ChevronRight, ChevronDown } from "lucide-react";
import { Stage } from "@/pages/Workflows/models/WorkflowModels";
import StageContent from "./StageContent";

interface StageItemProps {
  stage: Stage;
  isSelected: boolean;
  isExpanded: boolean;
  agents: any[];
  assets: any[];
  selectedAgent: any | null;
  setSelectedAgent: React.Dispatch<React.SetStateAction<any | null>>;
  selectedAsset: any | null;
  setSelectedAsset: React.Dispatch<React.SetStateAction<any | null>>;
  newAgent: Partial<any>;
  setNewAgent: React.Dispatch<React.SetStateAction<Partial<any>>>;
  newAsset: Partial<any>;
  setNewAsset: React.Dispatch<React.SetStateAction<Partial<any>>>;
  onSelect: () => void;
  onToggleExpand: () => void;
  onDelete: () => void;
  handleAddAgent: (stageId: string) => void;
  handleAddAsset: (stageId: string) => void;
  handleDeleteAgent: (agentId: string) => void;
  handleDeleteAsset: (assetId: string) => void;
}

const StageItem = ({
  stage,
  isSelected,
  isExpanded,
  agents,
  assets,
  selectedAgent,
  setSelectedAgent,
  selectedAsset,
  setSelectedAsset,
  newAgent,
  setNewAgent,
  newAsset,
  setNewAsset,
  onSelect,
  onToggleExpand,
  onDelete,
  handleAddAgent,
  handleAddAsset,
  handleDeleteAgent,
  handleDeleteAsset
}: StageItemProps) => {
  return (
    <Collapsible 
      key={stage.id}
      open={isExpanded}
      onOpenChange={onToggleExpand}
      className="border rounded-md"
    >
      <CollapsibleTrigger asChild>
        <div 
          className={`p-2 flex justify-between items-center cursor-pointer hover:bg-accent/50 transition-colors ${isSelected ? 'border-l-4 border-primary' : ''}`}
          onClick={onSelect}
        >
          <div className="flex items-center gap-2">
            <Badge variant="outline">{stage.order}</Badge>
            <div className="font-medium">{stage.title}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
            {isExpanded ? 
              <ChevronDown className="h-5 w-5" /> : 
              <ChevronRight className="h-5 w-5" />
            }
          </div>
        </div>
      </CollapsibleTrigger>
      <StageContent 
        stageId={stage.id}
        agents={agents}
        assets={assets}
        selectedAgent={selectedAgent}
        setSelectedAgent={setSelectedAgent}
        selectedAsset={selectedAsset}
        setSelectedAsset={setSelectedAsset}
        newAgent={newAgent}
        setNewAgent={setNewAgent}
        newAsset={newAsset}
        setNewAsset={setNewAsset}
        handleAddAgent={handleAddAgent}
        handleAddAsset={handleAddAsset}
        handleDeleteAgent={handleDeleteAgent}
        handleDeleteAsset={handleDeleteAsset}
      />
    </Collapsible>
  );
};

export default StageItem;
