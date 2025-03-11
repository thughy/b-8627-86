
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ParameterItem from './ParameterItem';
import { AssetParameter } from '../../asset-modal/utils/parameterUtils';

interface ParameterListProps {
  parameters: AssetParameter[];
  expandedParameter: number | null;
  maxHeight: string;
  onToggleExpand: (index: number) => void;
  onParameterChange: (index: number, field: string, value: any) => void;
  onRemoveParameter: (index: number) => void;
  onAddOption: (paramIndex: number) => void;
  onRemoveOption: (paramIndex: number, optionIndex: number) => void;
  onOptionChange: (paramIndex: number, optionIndex: number, value: string) => void;
}

const ParameterList: React.FC<ParameterListProps> = ({
  parameters,
  expandedParameter,
  maxHeight,
  onToggleExpand,
  onParameterChange,
  onRemoveParameter,
  onAddOption,
  onRemoveOption,
  onOptionChange
}) => {
  return (
    <ScrollArea className={`max-h-[${maxHeight}]`}>
      <div className="space-y-3">
        {parameters.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            Nenhum parâmetro definido. Clique em "Adicionar Parâmetro" para começar.
          </div>
        ) : (
          parameters.map((param, index) => (
            <ParameterItem
              key={index}
              parameter={param}
              index={index}
              isExpanded={expandedParameter === index}
              onToggleExpand={() => onToggleExpand(index)}
              onUpdate={(field, value) => onParameterChange(index, field, value)}
              onRemove={() => onRemoveParameter(index)}
              onAddOption={() => onAddOption(index)}
              onRemoveOption={(optionIndex) => onRemoveOption(index, optionIndex)}
              onOptionChange={(optionIndex, value) => onOptionChange(index, optionIndex, value)}
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default ParameterList;
