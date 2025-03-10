
import React from 'react';
import { TimelineItemType } from '../models/TimelineTypes';
import { Clock, FolderKanban, ClipboardList, FileText, Mail, Paperclip } from 'lucide-react';

interface TimelineItemProps {
  item: TimelineItemType;
  onItemClick: (item: TimelineItemType) => void;
  formatRelativeDate: (date: Date) => string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  item, 
  onItemClick, 
  formatRelativeDate 
}) => {
  // Function to render the icon based on the type of item
  const getItemIcon = (type: string) => {
    switch (type) {
      case 'asset': return <FolderKanban className="h-4 w-4 text-blue-500" />;
      case 'task': return <ClipboardList className="h-4 w-4 text-green-500" />;
      case 'note': return <FileText className="h-4 w-4 text-yellow-500" />;
      case 'email': return <Mail className="h-4 w-4 text-red-500" />;
      case 'document': return <Paperclip className="h-4 w-4 text-purple-500" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div 
      className="mb-6 relative"
      onClick={() => onItemClick(item)}
    >
      {/* Marcador de tempo na timeline */}
      <div className="absolute -left-[17px] p-1 rounded-full bg-background border-2 border-gray-200 dark:border-gray-800">
        {getItemIcon(item.type)}
      </div>
      
      {/* Conteúdo do item */}
      <div className={`p-3 border rounded-md ml-2 hover:bg-accent/10 transition-colors ${item.type === 'asset' ? 'cursor-pointer' : ''}`}>
        <div className="flex justify-between items-start">
          <div className="font-medium">{item.title}</div>
          <div className="text-xs text-muted-foreground flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formatRelativeDate(item.date)}
          </div>
        </div>
        
        {item.description && (
          <div className="text-sm text-muted-foreground mt-1">
            {item.description}
          </div>
        )}
        
        <div className="flex justify-between mt-2">
          <span className="text-xs bg-primary/10 px-2 py-1 rounded">
            {item.type === 'document' ? 'anexo' : item.type}
            {item.metadata?.assetType && ` - ${item.metadata.assetType}`}
          </span>
          {item.status && (
            <span className="text-xs bg-primary/10 px-2 py-1 rounded">
              {item.status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
