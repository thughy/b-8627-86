
import React, { useState } from 'react';
import KanbanBoard from '@/components/workflows/KanbanBoard';
import { Stage, Deal } from '@/pages/Workflows/models/WorkflowModels';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkflowKanbanViewProps {
  stages: Stage[];
  deals: Deal[];
  onDragEnd: (result: any) => void;
  onDealClick: (deal: Deal) => void;
  onCreateDeal: () => void;
  selectedPipeline: string | null;
  pipelines: { id: string; title: string }[];
  onPipelineChange: (pipelineId: string) => void;
  getChatPreview?: (dealId: string) => any[];
}

const WorkflowKanbanView: React.FC<WorkflowKanbanViewProps> = ({
  stages,
  deals,
  onDragEnd,
  onDealClick,
  onCreateDeal,
  selectedPipeline,
  pipelines,
  onPipelineChange,
  getChatPreview
}) => {
  const { toast } = useToast();
  const [showEmptyStages, setShowEmptyStages] = useState(true);
  
  // Filtrar os estágios pelo pipeline selecionado
  const filteredStages = stages.filter(
    stage => !selectedPipeline || stage.pipelineId === selectedPipeline
  );
  
  // Mostrar os estágios vazios ou não
  const displayedStages = showEmptyStages 
    ? filteredStages 
    : filteredStages.filter(stage => deals.some(deal => deal.stageId === stage.id));
  
  if (filteredStages.length === 0) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-medium mb-2">Nenhum estágio encontrado</h3>
        <p className="text-muted-foreground mb-4">
          Selecione um pipeline ou configure estágios no pipeline atual.
        </p>
        <Button onClick={onCreateDeal}>
          <Plus className="mr-2 h-4 w-4" />
          Criar Deal
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-2">
        <div className="w-full md:w-72">
          <Select
            value={selectedPipeline || ""}
            onValueChange={onPipelineChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um Pipeline" />
            </SelectTrigger>
            <SelectContent>
              {pipelines.map((pipeline) => (
                <SelectItem key={pipeline.id} value={pipeline.id}>
                  {pipeline.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEmptyStages(!showEmptyStages)}
          >
            {showEmptyStages ? "Ocultar Estágios Vazios" : "Mostrar Todos Estágios"}
          </Button>
          
          <Button onClick={onCreateDeal} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Criar Deal
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <KanbanBoard
        stages={displayedStages}
        deals={deals}
        pipelineId={selectedPipeline || undefined}
        onDragEnd={onDragEnd}
        onDealClick={onDealClick}
        getChatPreview={getChatPreview}
      />
    </div>
  );
};

export default WorkflowKanbanView;
