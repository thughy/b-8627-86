
import React, { useState } from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { PenLine, FileText, Mail, MessageSquare, Calendar, DollarSign, Building, BarChart } from 'lucide-react';
import AssetCard from './AssetCard';
import AssetConfigModal from '@/pages/Settings/components/modals/AssetConfigModal';
import { useToast } from '@/hooks/use-toast';

interface DealDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal | null;
  onCreateAsset: (dealId: string, asset: Partial<Asset>) => void;
}

const DealDetailModal: React.FC<DealDetailModalProps> = ({
  isOpen,
  onClose,
  deal,
  onCreateAsset
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const [activeFocusTab, setActiveFocusTab] = useState('all');
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState<Asset | null>(null);

  // Sample assets (in a real app, these would come from the database)
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 'asset-1',
      dealId: 'deal-1',
      title: 'Proposta Comercial',
      description: 'Proposta detalhada para o cliente',
      type: 'proposal',
      amount: 5000,
      status: 'completed',
      createdAt: new Date(),
      updatedAt: new Date(),
      workEnvironment: {
        workflowTitle: 'Workflow de Vendas',
        departmentTitle: 'Comercial',
        stageTitle: 'Proposta'
      }
    }
  ]);

  const handleAddAsset = () => {
    if (!deal) return;
    setCurrentAsset(null);
    setIsAssetModalOpen(true);
  };
  
  const handleEditAsset = (asset: Asset) => {
    setCurrentAsset(asset);
    setIsAssetModalOpen(true);
  };
  
  const handleDeleteAsset = (assetId: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== assetId));
    toast({
      title: "Asset removido",
      description: "O asset foi removido com sucesso."
    });
  };
  
  const handleSaveAsset = (assetData: Asset) => {
    if (currentAsset) {
      // Update existing asset
      setAssets(prev => prev.map(asset => 
        asset.id === assetData.id ? assetData : asset
      ));
      toast({
        title: "Asset atualizado",
        description: "O asset foi atualizado com sucesso."
      });
    } else if (deal) {
      // Create new asset
      const newAsset: Asset = {
        ...assetData,
        id: `asset-${Date.now()}`,
        dealId: deal.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setAssets(prev => [...prev, newAsset]);
      onCreateAsset(deal.id, newAsset);
      
      toast({
        title: "Asset adicionado",
        description: "O novo asset foi adicionado com sucesso."
      });
    }
    
    setIsAssetModalOpen(false);
  };

  if (!deal) {
    return null;
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'won': return 'bg-green-500';
      case 'lost': return 'bg-red-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-amber-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'won': return 'Ganho';
      case 'lost': return 'Perdido';
      case 'completed': return 'Concluído';
      default: return 'Aberto';
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center justify-between">
              <span>{deal.title}</span>
              <Badge className={getStatusBadgeColor(deal.status)}>
                {getStatusLabel(deal.status)}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="workspace">Workspace</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Cliente</h3>
                    <p className="font-medium">{deal.customerName || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Organização</h3>
                    <p>{deal.customerOrganization || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Tipo</h3>
                    <p>{deal.type || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <Badge className={getStatusBadgeColor(deal.status)}>
                      {getStatusLabel(deal.status)}
                    </Badge>
                  </div>
                  
                  {deal.status === 'lost' && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Motivo da Perda</h3>
                      <p>Preço alto</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Valor</h3>
                      <p className="font-medium text-lg">{deal.amount ? formatCurrency(deal.amount) : 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Data de Início</h3>
                      <p>{deal.startDate ? formatDate(deal.startDate) : formatDate(deal.createdAt)}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Previsão de Conclusão</h3>
                      <p>{deal.endDate ? formatDate(deal.endDate) : 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
                    <p className="text-sm">{deal.description || 'Sem descrição'}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="workspace" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <div className="text-lg font-medium">Workspace</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleAddAsset}>
                    <FileText className="h-4 w-4 mr-2" />
                    Asset
                  </Button>
                  <Button size="sm" variant="outline">
                    <PenLine className="h-4 w-4 mr-2" />
                    Nota
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>

              <Tabs defaultValue={activeFocusTab} onValueChange={setActiveFocusTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="notes">Notas</TabsTrigger>
                  <TabsTrigger value="assets">Assets</TabsTrigger>
                  <TabsTrigger value="emails">Emails</TabsTrigger>
                  <TabsTrigger value="documents">Documentos</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {assets.map(asset => (
                      <AssetCard 
                        key={asset.id} 
                        asset={asset} 
                        onEditAsset={handleEditAsset}
                        onDeleteAsset={handleDeleteAsset}
                      />
                    ))}
                    
                    {assets.length === 0 && (
                      <div className="col-span-2 text-center py-8 text-muted-foreground">
                        Nenhum item para exibir.
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="assets" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {assets.map(asset => (
                      <AssetCard 
                        key={asset.id} 
                        asset={asset} 
                        onEditAsset={handleEditAsset}
                        onDeleteAsset={handleDeleteAsset}
                      />
                    ))}
                    
                    {assets.length === 0 && (
                      <div className="col-span-2 text-center py-8 text-muted-foreground">
                        Nenhum asset encontrado.
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhuma nota encontrada.
                  </div>
                </TabsContent>

                <TabsContent value="emails" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum email encontrado.
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum documento encontrado.
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="chat" className="mt-4">
              <div className="text-center py-20 text-muted-foreground">
                Chat não disponível.
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {isAssetModalOpen && (
        <AssetConfigModal 
          isOpen={isAssetModalOpen}
          onClose={() => setIsAssetModalOpen(false)}
          asset={currentAsset || undefined}
          onSave={handleSaveAsset}
        />
      )}
    </>
  );
};

export default DealDetailModal;
