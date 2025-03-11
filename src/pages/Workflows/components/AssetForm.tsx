
import React, { useState } from 'react';
import { Asset } from '../models/WorkflowModels';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { assetTypes } from './asset-modal/utils/assetTypeUtils';

interface AssetFormProps {
  asset?: Partial<Asset>;
  dealId?: string;
  onSubmit: (assetData: Partial<Asset>) => void;
  onCancel: () => void;
}

const AssetForm = ({ asset = {}, dealId, onSubmit, onCancel }: AssetFormProps) => {
  const [formData, setFormData] = useState<Partial<Asset>>({
    ...(asset || {}),
    dealId: dealId || asset?.dealId || '',
    status: asset?.status || 'open',
    type: asset?.type || 'contract',
  });

  const handleChange = (field: keyof Asset, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="asset-title" className="text-muted-foreground">
          Título do Asset
        </Label>
        <Input
          id="asset-title"
          placeholder="Ex: Contrato de Serviço"
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="asset-description" className="text-muted-foreground">
          Descrição
        </Label>
        <Textarea
          id="asset-description"
          placeholder="Descreva o asset..."
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="asset-type" className="text-muted-foreground">
          Tipo
        </Label>
        <Select
          value={formData.type || 'contract'}
          onValueChange={(value) => handleChange('type', value)}
        >
          <SelectTrigger id="asset-type">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            {assetTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="asset-amount" className="text-muted-foreground">
          Valor
        </Label>
        <Input
          id="asset-amount"
          type="number"
          placeholder="0.00"
          value={formData.amount || ''}
          onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {asset?.id ? 'Atualizar' : 'Criar'} Asset
        </Button>
      </div>
    </form>
  );
};

export default AssetForm;
