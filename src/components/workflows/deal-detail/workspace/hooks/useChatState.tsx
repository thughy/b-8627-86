
import { useState } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'system' | 'agent';
  senderName: string;
  content: string;
  text: string; // Adicionando propriedade text que será igual ao content
  timestamp: Date;
}

export const useChatState = (initialMessages: ChatMessage[] = []) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = (content: string, sender: 'user' | 'system' | 'agent' = 'user', senderName: string = 'Você') => {
    if (!content.trim()) return;
    
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender,
      senderName,
      content,
      text: content, // Adicionando text igual ao content
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
  };

  return {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    setMessages
  };
};
