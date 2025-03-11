
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, HistoryIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AssetParametersTab } from '../asset-detail/AssetParametersTab';
import { AssetFocusTab } from '../asset-detail/AssetFocusTab';
import { AssetHistoryTab } from '../asset-detail/AssetHistoryTab';

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
  const [isEditing, setIsEditing] = useState(false);

  const handleAssetUpdate = (updatedAsset: Asset) => {
    if (onEditAsset) {
      onEditAsset(updatedAsset);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex-1 overflow-hidden p-4 bg-white rounded-b-lg">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="parameters">Parâmetros</TabsTrigger>
            <TabsTrigger value="focus">Foco</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          {activeTab === 'focus' && (
            <div className="flex gap-2">
              {onCreateNote && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onCreateNote(asset.id)}
                  className="flex items-center"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nota
                </Button>
              )}
              {onCreateDocument && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onCreateDocument(asset.id)}
                  className="flex items-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Documento
                </Button>
              )}
            </div>
          )}

          {activeTab === 'parameters' && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleEditing}
            >
              {isEditing ? 'Concluir Edição' : 'Editar Parâmetros'}
            </Button>
          )}
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="parameters" className="mt-0 h-full">
            <AssetParametersTab 
              asset={asset} 
              onUpdate={handleAssetUpdate} 
              readOnly={!isEditing}
            />
          </TabsContent>
          
          <TabsContent value="focus" className="mt-0 h-full">
            <AssetFocusTab 
              asset={asset}
            />
          </TabsContent>
          
          <TabsContent value="history" className="mt-0 h-full">
            <AssetHistoryTab 
              asset={asset}
            />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default AssetContent;
