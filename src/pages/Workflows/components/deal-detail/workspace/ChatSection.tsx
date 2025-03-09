
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip, Bot, User, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'system';
  timestamp: Date;
}

interface ChatSectionProps {
  dealId: string;
  messages: Message[];
}

const ChatSection: React.FC<ChatSectionProps> = ({ dealId, messages }) => {
  const [inputText, setInputText] = useState('');
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      console.log('Enviando mensagem:', inputText);
      setInputText('');
      
      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada com sucesso.",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSenderIcon = (sender: string) => {
    switch (sender) {
      case 'user':
        return <User className="h-6 w-6 text-primary" />;
      case 'agent':
        return <Bot className="h-6 w-6 text-indigo-500" />;
      default:
        return <Bot className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.length > 0 ? (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.sender !== 'user' && (
                  <div className="flex-shrink-0 rounded-full bg-primary/10 p-2">
                    {getSenderIcon(message.sender)}
                  </div>
                )}
                
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p>{message.text}</p>
                  <div className="text-xs mt-1 opacity-70">
                    {message.timestamp instanceof Date 
                      ? message.timestamp.toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                    }
                  </div>
                </div>

                {message.sender === 'user' && (
                  <div className="flex-shrink-0 rounded-full bg-primary/10 p-2">
                    {getSenderIcon(message.sender)}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-6">
              <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">Nenhuma mensagem ainda</h3>
              <p className="text-muted-foreground mt-1">
                Inicie uma conversa usando o campo abaixo.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 items-center sticky bottom-0 bg-background pt-2">
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="flex-shrink-0"
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="flex-shrink-0"
        >
          <Image className="h-4 w-4" />
        </Button>
        
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          className="flex-1"
        />
        
        <Button
          type="button"
          size="icon"
          className="flex-shrink-0"
          onClick={handleSendMessage}
          disabled={!inputText.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatSection;
