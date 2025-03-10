
import { Asset } from '@/pages/Workflows/models/WorkflowModels';

// Define asset type categories
export type AssetCategory = 'document' | 'financial' | 'property' | 'service' | 'product' | 'legal' | 'other';

// Map for asset types and their categories
export const assetTypeCategories: Record<string, AssetCategory> = {
  'contrato': 'legal',
  'proposta': 'document',
  'documento': 'document',
  'pagamento': 'financial',
  'financiamento': 'financial',
  'imovel': 'property',
  'veiculo': 'property',
  'servico': 'service',
  'produto': 'product',
  'lead': 'other',
  'projeto': 'other',
};

// Function to get category based on asset type
export const getAssetCategory = (assetType: string): AssetCategory => {
  const normalizedType = assetType?.toLowerCase() || '';
  return assetTypeCategories[normalizedType] || 'other';
};

// Function to get icon name based on asset type
export const getAssetTypeIcon = (assetType: string): string => {
  const category = getAssetCategory(assetType);
  
  switch (category) {
    case 'document': return 'file-text';
    case 'financial': return 'credit-card';
    case 'property': return 'home';
    case 'service': return 'briefcase';
    case 'product': return 'shopping-bag';
    case 'legal': return 'file-contract';
    default: return 'file';
  }
};

// Function to get common asset types for suggestions
export const getCommonAssetTypes = (): string[] => {
  return [
    'Contrato',
    'Proposta',
    'Documento',
    'Pagamento',
    'Financiamento',
    'Imóvel',
    'Veículo',
    'Serviço',
    'Produto',
    'Lead',
    'Projeto'
  ];
};

// Function to validate if the asset has all required fields
export const validateAssetRequiredFields = (asset: Partial<Asset>): boolean => {
  return !!(
    asset.title && 
    asset.type && 
    asset.status
  );
};

// Function to get default values for a new asset
export const getDefaultAssetValues = (dealId: string): Partial<Asset> => {
  return {
    dealId,
    title: '',
    description: '',
    type: '',
    status: 'open',
    parameters: {},
    createdAt: new Date(),
    updatedAt: new Date()
  };
};
