
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DealStatusBadge from '../DealStatusBadge';
import { MessageCircle, CheckSquare, FileText, Mail, Image, File } from 'lucide-react';

interface ChatHeaderProps {
  deal: Deal;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ deal }) => {
  // Exemplo de contadores (em um cenário real, viriam da API)
  const counters = {
    chat: 3,
    assets: 2,
    tasks: 5,
    notes: 1,
    emails: 2,
    documents: 3
  };

  return (
    <div className="mb-4 space-y-2">
      {/* Informações principais */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="bg-muted/30">
          <CardContent className="p-3">
            <div className="text-sm font-medium">{deal.title}</div>
            <div className="text-xs text-muted-foreground">
              Tipo: {deal.type || "Não definido"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="p-3">
            <div className="text-sm font-medium">{deal.customerName || "Cliente não definido"}</div>
            <div className="text-xs text-muted-foreground">
              {deal.interests ? `Interesse: ${deal.interests}` : "Interesse não definido"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Datas e valores */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="bg-muted/30">
          <CardContent className="p-3">
            <div className="text-xs">Início: {deal.startDate 
              ? formatDistanceToNow(deal.startDate, { addSuffix: true, locale: ptBR })
              : "Não definido"}
            </div>
            <div className="text-xs">Término: {deal.endDate
              ? formatDistanceToNow(deal.endDate, { addSuffix: true, locale: ptBR })
              : "Não definido"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="p-3">
            <div className="text-sm font-medium">
              {deal.amount
                ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(deal.amount)
                : "Valor não definido"}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs">Status:</span>
              <DealStatusBadge status={deal.status} />
              {deal.reasonForLoss && (
                <span className="text-xs text-red-500 ml-1">({deal.reasonForLoss})</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contadores */}
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <MessageCircle className="h-3 w-3" />
          <span>{counters.chat}</span>
        </div>
        <div className="flex items-center gap-1">
          <Image className="h-3 w-3" />
          <span>{counters.assets}</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckSquare className="h-3 w-3" />
          <span>{counters.tasks}</span>
        </div>
        <div className="flex items-center gap-1">
          <FileText className="h-3 w-3" />
          <span>{counters.notes}</span>
        </div>
        <div className="flex items-center gap-1">
          <Mail className="h-3 w-3" />
          <span>{counters.emails}</span>
        </div>
        <div className="flex items-center gap-1">
          <File className="h-3 w-3" />
          <span>{counters.documents}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
