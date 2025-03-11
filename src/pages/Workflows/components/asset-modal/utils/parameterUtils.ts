
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
