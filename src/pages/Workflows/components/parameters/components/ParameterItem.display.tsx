
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { AssetParameter, getParameterTypeLabel } from '../../asset-modal/utils/parameterUtils';
import ParameterIcon from './ParameterIcon';
import ParameterValue from './ParameterValue';

interface ParameterItemDisplayProps {
  parameter: AssetParameter;
  onDelete?: () => void;
  readOnly?: boolean;
}

const ParameterItemDisplay: React.FC<ParameterItemDisplayProps> = ({ 
  parameter, 
  onDelete, 
  readOnly = false 
}) => {
  return (
    <div className="border rounded-md p-3 bg-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1 rounded">
            <ParameterIcon type={parameter.type} />
          </div>
          <span className="font-medium">{parameter.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{getParameterTypeLabel(parameter.type)}</Badge>
          {!readOnly && onDelete && (
            <Button variant="ghost" size="sm" onClick={onDelete} className="h-7 w-7 p-0">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
      </div>
      
      {parameter.description && (
        <p className="text-sm text-muted-foreground mb-2">
          {parameter.description}
        </p>
      )}
      
      <div className="bg-muted/50 px-3 py-2 rounded-sm text-sm">
        <ParameterValue parameter={parameter} />
      </div>
      
      {parameter.required && (
        <div className="mt-2">
          <Badge variant="secondary" className="text-xs">Obrigatório</Badge>
        </div>
      )}
    </div>
  );
};

export default ParameterItemDisplay;
