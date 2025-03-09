
import React from "react";
import { Stage, Deal, Agent } from "@/pages/Workflows/models/WorkflowModels";
import { Button } from "@/components/ui/button";
import { Plus, User, ChevronDown } from "lucide-react";
import DealList from "./DealList";
import { getDealsByStage } from "./utils/dealUtils";
import { Droppable } from "react-beautiful-dnd";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StageColumnProps {
  stage: Stage;
  deals: Deal[];
  agents?: Agent[];
  onDealClick: (deal: Deal) => void;
  onAction?: (action: string, data?: any) => void;
  onAgentSelect?: (stageId: string, agentId: string) => void;
  pipelineId?: string;
  getChatPreview?: (dealId: string) => any[];
}

const StageColumn: React.FC<StageColumnProps> = ({
  stage,
  deals,
  agents = [],
  onDealClick,
  onAction,
  onAgentSelect,
  pipelineId,
  getChatPreview
}) => {
  const stageDeals = getDealsByStage(deals, stage.id);
  const stageAgents = agents.filter(agent => agent.stageId === stage.id);
  
  return (
    <div className="flex-1 min-w-[300px]">
      <div className="bg-muted/40 rounded-md p-3 h-full flex flex-col border border-border/40">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-sm">{stage.title}</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {stageDeals.length}
          </span>
        </div>
        
        {/* Agent Selector Dropdown */}
        <div className="mb-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-full justify-between">
                <div className="flex items-center">
                  <User className="h-3.5 w-3.5 mr-2" />
                  <span className="text-xs">Selecionar Agente</span>
                </div>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-[#222222]">
              {stageAgents.length > 0 ? (
                stageAgents.map((agent) => (
                  <DropdownMenuItem 
                    key={agent.id}
                    onClick={() => onAgentSelect && onAgentSelect(stage.id, agent.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${
                        agent.status === 'active' ? 'bg-green-500' :
                        agent.status === 'paused' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span>{agent.profile.agentName}</span>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>
                  Nenhum agente disponível
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Droppable droppableId={stage.id}>
          {(provided) => (
            <div 
              className="space-y-3 flex-1 min-h-[200px] rounded-md p-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <DealList 
                deals={stageDeals} 
                onDealClick={onDealClick}
                getChatPreview={getChatPreview}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-3 justify-start text-muted-foreground hover:text-foreground"
          onClick={() => {
            if (onAction) {
              onAction("createDeal", { stageId: stage.id, pipelineId });
            }
          }}
        >
          <Plus className="h-4 w-4 mr-1" />
          Adicionar Deal
        </Button>
      </div>
    </div>
  );
};

export default StageColumn;
