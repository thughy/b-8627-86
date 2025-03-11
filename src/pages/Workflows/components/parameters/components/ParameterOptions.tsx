
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2 } from 'lucide-react';

interface ParameterOptionsProps {
  options: string[];
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
  onOptionChange: (index: number, value: string) => void;
}

const ParameterOptions: React.FC<ParameterOptionsProps> = ({
  options,
  onAddOption,
  onRemoveOption,
  onOptionChange
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">Opções</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddOption}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-3 w-3" />
          <span className="text-xs">Adicionar</span>
        </Button>
      </div>
      
      <div className="space-y-2">
        {options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex gap-2">
            <Input
              placeholder={`Opção ${optionIndex + 1}`}
              value={option}
              onChange={(e) => onOptionChange(optionIndex, e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemoveOption(optionIndex)}
              className="text-destructive"
              disabled={options.length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParameterOptions;
