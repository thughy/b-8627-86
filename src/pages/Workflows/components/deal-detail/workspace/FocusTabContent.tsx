
import React from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Button } from '@/components/ui/button';
import { FileText, CheckSquare, Plus, Mail, Image, File, Pencil } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FocusTabContentProps {
  deal: Deal;
  assets: Asset[];
  onCreateAsset?: (dealId: string, asset: Partial<Asset>) => void;
}

const FocusTabContent: React.FC<FocusTabContentProps> = ({ deal, assets, onCreateAsset }) => {
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

  return (
    <div className="h-full">
      <Tabs defaultValue="assets" className="h-full">
        <TabsList className="mb-4">
          <TabsTrigger value="assets" className="flex items-center gap-1">
            <Image className="h-4 w-4" />
            Assets
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-1">
            <CheckSquare className="h-4 w-4" />
            Tarefas
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Notas
          </TabsTrigger>
          <TabsTrigger value="emails" className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            Emails
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-1">
            <File className="h-4 w-4" />
            Documentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="h-[calc(100%-48px)]">
          {assets.length > 0 ? (
            <div className="space-y-3 overflow-auto max-h-full">
              {assets.map(asset => (
                <div key={asset.id} className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                  <div className="flex justify-between">
                    <div className="font-medium">{asset.title}</div>
                    <Button size="icon" variant="ghost">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">{asset.description}</div>
                  <div className="flex justify-between mt-2">
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
            <div className="text-center p-4 border rounded-md bg-muted/30 h-full flex items-center justify-center">
              <div>
                <p className="text-muted-foreground mb-3">Nenhum asset encontrado</p>
                <Button size="sm" variant="outline" onClick={handleCreateAsset}>
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Asset
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="tasks" className="h-[calc(100%-48px)]">
          <div className="text-center p-4 border rounded-md bg-muted/30 h-full flex items-center justify-center">
            <div>
              <p className="text-muted-foreground mb-3">Nenhuma tarefa encontrada</p>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Tarefa
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="h-[calc(100%-48px)]">
          <div className="text-center p-4 border rounded-md bg-muted/30 h-full flex items-center justify-center">
            <div>
              <p className="text-muted-foreground mb-3">Nenhuma nota encontrada</p>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Nota
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="emails" className="h-[calc(100%-48px)]">
          <div className="text-center p-4 border rounded-md bg-muted/30 h-full flex items-center justify-center">
            <div>
              <p className="text-muted-foreground mb-3">Nenhum email encontrado</p>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Email
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="h-[calc(100%-48px)]">
          <div className="text-center p-4 border rounded-md bg-muted/30 h-full flex items-center justify-center">
            <div>
              <p className="text-muted-foreground mb-3">Nenhum documento encontrado</p>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Documento
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FocusTabContent;
