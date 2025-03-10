
import { Parameter } from "@/pages/Settings/components/modals/asset/components/ParameterItem";

/**
 * Validates a parameter name to ensure it follows allowed formatting
 */
export const validateParameterName = (name: string): boolean => {
  // Parameter name should only contain letters, numbers, and underscores
  // Should start with a letter and be at least 2 characters long
  const pattern = /^[a-zA-Z][a-zA-Z0-9_]{1,}$/;
  return pattern.test(name);
};

/**
 * Formats the parameter name to be used as an identifier
 */
export const formatParameterName = (name: string): string => {
  // Convert spaces to underscores and remove special characters
  let formatted = name.trim().replace(/\s+/g, '_');
  // Remove any non-alphanumeric characters except underscore
  formatted = formatted.replace(/[^a-zA-Z0-9_]/g, '');
  
  return formatted;
};

/**
 * Generates a default value based on parameter type
 */
export const getDefaultValueForType = (type: Parameter['type']): any => {
  switch (type) {
    case 'text':
      return '';
    case 'number':
      return 0;
    case 'date':
      return new Date();
    case 'switch':
      return false;
    case 'dropdown':
      return null;
    case 'file':
      return null;
    default:
      return '';
  }
};

/**
 * Creates a new parameter with a unique name
 */
export const createUniqueParameter = (
  name: string, 
  type: Parameter['type'], 
  existingParameters: Parameter[]
): Parameter => {
  // Format the name
  let paramName = formatParameterName(name);
  
  // Check if the name already exists
  let counter = 1;
  const existingNames = existingParameters.map(p => p.name);
  
  while (existingNames.includes(paramName)) {
    paramName = `${formatParameterName(name)}_${counter}`;
    counter++;
  }
  
  return {
    name: paramName,
    type,
    value: getDefaultValueForType(type)
  };
};

/**
 * Validates a parameter value against its expected type
 */
export const validateParameterValue = (value: any, type: Parameter['type']): boolean => {
  switch (type) {
    case 'text':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'date':
      return value instanceof Date && !isNaN(value.getTime());
    case 'switch':
      return typeof value === 'boolean';
    case 'dropdown':
      return value !== undefined && value !== null;
    case 'file':
      return typeof value === 'string' || value instanceof File;
    default:
      return true;
  }
};

/**
 * Converts parameters to a flat object for storage
 */
export const parametersToObject = (parameters: Parameter[]): Record<string, any> => {
  return parameters.reduce((obj, param) => {
    obj[param.name] = param.value;
    return obj;
  }, {} as Record<string, any>);
};

/**
 * Converts a flat object back to parameters array
 */
export const objectToParameters = (obj: Record<string, any>): Parameter[] => {
  return Object.entries(obj).map(([name, value]) => {
    // Determine type based on value
    let type: Parameter['type'] = 'text';
    
    if (typeof value === 'number') type = 'number';
    else if (value instanceof Date) type = 'date';
    else if (typeof value === 'boolean') type = 'switch';
    else if (value instanceof File) type = 'file';
    
    return { name, type, value };
  });
};
