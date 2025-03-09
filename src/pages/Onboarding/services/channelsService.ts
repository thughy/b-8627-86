
import React from "react";
import { MessageSquare } from "lucide-react";
import { ChannelProps } from "../models/ChannelModel";

export const getChannelsData = (): ChannelProps[] => {
  return [
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: <MessageSquare className="h-5 w-5 text-green-500" />,
      configFields: [
        {
          id: "apiKey",
          label: "API Key",
          placeholder: "Insira sua API Key do WhatsApp Business",
          type: "text",
        },
        {
          id: "phoneNumber",
          label: "Número de telefone",
          placeholder: "+55 (11) 99999-9999",
          type: "tel",
        },
      ],
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
      configFields: [
        {
          id: "botToken",
          label: "Bot Token",
          placeholder: "Insira o token do seu bot",
          type: "text",
        },
      ],
    },
    {
      id: "email",
      name: "Email",
      icon: <MessageSquare className="h-5 w-5 text-yellow-500" />,
      configFields: [
        {
          id: "smtpServer",
          label: "Servidor SMTP",
          placeholder: "smtp.example.com",
          type: "text",
        },
        {
          id: "smtpPort",
          label: "Porta SMTP",
          placeholder: "587",
          type: "number",
        },
        {
          id: "emailUser",
          label: "Email",
          placeholder: "seu@email.com",
          type: "email",
        },
        {
          id: "emailPassword",
          label: "Senha",
          placeholder: "******",
          type: "password",
        },
      ],
    },
  ];
};
