
import { useState, useEffect } from 'react';
import { ChatMessage } from '@/components/workflows/deal-detail/workspace/hooks/useChatState';

// Map to store messages by deal ID
const chatMessagesStore: Record<string, ChatMessage[]> = {};

export const useChatMessages = (dealId?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>(dealId ? chatMessagesStore[dealId] || [] : []);

  // Initialize with a system message if the deal has no messages yet
  useEffect(() => {
    if (dealId && (!chatMessagesStore[dealId] || chatMessagesStore[dealId].length === 0)) {
      const initialMessage: ChatMessage = {
        id: `initial-${dealId}`,
        sender: 'system',
        senderName: 'Sistema',
        content: `Negócio #${dealId.slice(0, 8)} criado com sucesso. Você pode interagir com os participantes neste chat.`,
        text: `Negócio #${dealId.slice(0, 8)} criado com sucesso. Você pode interagir com os participantes neste chat.`,
        timestamp: new Date()
      };
      
      chatMessagesStore[dealId] = [initialMessage];
      setMessages([initialMessage]);
    } else if (dealId) {
      setMessages(chatMessagesStore[dealId] || []);
    }
  }, [dealId]);

  const addMessage = (message: ChatMessage) => {
    if (dealId) {
      const updatedMessages = [...(chatMessagesStore[dealId] || []), message];
      chatMessagesStore[dealId] = updatedMessages;
      setMessages(updatedMessages);
    }
  };

  const sendMessage = (content: string, sender: 'user' | 'system' | 'agent' = 'user', senderName: string = 'Você') => {
    if (!content.trim() || !dealId) return;
    
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender,
      senderName,
      content,
      text: content,
      timestamp: new Date()
    };

    addMessage(newMessage);
    return newMessage;
  };

  return {
    messages,
    sendMessage,
    addMessage
  };
};
