
import { useState } from 'react';

export type ContentViewMode = 'deals' | 'tasks';
export type DisplayViewMode = 'kanban' | 'list';
export type ViewMode = ContentViewMode | DisplayViewMode;

export const useWorkflowViews = () => {
  const [contentMode, setContentMode] = useState<ContentViewMode>('deals');
  const [displayMode, setDisplayMode] = useState<DisplayViewMode>('kanban');

  // For backward compatibility with code expecting a single viewMode
  const setViewMode = (mode: ViewMode) => {
    if (mode === 'deals' || mode === 'tasks') {
      setContentMode(mode);
    } else if (mode === 'kanban' || mode === 'list') {
      setDisplayMode(mode);
    }
  };

  return { 
    contentMode, 
    setContentMode,
    displayMode,
    setDisplayMode,
    // Combined getter and setter for backward compatibility
    viewMode: contentMode as ViewMode,
    setViewMode
  };
};
