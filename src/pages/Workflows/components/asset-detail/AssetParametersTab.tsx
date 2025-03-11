
import React, { useState, useEffect } from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Separator } from '@/components/ui/separator';
import AssetStatusSelector from './components/AssetStatusSelector';
import AssetAmountInput from './components/AssetAmountInput';
import DateSelector from './components/DateSelector';
import ParameterSection from './components/ParameterSection';

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

  const handleStatusChange = (value: Asset['status']) => {
    setStatus(value);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
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
        <AssetStatusSelector 
          status={status} 
          onChange={handleStatusChange} 
          readOnly={readOnly} 
        />
        
        <AssetAmountInput 
          amount={amount} 
          onChange={handleAmountChange} 
          readOnly={readOnly} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DateSelector 
          label="Data de Início" 
          date={startDate} 
          onSelect={setStartDate} 
          readOnly={readOnly} 
        />
        
        <DateSelector 
          label="Data de Conclusão" 
          date={endDate} 
          onSelect={setEndDate} 
          readOnly={readOnly} 
        />
      </div>
      
      <Separator className="my-4" />
      
      <ParameterSection 
        asset={editedAsset}
        onParameterAdd={handleAddParameter}
        onParameterDelete={handleDeleteParameter}
        onParameterUpdate={handleUpdateParameterValue}
        readOnly={readOnly}
      />
    </div>
  );
};
