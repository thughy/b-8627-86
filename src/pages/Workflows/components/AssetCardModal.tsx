
import React, { useState } from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MoreVertical, FolderKanban, Clock, FileText, Paperclip } from 'lucide-react';
import AssetParametersTab from './asset-detail/AssetParametersTab';
import AssetFocusTab from './asset-detail/AssetFocusTab';
import AssetHistoryTab from './asset-detail/AssetHistoryTab';
import { cn } from '@/lib/utils';
import { formatCurrency, formatDate } from '@/components/workflows/utils/dealUtils';

interface AssetCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  onEditAsset?: (asset: Asset) => void;
  onDeleteAsset?: (assetId: string) => void;
  onCancelAsset?: (assetId: string) => void;
  onCompleteAsset?: (assetId: string) => void;
  onCreateNote?: (assetId: string) => void;
  onCreateDocument?: (assetId: string) => void;
}

const AssetCardModal: React.FC<AssetCardModalProps> = ({
  isOpen,
  onClose,
  asset,
  onEditAsset,
  onDeleteAsset,
  onCancelAsset,
  onCompleteAsset,
  onCreateNote,
  onCreateDocument
}) => {
  const [activeTab, setActiveTab] = useState('parameters');

  if (!asset) return null;

  // Define background style based on asset type
  const getAssetBackground = (type: string) => {
    switch (type.toLowerCase()) {
      case 'contrato':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20';
      case 'proposta':
        return 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20';
      case 'produto':
        return 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20';
      case 'serviço':
      case 'servico':
        return 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20';
      case 'imovel':
      case 'imóvel':
        return 'bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/30 dark:to-teal-900/20';
      case 'veículo':
      case 'veiculo':
        return 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20';
      default:
        return 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/30 dark:to-gray-900/20';
    }
  };

  const assetBackground = getAssetBackground(asset.type);

  // Define counters based on Asset properties
  const counters = {
    notes: asset.parameters?.notes?.length || 0,
    documents: asset.files?.length || 0
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn("max-w-6xl max-h-[90vh] p-0 flex flex-col", assetBackground)}>
        <DialogHeader className="p-6 pb-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-primary" />
              {asset.title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4 mr-2" />
                    Ações
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onCompleteAsset && (
                    <DropdownMenuItem onClick={() => onCompleteAsset(asset.id)}>
                      Concluir
                    </DropdownMenuItem>
                  )}
                  {onCancelAsset && (
                    <DropdownMenuItem onClick={() => onCancelAsset(asset.id)}>
                      Cancelar
                    </DropdownMenuItem>
                  )}
                  {onDeleteAsset && (
                    <DropdownMenuItem 
                      className="text-red-500 focus:text-red-500" 
                      onClick={() => onDeleteAsset(asset.id)}
                    >
                      Excluir
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </DialogHeader>

        {/* Informações Resumidas - Não rolável */}
        <div className="px-6 pt-2 pb-4 flex-shrink-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-background/80 backdrop-blur-sm p-3 rounded-md border">
              <div className="text-xs text-muted-foreground mb-1">Tipo</div>
              <div className="font-medium">{asset.type || "Não definido"}</div>
            </div>
            <div className="bg-background/80 backdrop-blur-sm p-3 rounded-md border">
              <div className="text-xs text-muted-foreground mb-1">Status</div>
              <div className="font-medium capitalize">{asset.status || "Não definido"}</div>
            </div>
            <div className="bg-background/80 backdrop-blur-sm p-3 rounded-md border">
              <div className="text-xs text-muted-foreground mb-1">Valor</div>
              <div className="font-medium">{formatCurrency(asset.amount)}</div>
            </div>
            <div className="bg-background/80 backdrop-blur-sm p-3 rounded-md border">
              <div className="text-xs text-muted-foreground mb-1">Data de início</div>
              <div className="font-medium">{formatDate(asset.startDate)}</div>
            </div>
          </div>

          <div className="mt-3 flex justify-between items-center">
            <div className="flex gap-3">
              <div className="flex items-center gap-1 text-sm">
                <FileText className="h-4 w-4 text-yellow-500" />
                <span>{counters.notes || 0} notas</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Paperclip className="h-4 w-4 text-purple-500" />
                <span>{counters.documents || 0} anexos</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Criado em {formatDate(asset.createdAt)}
            </div>
          </div>
        </div>

        {/* Conteúdo principal em colunas - Cada coluna com sua própria área de rolagem */}
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
      </DialogContent>
    </Dialog>
  );
};

export default AssetCardModal;
