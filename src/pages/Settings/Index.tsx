
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Box, 
  User, 
  MessageSquare, 
  CreditCard, 
  FileText,
  Users,
  Workflow,
  BadgeHelp
} from "lucide-react";

import WorkflowSettings from "./components/WorkflowSettings";
import AgentSettings from "./components/AgentSettings";
import AssetSettings from "./components/AssetSettings";
import TemplateLibrary from "./components/TemplateLibrary";
import IntegrationsSettings from "./components/IntegrationsSettings";
import CollaboratorsSettings from "./components/CollaboratorsSettings";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("workflows");

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie workflows, agentes, integrações e mais.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="overflow-auto">
            <TabsList className="h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="workflows"
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
              >
                <Workflow className="h-4 w-4" />
                <span>Workflows</span>
              </TabsTrigger>
              
              <TabsTrigger
                value="agents"
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
              >
                <User className="h-4 w-4" />
                <span>Agentes</span>
              </TabsTrigger>
              
              <TabsTrigger
                value="assets"
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
              >
                <Box className="h-4 w-4" />
                <span>Assets</span>
              </TabsTrigger>
              
              <TabsTrigger
                value="library"
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
              >
                <FileText className="h-4 w-4" />
                <span>Biblioteca</span>
              </TabsTrigger>
              
              <TabsTrigger
                value="integrations"
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
              >
                <Settings className="h-4 w-4" />
                <span>Integrações</span>
              </TabsTrigger>
              
              <TabsTrigger
                value="collaborators"
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
              >
                <Users className="h-4 w-4" />
                <span>Colaboradores</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="workflows" className="border-none p-0">
            <WorkflowSettings />
          </TabsContent>
          
          <TabsContent value="agents" className="border-none p-0">
            <AgentSettings />
          </TabsContent>
          
          <TabsContent value="assets" className="border-none p-0">
            <AssetSettings />
          </TabsContent>
          
          <TabsContent value="library" className="border-none p-0">
            <TemplateLibrary />
          </TabsContent>
          
          <TabsContent value="integrations" className="border-none p-0">
            <IntegrationsSettings />
          </TabsContent>
          
          <TabsContent value="collaborators" className="border-none p-0">
            <CollaboratorsSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
