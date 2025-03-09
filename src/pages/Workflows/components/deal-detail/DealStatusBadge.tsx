
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { Badge } from '@/components/ui/badge';

interface DealStatusBadgeProps {
  status: Deal['status'];
}

const DealStatusBadge: React.FC<DealStatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: Deal['status']) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
      case 'won':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'lost':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      case 'completed':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/30';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };

  const getStatusText = (status: Deal['status']) => {
    switch (status) {
      case 'open':
        return 'Em aberto';
      case 'won':
        return 'Ganho';
      case 'lost':
        return 'Perdido';
      case 'completed':
        return 'Concluído';
      default:
        return status;
    }
  };

  return (
    <Badge variant="outline" className={`${getStatusColor(status)} thin-border`}>
      {getStatusText(status)}
    </Badge>
  );
};

export default DealStatusBadge;
