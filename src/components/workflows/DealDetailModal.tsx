
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
  Mail,
  Edit,
  Trash2,
  X,
  Image,
  History,
  MoreHorizontal
} from 'lucide-react';
import AssetCard from './AssetCard';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DealDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal;
  onCreateAsset: (dealId: string, asset: Partial<Asset>) => void;
  onEditDeal?: (deal: Deal) => void;
  onDeleteDeal?: (dealId: string) => void;
  onCancelDeal?: (dealId: string) => void;
}

const DealDetailModal: React.FC<DealDetailModalProps> = ({
  isOpen,
  onClose,
  deal,
  onCreateAsset,
  onEditDeal,
  onDeleteDeal,
  onCancelDeal
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const [activeWorkspaceSection, setActiveWorkspaceSection] = useState('focus');
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

  // Counters para exibir na cabeçalho
  const counters = {
    chat: 2,
    assets: assets.length,
    tasks: 0,
    notes: 0,
    emails: 0
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl">{deal.title}</DialogTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEditDeal && (
                <DropdownMenuItem onClick={() => onEditDeal(deal)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
              )}
              {onDeleteDeal && (
                <DropdownMenuItem 
                  onClick={() => onDeleteDeal(deal.id)} 
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </DropdownMenuItem>
              )}
              {onCancelDeal && (
                <DropdownMenuItem onClick={() => onCancelDeal(deal.id)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogHeader>
        
        {/* Informações Resumidas */}
        <div className="bg-muted/40 rounded-md p-3 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <div className="flex gap-1 items-center text-xs text-muted-foreground mb-1">
                <User className="h-3 w-3" />
                <span>Cliente</span>
              </div>
              <div className="font-medium truncate">
                {deal.customerName || "Não especificado"}
              </div>
            </div>
            
            <div>
              <div className="flex gap-1 items-center text-xs text-muted-foreground mb-1">
                <Building2 className="h-3 w-3" />
                <span>Organização</span>
              </div>
              <div className="font-medium truncate">
                {deal.customerOrganization || "Não especificada"}
              </div>
            </div>
            
            <div>
              <div className="flex gap-1 items-center text-xs text-muted-foreground mb-1">
                <CreditCard className="h-3 w-3" />
                <span>Valor</span>
              </div>
              <div className="font-medium">
                {deal.amount !== undefined ? formatCurrency(deal.amount) : "N/A"}
              </div>
            </div>
            
            <div>
              <div className="flex gap-1 items-center text-xs text-muted-foreground mb-1">
                <Calendar className="h-3 w-3" />
                <span>Data</span>
              </div>
              <div className="font-medium">
                {deal.startDate ? formatDate(deal.startDate) : "N/A"}
              </div>
            </div>
          </div>
          
          {/* Counters */}
          <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t">
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="gap-1 py-0">
                <MessageSquare className="h-3 w-3" />
                <span>{counters.chat}</span>
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="gap-1 py-0">
                <Package className="h-3 w-3" />
                <span>{counters.assets}</span>
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="gap-1 py-0">
                <CheckSquare className="h-3 w-3" />
                <span>{counters.tasks}</span>
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="gap-1 py-0">
                <FileText className="h-3 w-3" />
                <span>{counters.notes}</span>
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="gap-1 py-0">
                <Mail className="h-3 w-3" />
                <span>{counters.emails}</span>
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          <Tabs defaultValue="details" className="flex-1 flex flex-col" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="workspace">Workspace</TabsTrigger>
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

                  <div className="mt-4 pt-4 border-t">
                    <h3 className="font-medium mb-3">Seções</h3>
                    <div className="space-y-2">
                      <Button 
                        variant={activeWorkspaceSection === 'chat' ? 'default' : 'outline'} 
                        className="w-full justify-start" 
                        size="sm"
                        onClick={() => setActiveWorkspaceSection('chat')}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                      <Button 
                        variant={activeWorkspaceSection === 'focus' ? 'default' : 'outline'} 
                        className="w-full justify-start" 
                        size="sm"
                        onClick={() => setActiveWorkspaceSection('focus')}
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Focus
                      </Button>
                      <Button 
                        variant={activeWorkspaceSection === 'history' ? 'default' : 'outline'} 
                        className="w-full justify-start" 
                        size="sm"
                        onClick={() => setActiveWorkspaceSection('history')}
                      >
                        <History className="h-4 w-4 mr-2" />
                        Histórico
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-5 md:col-span-4 flex flex-col overflow-hidden">
                  {activeWorkspaceSection === 'chat' && (
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
                  )}
                  
                  {activeWorkspaceSection === 'focus' && (
                    <>
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
                    </>
                  )}
                  
                  {activeWorkspaceSection === 'history' && (
                    <>
                      <div className="p-3 border-b">
                        <Tabs defaultValue="all">
                          <TabsList>
                            <TabsTrigger value="all">Todos</TabsTrigger>
                            <TabsTrigger value="notes">Notas</TabsTrigger>
                            <TabsTrigger value="tasks">Tarefas</TabsTrigger>
                            <TabsTrigger value="assets">Assets</TabsTrigger>
                            <TabsTrigger value="emails">Emails</TabsTrigger>
                            <TabsTrigger value="images">Imagens</TabsTrigger>
                            <TabsTrigger value="documents">Documentos</TabsTrigger>
                            <TabsTrigger value="logs">Registros</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                      
                      <ScrollArea className="flex-1 p-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-xs text-muted-foreground">
                              {formatDate(new Date())}
                            </span>
                            <span>Negócio criado</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-xs text-muted-foreground">
                              {formatDate(new Date())}
                            </span>
                            <span>Asset "Proposta Comercial" adicionado</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-xs text-muted-foreground">
                              {formatDate(new Date())}
                            </span>
                            <span>Asset "Contrato de Serviço" adicionado</span>
                          </div>
                        </div>
                      </ScrollArea>
                    </>
                  )}
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
