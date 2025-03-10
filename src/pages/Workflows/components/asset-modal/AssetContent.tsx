
import React, { useState } from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AssetParametersTab from '../asset-detail/AssetParametersTab';
import AssetFocusTab from '../asset-detail/AssetFocusTab';
import AssetHistoryTab from '../asset-detail/AssetHistoryTab';

interface AssetContentProps {
  asset: Asset;
  onEditAsset?: (asset: Asset) => void;
  onCreateNote?: (assetId: string) => void;
  onCreateDocument?: (assetId: string) => void;
}

const AssetContent: React.FC<AssetContentProps> = ({
  asset,
  onEditAsset,
  onCreateNote,
  onCreateDocument
}) => {
  const [activeTab, setActiveTab] = useState('parameters');

  return (
    <div className="flex-1 grid grid-cols-12 gap-6 px-6 pb-6 overflow-hidden">
      {/* Coluna de Parâmetros com ScrollArea independente */}
      <div className="col-span-4 flex flex-col overflow-hidden">
        <h3 className="text-lg font-medium mb-3">Parâmetros</h3>
        <div className="border rounded-md flex-1 overflow-hidden bg-background/80 backdrop-blur-sm">
          <ScrollArea className="h-[calc(80vh-250px)]">
            <div className="p-4">
              <AssetParametersTab asset={asset} onEditAsset={onEditAsset} />
            </div>
          </ScrollArea>
        </div>
      </div>
      
      {/* Coluna de Workspace com ScrollArea independente */}
      <div className="col-span-8 flex flex-col overflow-hidden">
        <h3 className="text-lg font-medium mb-3">Workspace</h3>
        <div className="border rounded-md flex-1 overflow-hidden bg-background/80 backdrop-blur-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="px-4 pt-4">
              <TabsList>
                <TabsTrigger value="parameters">Detalhes</TabsTrigger>
                <TabsTrigger value="focus">Foco</TabsTrigger>
                <TabsTrigger value="history">Histórico</TabsTrigger>
              </TabsList>
            </div>
            
            <ScrollArea className="flex-1 h-[calc(80vh-300px)]">
              <div className="p-4">
                <TabsContent value="parameters" className="m-0 h-full">
                  <AssetFocusTab 
                    asset={asset} 
                    onCreateNote={onCreateNote}
                    onCreateDocument={onCreateDocument}
                  />
                </TabsContent>
                
                <TabsContent value="focus" className="m-0 h-full">
                  <AssetFocusTab 
                    asset={asset} 
                    onCreateNote={onCreateNote}
                    onCreateDocument={onCreateDocument}
                  />
                </TabsContent>
                
                <TabsContent value="history" className="m-0 h-full">
                  <AssetHistoryTab asset={asset} />
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AssetContent;
