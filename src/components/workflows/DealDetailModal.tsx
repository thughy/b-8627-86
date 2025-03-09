
import React, { useState } from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrency, formatDate } from '@/lib/utils';
import { 
  Building2, 
  Calendar, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  CheckSquare, 
  User, 
  Package, 
  Mail
} from 'lucide-react';
import AssetCard from './AssetCard';

interface DealDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal;
  onCreateAsset: (dealId: string, asset: Partial<Asset>) => void;
}

const DealDetailModal: React.FC<DealDetailModalProps> = ({
  isOpen,
  onClose,
  deal,
  onCreateAsset
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<string>('all');

  // Example assets for this deal
  const assets: Asset[] = [
    {
      id: 'asset-1',
      dealId: deal.id,
      title: 'Proposta Comercial',
      description: 'Documento com detalhes da proposta',
      type: 'document',
      status: 'completed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'asset-2',
      dealId: deal.id,
      title: 'Contrato de Serviço',
      description: 'Contrato para assinatura',
      type: 'contract',
      status: 'processing',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const handleCreateAsset = () => {
    const newAsset: Partial<Asset> = {
      title: 'Novo Asset',
      description: 'Descrição do novo asset',
      type: 'document',
      status: 'open'
    };
    onCreateAsset(deal.id, newAsset);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'won':
        return <Badge className="bg-green-500">Ganho</Badge>;
      case 'lost':
        return <Badge className="bg-red-500">Perdido</Badge>;
      case 'completed':
        return <Badge className="bg-purple-500">Concluído</Badge>;
      default:
        return <Badge className="bg-blue-500">Aberto</Badge>;
    }
  };

  // Type guard for custom deal properties
  interface ExtendedDeal extends Deal {
    reasonForLoss?: string;
    interests?: string;
  }
  
  const extendedDeal = deal as ExtendedDeal;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">{deal.title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-1 overflow-hidden">
          <Tabs defaultValue="details" className="flex-1 flex flex-col" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="workspace">Workspace</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="flex-1 overflow-hidden">
              <ScrollArea className="h-[60vh]">
                <div className="space-y-4 p-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-1">Tipo</h3>
                      <p className="text-muted-foreground">{deal.type || 'Não especificado'}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Status</h3>
                      {getStatusBadge(deal.status)}
                    </div>
                    
                    {extendedDeal.interests && (
                      <div>
                        <h3 className="font-medium mb-1">Interesse</h3>
                        <p className="text-muted-foreground">{extendedDeal.interests}</p>
                      </div>
                    )}
                    
                    {deal.status === 'lost' && extendedDeal.reasonForLoss && (
                      <div>
                        <h3 className="font-medium mb-1">Motivo da Perda</h3>
                        <p className="text-muted-foreground">{extendedDeal.reasonForLoss}</p>
                      </div>
                    )}
                    
                    {deal.startDate && (
                      <div>
                        <h3 className="font-medium mb-1">Data de Início</h3>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(deal.startDate)}</span>
                        </div>
                      </div>
                    )}
                    
                    {deal.endDate && (
                      <div>
                        <h3 className="font-medium mb-1">Data de Término</h3>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(deal.endDate)}</span>
                        </div>
                      </div>
                    )}
                    
                    {deal.amount !== undefined && (
                      <div>
                        <h3 className="font-medium mb-1">Valor</h3>
                        <div className="flex items-center gap-1 font-medium">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span>{formatCurrency(deal.amount)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Cliente</h3>
                    {deal.customerName && (
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{deal.customerName}</span>
                      </div>
                    )}
                    {deal.customerOrganization && (
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{deal.customerOrganization}</span>
                      </div>
                    )}
                  </div>
                  
                  {deal.description && (
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Descrição</h3>
                      <p className="text-muted-foreground">{deal.description}</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="workspace" className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 h-full overflow-hidden">
                <div className="col-span-5 md:col-span-1 border-r p-3 flex flex-col">
                  <h3 className="font-medium mb-3">Ações</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Nota
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <CheckSquare className="h-4 w-4 mr-2" />
                      Tarefa
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm" onClick={handleCreateAsset}>
                      <Package className="h-4 w-4 mr-2" />
                      Asset
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Documento
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
                
                <div className="col-span-5 md:col-span-4 flex flex-col overflow-hidden">
                  <div className="p-3 border-b">
                    <Tabs defaultValue="all" onValueChange={setActiveWorkspaceTab} value={activeWorkspaceTab}>
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
                      {(activeWorkspaceTab === 'all' || activeWorkspaceTab === 'assets') && (
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
                      
                      {(activeWorkspaceTab === 'all' || activeWorkspaceTab === 'notes') && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Notas</h4>
                          <div className="text-muted-foreground text-sm">Nenhuma nota encontrada</div>
                        </div>
                      )}
                      
                      {(activeWorkspaceTab === 'all' || activeWorkspaceTab === 'tasks') && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Tarefas</h4>
                          <div className="text-muted-foreground text-sm">Nenhuma tarefa encontrada</div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chat" className="flex-1 overflow-hidden">
              <div className="h-full flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    <div className="bg-muted/40 p-3 rounded-lg max-w-[80%]">
                      <div className="font-medium text-xs mb-1">Sistema</div>
                      <div className="text-sm">Negócio criado com sucesso.</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatDate(deal.createdAt)}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                
                <div className="p-3 border-t flex">
                  <input 
                    type="text" 
                    placeholder="Digite uma mensagem..." 
                    className="flex-1 bg-muted/40 rounded-l-md px-3 py-2 focus:outline-none"
                  />
                  <Button className="rounded-l-none">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Enviar
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DealDetailModal;
