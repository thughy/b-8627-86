
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import AssetTabs from "./asset/AssetTabs";

interface AssetConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset?: Asset;
  onSave: (asset: Partial<Asset>) => void;
}

const AssetConfigModal = ({ 
  isOpen, 
  onClose, 
  asset, 
  onSave 
}: AssetConfigModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState<Partial<Asset>>(
    asset || {
      title: "",
      description: "",
      type: "Contrato",
      status: "open",
    }
  );

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o asset.",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
    toast({
      title: asset ? "Asset atualizado" : "Asset criado",
      description: `O asset "${formData.title}" foi ${asset ? "atualizado" : "criado"} com sucesso.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{asset ? "Editar Asset" : "Novo Asset"}</DialogTitle>
          <DialogDescription>
            {asset 
              ? "Edite as informações do asset existente." 
              : "Configure um novo asset para seu negócio."}
          </DialogDescription>
        </DialogHeader>

        <AssetTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          formData={formData}
          onChange={handleChange}
        />

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetConfigModal;
