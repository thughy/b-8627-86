
import React from 'react';
import { 
  Send, 
  Paperclip, 
  Mic, 
  XCircle,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';

type Attachment = {
  id: string;
  name: string;
  type: string;
  url: string;
};

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  attachments?: Attachment[];
  // Adding missing properties needed for ChatMessage compatibility
  senderName?: string;
  content?: string;
};

export interface ChatSectionProps {
  dealId: string;
  messages: Message[];
  messageText: string;
  setMessageText: (text: string) => void;
  sendMessage: (text: string) => void;
  typing: boolean;
  attachments: Attachment[];
  handleAddAttachment: () => void;
  handleRemoveAttachment: (index: number) => void;
}

export const ChatSection: React.FC<ChatSectionProps> = ({ 
  dealId,
  messages, 
  messageText, 
  setMessageText, 
  sendMessage, 
  typing, 
  attachments, 
  handleAddAttachment, 
  handleRemoveAttachment 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      sendMessage(messageText);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-4 py-2 border-b">
        <h3 className="text-md font-medium">Chat</h3>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
                <Avatar className={`h-8 w-8 ${message.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                  <AvatarFallback>{message.sender === 'user' ? 'U' : 'A'}</AvatarFallback>
                  <AvatarImage src={message.sender === 'user' ? '/avatar-user.png' : '/avatar-agent.png'} />
                </Avatar>
                <div className={`rounded-lg px-3 py-2 text-sm ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  {message.text}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {message.attachments.map((attachment, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {attachment.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {typing && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-4 py-2 text-sm">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-foreground/70 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-foreground/70 rounded-full animate-bounce delay-100" />
                  <div className="w-1.5 h-1.5 bg-foreground/70 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {attachments.length > 0 && (
        <div className="px-4 py-2 flex flex-wrap gap-2 border-t">
          {attachments.map((attachment, index) => (
            <Badge key={index} variant="outline" className="py-1">
              {attachment.name}
              <button 
                className="ml-1 text-muted-foreground hover:text-foreground" 
                onClick={() => handleRemoveAttachment(index)}
              >
                <XCircle className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="border-t p-3">
        <div className="flex flex-col space-y-2">
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              className="h-8 w-8"
              onClick={handleAddAttachment}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Textarea 
              placeholder="Digite sua mensagem..." 
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              className="min-h-9 h-9 resize-none !py-1.5"
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button type="submit" size="icon" className="h-8 w-8">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatSection;
