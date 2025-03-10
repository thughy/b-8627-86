
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";
import SelectField, { SelectOption } from "@/components/ui/select-field";

interface AdvancedFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: DealFilters) => void;
  currentFilters: DealFilters;
}

export interface DealFilters {
  title?: string;
  status?: string[];
  type?: string[];
  minAmount?: number;
  maxAmount?: number;
  startDateFrom?: string;
  startDateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
  customerType?: string[];
  interests?: string[];
  hasDescription?: boolean;
}

const AdvancedFiltersModal: React.FC<AdvancedFiltersModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters
}) => {
  const [filters, setFilters] = useState<DealFilters>(currentFilters);

  // Status options
  const statusOptions: SelectOption[] = [
    { value: 'open', label: 'Em Andamento' },
    { value: 'won', label: 'Ganho' },
    { value: 'lost', label: 'Perdido' },
    { value: 'completed', label: 'Concluído' }
  ];

  // Deal type options
  const typeOptions: SelectOption[] = [
    { value: 'product', label: 'Produto' },
    { value: 'service', label: 'Serviço' },
    { value: 'subscription', label: 'Assinatura' },
    { value: 'project', label: 'Projeto' }
  ];

  // Customer type options
  const customerTypeOptions: SelectOption[] = [
    { value: 'person', label: 'Pessoa Física' },
    { value: 'organization', label: 'Pessoa Jurídica' }
  ];

  // Interest options
  const interestOptions: SelectOption[] = [
    { value: 'high', label: 'Alto Interesse' },
    { value: 'medium', label: 'Médio Interesse' },
    { value: 'low', label: 'Baixo Interesse' }
  ];

  const handleChange = (field: keyof DealFilters, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleToggleArrayValue = (field: keyof DealFilters, value: string) => {
    setFilters(prev => {
      const currentArray = prev[field] as string[] || [];
      if (currentArray.includes(value)) {
        return { ...prev, [field]: currentArray.filter(v => v !== value) };
      } else {
        return { ...prev, [field]: [...currentArray, value] };
      }
    });
  };

  const handleReset = () => {
    setFilters({});
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  // Helper to check if a value is in an array
  const isSelected = (field: keyof DealFilters, value: string): boolean => {
    const array = filters[field] as string[] || [];
    return array.includes(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filtros Avançados</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Title filter */}
          <div className="space-y-2">
            <Label htmlFor="title">Título do Negócio</Label>
            <Input
              id="title"
              placeholder="Buscar por título"
              value={filters.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="thin-border"
            />
          </div>

          {/* Status filter */}
          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <Badge
                  key={status.value}
                  variant={isSelected('status', status.value) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleToggleArrayValue('status', status.value)}
                >
                  {status.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Deal type filter */}
          <div className="space-y-2">
            <Label>Tipo de Negócio</Label>
            <div className="flex flex-wrap gap-2">
              {typeOptions.map((type) => (
                <Badge
                  key={type.value}
                  variant={isSelected('type', type.value) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleToggleArrayValue('type', type.value)}
                >
                  {type.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Amount range filter */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minAmount">Valor Mínimo</Label>
              <Input
                id="minAmount"
                type="number"
                placeholder="0"
                value={filters.minAmount || ''}
                onChange={(e) => handleChange('minAmount', parseFloat(e.target.value) || 0)}
                className="thin-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxAmount">Valor Máximo</Label>
              <Input
                id="maxAmount"
                type="number"
                placeholder="99999"
                value={filters.maxAmount || ''}
                onChange={(e) => handleChange('maxAmount', parseFloat(e.target.value) || 0)}
                className="thin-border"
              />
            </div>
          </div>

          {/* Date ranges */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDateFrom">Data de Início (De)</Label>
              <Input
                id="startDateFrom"
                type="date"
                value={filters.startDateFrom || ''}
                onChange={(e) => handleChange('startDateFrom', e.target.value)}
                className="thin-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDateTo">Data de Início (Até)</Label>
              <Input
                id="startDateTo"
                type="date"
                value={filters.startDateTo || ''}
                onChange={(e) => handleChange('startDateTo', e.target.value)}
                className="thin-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="endDateFrom">Data de Término (De)</Label>
              <Input
                id="endDateFrom"
                type="date"
                value={filters.endDateFrom || ''}
                onChange={(e) => handleChange('endDateFrom', e.target.value)}
                className="thin-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDateTo">Data de Término (Até)</Label>
              <Input
                id="endDateTo"
                type="date"
                value={filters.endDateTo || ''}
                onChange={(e) => handleChange('endDateTo', e.target.value)}
                className="thin-border"
              />
            </div>
          </div>

          {/* Customer type filter */}
          <div className="space-y-2">
            <Label>Tipo de Cliente</Label>
            <div className="flex flex-wrap gap-2">
              {customerTypeOptions.map((type) => (
                <Badge
                  key={type.value}
                  variant={isSelected('customerType', type.value) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleToggleArrayValue('customerType', type.value)}
                >
                  {type.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Interest level filter */}
          <div className="space-y-2">
            <Label>Nível de Interesse</Label>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <Badge
                  key={interest.value}
                  variant={isSelected('interests', interest.value) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleToggleArrayValue('interests', interest.value)}
                >
                  {interest.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Has description filter */}
          <div className="flex items-center space-x-2">
            <Switch
              id="hasDescription"
              checked={filters.hasDescription || false}
              onCheckedChange={(checked) => handleChange('hasDescription', checked)}
            />
            <Label htmlFor="hasDescription">Apenas com descrição</Label>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={handleReset} className="thin-border">
            Limpar Filtros
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose} className="thin-border">
              Cancelar
            </Button>
            <Button onClick={handleApply}>
              Aplicar Filtros
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedFiltersModal;
