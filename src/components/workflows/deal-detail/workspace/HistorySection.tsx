
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDate } from '@/lib/utils';

const HistorySection: React.FC = () => {
  return (
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
  );
};

export default HistorySection;
