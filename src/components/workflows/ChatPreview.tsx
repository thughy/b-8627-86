
import React from "react";
import { MessageSquare, User, Bot, AlertCircle } from "lucide-react";
import { ChatMessage } from "@/components/workflows/deal-detail/workspace/hooks/useChatState";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ChatPreviewProps {
  messages: ChatMessage[];
  maxMessages?: number;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ 
  messages = [], 
  maxMessages = 3 
}) => {
  // Get the most recent messages up to maxMessages
  const recentMessages = [...messages]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, maxMessages);

  if (recentMessages.length === 0) {
    return (
      <div className="mt-2 text-xs text-muted-foreground italic">
        <div className="flex items-center gap-1">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Nenhuma mensagem no chat</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
        <MessageSquare className="h-3.5 w-3.5" />
        <span className="font-medium">Mensagens recentes</span>
      </div>
      {recentMessages.map((message) => (
        <div 
          key={message.id} 
          className="text-xs border-l-2 pl-2 py-0.5"
          style={{ 
            borderLeftColor: 
              message.sender === 'user' ? '#3b82f6' : 
              message.sender === 'agent' ? '#10b981' : 
              '#6b7280' 
          }}
        >
          <div className="flex items-center gap-1 text-muted-foreground">
            {message.sender === 'user' && <User className="h-3 w-3" />}
            {message.sender === 'agent' && <Bot className="h-3 w-3" />}
            {message.sender === 'system' && <AlertCircle className="h-3 w-3" />}
            <span className="font-medium">{message.senderName}</span>
            <span className="text-muted-foreground ml-auto text-[10px]">
              {formatDistanceToNow(new Date(message.timestamp), { 
                addSuffix: true,
                locale: ptBR
              })}
            </span>
          </div>
          <p className="truncate">{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatPreview;
