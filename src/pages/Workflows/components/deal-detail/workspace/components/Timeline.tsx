
import React from 'react';
import { TimelineItemType } from '../models/TimelineTypes';
import TimelineItem from './TimelineItem';

interface TimelineProps {
  items: TimelineItemType[];
  onItemClick: (item: TimelineItemType) => void;
  formatRelativeDate: (date: Date) => string;
}

const Timeline: React.FC<TimelineProps> = ({ 
  items, 
  onItemClick, 
  formatRelativeDate 
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        Nenhum item disponível para este filtro.
      </div>
    );
  }

  return (
    <div className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-800">
      {items.map((item) => (
        <TimelineItem 
          key={item.id} 
          item={item} 
          onItemClick={onItemClick} 
          formatRelativeDate={formatRelativeDate} 
        />
      ))}
    </div>
  );
};

export default Timeline;
