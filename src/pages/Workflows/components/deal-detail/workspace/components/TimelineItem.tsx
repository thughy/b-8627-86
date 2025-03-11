
import React from 'react';
import { TimelineItemType } from '../models/TimelineTypes';
import { 
  FileText, 
  MessageSquare, 
  CheckSquare, 
  Mail, 
  Package,
  ExternalLink
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
  // Helper function to get the right icon
  const getItemIcon = () => {
    switch (item.type) {
      case 'note':
        return <MessageSquare className="h-4 w-4" />;
      case 'task':
        return <CheckSquare className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'asset':
        return <Package className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  // Helper function to get status color
  const getStatusColor = () => {
    if (!item.status) return '';
    
    switch (item.status.toLowerCase()) {
      case 'completed':
      case 'concluído':
        return 'bg-green-500';
      case 'processing':
      case 'processando':
        return 'bg-blue-500';
      case 'cancelled':
      case 'cancelado':
        return 'bg-red-500';
      case 'open':
      case 'aberto':
        return 'bg-yellow-500';
      case 'pending':
      case 'pendente':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      className="mb-6 cursor-pointer hover:bg-muted/40 rounded-md p-2 transition-colors"
      onClick={() => onItemClick(item)}
    >
      {/* Circle with type icon */}
      <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ring-8 ring-white dark:ring-gray-900 bg-primary">
        {getItemIcon()}
      </div>
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div className="flex-1">
          <h3 className="flex items-center text-lg font-semibold">
            {item.title}
            {item.status && (
              <Badge variant="outline" className="ml-2">
                <span className={cn("inline-block w-2 h-2 rounded-full mr-1", getStatusColor())}></span>
                {item.status}
              </Badge>
            )}
          </h3>
          
          {item.description && (
            <p className="text-muted-foreground text-sm mb-1 line-clamp-2">
              {item.description}
            </p>
          )}
          
          <div className="flex mt-1 gap-2 items-center">
            <span className="text-xs text-muted-foreground">
              {formatRelativeDate(item.date)}
            </span>
            <span className="text-xs text-muted-foreground flex items-center">
              <ExternalLink className="h-3 w-3 mr-1" />
              Visualizar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
