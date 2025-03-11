
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { v4 as uuidv4 } from 'uuid';

// Asset type definitions
export const assetTypes = [
  { value: 'contract', label: 'Contrato' },
  { value: 'product', label: 'Produto' },
  { value: 'service', label: 'Serviço' },
  { value: 'realestate', label: 'Imóvel' },
  { value: 'vehicle', label: 'Veículo' },
  { value: 'proposal', label: 'Proposta' },
  { value: 'order', label: 'Pedido' },
  { value: 'project', label: 'Projeto' },
  { value: 'lead', label: 'Lead' },
];

export const getCommonAssetTypes = () => {
  return assetTypes.slice(0, 5); // Return most common asset types
};

export const getAssetStatusOptions = () => {
  return [
    { value: 'open', label: 'Aberto' },
    { value: 'processing', label: 'Processando' },
    { value: 'completed', label: 'Concluído' },
    { value: 'cancelled', label: 'Cancelado' }
  ];
};

export const getAssetTypeColor = (type: string): string => {
  switch (type) {
    case 'contract':
      return 'bg-blue-50 border-blue-200 text-blue-800';
    case 'product':
      return 'bg-green-50 border-green-200 text-green-800';
    case 'service':
      return 'bg-purple-50 border-purple-200 text-purple-800';
    case 'realestate':
      return 'bg-amber-50 border-amber-200 text-amber-800';
    case 'vehicle':
      return 'bg-indigo-50 border-indigo-200 text-indigo-800';
    case 'proposal':
      return 'bg-pink-50 border-pink-200 text-pink-800';
    case 'order':
      return 'bg-teal-50 border-teal-200 text-teal-800';
    case 'project':
      return 'bg-orange-50 border-orange-200 text-orange-800';
    case 'lead':
      return 'bg-emerald-50 border-emerald-200 text-emerald-800';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-800';
  }
};

export const getAssetTypeIcon = (type: string): string => {
  switch (type) {
    case 'contract':
      return 'file-text';
    case 'product':
      return 'package';
    case 'service':
      return 'settings';
    case 'realestate':
      return 'home';
    case 'vehicle':
      return 'car';
    case 'proposal':
      return 'clipboard';
    case 'order':
      return 'shopping-cart';
    case 'project':
      return 'briefcase';
    case 'lead':
      return 'user';
    default:
      return 'file';
  }
};

export const getAssetBackground = (type: string): string => {
  switch (type) {
    case 'contract':
      return 'bg-gradient-to-r from-blue-100 to-blue-50';
    case 'product':
      return 'bg-gradient-to-r from-green-100 to-green-50';
    case 'service':
      return 'bg-gradient-to-r from-purple-100 to-purple-50';
    case 'realestate':
      return 'bg-gradient-to-r from-amber-100 to-amber-50';
    case 'vehicle':
      return 'bg-gradient-to-r from-indigo-100 to-indigo-50';
    case 'proposal':
      return 'bg-gradient-to-r from-pink-100 to-pink-50';
    case 'order':
      return 'bg-gradient-to-r from-teal-100 to-teal-50';
    case 'project':
      return 'bg-gradient-to-r from-orange-100 to-orange-50';
    case 'lead':
      return 'bg-gradient-to-r from-emerald-100 to-emerald-50';
    default:
      return 'bg-gradient-to-r from-gray-100 to-gray-50';
  }
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatAssetAmount = (value: number | undefined): string => {
  if (value === undefined) return 'R$ 0,00';
  return formatCurrency(value);
};

export const getDefaultAssetValues = (dealId: string): Partial<Asset> => {
  return {
    id: uuidv4(),
    dealId,
    title: '',
    description: '',
    type: 'contract',
    status: 'open',
    amount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

export const validateAssetRequiredFields = (asset: Partial<Asset>): boolean => {
  return !!(
    asset.title &&
    asset.dealId &&
    asset.type &&
    asset.status
  );
};
