
import { useCallback } from "react";
import { Stage } from "@/pages/Workflows/models/WorkflowModels";

export const useStageItemLogic = (
  stage: Stage,
  selectedStage: Stage | null,
  setSelectedStage: React.Dispatch<React.SetStateAction<Stage | null>>,
  expandedStages: Record<string, boolean>,
  toggleStageExpand: (stageId: string) => void,
  handleDeleteStage: (stageId: string) => void
) => {
  const isSelected = selectedStage?.id === stage.id;
  const isExpanded = expandedStages[stage.id];

  const onSelect = useCallback(() => {
    setSelectedStage(stage);
  }, [stage, setSelectedStage]);

  const onToggleExpand = useCallback(() => {
    toggleStageExpand(stage.id);
  }, [stage.id, toggleStageExpand]);

  const onDelete = useCallback(() => {
    handleDeleteStage(stage.id);
  }, [stage.id, handleDeleteStage]);

  return {
    isSelected,
    isExpanded,
    onSelect,
    onToggleExpand,
    onDelete
  };
};
