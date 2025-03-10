
// Function to get background gradient based on asset type
export const getAssetBackground = (assetType: string): string => {
  switch (assetType?.toLowerCase()) {
    case 'contrato':
      return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20';
    case 'proposta':
      return 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20';
    case 'documento':
      return 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20';
    case 'pagamento':
      return 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20';
    case 'financiamento':
      return 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20';
    default:
      return 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/20 dark:to-gray-900/20';
  }
};
