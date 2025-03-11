import { Asset } from '@/pages/Workflows/models/WorkflowModels';

export interface AssetParameter {
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'select';
  value: any;
  options?: string[]; // For select type
  description?: string; // Add description for parameter documentation
  required?: boolean; // Indicate if parameter is required
  placeholder?: string; // UI helper for input fields
}

// Convert parameters object to array for form handling
export const parametersToArray = (asset: Asset): AssetParameter[] => {
  if (!asset.parameters) return [];
  
  return Object.entries(asset.parameters).map(([name, value]) => {
    const param: AssetParameter = {
      name,
      value,
      type: determineParameterType(value)
    };
    
    if (param.type === 'select' && Array.isArray(value)) {
      param.options = value;
      param.value = value[0] || '';
    }
    
    return param;
  });
};

// Convert parameter array back to object for saving
export const arrayToParameters = (params: AssetParameter[]): Record<string, any> => {
  const result: Record<string, any> = {};
  
  params.forEach(param => {
    if (param.name.trim()) {
      result[param.name] = formatParameterValue(param.value, param.type);
    }
  });
  
  return result;
};

// This function converts parameters from the Settings format to the Workflow format
export const parametersToObject = (params: any[]): Record<string, any> => {
  const result: Record<string, any> = {};
  
  params.forEach(param => {
    if (param.name && param.name.trim()) {
      result[param.name] = formatParameterValue(param.value, param.type);
    }
  });
  
  return result;
};

// Format parameter value based on type
export const formatParameterValue = (value: any, type: string): any => {
  switch (type) {
    case 'number':
      return Number(value);
    case 'boolean':
      return Boolean(value);
    case 'date':
      return value instanceof Date ? value : new Date(value);
    default:
      return String(value);
  }
};

// Determine parameter type based on value
export const determineParameterType = (value: any): 'text' | 'number' | 'date' | 'boolean' | 'select' => {
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (value instanceof Date) return 'date';
  if (Array.isArray(value)) return 'select';
  
  // Try to parse as date
  if (typeof value === 'string') {
    const datePattern = /^\d{4}-\d{2}-\d{2}|^\d{2}\/\d{2}\/\d{4}/;
    if (datePattern.test(value)) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) return 'date';
    }
  }
  
  return 'text';
};

// Get label for parameter type
export const getParameterTypeLabel = (type: string): string => {
  const typeMap: Record<string, string> = {
    'text': 'Texto',
    'number': 'Número',
    'date': 'Data',
    'boolean': 'Sim/Não',
    'select': 'Seleção'
  };
  
  return typeMap[type] || 'Texto';
};

// Check if a parameter name is valid
export const isValidParameterName = (name: string): boolean => {
  return name.trim().length > 0;
};

// Get a list of system reserved parameter names
export const getReservedParameterNames = (): string[] => {
  return [
    'id', 'dealId', 'title', 'description', 'type', 
    'amount', 'status', 'startDate', 'endDate', 
    'files', 'createdAt', 'updatedAt'
  ];
};

// Create a new parameter with default values based on type
export const createDefaultParameter = (type: 'text' | 'number' | 'date' | 'boolean' | 'select' = 'text'): AssetParameter => {
  const param: AssetParameter = {
    name: '',
    type: type,
    value: getDefaultValueForType(type),
    required: false,
    description: ''
  };
  
  if (type === 'select') {
    param.options = [''];
  }
  
  return param;
};

// Get default value for parameter type
export const getDefaultValueForType = (type: string): any => {
  switch (type) {
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'date':
      return new Date();
    case 'select':
      return '';
    default:
      return '';
  }
};

// Validate all parameters in an array
export const validateParameters = (parameters: AssetParameter[]): { valid: boolean, errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  const reservedNames = getReservedParameterNames();
  const parameterNames = new Set<string>();
  
  parameters.forEach((param, index) => {
    // Check for empty names
    if (!param.name.trim()) {
      errors[`param-${index}`] = 'Nome do parâmetro não pode ser vazio';
    }
    
    // Check for reserved names
    if (reservedNames.includes(param.name.trim())) {
      errors[`param-${index}`] = `"${param.name}" é um nome reservado pelo sistema`;
    }
    
    // Check for duplicate names
    if (parameterNames.has(param.name.trim())) {
      errors[`param-${index}`] = `Parâmetro "${param.name}" já existe`;
    } else {
      parameterNames.add(param.name.trim());
    }
    
    // Validate based on type
    if (param.type === 'number' && isNaN(Number(param.value))) {
      errors[`param-${index}-value`] = 'Valor deve ser um número';
    }
    
    if (param.type === 'select' && (!param.options || param.options.length === 0)) {
      errors[`param-${index}-options`] = 'Pelo menos uma opção deve ser definida';
    }
  });
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const getAssetStatusOptions = () => {
  return [
    { value: 'open', label: 'Aberto' },
    { value: 'processing', label: 'Processando' },
    { value: 'completed', label: 'Concluído' },
    { value: 'canceled', label: 'Cancelado' }
  ];
};

// Add any missing exports that might be referenced in other files
export const assetTypes = [
  { value: 'contract', label: 'Contrato' },
  { value: 'proposal', label: 'Proposta' },
  { value: 'product', label: 'Produto' },
  { value: 'service', label: 'Serviço' },
  { value: 'project', label: 'Projeto' },
  { value: 'document', label: 'Documento' },
  { value: 'other', label: 'Outro' }
];

export const getAssetTypeColor = (type: string): string => {
  switch (type) {
    case 'contract': return 'bg-blue-500';
    case 'proposal': return 'bg-green-500';
    case 'product': return 'bg-purple-500';
    case 'service': return 'bg-amber-500';
    case 'project': return 'bg-teal-500';
    case 'document': return 'bg-rose-500';
    default: return 'bg-slate-500';
  }
};

export const getAssetTypeIcon = (type: string): string => {
  switch (type) {
    case 'contract': return 'FileText';
    case 'proposal': return 'FileCheck';
    case 'product': return 'Package';
    case 'service': return 'Tool';
    case 'project': return 'GitBranch';
    case 'document': return 'File';
    default: return 'File';
  }
};

export const formatAssetAmount = formatCurrency;

export const validateAssetRequiredFields = (asset: any): { valid: boolean, errors: string[] } => {
  const errors: string[] = [];
  
  if (!asset.title?.trim()) {
    errors.push('O título do asset é obrigatório');
  }
  
  if (!asset.type) {
    errors.push('O tipo do asset é obrigatório');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export const normalizeAssetType = (assetType: string): string => {
  return assetType.toLowerCase().replace(/\s+/g, '-');
};

export const getDefaultAssetValues = (type: string) => {
  return {
    title: '',
    type,
    description: '',
    status: 'open' as const,
    amount: 0,
    files: [],
    parameters: {},
    createdAt: new Date(),
    updatedAt: new Date()
  };
};
