
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, CheckSquare, Mail, Image, FileArchive, History, MessageCircle } from 'lucide-react';

const HistoryTabContent: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default HistoryTabContent;
