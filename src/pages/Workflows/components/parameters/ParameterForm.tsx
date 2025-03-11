
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AssetParameter, getParameterTypeLabel, createDefaultParameter, validateParameters } from '@/pages/Workflows/components/asset-modal/utils/parameterUtils';

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
    if (onSubmit) {
      setNewParameter(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
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
    }
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

  if (onSubmit) {
    // Simple form for adding a single parameter
    return (
      <div className="space-y-3">
        <div className="flex gap-3">
          <Input
            placeholder="Nome do parâmetro"
            value={newParameter.name}
            onChange={(e) => setNewParameter({...newParameter, name: e.target.value})}
            className="flex-1"
          />
          <Select
            value={newParameter.type}
            onValueChange={(value) => {
              const defaultValue = value === 'select' ? [''] : 
                            value === 'number' ? 0 : 
                            value === 'boolean' ? false : 
                            value === 'date' ? new Date() : '';
              
              setNewParameter({
                ...newParameter,
                type: value,
                value: defaultValue,
                options: value === 'select' ? [''] : undefined
              });
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Texto</SelectItem>
              <SelectItem value="number">Número</SelectItem>
              <SelectItem value="date">Data</SelectItem>
              <SelectItem value="boolean">Sim/Não</SelectItem>
              <SelectItem value="select">Seleção</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          {onCancel && (
            <Button type="button" variant="outline" size="sm" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button 
            type="button" 
            size="sm" 
            onClick={handleAddParameter}
            disabled={!newParameter.name.trim()}
          >
            Adicionar
          </Button>
        </div>
      </div>
    );
  }
  
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
      
      <ScrollArea className={`max-h-[${maxHeight}]`}>
        <div className="space-y-3">
          {parameters.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              Nenhum parâmetro definido. Clique em "Adicionar Parâmetro" para começar.
            </div>
          ) : (
            parameters.map((param, index) => (
              <div 
                key={index} 
                className="border rounded-md p-3 space-y-3 bg-card"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1 flex gap-3">
                    <Input
                      placeholder="Nome do parâmetro"
                      value={param.name}
                      onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
                      className="w-full"
                    />
                    <Select
                      value={param.type}
                      onValueChange={(value) => handleParameterChange(index, 'type', value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Texto</SelectItem>
                        <SelectItem value="number">Número</SelectItem>
                        <SelectItem value="date">Data</SelectItem>
                        <SelectItem value="boolean">Sim/Não</SelectItem>
                        <SelectItem value="select">Seleção</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedParameter === index ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveParameter(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {expandedParameter === index && (
                  <div className="pt-2 space-y-3 border-t">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Descrição</label>
                      <Textarea
                        placeholder="Descrição do parâmetro"
                        value={param.description || ''}
                        onChange={(e) => handleParameterChange(index, 'description', e.target.value)}
                        className="min-h-[60px]"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={param.required || false}
                        onCheckedChange={(checked) => handleParameterChange(index, 'required', checked)}
                        id={`param-required-${index}`}
                      />
                      <label 
                        htmlFor={`param-required-${index}`}
                        className="text-sm cursor-pointer"
                      >
                        Obrigatório
                      </label>
                    </div>
                    
                    {param.type === 'select' && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium">Opções</label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddOption(index)}
                            className="flex items-center gap-1"
                          >
                            <PlusCircle className="h-3 w-3" />
                            <span className="text-xs">Adicionar</span>
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {param.options?.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex gap-2">
                              <Input
                                placeholder={`Opção ${optionIndex + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveOption(index, optionIndex)}
                                className="text-destructive"
                                disabled={param.options!.length <= 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {param.type !== 'select' && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Valor Padrão</label>
                        {param.type === 'text' && (
                          <Input
                            placeholder="Valor padrão"
                            value={param.value || ''}
                            onChange={(e) => handleParameterChange(index, 'value', e.target.value)}
                          />
                        )}
                        {param.type === 'number' && (
                          <Input
                            type="number"
                            placeholder="0"
                            value={param.value || 0}
                            onChange={(e) => handleParameterChange(index, 'value', e.target.valueAsNumber)}
                          />
                        )}
                        {param.type === 'boolean' && (
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={Boolean(param.value)}
                              onCheckedChange={(checked) => handleParameterChange(index, 'value', checked)}
                              id={`param-value-${index}`}
                            />
                            <label 
                              htmlFor={`param-value-${index}`}
                              className="text-sm cursor-pointer"
                            >
                              {Boolean(param.value) ? 'Sim' : 'Não'}
                            </label>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ParameterForm;
