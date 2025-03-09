
import { useState } from 'react';

export const useWorkflowViews = () => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  
  return {
    viewMode,
    setViewMode,
  };
};
