
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import ParameterTypeSelect from './ParameterTypeSelect';
import ParameterOptions from './ParameterOptions';
import DefaultValueField from './DefaultValueField';
import { AssetParameter } from '../../asset-modal/utils/parameterUtils';

interface ParameterItemProps {
  parameter: AssetParameter;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onUpdate: (field: string, value: any) => void;
  onRemove: () => void;
  onAddOption: () => void;
  onRemoveOption: (optionIndex: number) => void;
  onOptionChange: (optionIndex: number, value: string) => void;
}

const ParameterItem: React.FC<ParameterItemProps> = ({
  parameter,
  index,
  isExpanded,
  onToggleExpand,
  onUpdate,
  onRemove,
  onAddOption,
  onRemoveOption,
  onOptionChange
}) => {
  return (
    <div className="border rounded-md p-3 space-y-3 bg-card">
      <div className="flex justify-between items-center">
        <div className="flex-1 flex gap-3">
          <Input
            placeholder="Nome do parâmetro"
            value={parameter.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            className="w-full"
          />
          <ParameterTypeSelect
            value={parameter.type}
            onValueChange={(value) => onUpdate('type', value)}
            className="w-[140px]"
          />
        </div>
        <div className="flex gap-2 ml-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggleExpand}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="pt-2 space-y-3 border-t">
          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <Textarea
              placeholder="Descrição do parâmetro"
              value={parameter.description || ''}
              onChange={(e) => onUpdate('description', e.target.value)}
              className="min-h-[60px]"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Switch
              checked={parameter.required || false}
              onCheckedChange={(checked) => onUpdate('required', checked)}
              id={`param-required-${index}`}
            />
            <label 
              htmlFor={`param-required-${index}`}
              className="text-sm cursor-pointer"
            >
              Obrigatório
            </label>
          </div>
          
          {parameter.type === 'select' && (
            <ParameterOptions
              options={parameter.options || ['']}
              onAddOption={onAddOption}
              onRemoveOption={onRemoveOption}
              onOptionChange={onOptionChange}
            />
          )}
          
          {parameter.type !== 'select' && (
            <DefaultValueField
              type={parameter.type}
              value={parameter.value}
              onChange={(value) => onUpdate('value', value)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ParameterItem;
