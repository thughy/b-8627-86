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

// Disabled version of the hook until we implement it properly
export const useChatMessages = (dealId?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Just placeholders until real implementation
  const sendMessage = (content: string) => {
    console.log("This function is disabled for now");
    return null;
  };

  const addMessage = (message: ChatMessage) => {
    console.log("This function is disabled for now");
  };

  return {
    messages,
    sendMessage,
    addMessage
  };
};
