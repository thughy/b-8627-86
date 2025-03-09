
import { useState } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  senderName: string;
  text: string;
  content: string;
  timestamp: Date;
}

// Map to store messages by deal ID (will be implemented later)
const chatMessagesStore: Record<string, ChatMessage[]> = {};

// Placeholder version of the hook until we implement it properly
export const useChatMessages = (dealId?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Just placeholders until real implementation
  const sendMessage = (content: string) => {
    console.log(`Sending message to deal ${dealId}: ${content}`);
    
    // For now, just add a dummy message to the local state
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'Current User',
      text: content,
      content: content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    return null;
  };

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  return {
    messages,
    sendMessage,
    addMessage
  };
};
