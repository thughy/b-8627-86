
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import { getDefaultAssetValues } from "@/pages/Workflows/components/asset-modal/utils/assetTypeUtils";
import { Parameter } from "@/pages/Settings/components/modals/asset/components/ParameterItem";
import { parametersToObject } from "@/pages/Workflows/components/asset-modal/utils/parameterUtils";

export const useAssetLogic = (
  assets: Asset[],
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>,
  selectedAsset: Asset | null,
  setSelectedAsset: React.Dispatch<React.SetStateAction<Asset | null>>
) => {
  const { toast } = useToast();
  const [newAsset, setNewAsset] = useState<Partial<Asset>>(getDefaultAssetValues("temp-deal-id"));
  const [assetParameters, setAssetParameters] = useState<Parameter[]>([]);

  const handleParametersChange = (parameters: Parameter[]) => {
    const paramsObject = parametersToObject(parameters);
    setNewAsset(prev => ({
      ...prev,
      parameters: paramsObject
    }));
    setAssetParameters(parameters);
  };

  const handleAddAsset = (dealId: string) => {
    if (!newAsset.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o ativo.",
        variant: "destructive",
      });
      return;
    }

    if (!newAsset.type) {
      toast({
        title: "Tipo obrigatório",
        description: "Por favor, selecione um tipo para o ativo.",
        variant: "destructive",
      });
      return;
    }

    // Ensure we're not overwriting important fields
    const asset: Asset = {
      id: `asset-${Date.now()}`,
      dealId: dealId,
      title: newAsset.title || "Novo Ativo",
      description: newAsset.description || "",
      type: newAsset.type || "documento",
      amount: newAsset.amount,
      status: newAsset.status || "open",
      startDate: newAsset.startDate,
      endDate: newAsset.endDate,
      workEnvironment: newAsset.workEnvironment || {},
      files: newAsset.files || [],
      parameters: newAsset.parameters || {},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setAssets(prev => [...prev, asset]);
    setSelectedAsset(asset);
    
    // Reset form data
    setNewAsset(getDefaultAssetValues(dealId));
    setAssetParameters([]);
    
    toast({
      title: "Ativo adicionado",
      description: `O ativo "${asset.title}" foi adicionado com sucesso.`,
    });
  };

  const handleDeleteAsset = (assetId: string) => {
    toast({
      title: "Remover Ativo",
      description: `Tem certeza que deseja remover este ativo?`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            setAssets(prev => prev.filter(a => a.id !== assetId));
            
            if (selectedAsset?.id === assetId) {
              setSelectedAsset(null);
            }
            
            toast({
              title: "Ativo removido",
              description: `O ativo foi removido com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

  const handleUpdateAsset = (updatedAsset: Asset) => {
    setAssets(prev => prev.map(asset => 
      asset.id === updatedAsset.id 
        ? { ...updatedAsset, updatedAt: new Date() } 
        : asset
    ));
    
    setSelectedAsset(updatedAsset);
    
    toast({
      title: "Ativo atualizado",
      description: `O ativo "${updatedAsset.title}" foi atualizado com sucesso.`,
    });
  };

  return {
    newAsset,
    setNewAsset,
    assetParameters,
    setAssetParameters,
    handleAddAsset,
    handleDeleteAsset,
    handleUpdateAsset,
    handleParametersChange
  };
};
