
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface WorkflowHeaderProps {
  title?: string;
  description?: string;
  onCreateDeal?: () => void;
  showCreateButton?: boolean;
}

const WorkflowHeader = ({ 
  title = "Workflows", 
  description = "Gerencie seus fluxos de trabalho",
  onCreateDeal,
  showCreateButton = false
}: WorkflowHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      {showCreateButton && onCreateDeal && (
        <Button onClick={onCreateDeal} className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          Criar Deal
        </Button>
      )}
    </div>
  );
};

export default WorkflowHeader;
