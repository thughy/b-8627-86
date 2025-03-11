
import React, { useState, useEffect } from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DealFormProps {
  deal?: Partial<Deal>;
  onSubmit: (dealData: Partial<Deal>) => void;
  onCancel: () => void;
  stages?: { id: string; title: string }[];
}

const DealForm: React.FC<DealFormProps> = ({
  deal,
  onSubmit,
  onCancel,
  stages = []
}) => {
  const [formData, setFormData] = useState<Partial<Deal>>(
    deal || {
      title: '',
      description: '',
      stageId: '',
      status: 'open',
      type: '',
      amount: undefined,
      startDate: new Date(),
      customerName: '',
      customerOrganization: '',
      interests: ''
    }
  );

  // Atualizar formData quando deal mudar
  useEffect(() => {
    if (deal) {
      setFormData(deal);
    }
  }, [deal]);

  const handleChange = (key: keyof Deal, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const dealTypes = [
    'Produto', 'Serviço', 'Contrato', 'Projeto', 'Imóvel', 'Veículo', 
    'Proposta', 'Financiamento', 'Consultoria', 'Licença'
  ];

  const interestLevels = [
    'Indeciso', 'Baixo Interesse', 'Interessado', 'Muito Interessado', 
    'Pronto para Negociar', 'Pronto para Fechar'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Título do deal"
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
          <Label htmlFor="customerName">Nome do Cliente</Label>
          <Input
            id="customerName"
            value={formData.customerName || ''}
            onChange={(e) => handleChange('customerName', e.target.value)}
            placeholder="Nome do cliente"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerOrganization">Organização</Label>
          <Input
            id="customerOrganization"
            value={formData.customerOrganization || ''}
            onChange={(e) => handleChange('customerOrganization', e.target.value)}
            placeholder="Organização do cliente"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select
            value={formData.type || ''}
            onValueChange={(value) => handleChange('type', value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {dealTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
          <Label htmlFor="stage">Estágio</Label>
          <Select
            value={formData.stageId || ''}
            onValueChange={(value) => handleChange('stageId', value)}
            required
          >
            <SelectTrigger id="stage">
              <SelectValue placeholder="Selecione o estágio" />
            </SelectTrigger>
            <SelectContent>
              {stages.map((stage) => (
                <SelectItem key={stage.id} value={stage.id}>
                  {stage.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interests">Nível de Interesse</Label>
          <Select
            value={formData.interests || ''}
            onValueChange={(value) => handleChange('interests', value)}
          >
            <SelectTrigger id="interests">
              <SelectValue placeholder="Selecione o interesse" />
            </SelectTrigger>
            <SelectContent>
              {interestLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {deal?.id ? 'Atualizar' : 'Criar'} Deal
        </Button>
      </div>
    </form>
  );
};

export default DealForm;
