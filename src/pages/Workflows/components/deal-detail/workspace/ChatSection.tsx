
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Send } from 'lucide-react';

interface ChatSectionProps {
  dealId: string;
}

const ChatSection: React.FC<ChatSectionProps> = ({ dealId }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 mb-4 overflow-y-auto">
        <div className="text-center py-8 text-muted-foreground">
          Chat será implementado posteriormente.
          <br />
          Esta é apenas uma interface de exemplo.
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Digite sua mensagem..."
            className="flex-1"
            disabled
          />
          <Button 
            size="icon" 
            disabled
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
