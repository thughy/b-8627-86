
import React from "react";
import WorkflowListItem from "./WorkflowListItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Workflow } from "@/pages/Workflows/models/WorkflowModels";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ListViewProps {
  onAction: (action: string, data?: any) => void;
  workflows: Workflow[];
}

const ListView = ({ onAction, workflows }: ListViewProps) => {
  // Filtrar workflows ativos e em desenvolvimento
  const activeWorkflows = workflows.filter(workflow => workflow.status === 'active');
  const draftWorkflows = workflows.filter(workflow => workflow.status === 'draft' || workflow.status === 'inactive');
  
  if (workflows.length === 0) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertDescription>
          Não há workflows configurados. Acesse o módulo de Configurações para criar workflows.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-6">
      {activeWorkflows.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Workflows ativos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {activeWorkflows.map((workflow, index) => (
              <WorkflowListItem 
                key={workflow.id} 
                title={workflow.title} 
                description={workflow.description}
                status={workflow.status}
                index={index} 
                onAction={onAction} 
                workflow={workflow}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {draftWorkflows.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Workflows em desenvolvimento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {draftWorkflows.map((workflow, index) => (
              <WorkflowListItem 
                key={workflow.id} 
                title={workflow.title} 
                description={workflow.description}
                status={workflow.status}
                index={index + activeWorkflows.length}
                onAction={onAction} 
                workflow={workflow}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ListView;
