
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface WorkflowHeaderProps {
  onCreateWorkflow: (action: string) => void;
}

const WorkflowHeader = ({ onCreateWorkflow }: WorkflowHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Workflows</h1>
        <p className="text-muted-foreground">
          Gerencie e visualize seus workflows de processos empresariais.
        </p>
      </div>
      <div className="flex items-center gap-2 self-stretch sm:self-auto">
        <Button onClick={() => onCreateWorkflow("Criar novo workflow")} className="flex-1 sm:flex-none">
          <Plus className="h-4 w-4 mr-2" />
          Novo workflow
        </Button>
      </div>
    </div>
  );
};

export default WorkflowHeader;
