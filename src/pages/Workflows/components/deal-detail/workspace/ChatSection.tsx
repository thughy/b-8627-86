
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Send, X, User, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChatMessage {
  id: string;
  text: string;
  attachments?: { id: string; name: string; url: string }[];
  sender: 'user' | 'agent';
  timestamp: Date;
  type?: string;
}

interface ChatSectionProps {
  dealId: string;
  messages: ChatMessage[];
  messageText: string;
  setMessageText: (text: string) => void;
  sendMessage: () => void; // Changed to not require text parameter
  typing: boolean;
  attachments: { id: string; name: string; url: string }[];
  handleAddAttachment: (files: FileList) => void;
  handleRemoveAttachment: (id: string) => void; // Changed to accept id instead of index
  filter: string;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  dealId,
  messages,
  messageText,
  setMessageText,
  sendMessage,
  typing,
  attachments,
  handleAddAttachment,
  handleRemoveAttachment,
  filter
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Filtrar mensagens baseado no tipo (se aplicável)
  const filteredMessages = filter === 'all' 
    ? messages 
    : messages.filter(msg => {
        if (filter === 'emails' && msg.type === 'email') return true;
        if (filter === 'documents' && msg.type === 'document') return true;
        // Para outros tipos, mostrar apenas se não tivermos um filtro específico
        return (filter === 'notes' || filter === 'tasks' || filter === 'assets') ? false : true;
      });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleAddAttachment(e.target.files);
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {filteredMessages.length > 0 ? (
          <div className="relative">
            {/* Linha vertical da timeline */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

            {filteredMessages.map((message, index) => (
              <div 
                key={message.id} 
                className="relative pl-14 py-3 hover:bg-muted/40 rounded-md transition-colors"
              >
                {/* Avatar na linha do tempo */}
                <div className="absolute left-2 top-4 w-5 h-5 rounded-full bg-primary/10 border-2 border-primary/50 flex items-center justify-center">
                  {message.sender === 'user' ? (
                    <User className="h-3 w-3" />
                  ) : (
                    <Bot className="h-3 w-3" />
                  )}
                </div>

                {/* Tempo à esquerda */}
                <div className="absolute left-9 top-4 text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>

                {/* Mensagem */}
                <div className={`rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'bg-secondary/10 border border-secondary/20'
                }`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-sm">
                      {message.sender === 'user' ? 'Você' : 'Agente'}
                    </span>
                    {message.type && (
                      <Badge variant="outline" className="text-xs">
                        {message.type}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  
                  {/* Anexos */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.attachments.map(attachment => (
                        <Badge variant="secondary" key={attachment.id} className="flex items-center gap-1">
                          <Paperclip className="h-3 w-3" />
                          {attachment.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-muted-foreground">
            {filter === 'all' 
              ? 'Nenhuma mensagem ainda. Comece a conversa!' 
              : 'Nenhuma mensagem encontrada para o filtro selecionado.'}
          </div>
        )}

        {typing && (
          <div className="pl-14 py-2">
            <div className="rounded-lg p-3 bg-muted animate-pulse w-24">
              <div className="flex space-x-1 justify-center">
                <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                <div className="w-2 h-2 rounded-full bg-primary/60 animation-delay-200"></div>
                <div className="w-2 h-2 rounded-full bg-primary/60 animation-delay-500"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Área de anexos */}
      {attachments.length > 0 && (
        <div className="p-2 border-t flex flex-wrap gap-2">
          {attachments.map(attachment => (
            <Badge key={attachment.id} variant="secondary" className="flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              {attachment.name}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-4 w-4 p-0 ml-1" 
                onClick={() => handleRemoveAttachment(attachment.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Área de entrada */}
      <div className="border-t pt-3 pb-1 px-1 flex gap-2 items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full" 
          onClick={triggerFileInput}
        >
          <Paperclip className="h-5 w-5 text-muted-foreground" />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
        </Button>
        <Input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          className="flex-1"
        />
        <Button
          onClick={sendMessage}
          disabled={!messageText.trim() && attachments.length === 0}
          size="sm"
        >
          <Send className="h-4 w-4 mr-1" />
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default ChatSection;
