
import { Asset } from '@/pages/Workflows/models/WorkflowModels';

/**
 * Returns the appropriate background gradient style based on asset type
 */
export const getAssetBackground = (type: string) => {
  switch (type.toLowerCase()) {
    case 'contrato':
      return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20';
    case 'proposta':
      return 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20';
    case 'produto':
      return 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20';
    case 'serviço':
    case 'servico':
      return 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20';
    case 'imovel':
    case 'imóvel':
      return 'bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/30 dark:to-teal-900/20';
    case 'veículo':
    case 'veiculo':
      return 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20';
    default:
      return 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/30 dark:to-gray-900/20';
  }
};
