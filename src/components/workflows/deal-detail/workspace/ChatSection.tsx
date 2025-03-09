
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const ChatSection: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="bg-muted/40 p-3 rounded-lg max-w-[80%]">
            <div className="font-medium text-xs mb-1">Sistema</div>
            <div className="text-sm">Negócio criado com sucesso.</div>
            <div className="text-xs text-muted-foreground mt-1">
              {formatDate(new Date())}
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
  );
};

export default ChatSection;
