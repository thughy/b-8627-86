
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AssetCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assetData: any) => void;
  dealId: string;
}

const AssetCreationModal = ({ isOpen, onClose, onSave, dealId }: AssetCreationModalProps) => {
  const { toast } = useToast();
  const [assetData, setAssetData] = useState({
    title: "",
    description: "",
    type: "",
    amount: "",
    status: "open",
    dealId
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssetData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setAssetData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!assetData.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o ativo.",
        variant: "destructive",
      });
      return;
    }

    onSave({
      ...assetData,
      amount: assetData.amount ? parseFloat(assetData.amount) : undefined,
      createdAt: new Date()
    });
    
    toast({
      title: "Ativo criado",
      description: `O ativo "${assetData.title}" foi criado com sucesso.`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Ativo</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input
              id="title"
              name="title"
              value={assetData.title}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              id="description"
              name="description"
              value={assetData.description}
              onChange={handleChange}
              className="col-span-3"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Tipo
            </Label>
            <Select 
              value={assetData.type} 
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contract">Contrato</SelectItem>
                <SelectItem value="proposal">Proposta</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="property">Imóvel</SelectItem>
                <SelectItem value="vehicle">Veículo</SelectItem>
                <SelectItem value="product">Produto</SelectItem>
                <SelectItem value="service">Serviço</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Valor
            </Label>
            <Input
              id="amount"
              name="amount"
              value={assetData.amount}
              onChange={handleChange}
              type="number"
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select 
              value={assetData.status} 
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Aberto</SelectItem>
                <SelectItem value="processing">Processando</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetCreationModal;
