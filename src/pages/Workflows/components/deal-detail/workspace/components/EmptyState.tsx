
import React from 'react';

interface EmptyStateProps {
  message: string;
  preventBubbling?: (e: React.MouseEvent) => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, preventBubbling }) => {
  return (
    <div 
      className="p-4 text-center text-sm text-muted-foreground bg-background shadow-md rounded-md" 
      onClick={preventBubbling}
    >
      {message}
    </div>
  );
};

export default EmptyState;
