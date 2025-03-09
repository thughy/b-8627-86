
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Workflow } from "lucide-react";

interface WorkflowListItemProps {
  title: string;
  index: number;
  onAction: (action: string, data?: any) => void;
}

const WorkflowListItem = ({ title, index, onAction }: WorkflowListItemProps) => {
  const isActive = index % 2 === 0;
  const dealCount = 10 - index;
  
  return (
    <Card className="hover:bg-muted/20 transition-colors">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`bg-primary/10 p-2 rounded-md ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
            <Workflow className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={isActive ? "default" : "outline"} className="text-xs">
                {isActive ? "Ativo" : "Em desenvolvimento"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {dealCount} deals
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => onAction(`Editar ${title}`)}
          >
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Editar</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => onAction(`Visualizar ${title}`)}
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Visualizar</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowListItem;
