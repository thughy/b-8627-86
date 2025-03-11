
import { useState } from 'react';

export const useWorkflowViews = () => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'deals' | 'tasks'>('deals');

  return { viewMode, setViewMode };
};
