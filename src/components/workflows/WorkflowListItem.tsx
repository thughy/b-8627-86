
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Workflow } from "lucide-react";

interface WorkflowListItemProps {
  title: string;
  index: number;
  onAction: (action: string) => void;
}

const WorkflowListItem = ({ title, index, onAction }: WorkflowListItemProps) => {
  return (
    <Card className="hover:bg-muted/20 transition-colors">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-md">
            <Workflow className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {index % 2 === 0 ? "Ativo" : "Em desenvolvimento"} • {10 - index} deals
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => onAction(`Editar ${title}`)}>
            Editar
          </Button>
          <Button variant="outline" onClick={() => onAction(`Visualizar ${title}`)}>
            Visualizar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowListItem;
