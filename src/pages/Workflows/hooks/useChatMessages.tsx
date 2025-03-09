
import { useState } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  senderName: string;
  text: string;
  content: string;
  timestamp: Date;
}

// Simplified placeholder hook until we implement the chat properly
export const useChatMessages = (dealId?: string) => {
  return {
    messages: [],
    sendMessage: () => console.log('Chat not implemented yet'),
    addMessage: () => console.log('Chat not implemented yet')
  };
};
