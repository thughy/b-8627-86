
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useDealParametersForm } from './hooks/useDealParametersForm';
import { useDealOptions } from './hooks/useDealOptions';
import DealBasicInfoFields from './components/DealBasicInfoFields';
import DealStatusFields from './components/DealStatusFields';
import DealFinancialFields from './components/DealFinancialFields';

interface DealParametersTabProps {
  deal: Deal;
  onEditDeal?: (deal: Deal) => void;
}

const DealParametersTab: React.FC<DealParametersTabProps> = ({ deal, onEditDeal }) => {
  const { formState, handleChange, handleSave } = useDealParametersForm(deal, onEditDeal);
  const { 
    statusOptions, 
    typeOptions, 
    interestsOptions, 
    reasonForLossOptions
  } = useDealOptions();

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Informações do Negócio</h3>
          
          <div className="space-y-4">
            <DealBasicInfoFields 
              formState={formState}
              handleChange={handleChange}
              typeOptions={typeOptions}
              statusOptions={statusOptions}
            />

            <DealStatusFields 
              formState={formState}
              handleChange={handleChange}
              reasonForLossOptions={reasonForLossOptions}
              interestsOptions={interestsOptions}
            />

            <DealFinancialFields 
              formState={formState}
              handleChange={handleChange}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} disabled={!onEditDeal}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealParametersTab;
