
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '../../asset-modal/utils/assetTypeUtils';

interface AssetAmountInputProps {
  amount: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

const AssetAmountInput: React.FC<AssetAmountInputProps> = ({ 
  amount, 
  onChange, 
  readOnly = false 
}) => {
  const formatAmount = (value: string) => {
    // Remove non-numeric characters except decimal point
    value = value.replace(/[^\d.,]/g, '');
    
    // Replace comma with dot for proper parsing
    value = value.replace(',', '.');
    
    return value;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatAmount(e.target.value);
    onChange(formattedValue);
  };

  return (
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
  );
};

export default AssetAmountInput;
