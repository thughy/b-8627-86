
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { getAssetStatusOptions } from '../../asset-modal/utils/assetTypeUtils';

interface AssetStatusSelectorProps {
  status: Asset['status'];
  onChange: (value: Asset['status']) => void;
  readOnly?: boolean;
}

const AssetStatusSelector: React.FC<AssetStatusSelectorProps> = ({ 
  status, 
  onChange, 
  readOnly = false 
}) => {
  const statusOptions = getAssetStatusOptions();

  return (
    <div>
      <Label htmlFor="asset-status">Status</Label>
      <Select 
        value={status} 
        onValueChange={onChange}
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
  );
};

export default AssetStatusSelector;
