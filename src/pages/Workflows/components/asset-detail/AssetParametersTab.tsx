
import React, { useState } from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Save } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AssetParameter, 
  parametersToArray, 
  arrayToParameters 
} from '@/pages/Workflows/components/asset-modal/utils/parameterUtils';

interface AssetParametersTabProps {
  asset: Asset;
  onEditAsset?: (asset: Asset) => void;
}

const AssetParametersTab: React.FC<AssetParametersTabProps> = ({ asset, onEditAsset }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(asset.title);
  const [description, setDescription] = useState(asset.description || '');
  const [type, setType] = useState(asset.type);
  const [amount, setAmount] = useState(asset.amount || 0);
  const [status, setStatus] = useState(asset.status);
  const [startDate, setStartDate] = useState(asset.startDate ? new Date(asset.startDate) : undefined);
  const [endDate, setEndDate] = useState(asset.endDate ? new Date(asset.endDate) : undefined);
  const [parameters, setParameters] = useState<AssetParameter[]>(
    parametersToArray(asset)
  );

  const handleSave = () => {
    if (!onEditAsset) return;
    
    const updatedAsset: Asset = {
      ...asset,
      title,
      description,
      type,
      amount,
      status,
      startDate,
      endDate,
      parameters: arrayToParameters(parameters),
      updatedAt: new Date()
    };
    
    onEditAsset(updatedAsset);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setTitle(asset.title);
    setDescription(asset.description || '');
    setType(asset.type);
    setAmount(asset.amount || 0);
    setStatus(asset.status);
    setStartDate(asset.startDate ? new Date(asset.startDate) : undefined);
    setEndDate(asset.endDate ? new Date(asset.endDate) : undefined);
    setParameters(parametersToArray(asset));
    setIsEditing(false);
  };
  
  const handleParameterChange = (index: number, value: any) => {
    const updatedParams = [...parameters];
    updatedParams[index].value = value;
    setParameters(updatedParams);
  };
  
  const renderParameterField = (param: AssetParameter, index: number) => {
    switch (param.type) {
      case 'text':
        return (
          <Input
            id={`param-${index}`}
            value={param.value || ''}
            onChange={(e) => handleParameterChange(index, e.target.value)}
            disabled={!isEditing}
            className="max-w-md"
          />
        );
      case 'number':
        return (
          <Input
            id={`param-${index}`}
            type="number"
            value={param.value || 0}
            onChange={(e) => handleParameterChange(index, e.target.valueAsNumber)}
            disabled={!isEditing}
            className="max-w-md"
          />
        );
      case 'boolean':
        return (
          <Switch
            id={`param-${index}`}
            checked={Boolean(param.value)}
            onCheckedChange={(checked) => handleParameterChange(index, checked)}
            disabled={!isEditing}
          />
        );
      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full max-w-md justify-start text-left font-normal ${
                  !param.value ? "text-muted-foreground" : ""
                }`}
                disabled={!isEditing}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {param.value ? (
                  format(new Date(param.value), 'PPP', { locale: ptBR })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={param.value ? new Date(param.value) : undefined}
                onSelect={(date) => handleParameterChange(index, date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );
      case 'select':
        return (
          <Select
            value={String(param.value)}
            onValueChange={(value) => handleParameterChange(index, value)}
            disabled={!isEditing}
          >
            <SelectTrigger className="max-w-md">
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              {param.options?.map((option, optionIndex) => (
                <SelectItem key={optionIndex} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Detalhes do Asset</h3>
        {onEditAsset && (
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Editar
              </Button>
            )}
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select 
              value={type} 
              onValueChange={setType}
              disabled={!isEditing}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Selecionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contract">Contrato</SelectItem>
                <SelectItem value="product">Produto</SelectItem>
                <SelectItem value="service">Serviço</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="proposal">Proposta</SelectItem>
                <SelectItem value="project">Projeto</SelectItem>
                <SelectItem value="property">Imóvel</SelectItem>
                <SelectItem value="vehicle">Veículo</SelectItem>
                <SelectItem value="legal">Jurídico</SelectItem>
                <SelectItem value="document">Documento</SelectItem>
                <SelectItem value="ticket">Ticket</SelectItem>
                <SelectItem value="order">Pedido</SelectItem>
                <SelectItem value="payment">Pagamento</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={status} 
              onValueChange={setStatus}
              disabled={!isEditing}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecionar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Aberto</SelectItem>
                <SelectItem value="processing">Processando</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <Input 
              id="amount" 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.valueAsNumber)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="startDate">Data de Início</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="startDate"
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    !startDate ? "text-muted-foreground" : ""
                  }`}
                  disabled={!isEditing}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, 'PPP', { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate">Data de Término</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="endDate"
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    !endDate ? "text-muted-foreground" : ""
                  }`}
                  disabled={!isEditing}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? (
                    format(endDate, 'PPP', { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isEditing}
            className="min-h-[100px]"
          />
        </div>
      </div>
      
      {parameters.length > 0 && (
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-medium">Parâmetros Personalizados</h3>
          
          {parameters.map((param, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`param-${index}`} className="flex items-center gap-2">
                {param.name}
                {param.required && (
                  <span className="text-xs text-red-500">*</span>
                )}
              </Label>
              
              {param.description && (
                <p className="text-xs text-muted-foreground mb-1">
                  {param.description}
                </p>
              )}
              
              {renderParameterField(param, index)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetParametersTab;
