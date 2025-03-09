
import { useState } from 'react';
import { Deal, Stage } from '@/pages/Workflows/models/WorkflowModels';
import { DropResult } from 'react-beautiful-dnd';
import { useToast } from "@/hooks/use-toast";

export const useDragAndDrop = (stages: Stage[], deals: Deal[], setDeals: React.Dispatch<React.SetStateAction<Deal[]>>) => {
  const { toast } = useToast();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    
    // Dropped outside a valid droppable area
    if (!destination) return;
    
    // Dropped in the same position
    if (source.droppableId === destination.droppableId && 
        source.index === destination.index) return;
    
    // If dropped in a different stage, update the deal's stageId
    if (source.droppableId !== destination.droppableId) {
      // Update the deal's stageId
      setDeals(prevDeals => 
        prevDeals.map(deal => 
          deal.id === draggableId 
            ? { ...deal, stageId: destination.droppableId } 
            : deal
        )
      );
      
      // Find stage name for toast message
      const targetStage = stages.find(stage => stage.id === destination.droppableId);
      const stageName = targetStage ? targetStage.title : 'novo estágio';
      
      toast({
        title: "Negócio movido",
        description: `O negócio foi movido para ${stageName} com sucesso.`,
      });
    } else {
      // Reordering within the same stage (future enhancement)
      // This would require adding an 'order' property to deals
      // and implementing logic to reorder within a stage
    }
  };

  return { handleDragEnd };
};
