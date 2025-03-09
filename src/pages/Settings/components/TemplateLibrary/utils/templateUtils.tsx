
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Template } from "@/pages/Workflows/models/WorkflowModels";

export const getTypeLabel = (type: Template['type']) => {
  switch (type) {
    case 'workflow':
      return <Badge className="bg-blue-500 hover:bg-blue-600">Workflow</Badge>;
    case 'department':
      return <Badge className="bg-green-500 hover:bg-green-600">Departamento</Badge>;
    case 'pipeline':
      return <Badge className="bg-purple-500 hover:bg-purple-600">Pipeline</Badge>;
    case 'stage':
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Estágio</Badge>;
    case 'agent':
      return <Badge className="bg-red-500 hover:bg-red-600">Agente</Badge>;
    case 'asset':
      return <Badge className="bg-orange-500 hover:bg-orange-600">Asset</Badge>;
    default:
      return null;
  }
};

export const flattenObject = (obj: Record<string, any>, prefix = '') => {
  return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      // Recursively flatten nested objects
      Object.assign(acc, flattenObject(obj[key], prefixedKey));
    } else {
      // Handle arrays and primitive values
      acc[prefixedKey] = obj[key];
    }
    
    return acc;
  }, {});
};
