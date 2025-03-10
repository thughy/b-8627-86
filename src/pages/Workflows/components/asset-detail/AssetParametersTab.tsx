
import React, { useState } from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatDate } from '@/components/workflows/utils/dealUtils';
import { cn } from '@/lib/utils';
import { format } from "date-fns";

interface AssetParametersTabProps {
  asset: Asset;
  onEditAsset?: (asset: Asset) => void;
}

const AssetParametersTab: React.FC<AssetParametersTabProps> = ({ asset, onEditAsset }) => {
  const [formState, setFormState] = useState<Partial<Asset>>({ ...asset });
  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleChange = (key: keyof Asset, value: any) => {
    setFormState(prev => ({ ...prev, [key]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (onEditAsset && formState) {
      onEditAsset({ ...asset, ...formState });
    }
    setIsEditing(false);
  };

  // Handle cancel editing
  const handleCancel = () => {
    setFormState({ ...asset });
    setIsEditing(false);
  };

  const assetTypeOptions = [
    { value: 'Contrato', label: 'Contrato' },
    { value: 'Proposta', label: 'Proposta' },
    { value: 'Imóvel', label: 'Imóvel' },
    { value: 'Veículo', label: 'Veículo' },
    { value: 'Produto', label: 'Produto' },
    { value: 'Serviço', label: 'Serviço' },
    { value: 'Projeto', label: 'Projeto' },
    { value: 'Lead', label: 'Lead' },
    { value: 'Paciente', label: 'Paciente' },
    { value: 'Petição', label: 'Petição' },
  ];

  const assetStatusOptions = [
    { value: 'open', label: 'Aberto' },
    { value: 'processing', label: 'Processando' },
    { value: 'completed', label: 'Concluído' },
    { value: 'cancelled', label: 'Cancelado' },
  ];

  return (
    <div className="space-y-4">
      {!isEditing ? (
        <>
          <div className="mb-6">
            <Button onClick={() => setIsEditing(true)}>Editar Informações</Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground text-xs">Título</Label>
              <div className="font-medium">{asset.title}</div>
            </div>
            
            <div>
              <Label className="text-muted-foreground text-xs">Descrição</Label>
              <div>{asset.description || "Sem descrição"}</div>
            </div>
            
            <div>
              <Label className="text-muted-foreground text-xs">Tipo</Label>
              <div className="font-medium">{asset.type}</div>
            </div>
            
            <div>
              <Label className="text-muted-foreground text-xs">Status</Label>
              <div className="font-medium capitalize">
                {asset.status === 'open' ? 'Aberto' : 
                  asset.status === 'processing' ? 'Processando' : 
                  asset.status === 'completed' ? 'Concluído' : 
                  asset.status === 'cancelled' ? 'Cancelado' : asset.status}
              </div>
            </div>
            
            <div>
              <Label className="text-muted-foreground text-xs">Valor</Label>
              <div className="font-medium">
                {asset.amount ? new Intl.NumberFormat('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                }).format(asset.amount) : "Não definido"}
              </div>
            </div>
            
            <div>
              <Label className="text-muted-foreground text-xs">Data de Início</Label>
              <div>{formatDate(asset.startDate)}</div>
            </div>
            
            <div>
              <Label className="text-muted-foreground text-xs">Data de Término</Label>
              <div>{formatDate(asset.endDate)}</div>
            </div>
            
            {asset.parameters && Object.keys(asset.parameters).length > 0 && (
              <div>
                <Label className="text-muted-foreground text-xs mb-2 block">Parâmetros Adicionais</Label>
                <div className="space-y-2 border p-3 rounded-md bg-muted/40">
                  {Object.entries(asset.parameters).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">{key}:</div>
                      <div className="text-sm">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input 
                id="title"
                value={formState.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea 
                id="description"
                value={formState.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Select 
                value={formState.type || ''} 
                onValueChange={(value) => handleChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {assetTypeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Outro (personalizado)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formState.status || 'open'} 
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  {assetStatusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="amount">Valor</Label>
              <Input 
                id="amount"
                type="number"
                value={formState.amount || ''}
                onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                placeholder="0,00"
                step="0.01"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formState.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formState.startDate ? format(new Date(formState.startDate), "PP") : <span>Selecionar data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formState.startDate ? new Date(formState.startDate) : undefined}
                    onSelect={(date) => handleChange('startDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="endDate">Data de Término</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formState.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formState.endDate ? format(new Date(formState.endDate), "PP") : <span>Selecionar data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formState.endDate ? new Date(formState.endDate) : undefined}
                    onSelect={(date) => handleChange('endDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="submit" variant="default">Salvar</Button>
              <Button type="button" variant="outline" onClick={handleCancel}>Cancelar</Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AssetParametersTab;
