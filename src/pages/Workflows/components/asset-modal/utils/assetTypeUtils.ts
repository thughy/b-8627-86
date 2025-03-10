
import { Asset } from '@/pages/Workflows/models/WorkflowModels';

// Define asset type categories
export type AssetCategory = 'document' | 'financial' | 'property' | 'service' | 'product' | 'legal' | 'other' | 'lead' | 'proposal' | 'project';

// Map for asset types and their categories
export const assetTypeCategories: Record<string, AssetCategory> = {
  // Documentos
  'contrato': 'legal',
  'proposta': 'document',
  'documento': 'document',
  'relatório': 'document',
  'certificado': 'document',
  'anexo': 'document',
  
  // Financeiros
  'pagamento': 'financial',
  'financiamento': 'financial',
  'orçamento': 'financial',
  'fatura': 'financial',
  'boleto': 'financial',
  'recibo': 'financial',
  'extrato': 'financial',
  
  // Propriedades
  'imovel': 'property',
  'imóvel': 'property',
  'veiculo': 'property',
  'veículo': 'property',
  'equipamento': 'property',
  'maquinário': 'property',
  
  // Serviços
  'servico': 'service',
  'serviço': 'service',
  'consultoria': 'service',
  'manutenção': 'service',
  'instalação': 'service',
  'implementação': 'service',
  'suporte': 'service',
  
  // Produtos
  'produto': 'product',
  'item': 'product',
  'licença': 'product',
  'assinatura': 'product',
  
  // Legal
  'processo': 'legal',
  'petição': 'legal',
  'recurso': 'legal',
  'acordo': 'legal',
  'termo': 'legal',
  
  // Leads e Projetos
  'lead': 'lead',
  'oportunidade': 'lead',
  'contato': 'lead',
  'cliente': 'lead',
  'projeto': 'project',
  'plano': 'project',
  'iniciativa': 'project',
};

// Function to get category based on asset type
export const getAssetCategory = (assetType: string): AssetCategory => {
  const normalizedType = assetType?.toLowerCase().trim() || '';
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
    case 'legal': return 'scroll';
    case 'lead': return 'user-plus';
    case 'proposal': return 'file-signature';
    case 'project': return 'git-branch';
    default: return 'file';
  }
};

// Function to get color for asset type (for visual differentiation)
export const getAssetTypeColor = (assetType: string): string => {
  const category = getAssetCategory(assetType);
  
  switch (category) {
    case 'document': return 'bg-blue-500';
    case 'financial': return 'bg-green-500';
    case 'property': return 'bg-amber-500';
    case 'service': return 'bg-purple-500';
    case 'product': return 'bg-indigo-500';
    case 'legal': return 'bg-red-500';
    case 'lead': return 'bg-teal-500';
    case 'proposal': return 'bg-cyan-500';
    case 'project': return 'bg-violet-500';
    default: return 'bg-gray-500';
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
    'Projeto',
    'Processo',
    'Orçamento',
    'Consultoria',
    'Fatura'
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

// Function to get status options for assets
export const getAssetStatusOptions = (): { value: string; label: string }[] => {
  return [
    { value: 'open', label: 'Em aberto' },
    { value: 'processing', label: 'Em processamento' },
    { value: 'completed', label: 'Concluído' },
    { value: 'cancelled', label: 'Cancelado' }
  ];
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

// Function to get a friendly status label from status code
export const getAssetStatusLabel = (status: string): string => {
  switch (status) {
    case 'open': return 'Em aberto';
    case 'processing': return 'Em processamento';
    case 'completed': return 'Concluído';
    case 'cancelled': return 'Cancelado';
    default: return status;
  }
};

// Function to format asset amount for display
export const formatAssetAmount = (amount?: number): string => {
  if (amount === undefined || amount === null) return '-';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
};
