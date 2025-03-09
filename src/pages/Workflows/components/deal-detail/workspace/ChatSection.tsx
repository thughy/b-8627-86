
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import ChatHeader from './ChatHeader';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface ChatSectionProps {
  dealId: string;
  messages: ChatMessage[];
  sendMessage: (content: string) => void;
  deal?: Deal; // Adicionamos o deal como prop opcional
}

const ChatSection: React.FC<ChatSectionProps> = ({ 
  dealId, 
  messages, 
  sendMessage,
  deal
}) => {
  const [messageText, setMessageText] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      sendMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header com informações do negócio */}
      {deal && <ChatHeader deal={deal} />}
      
      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 border rounded-md">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground p-4">
            Ainda não há mensagens neste chat. Envie uma mensagem para iniciar a conversa.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p>{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input de mensagem */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatSection;
