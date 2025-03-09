
import React from "react";
import WorkflowListItem from "./WorkflowListItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ListViewProps {
  onAction: (action: string, data?: any) => void;
}

const ListView = ({ onAction }: ListViewProps) => {
  const workflows = ["Comercial", "Suporte", "Marketing", "Financeiro"];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Workflows ativos</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onAction("createWorkflow")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo workflow
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {workflows.slice(0, 2).map((workflow, index) => (
            <WorkflowListItem 
              key={index} 
              title={workflow} 
              index={index} 
              onAction={onAction} 
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Workflows em desenvolvimento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {workflows.slice(2, 4).map((workflow, index) => (
            <WorkflowListItem 
              key={index} 
              title={workflow} 
              index={index + 2} 
              onAction={onAction} 
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ListView;
