
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, CheckSquare, Mail, Image, File, History, MessageCircle, CalendarClock } from 'lucide-react';

const HistoryTabContent: React.FC = () => {
  return (
    <>
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <Button variant="outline" size="sm" className="flex items-center gap-1 whitespace-nowrap">
          <History className="h-4 w-4" />
          Todos
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 whitespace-nowrap">
          <FileText className="h-4 w-4" />
          Notas
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 whitespace-nowrap">
          <CheckSquare className="h-4 w-4" />
          Tarefas
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 whitespace-nowrap">
          <Mail className="h-4 w-4" />
          Emails
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 whitespace-nowrap">
          <Image className="h-4 w-4" />
          Assets
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 whitespace-nowrap">
          <Image className="h-4 w-4" />
          Imagens
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 whitespace-nowrap">
          <File className="h-4 w-4" />
          Documentos
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 whitespace-nowrap">
          <CalendarClock className="h-4 w-4" />
          Registros
        </Button>
      </div>
      
      <div className="space-y-4 overflow-auto max-h-[calc(100%-48px)]">
        <div className="p-4 border rounded-md hover:bg-muted/30">
          <div className="flex justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <FileText className="h-4 w-4 text-primary" />
              Asset criado
            </span>
            <span className="text-xs text-muted-foreground">há 2 dias</span>
          </div>
          <p className="mt-1">Proposta Comercial</p>
        </div>
        
        <div className="p-4 border rounded-md hover:bg-muted/30">
          <div className="flex justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <MessageCircle className="h-4 w-4 text-primary" />
              Nova mensagem
            </span>
            <span className="text-xs text-muted-foreground">há 3 dias</span>
          </div>
          <p className="mt-1">Cliente solicitou mais informações sobre o produto.</p>
        </div>
        
        <div className="p-4 border rounded-md hover:bg-muted/30">
          <div className="flex justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <CheckSquare className="h-4 w-4 text-primary" />
              Tarefa concluída
            </span>
            <span className="text-xs text-muted-foreground">há 5 dias</span>
          </div>
          <p className="mt-1">Enviar cotação inicial</p>
        </div>
        
        <div className="p-4 border rounded-md hover:bg-muted/30">
          <div className="flex justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <Mail className="h-4 w-4 text-primary" />
              Email enviado
            </span>
            <span className="text-xs text-muted-foreground">há 6 dias</span>
          </div>
          <p className="mt-1">Proposta comercial enviada para o cliente</p>
        </div>
        
        <div className="p-4 border rounded-md hover:bg-muted/30">
          <div className="flex justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <File className="h-4 w-4 text-primary" />
              Documento adicionado
            </span>
            <span className="text-xs text-muted-foreground">há 7 dias</span>
          </div>
          <p className="mt-1">Contrato de serviço</p>
        </div>
        
        <div className="p-4 border rounded-md hover:bg-muted/30">
          <div className="flex justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <CalendarClock className="h-4 w-4 text-primary" />
              Registro de atividade
            </span>
            <span className="text-xs text-muted-foreground">há 8 dias</span>
          </div>
          <p className="mt-1">Negócio criado</p>
        </div>
      </div>
    </>
  );
};

export default HistoryTabContent;
