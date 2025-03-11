
import { Asset } from '@/pages/Workflows/models/WorkflowModels';

export interface AssetParameter {
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'select';
  value: any;
  options?: string[]; // For select type
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
