
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";

interface WorkflowItem {
  id: string;
  title: string;
  description?: string;
}

interface WorkEnvironmentSelectorProps {
  formData: Partial<Asset>;
  onChange: (key: string, value: any) => void;
  workflows: WorkflowItem[];
  departments: WorkflowItem[];
  stages: WorkflowItem[];
}

const WorkEnvironmentSelector = ({ 
  formData, 
  onChange, 
  workflows, 
  departments, 
  stages 
}: WorkEnvironmentSelectorProps) => {
  return (
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
            <SelectTrigger id="workflowTitle" className="thin-border">
              <SelectValue placeholder="Selecione o workflow" />
            </SelectTrigger>
            <SelectContent className="dropdown-content">
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
            <SelectTrigger id="departmentTitle" className="thin-border">
              <SelectValue placeholder="Selecione o departamento" />
            </SelectTrigger>
            <SelectContent className="dropdown-content">
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
            <SelectTrigger id="stageTitle" className="thin-border">
              <SelectValue placeholder="Selecione o estágio" />
            </SelectTrigger>
            <SelectContent className="dropdown-content">
              {stages.map((stage) => (
                <SelectItem key={stage.id} value={stage.title}>{stage.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default WorkEnvironmentSelector;
