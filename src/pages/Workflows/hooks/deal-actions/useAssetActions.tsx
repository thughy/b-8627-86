
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { getDefaultAssetValues } from '../../components/asset-modal/utils/assetTypeUtils';

export const useAssetActions = () => {
  // Gerenciamento de assets
  const handleCreateAsset = (dealId: string, assetData?: Partial<Asset>): Asset => {
    const defaultValues = getDefaultAssetValues(dealId);
    const newAsset: Asset = {
      ...defaultValues,
      ...(assetData || {}),
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    } as Asset;
    
    return newAsset;
  };

  const handleEditAsset = (asset: Asset) => {
    return {
      ...asset,
      updatedAt: new Date()
    };
  };

  const handleDeleteAsset = (assetId: string) => {
    return assetId;
  };

  const handleCompleteAsset = (assetId: string) => {
    return {
      assetId,
      status: 'completed',
      updatedAt: new Date()
    };
  };

  const handleCancelAsset = (assetId: string) => {
    return {
      assetId,
      status: 'cancelled',
      updatedAt: new Date()
    };
  };

  const handleCreateNoteForAsset = (assetId: string, note: string) => {
    return {
      id: uuidv4(),
      assetId,
      type: 'note',
      content: note,
      createdAt: new Date()
    };
  };

  const handleCreateDocumentForAsset = (assetId: string, documentUrl: string, documentName: string) => {
    return {
      id: uuidv4(),
      assetId,
      type: 'document',
      url: documentUrl,
      name: documentName,
      createdAt: new Date()
    };
  };

  return {
    handleCreateAsset,
    handleEditAsset,
    handleDeleteAsset,
    handleCompleteAsset,
    handleCancelAsset,
    handleCreateNoteForAsset,
    handleCreateDocumentForAsset
  };
};
