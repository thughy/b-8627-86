
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Deal, Stage } from '@/pages/Workflows/models/WorkflowModels';
import DealForm from './DealForm';

interface DealCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dealData: Partial<Deal>) => void;
  stages: Stage[];
  initialDeal?: Partial<Deal>;
  preSelectedStageId?: string;
}

const DealCreationModal: React.FC<DealCreationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  stages,
  initialDeal,
  preSelectedStageId
}) => {
  // Preparar os estágios para o dropdown
  const stageOptions = stages.map(stage => ({
    id: stage.id,
    title: stage.title
  }));

  // Criar um deal inicial com o estágio pré-selecionado, se fornecido
  const defaultDeal: Partial<Deal> = {
    ...(initialDeal || {}),
    stageId: preSelectedStageId || initialDeal?.stageId || '',
  };

  const handleSubmit = (dealData: Partial<Deal>) => {
    onSave(dealData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initialDeal?.id ? 'Editar' : 'Novo'} Deal</DialogTitle>
        </DialogHeader>
        
        <DealForm 
          deal={defaultDeal}
          onSubmit={handleSubmit}
          onCancel={onClose}
          stages={stageOptions}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DealCreationModal;
