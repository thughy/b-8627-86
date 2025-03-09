
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Department, Pipeline, Stage, Agent } from "@/pages/Workflows/models/WorkflowModels";

interface AgentEnvironmentTabProps {
  workEnvironment: Agent['workEnvironment'];
  onWorkEnvironmentChange: (field: string, value: string) => void;
  departments?: Department[];
  pipelines?: Pipeline[];
  stages?: Stage[];
}

const AgentEnvironmentTab = ({ 
  workEnvironment, 
  onWorkEnvironmentChange,
  departments = [],
  pipelines = [],
  stages = []
}: AgentEnvironmentTabProps) => {
  const filteredPipelines = pipelines.filter(pipeline => 
    !workEnvironment?.departmentTitle || 
    pipeline.departmentId === departments.find(d => d.title === workEnvironment?.departmentTitle)?.id
  );

  const filteredStages = stages.filter(stage => 
    !workEnvironment?.departmentTitle || 
    stage.pipelineId === filteredPipelines.find(p => p.title === workEnvironment?.workflowTitle)?.id
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="workflowTitle">Workflow</Label>
        <Select 
          value={workEnvironment?.workflowTitle || ""} 
          onValueChange={(value) => onWorkEnvironmentChange("workflowTitle", value)}
        >
          <SelectTrigger id="workflowTitle">
            <SelectValue placeholder="Selecione o workflow" />
          </SelectTrigger>
          <SelectContent>
            {pipelines.map(pipeline => (
              <SelectItem key={pipeline.id} value={pipeline.title}>
                {pipeline.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="departmentTitle">Departamento</Label>
        <Select 
          value={workEnvironment?.departmentTitle || ""} 
          onValueChange={(value) => onWorkEnvironmentChange("departmentTitle", value)}
          disabled={!workEnvironment?.workflowTitle}
        >
          <SelectTrigger id="departmentTitle">
            <SelectValue placeholder="Selecione o departamento" />
          </SelectTrigger>
          <SelectContent>
            {departments.map(department => (
              <SelectItem key={department.id} value={department.title}>
                {department.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="stageTitle">Estágio</Label>
        <Select 
          value={workEnvironment?.stageTitle || ""} 
          onValueChange={(value) => onWorkEnvironmentChange("stageTitle", value)}
          disabled={!workEnvironment?.departmentTitle}
        >
          <SelectTrigger id="stageTitle">
            <SelectValue placeholder="Selecione o estágio" />
          </SelectTrigger>
          <SelectContent>
            {filteredStages.map(stage => (
              <SelectItem key={stage.id} value={stage.title}>
                {stage.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="workflowDescription">Descrição do Ambiente de Trabalho</Label>
        <Textarea 
          id="workflowDescription"
          value={workEnvironment?.workflowDescription || ""}
          onChange={(e) => onWorkEnvironmentChange("workflowDescription", e.target.value)}
          placeholder="Descreva o ambiente de trabalho do agente"
          rows={3}
        />
      </div>
    </div>
  );
};

export default AgentEnvironmentTab;
