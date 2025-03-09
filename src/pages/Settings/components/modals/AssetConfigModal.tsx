
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoIcon, ImageIcon, HistoryIcon } from "lucide-react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status: 'open' | 'processing' | 'completed' | 'canceled') => {
    setFormData(prev => ({ ...prev, status }));
  };

  const handleTypeChange = (type: string) => {
    setFormData(prev => ({ ...prev, type }));
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{asset ? "Editar Asset" : "Novo Asset"}</DialogTitle>
          <DialogDescription>
            {asset 
              ? "Edite as informações do asset existente." 
              : "Configure um novo asset para seu negócio."}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-5">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <InfoIcon className="h-4 w-4" />
              <span>Informações</span>
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
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input 
                  id="title"
                  name="title"
                  placeholder="Título do asset"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description"
                  name="description"
                  placeholder="Descreva este asset"
                  rows={3}
                  value={formData.description || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Tipo</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Contrato">Contrato</SelectItem>
                    <SelectItem value="Imóvel">Imóvel</SelectItem>
                    <SelectItem value="Lead">Lead</SelectItem>
                    <SelectItem value="Produto">Produto</SelectItem>
                    <SelectItem value="Serviço">Serviço</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="amount">Valor</Label>
                <Input 
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Valor do asset"
                  value={formData.amount || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label>Status</Label>
                <div className="grid grid-cols-2 gap-2 md:flex md:space-x-2">
                  <Button 
                    type="button" 
                    variant={formData.status === 'open' ? "default" : "outline"}
                    onClick={() => handleStatusChange('open')}
                    className="flex-1"
                  >
                    Aberto
                  </Button>
                  <Button 
                    type="button" 
                    variant={formData.status === 'processing' ? "default" : "outline"}
                    onClick={() => handleStatusChange('processing')}
                    className="flex-1"
                  >
                    Processando
                  </Button>
                  <Button 
                    type="button" 
                    variant={formData.status === 'completed' ? "default" : "outline"}
                    onClick={() => handleStatusChange('completed')}
                    className="flex-1"
                  >
                    Concluído
                  </Button>
                  <Button 
                    type="button" 
                    variant={formData.status === 'canceled' ? "default" : "outline"}
                    onClick={() => handleStatusChange('canceled')}
                    className="flex-1"
                  >
                    Cancelado
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-4 mt-4">
            <div className="flex items-center justify-center h-40 border rounded-md text-muted-foreground">
              Configuração de Mídias em desenvolvimento
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4 mt-4">
            <div className="flex items-center justify-center h-40 border rounded-md text-muted-foreground">
              Histórico em desenvolvimento
            </div>
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
