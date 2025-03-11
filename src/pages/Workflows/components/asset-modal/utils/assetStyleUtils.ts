import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { getAssetTypeColor, normalizeAssetType, formatCurrency } from './assetTypeUtils';

// Get the background color for the asset card
export const getAssetCardBgColor = (asset: Asset): string => {
  // Base on type
  return `${getAssetTypeColor(asset.type).replace('bg-', '')}`;
};

// Get the text color for the asset card (ensuring contrast)
export const getAssetCardTextColor = (asset: Asset): string => {
  // Keep it simple for now - white text on all colored backgrounds
  return 'text-white';
};

// Generate a border class based on status
export const getAssetCardBorder = (asset: Asset): string => {
  switch (asset.status) {
    case 'completed':
      return 'border-green-400 dark:border-green-600 border-2';
    case 'processing':
      return 'border-blue-400 dark:border-blue-600 border-2';
    case 'cancelled':
      return 'border-red-400 dark:border-red-600 border-2';
    case 'open':
    default:
      return 'border-transparent';
  }
};

// Get a display name for the asset type (formatted)
export const getAssetTypeDisplay = (asset: Asset): string => {
  const assetType = asset.type || '';
  
  // Map to display names
  const typeMap: Record<string, string> = {
    'contract': 'Contrato',
    'product': 'Produto',
    'service': 'Serviço',
    'lead': 'Lead',
    'proposal': 'Proposta',
    'project': 'Projeto',
    'property': 'Imóvel',
    'vehicle': 'Veículo',
    'legal': 'Jurídico',
    'document': 'Documento',
    'ticket': 'Ticket',
    'order': 'Pedido',
    'payment': 'Pagamento'
  };
  
  const normalizedType = normalizeAssetType(assetType);
  return typeMap[normalizedType] || assetType;
};

// Format asset amount for display 
export const formatAssetAmount = (asset: Asset): string => {
  return formatCurrency(asset.amount);
};

// Get status badge color
export const getStatusBadgeColor = (status: string): string => {
  switch (status) {
    case 'open':
      return 'bg-yellow-500 text-white';
    case 'processing':
      return 'bg-blue-500 text-white';
    case 'completed':
      return 'bg-green-500 text-white';
    case 'cancelled':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

// Get parameters as a list with titles and values
export const formatAssetParametersList = (asset: Asset): {title: string, value: string}[] => {
  if (!asset.parameters) return [];
  
  return Object.entries(asset.parameters).map(([key, value]) => {
    let formattedValue = '';
    
    if (typeof value === 'boolean') {
      formattedValue = value ? 'Sim' : 'Não';
    } else if (value instanceof Date) {
      formattedValue = value.toLocaleDateString('pt-BR');
    } else if (typeof value === 'number') {
      formattedValue = formatCurrency(value);
    } else {
      formattedValue = String(value);
    }
    
    return {
      title: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      value: formattedValue
    };
  });
};

// Function to get background gradient based on asset type
export const getAssetBackground = (assetType: string): string => {
  switch (assetType?.toLowerCase()) {
    case 'contrato':
      return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20';
    case 'proposta':
      return 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20';
    case 'documento':
      return 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20';
    case 'pagamento':
      return 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20';
    case 'financiamento':
      return 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20';
    default:
      return 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/20 dark:to-gray-900/20';
  }
};
