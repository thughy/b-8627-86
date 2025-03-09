
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, User, Bot, AlertCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { ChatMessage } from './hooks/useChatState';

interface ChatSectionProps {
  dealId?: string;
  messages: ChatMessage[];
  sendMessage: (content: string, sender?: 'user' | 'system' | 'agent', senderName?: string) => void;
}

const ChatSection: React.FC<ChatSectionProps> = ({ dealId, messages, sendMessage }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useMultiline, setUseMultiline] = useState(false);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    sendMessage(inputValue);
    setInputValue('');
    
    // Simulate agent response
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "Recebi sua mensagem. Como posso ajudar com este negócio?",
        "Estou analisando os detalhes do negócio. Há alguma informação específica que precisa?",
        "Obrigado pelo contato. Vou verificar os próximos passos para este negócio.",
        "Entendido. Vamos prosseguir com o fluxo definido para esta etapa."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      sendMessage(randomResponse, 'agent', 'Assistente');
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !useMultiline) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-2 border-b flex justify-between items-center">
        <h3 className="font-medium flex items-center">
          <MessageSquare className="h-4 w-4 mr-2" /> 
          Chat do Negócio {dealId && `#${dealId.slice(0, 8)}`}
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setUseMultiline(!useMultiline)}
        >
          {useMultiline ? "Modo Simples" : "Modo Multilinhas"}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`p-3 rounded-lg max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-primary/10 ml-auto' 
                  : message.sender === 'system'
                  ? 'bg-muted/60'
                  : 'bg-muted/40'
              }`}
            >
              <div className="font-medium text-xs mb-1 flex items-center gap-1">
                {message.sender === 'user' && <User className="h-3 w-3" />}
                {message.sender === 'agent' && <Bot className="h-3 w-3" />}
                {message.sender === 'system' && <AlertCircle className="h-3 w-3" />}
                {message.senderName}
              </div>
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {formatDate(message.timestamp)}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="p-3 rounded-lg bg-muted/40 max-w-[80%]">
              <div className="font-medium text-xs mb-1 flex items-center gap-1">
                <Bot className="h-3 w-3" />Assistente
              </div>
              <div className="text-sm">Digitando...</div>
            </div>
          )}
          
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t">
        {useMultiline ? (
          <div className="flex flex-col space-y-2">
            <Textarea
              placeholder="Digite uma mensagem..."
              className="resize-none bg-muted/40"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows={3}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="ml-auto"
            >
              <Send className="h-4 w-4 mr-2" />
              Enviar
            </Button>
          </div>
        ) : (
          <div className="flex">
            <Input 
              type="text" 
              placeholder="Digite uma mensagem..." 
              className="flex-1 bg-muted/40 rounded-l-md"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button 
              className="rounded-l-none"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Enviar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSection;
