
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

export const useChatState = (dealId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [typing, setTyping] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  // Load initial messages when dealId changes
  useEffect(() => {
    const loadMessages = async () => {
      // This would be an API call in a real application
      const mockMessages: Message[] = [
        {
          id: '1',
          text: 'Olá, como posso ajudar com esse negócio?',
          sender: 'agent',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
        },
        {
          id: '2',
          text: 'Preciso revisar os termos do contrato antes de fechar.',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 60)
        },
        {
          id: '3',
          text: 'Claro, vou preparar uma análise dos termos para você.',
          sender: 'agent',
          timestamp: new Date(Date.now() - 1000 * 60 * 30)
        }
      ];
      
      setMessages(mockMessages);
    };
    
    loadMessages();
  }, [dealId]);

  const sendMessage = (text: string) => {
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    setAttachments([]);
    
    // Show typing indicator
    setTyping(true);
    
    // Simulate agent response after delay
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Obrigado pela sua mensagem. Vou analisar e retornar em breve.',
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setTyping(false);
    }, 1500);
  };

  const handleAddAttachment = () => {
    // Simulate file selection
    const mockAttachment: Attachment = {
      id: Date.now().toString(),
      name: `arquivo${attachments.length + 1}.pdf`,
      type: 'application/pdf',
      url: '#'
    };
    
    setAttachments(prev => [...prev, mockAttachment]);
  };

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
};
