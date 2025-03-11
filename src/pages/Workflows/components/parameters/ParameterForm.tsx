
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { AssetParameter, createDefaultParameter } from '../asset-modal/utils/parameterUtils';
import SimpleParameterForm from './components/SimpleParameterForm';
import ParameterList from './components/ParameterList';

interface ParameterFormProps {
  parameters: AssetParameter[];
  onChange: (parameters: AssetParameter[]) => void;
  maxHeight?: string;
  onSubmit?: (name: string, value: any, type: string) => void;
  onCancel?: () => void;
}

const ParameterForm: React.FC<ParameterFormProps> = ({ 
  parameters, 
  onChange,
  maxHeight = "500px",
  onSubmit,
  onCancel
}) => {
  const [expandedParameter, setExpandedParameter] = useState<number | null>(null);
  const [newParameter, setNewParameter] = useState<AssetParameter>(createDefaultParameter());
  
  const handleAddParameter = () => {
    if (onSubmit) {
      onSubmit(newParameter.name, newParameter.value, newParameter.type);
      setNewParameter(createDefaultParameter());
    } else {
      const newParam = createDefaultParameter();
      onChange([...parameters, newParam]);
    }
  };
  
  const handleRemoveParameter = (index: number) => {
    const updatedParams = [...parameters];
    updatedParams.splice(index, 1);
    onChange(updatedParams);
    
    if (expandedParameter === index) {
      setExpandedParameter(null);
    } else if (expandedParameter !== null && expandedParameter > index) {
      setExpandedParameter(expandedParameter - 1);
    }
  };
  
  const handleParameterChange = (index: number, field: string, value: any) => {
    const updatedParams = [...parameters];
    
    // Handle special case for type change
    if (field === 'type' && updatedParams[index].type !== value) {
      const defaultValue = value === 'select' ? [''] : 
                         value === 'number' ? 0 : 
                         value === 'boolean' ? false : 
                         value === 'date' ? new Date() : '';
      
      updatedParams[index] = {
        ...updatedParams[index],
        type: value,
        value: defaultValue
      };
      
      if (value === 'select') {
        updatedParams[index].options = [''];
      } else {
        delete updatedParams[index].options;
      }
    } else {
      updatedParams[index] = {
        ...updatedParams[index],
        [field]: value
      };
    }
    
    onChange(updatedParams);
  };
  
  const handleAddOption = (paramIndex: number) => {
    const updatedParams = [...parameters];
    if (!updatedParams[paramIndex].options) {
      updatedParams[paramIndex].options = [];
    }
    updatedParams[paramIndex].options?.push('');
    onChange(updatedParams);
  };
  
  const handleOptionChange = (paramIndex: number, optionIndex: number, value: string) => {
    const updatedParams = [...parameters];
    if (updatedParams[paramIndex].options) {
      updatedParams[paramIndex].options![optionIndex] = value;
      onChange(updatedParams);
    }
  };
  
  const handleRemoveOption = (paramIndex: number, optionIndex: number) => {
    const updatedParams = [...parameters];
    if (updatedParams[paramIndex].options) {
      updatedParams[paramIndex].options!.splice(optionIndex, 1);
      onChange(updatedParams);
    }
  };
  
  const toggleExpand = (index: number) => {
    setExpandedParameter(expandedParameter === index ? null : index);
  };

  // Simple form for adding a single parameter
  if (onSubmit) {
    return (
      <SimpleParameterForm
        parameter={newParameter}
        onChange={setNewParameter}
        onSubmit={() => {
          onSubmit(newParameter.name, newParameter.value, newParameter.type);
          setNewParameter(createDefaultParameter());
        }}
        onCancel={onCancel}
      />
    );
  }
  
  // Complex form for managing multiple parameters
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Parâmetros Personalizados</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={handleAddParameter}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Adicionar Parâmetro</span>
        </Button>
      </div>
      
      <ParameterList
        parameters={parameters}
        expandedParameter={expandedParameter}
        maxHeight={maxHeight}
        onToggleExpand={toggleExpand}
        onParameterChange={handleParameterChange}
        onRemoveParameter={handleRemoveParameter}
        onAddOption={handleAddOption}
        onRemoveOption={handleRemoveOption}
        onOptionChange={handleOptionChange}
      />
    </div>
  );
};

export default ParameterForm;
