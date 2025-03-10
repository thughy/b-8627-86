
import React from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { FileText, CheckSquare, Image, Mail, File, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TimelineItem {
  id: string;
  type: 'note' | 'task' | 'asset' | 'email' | 'document';
  title: string;
  description?: string;
  date: Date;
  status?: string;
}

interface FocusTabContentProps {
  deal: Deal;
  assets?: Asset[];
  onCreateAsset?: (dealId: string, asset?: Partial<Asset>) => void;
  filter: string;
}

const FocusTabContent: React.FC<FocusTabContentProps> = ({ 
  deal, 
  assets = [],
  onCreateAsset,
  filter
}) => {
  // Dados simulados para a timeline
  const dummyNotes: TimelineItem[] = [
    {
      id: 'note-1',
      type: 'note',
      title: 'Cliente demonstrou interesse no produto premium',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 dias atrás
    },
    {
      id: 'note-2',
      type: 'note',
      title: 'Aguardando aprovação do gerente para desconto',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
    },
  ];

  const dummyTasks: TimelineItem[] = [
    {
      id: 'task-1',
      type: 'task',
      title: 'Enviar proposta por email',
      description: 'Preparar proposta comercial detalhada com os itens discutidos',
      date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 48 horas atrás
      status: 'completed',
    },
    {
      id: 'task-2',
      type: 'task',
      title: 'Agendar reunião de fechamento',
      description: 'Confirmar disponibilidade do cliente para próxima semana',
      date: new Date(Date.now() - 1000 * 60 * 60 * 36), // 36 horas atrás
      status: 'pending',
    },
  ];

  const dummyEmails: TimelineItem[] = [
    {
      id: 'email-1',
      type: 'email',
      title: 'Proposta comercial enviada',
      description: 'Email com detalhes da proposta e condições de pagamento',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 dias atrás
    },
  ];

  const dummyDocuments: TimelineItem[] = [
    {
      id: 'doc-1',
      type: 'document',
      title: 'Contrato de prestação de serviços',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 dias atrás
    },
  ];

  // Convertendo assets para o formato de TimelineItem
  const assetItems: TimelineItem[] = assets.map(asset => ({
    id: asset.id,
    type: 'asset',
    title: asset.title,
    description: asset.description,
    date: asset.createdAt,
    status: asset.status
  }));

  // Combinando todos os itens em uma única timeline
  const allItems: TimelineItem[] = [
    ...dummyNotes,
    ...dummyTasks,
    ...assetItems,
    ...dummyEmails,
    ...dummyDocuments
  ];

  // Filtrando itens com base no filtro selecionado
  const filteredItems = filter === 'all' 
    ? allItems 
    : allItems.filter(item => {
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
                    {item.type}
                  </Badge>
                </div>
                
                {item.description && (
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                )}
                
                {item.status && (
                  <Badge variant={item.status === 'completed' ? 'default' : 'secondary'} className="mt-1">
                    {item.status}
                  </Badge>
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

export default FocusTabContent;
