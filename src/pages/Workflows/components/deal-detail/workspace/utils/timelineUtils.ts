
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { TimelineItemType } from '../models/TimelineTypes';

// Convert assets to timeline items
export const assetsToTimelineItems = (assets: Asset[]): TimelineItemType[] => {
  return assets.map(asset => ({
    id: asset.id,
    type: 'asset',
    title: asset.title,
    description: asset.description,
    status: asset.status,
    date: asset.updatedAt || asset.createdAt,
    metadata: { assetType: asset.type, asset: asset }
  }));
};

// Function to format relative date
export const formatRelativeDate = (date: Date) => {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'} atrás`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'} atrás`;
  }
};

// Mock data for timeline items
export const getMockTimelineItems = (): TimelineItemType[] => {
  return [
    { 
      id: 'task-1', 
      type: 'task', 
      title: 'Enviar proposta comercial', 
      description: 'Preparar e enviar proposta atualizada',
      status: 'pending',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24) 
    },
    { 
      id: 'note-1', 
      type: 'note', 
      title: 'Reunião com cliente', 
      description: 'Cliente demonstrou interesse no novo pacote premium',
      date: new Date(Date.now() - 1000 * 60 * 60 * 48) 
    },
    { 
      id: 'email-1', 
      type: 'email', 
      title: 'Follow-up após reunião', 
      description: 'Email enviado com detalhes dos produtos discutidos',
      date: new Date(Date.now() - 1000 * 60 * 60 * 72) 
    },
    { 
      id: 'document-1', 
      type: 'document', 
      title: 'Anexo inicial', 
      description: 'Versão preliminar do documento',
      date: new Date(Date.now() - 1000 * 60 * 60 * 96) 
    }
  ];
};
