
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import AssetCard from '@/components/workflows/AssetCard';

interface FocusSectionProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  assets: Asset[];
}

const FocusSection: React.FC<FocusSectionProps> = ({
  activeTab,
  onTabChange,
  assets
}) => {
  return (
    <>
      <div className="p-3 border-b">
        <Tabs defaultValue="all" onValueChange={onTabChange} value={activeTab}>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="notes">Notas</TabsTrigger>
            <TabsTrigger value="tasks">Tarefas</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {(activeTab === 'all' || activeTab === 'assets') && (
            <div>
              <h4 className="text-sm font-medium mb-2">Assets</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {assets.map(asset => (
                  <AssetCard 
                    key={asset.id} 
                    asset={asset} 
                    onViewAsset={() => {}} 
                  />
                ))}
              </div>
            </div>
          )}
          
          {(activeTab === 'all' || activeTab === 'notes') && (
            <div>
              <h4 className="text-sm font-medium mb-2">Notas</h4>
              <div className="text-muted-foreground text-sm">Nenhuma nota encontrada</div>
            </div>
          )}
          
          {(activeTab === 'all' || activeTab === 'tasks') && (
            <div>
              <h4 className="text-sm font-medium mb-2">Tarefas</h4>
              <div className="text-muted-foreground text-sm">Nenhuma tarefa encontrada</div>
            </div>
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export default FocusSection;
