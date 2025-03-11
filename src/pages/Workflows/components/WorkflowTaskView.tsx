
import React from 'react';
import WorkflowKanbanTask from './WorkflowKanbanTask';

interface WorkflowTaskViewProps {
  workflowId?: string;
}

const WorkflowTaskView: React.FC<WorkflowTaskViewProps> = ({ workflowId }) => {
  return (
    <div className="mt-4">
      <WorkflowKanbanTask workflowId={workflowId} />
    </div>
  );
};

export default WorkflowTaskView;
