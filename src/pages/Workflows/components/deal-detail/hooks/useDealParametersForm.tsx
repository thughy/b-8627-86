
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';

export function useDealParametersForm(deal: Deal, onEditDeal?: (deal: Deal) => void) {
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

  return {
    formState,
    handleChange,
    handleSave
  };
}
