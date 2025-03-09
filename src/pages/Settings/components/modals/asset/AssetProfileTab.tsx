
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getDepartments, getPipelines, getStages } from "@/pages/Settings/services/workflowDataService";

interface AssetProfileTabProps {
  formData: Partial<Asset>;
  onChange: (key: string, value: any) => void;
}

const AssetProfileTab = ({ formData, onChange }: AssetProfileTabProps) => {
  const assetTypes = [
    "Contrato", "Imóvel", "Veículo", "Lead", "Proposta", 
    "Pedido", "Paciente", "Serviço", "Produto", "Projeto", "Petição"
  ];

  const [newType, setNewType] = useState("");
  const [availableTypes, setAvailableTypes] = useState(assetTypes);
  
  // Fetch workflow data
  const departments = getDepartments();
  const pipelines = getPipelines();
  const stages = getStages();

  // Get workflows from pipelines (for this example, we'll treat pipelines as workflows)
  const workflows = pipelines.map(pipeline => ({
    id: pipeline.id,
    title: pipeline.title,
    description: pipeline.description
  }));

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
          <div className="grid gap-2">
            <Label htmlFor="workflowTitle" className="text-xs">Workflow</Label>
            <Select 
              value={formData.workEnvironment?.workflowTitle || ""} 
              onValueChange={(value) => onChange("workEnvironment", {
                ...formData.workEnvironment,
                workflowTitle: value,
                workflowDescription: workflows.find(w => w.title === value)?.description || ""
              })}
            >
              <SelectTrigger id="workflowTitle">
                <SelectValue placeholder="Selecione o workflow" />
              </SelectTrigger>
              <SelectContent>
                {workflows.map((workflow) => (
                  <SelectItem key={workflow.id} value={workflow.title}>{workflow.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="departmentTitle" className="text-xs">Departamento</Label>
            <Select 
              value={formData.workEnvironment?.departmentTitle || ""} 
              onValueChange={(value) => onChange("workEnvironment", {
                ...formData.workEnvironment,
                departmentTitle: value
              })}
            >
              <SelectTrigger id="departmentTitle">
                <SelectValue placeholder="Selecione o departamento" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.title}>{department.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="stageTitle" className="text-xs">Estágio</Label>
            <Select 
              value={formData.workEnvironment?.stageTitle || ""} 
              onValueChange={(value) => onChange("workEnvironment", {
                ...formData.workEnvironment,
                stageTitle: value
              })}
            >
              <SelectTrigger id="stageTitle">
                <SelectValue placeholder="Selecione o estágio" />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage.id} value={stage.title}>{stage.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetProfileTab;
