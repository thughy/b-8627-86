
import React, { useState } from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MessageCircle, Plus, FileText, CheckSquare, Mail, Image, FileArchive, History } from 'lucide-react';
import { useChatMessages } from '@/pages/Workflows/hooks/useChatMessages';
import ChatSection from './workspace/ChatSection';

interface DealWorkspaceTabProps {
  deal: Deal;
  onCreateAsset?: (dealId: string, asset: Partial<Asset>) => void;
}

const DealWorkspaceTab: React.FC<DealWorkspaceTabProps> = ({ deal, onCreateAsset }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const { messages } = useChatMessages(deal.id);

  const handleCreateAsset = () => {
    if (onCreateAsset) {
      const newAsset: Partial<Asset> = {
        title: 'Novo Asset',
        description: 'Descrição do novo asset',
        type: 'document',
        status: 'open'
      };
      onCreateAsset(deal.id, newAsset);
    }
  };

  // Exemplos de ativos para este negócio (em um cenário real, seriam carregados da API)
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

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <TabsList>
            <TabsTrigger value="chat" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="focus" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Focus
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <History className="h-4 w-4" />
              Histórico
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleCreateAsset}>
            <Plus className="h-4 w-4 mr-1" />
            Asset
          </Button>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Tarefa
          </Button>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Nota
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <TabsContent value="chat" className="h-full">
          <ChatSection dealId={deal.id} messages={messages} />
        </TabsContent>
        
        <TabsContent value="focus" className="h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Ativos
              </h3>
              {assets.length > 0 ? (
                <div className="space-y-2">
                  {assets.map(asset => (
                    <div key={asset.id} className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                      <div className="font-medium">{asset.title}</div>
                      <div className="text-sm text-muted-foreground">{asset.description}</div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">
                          {asset.type}
                        </span>
                        <span className="text-xs bg-blue-500/10 text-blue-500 rounded-full px-2 py-0.5">
                          {asset.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 border rounded-md bg-muted/30">
                  <p className="text-muted-foreground">Nenhum ativo encontrado</p>
                  <Button size="sm" variant="outline" className="mt-2" onClick={handleCreateAsset}>
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar Ativo
                  </Button>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-primary" />
                Tarefas
              </h3>
              <div className="text-center p-4 border rounded-md bg-muted/30">
                <p className="text-muted-foreground">Nenhuma tarefa encontrada</p>
                <Button size="sm" variant="outline" className="mt-2">
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Tarefa
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="h-full">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <History className="h-4 w-4" />
              Todos
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Assets
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <CheckSquare className="h-4 w-4" />
              Tarefas
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              Emails
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Image className="h-4 w-4" />
              Imagens
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <FileArchive className="h-4 w-4" />
              Documentos
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <div className="flex justify-between">
                <span className="text-sm font-medium flex items-center gap-1">
                  <FileText className="h-4 w-4 text-primary" />
                  Ativo criado
                </span>
                <span className="text-xs text-muted-foreground">há 2 dias</span>
              </div>
              <p className="mt-1">Proposta Comercial</p>
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="flex justify-between">
                <span className="text-sm font-medium flex items-center gap-1">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Nova mensagem
                </span>
                <span className="text-xs text-muted-foreground">há 3 dias</span>
              </div>
              <p className="mt-1">Cliente solicitou mais informações sobre o produto.</p>
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="flex justify-between">
                <span className="text-sm font-medium flex items-center gap-1">
                  <CheckSquare className="h-4 w-4 text-primary" />
                  Tarefa concluída
                </span>
                <span className="text-xs text-muted-foreground">há 5 dias</span>
              </div>
              <p className="mt-1">Enviar cotação inicial</p>
            </div>
          </div>
        </TabsContent>
      </div>
    </div>
  );
};

export default DealWorkspaceTab;
