
import React, { useState } from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import AssetCard from './AssetCard';

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
  const [activeTab, setActiveTab] = useState('details');
  const [showAssetForm, setShowAssetForm] = useState(false);

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
    
    // Create a new asset
    const newAsset: Asset = {
      id: `asset-${Date.now()}`,
      dealId: deal.id,
      title: 'Novo Asset',
      description: 'Descrição do novo asset',
      type: 'document',
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setAssets(prev => [...prev, newAsset]);
    onCreateAsset(deal.id, newAsset);
    setShowAssetForm(false);
  };

  if (!deal) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{deal.title}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <Badge className={
                  deal.status === 'won' ? 'bg-green-500' : 
                  deal.status === 'lost' ? 'bg-red-500' : 'bg-blue-500'
                }>
                  {deal.status === 'won' ? 'Ganho' : 
                   deal.status === 'lost' ? 'Perdido' : 
                   deal.status === 'completed' ? 'Concluído' : 'Aberto'}
                </Badge>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tipo</h3>
                <p>{deal.type || 'N/A'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Valor</h3>
                <p>{deal.amount ? formatCurrency(deal.amount) : 'N/A'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Cliente</h3>
                <p>{deal.customerName || 'N/A'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Organização</h3>
                <p>{deal.customerOrganization || 'N/A'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Data de criação</h3>
                <p>{formatDate(deal.createdAt)}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
              <p className="text-sm mt-1">{deal.description || 'Sem descrição.'}</p>
            </div>
          </TabsContent>

          <TabsContent value="assets" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Assets</h3>
              <Button size="sm" onClick={() => setShowAssetForm(true)}>
                Adicionar Asset
              </Button>
            </div>

            {showAssetForm && (
              <div className="p-4 border rounded-md">
                <h4 className="font-medium mb-4">Novo Asset</h4>
                <div className="space-y-2">
                  <Button onClick={handleAddAsset}>Salvar Asset</Button>
                  <Button variant="outline" onClick={() => setShowAssetForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {assets.map(asset => (
                <AssetCard key={asset.id} asset={asset} />
              ))}

              {assets.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  Nenhum asset encontrado para este deal.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <p className="text-center text-gray-500 py-4">
              Histórico de atividades não disponível.
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DealDetailModal;
