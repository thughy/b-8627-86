
import { useState } from 'react';
import { Workflow, Pipeline } from '@/pages/Workflows/models/WorkflowModels';

export const useWorkflowSelection = (workflows: Workflow[], pipelines: Pipeline[]) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>(workflows[0]?.id || '');
  const [selectedPipeline, setSelectedPipeline] = useState<string>(pipelines[0]?.id || '');

  return {
    selectedWorkflow,
    setSelectedWorkflow,
    selectedPipeline,
    setSelectedPipeline
  };
};
