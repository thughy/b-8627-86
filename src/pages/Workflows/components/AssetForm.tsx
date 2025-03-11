
import React, { useState, useEffect } from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Plus, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { getCommonAssetTypes, getAssetStatusOptions } from './asset-modal/utils/assetTypeUtils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssetFormProps {
  asset?: Partial<Asset>;
  dealId: string;
  onSubmit: (assetData: Partial<Asset>) => void;
  onCancel: () => void;
}

const AssetForm: React.FC<AssetFormProps> = ({
  asset,
  dealId,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<Asset>>(
    asset || {
      dealId,
      title: '',
      description: '',
      type: '',
      status: 'open',
      amount: undefined,
      startDate: new Date(),
      endDate: undefined,
      parameters: {}
    }
  );

  const [customParameters, setCustomParameters] = useState<
    Array<{ key: string; value: string }>
  >([]);

  const [newParameterKey, setNewParameterKey] = useState('');
  const [newParameterValue, setNewParameterValue] = useState('');
  const [showNewParameterForm, setShowNewParameterForm] = useState(false);

  // Inicializar parâmetros personalizados a partir dos parâmetros do asset
  useEffect(() => {
    if (asset?.parameters) {
      const paramArray = Object.entries(asset.parameters).map(([key, value]) => ({
        key,
        value: String(value)
      }));
      setCustomParameters(paramArray);
    }
  }, [asset]);

  // Atualizar formData quando asset mudar
  useEffect(() => {
    if (asset) {
      setFormData(asset);
    }
  }, [asset]);

  const handleChange = (key: keyof Asset, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleAddParameter = () => {
    if (newParameterKey.trim() && newParameterValue.trim()) {
      setCustomParameters([
        ...customParameters,
        { key: newParameterKey, value: newParameterValue }
      ]);
      setNewParameterKey('');
      setNewParameterValue('');
      setShowNewParameterForm(false);
    }
  };

  const handleRemoveParameter = (index: number) => {
    setCustomParameters(customParameters.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Converter customParameters para o formato de objeto esperado
    const parameters: Record<string, any> = {};
    customParameters.forEach(param => {
      parameters[param.key] = param.value;
    });
    
    onSubmit({ ...formData, parameters });
  };

  // Obter opções comuns para types e status
  const assetTypes = getCommonAssetTypes();
  const statusOptions = getAssetStatusOptions();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Título do asset"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Descrição detalhada"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select
            value={formData.type || ''}
            onValueChange={(value) => handleChange('type', value)}
            required
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {assetTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
              <SelectItem value="custom">Outro (personalizado)</SelectItem>
            </SelectContent>
          </Select>
          {formData.type === 'custom' && (
            <Input
              className="mt-2"
              placeholder="Digite o tipo personalizado"
              value={formData.type === 'custom' ? '' : formData.type || ''}
              onChange={(e) => handleChange('type', e.target.value)}
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status || 'open'}
            onValueChange={(value) => handleChange('status', value)}
          >
            <SelectTrigger id="status">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Valor</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount || ''}
            onChange={(e) => handleChange('amount', parseFloat(e.target.value) || undefined)}
            placeholder="0,00"
            step="0.01"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Data de Início</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.startDate ? format(new Date(formData.startDate), "PPP") : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.startDate ? new Date(formData.startDate) : undefined}
                onSelect={(date) => handleChange('startDate', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Data de Término</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.endDate ? format(new Date(formData.endDate), "PPP") : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.endDate ? new Date(formData.endDate) : undefined}
                onSelect={(date) => handleChange('endDate', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Parâmetros Personalizados */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Parâmetros Personalizados</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowNewParameterForm(true)}
          >
            <Plus className="h-4 w-4 mr-1" /> Adicionar
          </Button>
        </div>

        {customParameters.length > 0 ? (
          <div className="space-y-2 border rounded-md p-4">
            {customParameters.map((param, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="font-medium flex-1">{param.key}:</div>
                <div className="flex-1">{param.value}</div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveParameter(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground border rounded-md p-4">
            Nenhum parâmetro personalizado adicionado.
          </div>
        )}

        {showNewParameterForm && (
          <div className="border rounded-md p-4 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="paramKey">Nome do Parâmetro</Label>
              <Input
                id="paramKey"
                value={newParameterKey}
                onChange={(e) => setNewParameterKey(e.target.value)}
                placeholder="Ex: Dimensões, Código, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paramValue">Valor</Label>
              <Input
                id="paramValue"
                value={newParameterValue}
                onChange={(e) => setNewParameterValue(e.target.value)}
                placeholder="Valor do parâmetro"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowNewParameterForm(false);
                  setNewParameterKey('');
                  setNewParameterValue('');
                }}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleAddParameter}
                disabled={!newParameterKey.trim() || !newParameterValue.trim()}
              >
                Adicionar
              </Button>
            </div>
          </div>
        )}
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
