
import React from "react";
import { Button } from "@/components/ui/button";

interface WorkflowHeaderProps {
  title?: string;
  description?: string;
  onCreateWorkflow?: () => void;
}

const WorkflowHeader = ({ 
  title = "Workflows", 
  description = "Gerencie seus fluxos de trabalho",
  onCreateWorkflow 
}: WorkflowHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      {onCreateWorkflow && (
        <Button onClick={onCreateWorkflow}>
          Criar Workflow
        </Button>
      )}
    </div>
  );
};

export default WorkflowHeader;
