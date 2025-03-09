
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

// Import our new components
import WorkflowHeader from "@/components/workflows/WorkflowHeader";
import WorkflowFilters from "@/components/workflows/WorkflowFilters";
import KanbanView from "@/components/workflows/KanbanView";
import ListView from "@/components/workflows/ListView";

const WorkflowsPage = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  const handleAction = (action: string) => {
    toast({
      title: `Ação: ${action}`,
      description: "Esta funcionalidade está em desenvolvimento",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WorkflowHeader onCreateWorkflow={handleAction} />
        
        <WorkflowFilters 
          viewMode={viewMode} 
          onViewModeChange={setViewMode} 
        />

        <TabsContent value="all" className="space-y-6 mt-0">
          <div className="flex items-center justify-between">
            <Button variant="outline" className="flex items-center gap-2">
              <span>Departamento</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {viewMode === "kanban" ? (
            <KanbanView onAction={handleAction} />
          ) : (
            <ListView onAction={handleAction} />
          )}
        </TabsContent>
      </div>
    </DashboardLayout>
  );
};

export default WorkflowsPage;
