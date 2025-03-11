
import React from 'react';
import { Settings, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyParametersStateProps {
  onAddParameter?: () => void;
  showAddButton?: boolean;
  message?: string;
}

const EmptyParametersState: React.FC<EmptyParametersStateProps> = ({ 
  onAddParameter, 
  showAddButton = false,
  message = "Nenhum parâmetro definido."
}) => {
  return (
    <div className="text-center py-8 px-4 border border-dashed rounded-md border-muted-foreground/30 bg-muted/20">
      <div className="flex justify-center mb-3">
        <Settings className="h-10 w-10 text-muted-foreground/60" />
      </div>
      <p className="text-muted-foreground mb-4">{message}</p>
      
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
