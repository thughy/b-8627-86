
import { useState } from 'react';

export const useWorkflowViews = () => {
  const [viewMode, setViewMode] = useState<'deals' | 'tasks'>('deals');

  return { viewMode, setViewMode };
};
