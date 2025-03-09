
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import { getDepartments, getPipelines, getStages } from "@/pages/Settings/services/workflowDataService";
import NewTypeInput from "./components/NewTypeInput";
import WorkEnvironmentSelector from "./components/WorkEnvironmentSelector";
import AssetTypeSelector from "./components/AssetTypeSelector";

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
  const [isNewTypeVisible, setIsNewTypeVisible] = useState(false);
  
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
      setIsNewTypeVisible(false);
    }
  };

  const toggleNewTypeInput = () => {
    setIsNewTypeVisible(!isNewTypeVisible);
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

      <AssetTypeSelector 
        availableTypes={availableTypes}
        selectedType={formData.type || ""}
        onTypeChange={(value) => onChange("type", value)}
        onAddTypeClick={toggleNewTypeInput}
      />

      <NewTypeInput 
        newType={newType}
        setNewType={setNewType}
        handleAddNewType={handleAddNewType}
        isVisible={isNewTypeVisible}
      />

      <WorkEnvironmentSelector 
        formData={formData}
        onChange={onChange}
        workflows={workflows}
        departments={departments}
        stages={stages}
      />
    </div>
  );
};

export default AssetProfileTab;
