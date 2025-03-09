
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import { InfoIcon, ImageIcon, HistoryIcon, SettingsIcon, ClipboardListIcon } from "lucide-react";
import AssetProfileTab from "./asset/AssetProfileTab";
import AssetDetailsTab from "./asset/AssetDetailsTab";
import AssetMediaTab from "./asset/AssetMediaTab";
import AssetParamsTab from "./asset/AssetParamsTab";
import AssetHistoryTab from "./asset/AssetHistoryTab";

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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-5">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <InfoIcon className="h-4 w-4" />
              <span>Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2">
              <ClipboardListIcon className="h-4 w-4" />
              <span>Detalhes</span>
            </TabsTrigger>
            <TabsTrigger value="params" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              <span>Parâmetros</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Mídia</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <HistoryIcon className="h-4 w-4" />
              <span>Histórico</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <AssetProfileTab 
              formData={formData} 
              onChange={handleChange}
            />
          </TabsContent>

          <TabsContent value="details" className="space-y-4 mt-4">
            <AssetDetailsTab 
              formData={formData} 
              onChange={handleChange}
            />
          </TabsContent>

          <TabsContent value="params" className="space-y-4 mt-4">
            <AssetParamsTab 
              formData={formData} 
              onChange={handleChange}
            />
          </TabsContent>
          
          <TabsContent value="media" className="space-y-4 mt-4">
            <AssetMediaTab />
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4 mt-4">
            <AssetHistoryTab />
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetConfigModal;
