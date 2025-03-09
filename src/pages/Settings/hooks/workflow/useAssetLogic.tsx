
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";

export const useAssetLogic = (
  assets: Asset[],
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>,
  selectedAsset: Asset | null,
  setSelectedAsset: React.Dispatch<React.SetStateAction<Asset | null>>
) => {
  const { toast } = useToast();
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({ title: "", description: "", type: "", status: "open" });

  const handleAddAsset = (stageId: string) => {
    if (!newAsset.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o asset.",
        variant: "destructive",
      });
      return;
    }

    const asset: Asset = {
      id: `asset-${Date.now()}`,
      dealId: stageId,
      title: newAsset.title,
      description: newAsset.description || "",
      type: newAsset.type || "Documento",
      status: "open",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setAssets(prev => [...prev, asset]);
    setSelectedAsset(asset);
    setNewAsset({ title: "", description: "", type: "", status: "open" });
    
    toast({
      title: "Asset adicionado",
      description: `O asset "${asset.title}" foi adicionado com sucesso.`,
    });
  };

  const handleDeleteAsset = (assetId: string) => {
    toast({
      title: "Remover Asset",
      description: `Tem certeza que deseja remover este asset?`,
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
              title: "Asset removido",
              description: `O asset foi removido com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

  return {
    newAsset,
    setNewAsset,
    handleAddAsset,
    handleDeleteAsset
  };
};
