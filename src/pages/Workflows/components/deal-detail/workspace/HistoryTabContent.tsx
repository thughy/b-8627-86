
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { FileText, CheckSquare, Image, Mail, File, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface HistoryItem {
  id: string;
  type: 'note' | 'task' | 'asset' | 'email' | 'document' | 'status_change';
  title: string;
  description?: string;
  date: Date;
  user?: string;
  oldValue?: string;
  newValue?: string;
}

interface HistoryTabContentProps {
  deal?: Deal;
  filter: string;
}

const HistoryTabContent: React.FC<HistoryTabContentProps> = ({ deal, filter }) => {
  // Dados simulados de histórico
  const historyItems: HistoryItem[] = [
    { 
      id: 'hist-1', 
      type: 'note', 
      title: 'Nota adicionada', 
      description: 'Cliente solicitou mais informações sobre condições de pagamento',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 dias atrás
      user: 'Carlos Silva'
    },
    { 
      id: 'hist-2', 
      type: 'task', 
      title: 'Tarefa concluída', 
      description: 'Enviar documentação adicional solicitada pelo cliente',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 dias atrás
      user: 'Maria Santos'
    },
    { 
      id: 'hist-3', 
      type: 'email', 
      title: 'Email enviado para cliente', 
      description: 'Detalhes da proposta comercial revisada',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 dias atrás
      user: 'Carlos Silva'
    },
    { 
      id: 'hist-4', 
      type: 'asset', 
      title: 'Asset atualizado', 
      description: 'Proposta comercial v2',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 semana atrás
      user: 'Ana Oliveira'
    },
    { 
      id: 'hist-5', 
      type: 'status_change', 
      title: 'Status alterado', 
      oldValue: 'Em andamento',
      newValue: 'Negociação',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 dias atrás
      user: 'João Gomes'
    },
    { 
      id: 'hist-6', 
      type: 'document', 
      title: 'Documento adicionado', 
      description: 'Contrato inicial',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12), // 12 dias atrás
      user: 'Carlos Silva'
    },
  ];

  // Filtrando itens com base no filtro selecionado
  const filteredItems = filter === 'all' 
    ? historyItems 
    : historyItems.filter(item => {
        if (filter === 'notes') return item.type === 'note';
        if (filter === 'tasks') return item.type === 'task';
        if (filter === 'assets') return item.type === 'asset';
        if (filter === 'emails') return item.type === 'email';
        if (filter === 'documents') return item.type === 'document';
        return true;
      });

  // Ordenando por data (mais recente primeiro)
  const sortedItems = filteredItems.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Função para obter o ícone com base no tipo de item
  const getItemIcon = (type: string) => {
    switch (type) {
      case 'note':
        return <FileText className="h-4 w-4" />;
      case 'task':
        return <CheckSquare className="h-4 w-4" />;
      case 'asset':
        return <Image className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'document':
        return <File className="h-4 w-4" />;
      case 'status_change':
        return <Badge className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Função para formatar a data
  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
  };

  return (
    <div className="space-y-1">
      {sortedItems.length > 0 ? (
        <div className="relative">
          {/* Linha vertical da timeline */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

          {/* Itens da timeline */}
          {sortedItems.map((item, index) => (
            <div key={item.id} className="relative pl-14 py-3 hover:bg-muted/40 rounded-md transition-colors">
              {/* Círculo na linha do tempo */}
              <div className="absolute left-2 top-4 w-5 h-5 rounded-full bg-primary/10 border-2 border-primary/50 flex items-center justify-center">
                {getItemIcon(item.type)}
              </div>

              {/* Data à esquerda */}
              <div className="absolute left-9 top-4 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 inline mr-1" />
                {formatDate(item.date)}
              </div>

              {/* Conteúdo do item */}
              <div className="border rounded-md p-3 bg-card">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium mb-1">{item.title}</h4>
                  <Badge variant="outline" className="capitalize">
                    {item.type.replace('_', ' ')}
                  </Badge>
                </div>
                
                {item.description && (
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                )}
                
                {item.type === 'status_change' && (
                  <div className="flex items-center text-sm space-x-2">
                    <Badge variant="outline">{item.oldValue}</Badge>
                    <span>→</span>
                    <Badge variant="default">{item.newValue}</Badge>
                  </div>
                )}
                
                {item.user && (
                  <div className="mt-2 text-xs text-muted-foreground flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {item.user}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 text-muted-foreground">
          Nenhum item encontrado para o filtro selecionado.
        </div>
      )}
    </div>
  );
};

export default HistoryTabContent;
