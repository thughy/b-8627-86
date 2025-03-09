
import React from "react";
import { CollapsibleContent } from "@/components/ui/collapsible";
import AgentList from "./AgentList";
import AssetList from "./AssetList";
import { Agent, Asset } from "@/pages/Workflows/models/WorkflowModels";

interface StageContentProps {
  stageId: string;
  agents: Agent[];
  assets: Asset[];
  selectedAgent: Agent | null;
  setSelectedAgent: React.Dispatch<React.SetStateAction<Agent | null>>;
  selectedAsset: Asset | null;
  setSelectedAsset: React.Dispatch<React.SetStateAction<Asset | null>>;
  newAgent: Partial<Agent>;
  setNewAgent: React.Dispatch<React.SetStateAction<Partial<Agent>>>;
  newAsset: Partial<Asset>;
  setNewAsset: React.Dispatch<React.SetStateAction<Partial<Asset>>>;
  handleAddAgent: (stageId: string) => void;
  handleAddAsset: (stageId: string) => void;
  handleDeleteAgent: (agentId: string) => void;
  handleDeleteAsset: (assetId: string) => void;
}

const StageContent = ({
  stageId,
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
  handleAddAgent,
  handleAddAsset,
  handleDeleteAgent,
  handleDeleteAsset
}: StageContentProps) => {
  return (
    <CollapsibleContent>
      <div className="p-3 pl-6 border-t bg-background/20">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div>
                <div className="mb-1 text-sm font-medium">Agente</div>
                <AgentList
                  stageId={stageId}
                  agents={agents}
                  selectedAgent={selectedAgent}
                  setSelectedAgent={setSelectedAgent}
                  handleDeleteAgent={handleDeleteAgent}
                  handleAddAgent={handleAddAgent}
                  newAgent={newAgent}
                  setNewAgent={setNewAgent}
                />
              </div>
              <div>
                <div className="mb-1 text-sm font-medium">Asset</div>
                <AssetList
                  stageId={stageId}
                  assets={assets}
                  selectedAsset={selectedAsset}
                  setSelectedAsset={setSelectedAsset}
                  handleDeleteAsset={handleDeleteAsset}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleContent>
  );
};

export default StageContent;
