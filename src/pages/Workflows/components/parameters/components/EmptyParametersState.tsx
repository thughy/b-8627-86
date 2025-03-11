
import React from 'react';
import { Settings, PlusCircle, FileText, Database, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyParametersStateProps {
  onAddParameter?: () => void;
  showAddButton?: boolean;
  message?: string;
  icon?: 'settings' | 'document' | 'database' | 'parameters';
  className?: string;
  size?: 'default' | 'small';
}

const EmptyParametersState: React.FC<EmptyParametersStateProps> = ({ 
  onAddParameter, 
  showAddButton = false,
  message = "Nenhum parâmetro definido.",
  icon = 'settings',
  className,
  size = 'default'
}) => {
  const getIcon = () => {
    const iconSize = size === 'default' ? "h-10 w-10 text-muted-foreground/60" : "h-8 w-8 text-muted-foreground/60";
    
    switch (icon) {
      case 'settings': return <Settings className={iconSize} />;
      case 'document': return <FileText className={iconSize} />;
      case 'database': return <Database className={iconSize} />;
      case 'parameters': return <LayoutList className={iconSize} />; // Using LayoutList instead of Gantt
      default: return <Settings className={iconSize} />;
    }
  };

  return (
    <div className={cn(
      "text-center border border-dashed rounded-md border-muted-foreground/30 bg-muted/20",
      size === 'default' ? "py-8 px-4" : "py-4 px-3",
      className
    )}>
      <div className="flex justify-center mb-3">
        <div className="bg-muted/30 p-3 rounded-full">
          {getIcon()}
        </div>
      </div>
      <p className={cn(
        "text-muted-foreground",
        size === 'default' ? "mb-4" : "mb-3 text-sm"
      )}>
        {message}
      </p>
      
      {showAddButton && onAddParameter && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={onAddParameter}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Adicionar Parâmetro</span>
        </Button>
      )}
    </div>
  );
};

export default EmptyParametersState;
