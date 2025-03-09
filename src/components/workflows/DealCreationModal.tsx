
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Stage } from "@/pages/Workflows/models/WorkflowModels";
import { useToast } from "@/hooks/use-toast";

interface DealCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (deal: any) => void;
  stages: Stage[];
}

const DealCreationModal = ({ 
  isOpen, 
  onClose, 
  onSave,
  stages
}: DealCreationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stageId: "",
    type: "lead",
    status: "open",
    customerName: "",
    customerOrganization: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o deal.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.stageId) {
      toast({
        title: "Estágio obrigatório",
        description: "Por favor, selecione um estágio para o deal.",
        variant: "destructive",
      });
      return;
    }

    const newDeal = {
      ...formData,
      id: `deal-${Date.now()}`,
      createdAt: new Date()
    };

    onSave(newDeal);
    
    toast({
      title: "Deal criado",
      description: `O deal "${formData.title}" foi criado com sucesso.`,
    });
    
    setFormData({
      title: "",
      description: "",
      stageId: "",
      type: "lead",
      status: "open",
      customerName: "",
      customerOrganization: ""
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo Deal</DialogTitle>
          <DialogDescription>
            Crie um novo deal para iniciar o processo no pipeline.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
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
              value={formData.description}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stage" className="text-right">
              Estágio
            </Label>
            <Select
              value={formData.stageId}
              onValueChange={(value) => handleSelectChange("stageId", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um estágio" />
              </SelectTrigger>
              <SelectContent>
                {stages.map(stage => (
                  <SelectItem key={stage.id} value={stage.id}>
                    {stage.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Tipo
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="contract">Contrato</SelectItem>
                <SelectItem value="proposal">Proposta</SelectItem>
                <SelectItem value="product">Produto</SelectItem>
                <SelectItem value="service">Serviço</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerName" className="text-right">
              Cliente
            </Label>
            <Input
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Nome do cliente"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerOrganization" className="text-right">
              Organização
            </Label>
            <Input
              id="customerOrganization"
              name="customerOrganization"
              value={formData.customerOrganization}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Organização do cliente"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Criar Deal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DealCreationModal;
