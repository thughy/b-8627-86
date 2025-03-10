
import { useState, useEffect } from 'react';

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
};

// Mock agent responses for demonstration
const mockResponses = [
  "Olá! Como posso ajudar com este negócio?",
  "Entendi. Vou verificar essas informações para você.",
  "Acabei de atualizar os detalhes no sistema.",
  "Sim, posso preparar essa proposta ainda hoje.",
  "Vou agendar uma reunião com o cliente para discutir os próximos passos."
];

export function useChatState(dealId: string) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Olá! Como posso ajudar com este negócio?",
      sender: 'agent',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [messageText, setMessageText] = useState('');
  const [typing, setTyping] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  // Function to send a message
  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setMessageText('');
    setAttachments([]);
    
    // Simulate agent typing
    setTyping(true);
    
    // Simulate agent response after a delay
    setTimeout(() => {
      // Random response for demo purposes
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const newAgentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAgentMessage]);
      setTyping(false);
    }, 1500);
  };

  // Mock function to add attachment
  const handleAddAttachment = () => {
    // In a real app, this would open a file picker
    const mockAttachment: Attachment = {
      id: Date.now().toString(),
      name: `documento_${Math.floor(Math.random() * 1000)}.pdf`,
      type: 'application/pdf',
      url: '/mock-url'
    };
    
    setAttachments(prev => [...prev, mockAttachment]);
  };

  // Function to remove attachment
  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return {
    messages,
    messageText,
    setMessageText,
    sendMessage,
    typing,
    attachments,
    handleAddAttachment,
    handleRemoveAttachment
  };
}
