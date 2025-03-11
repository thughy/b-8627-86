
import React from 'react';
import { Type, Hash, Calendar, CheckSquare, ListFilter } from 'lucide-react';
import { ParameterType } from './ParameterTypeSelect';

interface ParameterIconProps {
  type: string;
  className?: string;
}

const ParameterIcon: React.FC<ParameterIconProps> = ({ type, className = "h-3.5 w-3.5" }) => {
  switch (type) {
    case 'text':
      return <Type className={className} />;
    case 'number':
      return <Hash className={className} />;
    case 'date':
      return <Calendar className={className} />;
    case 'boolean':
      return <CheckSquare className={className} />;
    case 'select':
      return <ListFilter className={className} />;
    default:
      return <Type className={className} />;
  }
};

export default ParameterIcon;
