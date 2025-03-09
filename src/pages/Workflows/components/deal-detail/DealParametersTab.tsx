
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SelectField from '@/components/ui/select-field';
import { DatePicker } from '@/components/ui/date-picker';
import FormField from '@/components/ui/form-field';
import { Save } from 'lucide-react';

interface DealParametersTabProps {
  deal: Deal;
  onEditDeal?: (deal: Deal) => void;
}

const DealParametersTab: React.FC<DealParametersTabProps> = ({ deal, onEditDeal }) => {
  const [formState, setFormState] = React.useState<Partial<Deal>>({
    ...deal
  });

  const handleChange = (field: keyof Deal, value: any) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (onEditDeal && formState) {
      onEditDeal({
        ...deal,
        ...formState
      });
    }
  };

  const statusOptions = [
    { value: 'open', label: 'Aberto' },
    { value: 'won', label: 'Ganho' },
    { value: 'lost', label: 'Perdido' },
    { value: 'completed', label: 'Concluído' },
  ];

  const typeOptions = [
    { value: 'product', label: 'Produto' },
    { value: 'service', label: 'Serviço' },
    { value: 'property', label: 'Imóvel' },
    { value: 'vehicle', label: 'Automóvel' },
    { value: 'rental', label: 'Aluguel' },
    { value: 'subscription', label: 'Assinatura' },
    { value: 'contract', label: 'Contrato' },
  ];

  const interestsOptions = [
    { value: 'undecided', label: 'Indeciso' },
    { value: 'interested', label: 'Interessado' },
    { value: 'negotiate', label: 'Negociar' },
    { value: 'buy', label: 'Comprar' },
  ];

  const reasonForLossOptions = [
    { value: 'price', label: 'Preços' },
    { value: 'deadline', label: 'Prazo' },
    { value: 'quality', label: 'Qualidade' },
    { value: 'technical', label: 'Técnica' },
    { value: 'unavailability', label: 'Indisponibilidade' },
    { value: 'delay', label: 'Atraso' },
    { value: 'competitor', label: 'Concorrência' },
  ];

  const customerTypeOptions = [
    { value: 'person', label: 'Pessoa Física' },
    { value: 'organization', label: 'Pessoa Jurídica' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Informações do Negócio</h3>
          
          <div className="space-y-4">
            <FormField id="title" label="Título" required>
              <Input 
                id="title"
                value={formState.title || ''} 
                onChange={(e) => handleChange('title', e.target.value)} 
              />
            </FormField>

            <FormField id="type" label="Tipo">
              <SelectField
                id="type"
                label=""
                value={formState.type || ''}
                onChange={(value) => handleChange('type', value)}
                options={typeOptions}
                placeholder="Selecione o tipo"
              />
            </FormField>

            <FormField id="customerType" label="Tipo de Cliente">
              <SelectField
                id="customerType"
                label=""
                value={formState.customerType || ''}
                onChange={(value) => handleChange('customerType', value)}
                options={customerTypeOptions}
                placeholder="Selecione o tipo de cliente"
              />
            </FormField>

            <FormField id="customerName" label="Cliente">
              <Input 
                id="customerName"
                value={formState.customerName || ''} 
                onChange={(e) => handleChange('customerName', e.target.value)} 
              />
            </FormField>

            <FormField id="customerOrganization" label="Organização">
              <Input 
                id="customerOrganization"
                value={formState.customerOrganization || ''} 
                onChange={(e) => handleChange('customerOrganization', e.target.value)} 
              />
            </FormField>

            <FormField id="status" label="Status">
              <SelectField
                id="status"
                label=""
                value={formState.status || ''}
                onChange={(value) => handleChange('status', value as Deal['status'])}
                options={statusOptions}
                placeholder="Selecione o status"
              />
            </FormField>

            {formState.status === 'lost' && (
              <FormField id="reasonForLoss" label="Motivo da Perda">
                <SelectField
                  id="reasonForLoss"
                  label=""
                  value={formState.reasonForLoss || ''}
                  onChange={(value) => handleChange('reasonForLoss', value)}
                  options={reasonForLossOptions}
                  placeholder="Selecione o motivo"
                />
              </FormField>
            )}

            <FormField id="interests" label="Interesses">
              <SelectField
                id="interests"
                label=""
                value={formState.interests || ''}
                onChange={(value) => handleChange('interests', value)}
                options={interestsOptions}
                placeholder="Selecione o interesse"
              />
            </FormField>

            <FormField id="amount" label="Valor">
              <Input 
                id="amount"
                type="number" 
                value={formState.amount?.toString() || ''} 
                onChange={(e) => handleChange('amount', Number(e.target.value))} 
              />
            </FormField>

            <FormField id="startDate" label="Data de Início">
              <DatePicker
                date={formState.startDate}
                onSelect={(date) => handleChange('startDate', date)}
                placeholder="Selecione a data"
              />
            </FormField>

            <FormField id="endDate" label="Data de Conclusão">
              <DatePicker
                date={formState.endDate}
                onSelect={(date) => handleChange('endDate', date)}
                placeholder="Selecione a data"
              />
            </FormField>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} disabled={!onEditDeal}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Descrição</h3>
          <FormField id="description" label="Descrição do Negócio">
            <textarea
              id="description"
              className="w-full min-h-[100px] p-2 border rounded"
              value={formState.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </FormField>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealParametersTab;
