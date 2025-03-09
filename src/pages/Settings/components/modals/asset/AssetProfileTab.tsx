
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AssetProfileTabProps {
  formData: Partial<Asset>;
  onChange: (key: string, value: any) => void;
}

const AssetProfileTab = ({ formData, onChange }: AssetProfileTabProps) => {
  const assetTypes = [
    "Contrato", "Imóvel", "Veículo", "Lead", "Proposta", 
    "Pedido", "Paciente", "Serviço", "Produto", "Projeto", "Petição"
  ];

  const [newType, setNewType] = React.useState("");
  const [availableTypes, setAvailableTypes] = React.useState(assetTypes);

  const handleAddNewType = () => {
    if (newType && !availableTypes.includes(newType)) {
      const updatedTypes = [...availableTypes, newType];
      setAvailableTypes(updatedTypes);
      onChange("type", newType);
      setNewType("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Título</Label>
        <Input 
          id="title"
          placeholder="Título do asset"
          value={formData.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea 
          id="description"
          placeholder="Descreva este asset"
          rows={3}
          value={formData.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="type">Tipo</Label>
        <div className="flex gap-2">
          <Select 
            value={formData.type} 
            onValueChange={(value) => onChange("type", value)}
          >
            <SelectTrigger id="type" className="flex-1">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {availableTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => document.getElementById("newTypeInput")?.classList.toggle("hidden")}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div id="newTypeInput" className="grid gap-2 hidden">
        <Label htmlFor="newType">Novo Tipo</Label>
        <div className="flex gap-2">
          <Input 
            id="newType"
            placeholder="Nome do novo tipo"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAddNewType}>Adicionar</Button>
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Ambiente de Trabalho</Label>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="workflowTitle" className="text-xs">Workflow</Label>
              <Input 
                id="workflowTitle"
                placeholder="Título do workflow"
                value={formData.workEnvironment?.workflowTitle || ""}
                onChange={(e) => onChange("workEnvironment", {
                  ...formData.workEnvironment,
                  workflowTitle: e.target.value
                })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="departmentTitle" className="text-xs">Departamento</Label>
              <Input 
                id="departmentTitle"
                placeholder="Título do departamento"
                value={formData.workEnvironment?.departmentTitle || ""}
                onChange={(e) => onChange("workEnvironment", {
                  ...formData.workEnvironment,
                  departmentTitle: e.target.value
                })}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="stageTitle" className="text-xs">Estágio</Label>
            <Input 
              id="stageTitle"
              placeholder="Título do estágio"
              value={formData.workEnvironment?.stageTitle || ""}
              onChange={(e) => onChange("workEnvironment", {
                ...formData.workEnvironment,
                stageTitle: e.target.value
              })}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetProfileTab;
