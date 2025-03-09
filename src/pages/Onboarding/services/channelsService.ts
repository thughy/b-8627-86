
import React from "react";
import { MessageSquare, BrandWhatsapp, Mail, Phone } from "lucide-react";
import { ChannelProps } from "../models/ChannelModel";

export const getChannelsData = (): ChannelProps[] => {
  return [
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: React.createElement(BrandWhatsapp, { className: "h-5 w-5 text-green-500" }),
      configFields: [
        {
          id: "phoneNumber",
          label: "Número de telefone",
          type: "text",
          placeholder: "+55 11 99999-9999",
        },
        {
          id: "apiKey",
          label: "Chave API",
          type: "password",
          placeholder: "Chave de API do WhatsApp Business",
        },
      ],
    },
    {
      id: "email",
      name: "Email",
      icon: React.createElement(Mail, { className: "h-5 w-5 text-blue-500" }),
      configFields: [
        {
          id: "emailAddress",
          label: "Endereço de email",
          type: "email",
          placeholder: "seu@email.com",
        },
        {
          id: "smtpServer",
          label: "Servidor SMTP",
          type: "text",
          placeholder: "smtp.seuservidor.com",
        },
      ],
    },
    {
      id: "sms",
      name: "SMS",
      icon: React.createElement(MessageSquare, { className: "h-5 w-5 text-purple-500" }),
      configFields: [
        {
          id: "smsProvider",
          label: "Provedor de SMS",
          type: "text",
          placeholder: "Ex: Twilio, Zenvia",
        },
        {
          id: "apiKey",
          label: "Chave API",
          type: "password",
          placeholder: "Chave de API do provedor",
        },
      ],
    },
  ];
};
