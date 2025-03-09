
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useChatState, ChatMessage } from './hooks/useChatState';

interface ChatSectionProps {
  dealId?: string;
}

const ChatSection: React.FC<ChatSectionProps> = ({ dealId }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Initialize with a system message
  const initialMessages: ChatMessage[] = [
    {
      id: 'initial',
      sender: 'system',
      senderName: 'Sistema',
      content: 'Negócio criado com sucesso.',
      timestamp: new Date(),
    }
  ];
  
  const { messages, inputValue, setInputValue, sendMessage } = useChatState(initialMessages);

  const handleSendMessage = () => {
    sendMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`p-3 rounded-lg max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-primary/10 ml-auto' 
                  : 'bg-muted/40'
              }`}
            >
              <div className="font-medium text-xs mb-1 flex items-center gap-1">
                {message.sender === 'user' && <User className="h-3 w-3" />}
                {message.sender === 'system' && <MessageSquare className="h-3 w-3" />}
                {message.senderName}
              </div>
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {formatDate(message.timestamp)}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t flex">
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
    </div>
  );
};

export default ChatSection;
