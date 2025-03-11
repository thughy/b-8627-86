
import React, { useState, useEffect } from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { ParameterDisplay } from '../parameters/ParameterDisplay';
import { ParameterForm } from '../parameters/ParameterForm';
import { getAssetStatusOptions, formatCurrency } from '../asset-modal/utils/assetTypeUtils';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface AssetParametersTabProps {
  asset: Asset;
  onUpdate: (updatedAsset: Asset) => void;
  readOnly?: boolean;
}

export const AssetParametersTab = ({ 
  asset, 
  onUpdate, 
  readOnly = false 
}: AssetParametersTabProps) => {
  const [editedAsset, setEditedAsset] = useState<Asset>({ ...asset });
  const [startDate, setStartDate] = useState<Date | undefined>(
    asset.startDate ? new Date(asset.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    asset.endDate ? new Date(asset.endDate) : undefined
  );
  const [amount, setAmount] = useState<string>(
    asset.amount !== undefined ? asset.amount.toString() : '0'
  );
  const [status, setStatus] = useState<Asset['status']>(asset.status);
  const [isAddingParameter, setIsAddingParameter] = useState(false);
  const statusOptions = getAssetStatusOptions();

  useEffect(() => {
    setEditedAsset({ ...asset });
    setStartDate(asset.startDate ? new Date(asset.startDate) : undefined);
    setEndDate(asset.endDate ? new Date(asset.endDate) : undefined);
    setAmount(asset.amount !== undefined ? asset.amount.toString() : '0');
    setStatus(asset.status);
  }, [asset]);

  useEffect(() => {
    const updatedAsset = {
      ...editedAsset,
      startDate,
      endDate,
      amount: parseFloat(amount) || 0,
      status
    };
    
    onUpdate(updatedAsset);
  }, [startDate, endDate, amount, status]);

  const handleStatusChange = (value: string) => {
    setStatus(value as Asset['status']);
  };

  const formatAmount = (value: string) => {
    // Remove non-numeric characters except decimal point
    value = value.replace(/[^\d.,]/g, '');
    
    // Replace comma with dot for proper parsing
    value = value.replace(',', '.');
    
    return value;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatAmount(e.target.value);
    setAmount(formattedValue);
  };

  const handleAddParameter = (name: string, value: any, type: string) => {
    const parameters = editedAsset.parameters || {};
    
    setEditedAsset({
      ...editedAsset,
      parameters: {
        ...parameters,
        [name]: {
          value,
          type
        }
      }
    });
    
    setIsAddingParameter(false);
  };

  const handleDeleteParameter = (paramName: string) => {
    if (editedAsset.parameters) {
      const newParameters = { ...editedAsset.parameters };
      delete newParameters[paramName];
      
      setEditedAsset({
        ...editedAsset,
        parameters: newParameters
      });
    }
  };

  const handleUpdateParameterValue = (paramName: string, value: any) => {
    if (editedAsset.parameters) {
      setEditedAsset({
        ...editedAsset,
        parameters: {
          ...editedAsset.parameters,
          [paramName]: {
            ...editedAsset.parameters[paramName],
            value
          }
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="asset-status">Status</Label>
          <Select 
            value={status} 
            onValueChange={handleStatusChange}
            disabled={readOnly}
          >
            <SelectTrigger id="asset-status">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="asset-amount">Valor</Label>
          <Input
            id="asset-amount"
            value={formatCurrency(parseFloat(amount) || 0)}
            onChange={handleAmountChange}
            disabled={readOnly}
            className="font-medium"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Data de Início</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
                disabled={readOnly}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "dd/MM/yyyy") : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label>Data de Conclusão</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
                disabled={readOnly}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "dd/MM/yyyy") : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Parâmetros Adicionais</h3>
          {!readOnly && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsAddingParameter(true)}
              className="flex items-center"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Parâmetro
            </Button>
          )}
        </div>
        
        {isAddingParameter && (
          <div className="bg-muted/50 p-4 rounded-md mb-4">
            <ParameterForm 
              onSubmit={handleAddParameter}
              onCancel={() => setIsAddingParameter(false)}
            />
          </div>
        )}
        
        <div className="space-y-3">
          {editedAsset.parameters && Object.keys(editedAsset.parameters).length > 0 ? (
            Object.entries(editedAsset.parameters).map(([paramName, paramData]) => (
              <ParameterDisplay
                key={paramName}
                name={paramName}
                type={paramData.type}
                value={paramData.value}
                onDelete={() => handleDeleteParameter(paramName)}
                onUpdate={(value) => handleUpdateParameterValue(paramName, value)}
                readOnly={readOnly}
              />
            ))
          ) : (
            <div className="text-muted-foreground text-center py-4">
              Nenhum parâmetro adicional configurado
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
