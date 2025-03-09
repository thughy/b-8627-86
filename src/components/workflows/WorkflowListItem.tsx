
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Workflow } from "lucide-react";
import { Workflow as WorkflowType } from "@/pages/Workflows/models/WorkflowModels";

interface WorkflowListItemProps {
  title: string;
  description?: string;
  status: 'active' | 'inactive' | 'draft';
  index: number;
  onAction: (action: string, data?: any) => void;
  workflow: WorkflowType;
}

const WorkflowListItem = ({ 
  title, 
  description, 
  status, 
  index, 
  onAction, 
  workflow 
}: WorkflowListItemProps) => {
  const isActive = status === 'active';
  const dealCount = 10 - index; // Mockup for display purposes
  
  return (
    <Card className="hover:bg-muted/20 transition-colors">
      <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className={`bg-primary/10 p-2 rounded-md ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
            <Workflow className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={isActive ? "default" : "outline"} className="text-xs">
                {status === 'active' ? "Ativo" : status === 'draft' ? "Rascunho" : "Inativo"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {dealCount} deals
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => onAction("viewDeals", workflow)}
          >
            <Eye className="h-4 w-4" />
            <span className="sm:inline">Operar Workflow</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowListItem;
