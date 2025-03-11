
import { useState } from 'react';

export type ContentViewMode = 'deals' | 'tasks';
export type DisplayViewMode = 'kanban' | 'list';
export type ViewMode = ContentViewMode | DisplayViewMode;

export const useWorkflowViews = () => {
  const [contentMode, setContentMode] = useState<ContentViewMode>('deals');
  const [displayMode, setDisplayMode] = useState<DisplayViewMode>('kanban');

  return { 
    contentMode, 
    setContentMode,
    displayMode,
    setDisplayMode,
    // Combined getter for backward compatibility
    viewMode: contentMode as ViewMode
  };
};
