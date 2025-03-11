
import { v4 as uuidv4 } from 'uuid';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';

// Asset types
export const assetTypes = [
  { value: 'contract', label: 'Contrato' },
  { value: 'product', label: 'Produto' },
  { value: 'service', label: 'Serviço' },
  { value: 'lead', label: 'Lead' },
  { value: 'proposal', label: 'Proposta' },
  { value: 'project', label: 'Projeto' },
  { value: 'property', label: 'Imóvel' },
  { value: 'vehicle', label: 'Veículo' },
  { value: 'legal', label: 'Jurídico' },
  { value: 'document', label: 'Documento' },
  { value: 'ticket', label: 'Ticket' },
  { value: 'order', label: 'Pedido' },
  { value: 'payment', label: 'Pagamento' },
  { value: 'other', label: 'Outro' },
];

// Return common asset types for dropdown selection
export const getCommonAssetTypes = (): string[] => {
  return assetTypes.map(type => type.value);
};

// Status options
export const getAssetStatusOptions = () => [
  { value: 'open', label: 'Aberto' },
  { value: 'processing', label: 'Processando' },
  { value: 'completed', label: 'Concluído' },
  { value: 'cancelled', label: 'Cancelado' },
];

// Map asset type to color
export const getAssetTypeColor = (type: string): string => {
  const normalizedType = normalizeAssetType(type);
  
  switch (normalizedType) {
    case 'contract':
      return 'bg-blue-500';
    case 'product':
      return 'bg-green-500';
    case 'service':
      return 'bg-indigo-500';
    case 'lead':
      return 'bg-yellow-500';
    case 'proposal':
      return 'bg-purple-500';
    case 'project':
      return 'bg-emerald-500';
    case 'property':
      return 'bg-amber-500';
    case 'vehicle':
      return 'bg-orange-500';
    case 'legal':
      return 'bg-red-500';
    case 'document':
      return 'bg-slate-500';
    case 'ticket':
      return 'bg-cyan-500';
    case 'order':
      return 'bg-teal-500';
    case 'payment':
      return 'bg-lime-500';
    default:
      return 'bg-gray-500';
  }
};

// Get icon based on asset type
export const getAssetTypeIcon = (type: string): string => {
  const normalizedType = normalizeAssetType(type);
  
  switch (normalizedType) {
    case 'contract':
      return 'file-text';
    case 'product':
      return 'package';
    case 'service':
      return 'tool';
    case 'lead':
      return 'user';
    case 'proposal':
      return 'file-check';
    case 'project':
      return 'briefcase';
    case 'property':
      return 'home';
    case 'vehicle':
      return 'car';
    case 'legal':
      return 'scale';
    case 'document':
      return 'file';
    case 'ticket':
      return 'ticket';
    case 'order':
      return 'shopping-cart';
    case 'payment':
      return 'credit-card';
    default:
      return 'box';
  }
};

// Map status to label for display
export const getAssetStatusLabel = (status: string): string => {
  switch (status) {
    case 'open':
      return 'Aberto';
    case 'processing':
      return 'Processando';
    case 'completed':
      return 'Concluído';
    case 'cancelled':
      return 'Cancelado';
    default:
      return status;
  }
};

// Normalize asset type (handle accent variations, plural forms, etc.)
export const normalizeAssetType = (type: string): string => {
  const typeToLower = type.toLowerCase().trim();
  
  // Map common variations in Brazilian Portuguese to standard types
  if (typeToLower.includes('contrat') || typeToLower.includes('acordo'))
    return 'contract';
  if (typeToLower.includes('produt') || typeToLower.includes('item'))
    return 'product';
  if (typeToLower.includes('serviç') || typeToLower.includes('servic'))
    return 'service';
  if (typeToLower.includes('lead') || typeToLower.includes('prosp'))
    return 'lead';
  if (typeToLower.includes('propos') || typeToLower.includes('orçament'))
    return 'proposal';
  if (typeToLower.includes('projet') || typeToLower.includes('planej'))
    return 'project';
  if (typeToLower.includes('imóv') || typeToLower.includes('imov') || typeToLower.includes('casa'))
    return 'property';
  if (typeToLower.includes('veícul') || typeToLower.includes('veicul') || typeToLower.includes('carro'))
    return 'vehicle';
  if (typeToLower.includes('juríd') || typeToLower.includes('juridic') || typeToLower.includes('legal'))
    return 'legal';
  if (typeToLower.includes('document') || typeToLower.includes('arquivo'))
    return 'document';
  if (typeToLower.includes('ticket') || typeToLower.includes('chamado'))
    return 'ticket';
  if (typeToLower.includes('pedid') || typeToLower.includes('orden'))
    return 'order';
  if (typeToLower.includes('pagament') || typeToLower.includes('pag'))
    return 'payment';
    
  return 'other';
};

// Format currency for display
export const formatCurrency = (value?: number): string => {
  if (value === undefined || value === null) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency',
    currency: 'BRL' 
  }).format(value);
};

// Format asset amount for display
export const formatAssetAmount = (amount?: number): string => {
  return formatCurrency(amount);
};

// Get default asset values for a new asset
export const getDefaultAssetValues = (dealId: string): Partial<Asset> => {
  return {
    id: uuidv4(),
    dealId,
    title: '',
    description: '',
    type: 'contract',
    amount: 0,
    status: 'open',
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

// Determine if an asset is in a final state (completed or cancelled)
export const isAssetInFinalState = (status?: string): boolean => {
  return status === 'completed' || status === 'cancelled';
};

// Get a label for the timeline based on status change
export const getStatusChangeLabel = (status: string): string => {
  switch (status) {
    case 'open':
      return 'Asset aberto';
    case 'processing':
      return 'Asset em processamento';
    case 'completed':
      return 'Asset concluído';
    case 'cancelled':
      return 'Asset cancelado';
    default:
      return `Status alterado para ${status}`;
  }
};

// Validate that required fields are present
export const validateAssetRequiredFields = (asset: Partial<Asset>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!asset.title || asset.title.trim() === '') {
    errors.push('O título do asset é obrigatório');
  }
  
  if (!asset.type || asset.type.trim() === '') {
    errors.push('O tipo do asset é obrigatório');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};
