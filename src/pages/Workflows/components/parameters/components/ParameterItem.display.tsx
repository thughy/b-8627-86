
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssetParameter } from '../../asset-modal/utils/parameterUtils';
import ParameterValue from './ParameterValue';
import { cn } from '@/lib/utils';

interface ParameterItemDisplayProps {
  parameter: AssetParameter;
  onDelete?: () => void;
  onUpdate?: (value: any) => void;
  readOnly?: boolean;
  size?: 'default' | 'small';
}

const ParameterItemDisplay: React.FC<ParameterItemDisplayProps> = ({ 
  parameter, 
  onDelete,
  onUpdate,
  readOnly = false,
  size = 'default'
}) => {
  // Format parameter name for display (capitalize first letter, replace underscores with spaces)
  const formatParameterName = (name: string) => {
    if (!name) return '';
    return name
      .replace(/_/g, ' ')
      .replace(/^(.)|\s+(.)/g, (letter) => letter.toUpperCase());
  };

  return (
    <div className={cn(
      "flex justify-between items-center border rounded-md p-3 bg-background",
      size === 'small' ? 'text-sm' : ''
    )}>
      <div className="flex-1 min-w-0">
        <div className={cn(
          "font-medium truncate",
          size === 'small' ? 'text-sm' : ''
        )}>
          {formatParameterName(parameter.name || parameter.label || '')}
        </div>
        <div className="mt-1">
          <ParameterValue parameter={parameter} size={size} />
        </div>
      </div>
      
      {!readOnly && onDelete && (
        <Button 
          variant="ghost" 
          size={size === 'default' ? 'sm' : 'xs'} 
          className="ml-2 text-muted-foreground hover:text-destructive" 
          onClick={onDelete}
        >
          <Trash2 className={size === 'default' ? 'h-4 w-4' : 'h-3 w-3'} />
        </Button>
      )}
    </div>
  );
};

export default ParameterItemDisplay;
