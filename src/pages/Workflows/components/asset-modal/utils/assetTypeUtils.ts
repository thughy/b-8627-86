
import { Asset } from '@/pages/Workflows/models/WorkflowModels';

// Define asset type options
export const assetTypes = [
  { value: 'contract', label: 'Contrato' },
  { value: 'proposal', label: 'Proposta' },
  { value: 'order', label: 'Pedido' },
  { value: 'service', label: 'Serviço' },
  { value: 'product', label: 'Produto' },
  { value: 'project', label: 'Projeto' },
  { value: 'task', label: 'Tarefa' },
  { value: 'document', label: 'Documento' },
  { value: 'property', label: 'Imóvel' },
  { value: 'vehicle', label: 'Veículo' },
  { value: 'subscription', label: 'Assinatura' },
  { value: 'custom', label: 'Personalizado' },
];

// Get background style based on asset type
export const getAssetBackground = (type: string): string => {
  switch (type) {
    case 'contract':
      return 'bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/50 dark:to-background';
    case 'proposal':
      return 'bg-gradient-to-r from-purple-50 to-white dark:from-purple-950/50 dark:to-background';
    case 'order':
      return 'bg-gradient-to-r from-green-50 to-white dark:from-green-950/50 dark:to-background';
    case 'service':
      return 'bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-950/50 dark:to-background';
    case 'product':
      return 'bg-gradient-to-r from-amber-50 to-white dark:from-amber-950/50 dark:to-background';
    case 'project':
      return 'bg-gradient-to-r from-teal-50 to-white dark:from-teal-950/50 dark:to-background';
    default:
      return 'bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/50 dark:to-background';
  }
};

// Get color for asset status badge
export const getAssetStatusColor = (status: Asset['status']): string => {
  switch (status) {
    case 'open':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500';
    case 'processing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
  }
};

// Get status options for asset
export const getAssetStatusOptions = () => {
  return [
    { value: 'open', label: 'Aberto' },
    { value: 'processing', label: 'Em processamento' },
    { value: 'completed', label: 'Concluído' },
    { value: 'cancelled', label: 'Cancelado' },
  ];
};

// Format currency to BRL
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Get default values for new asset
export const getDefaultAssetValues = (dealId: string): Partial<Asset> => {
  return {
    dealId,
    title: '',
    description: '',
    type: 'contract',
    amount: 0,
    status: 'open',
    parameters: {},
    workEnvironment: {},
    files: []
  };
};

// Normalize asset type string for consistent usage
export const normalizeAssetType = (type: string): string => {
  const normalizedType = type.toLowerCase().trim();
  const foundType = assetTypes.find(t => t.value === normalizedType);
  return foundType ? foundType.value : 'custom';
};
