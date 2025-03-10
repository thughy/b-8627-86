
import React from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { CalendarDays, FileText, ClipboardList, Image, Mail, Paperclip, Clock } from 'lucide-react';

interface FocusTabContentProps {
  deal: Deal;
  assets?: Asset[]; 
  filter: string;
  onCreateAsset?: (dealId: string, asset?: Partial<Asset>) => void;
}

type TimelineItem = {
  id: string;
  type: 'asset' | 'task' | 'note' | 'email' | 'document';
  title: string;
  description?: string;
  status?: string;
  date: Date;
  metadata?: Record<string, any>;
};

const FocusTabContent: React.FC<FocusTabContentProps> = ({ 
  deal, 
  assets = [],
  filter,
  onCreateAsset 
}) => {
  // Convertemos assets para o formato de timeline
  const assetItems: TimelineItem[] = assets.map(asset => ({
    id: asset.id,
    type: 'asset',
    title: asset.title,
    description: asset.description,
    status: asset.status,
    date: asset.updatedAt || asset.createdAt,
    metadata: { assetType: asset.type }
  }));

  // Dados simulados para outros tipos de itens (em um cenário real, viriam da API)
  const mockItems: TimelineItem[] = [
    { 
      id: 'task-1', 
      type: 'task', 
      title: 'Enviar proposta comercial', 
      description: 'Preparar e enviar proposta atualizada',
      status: 'pending',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24) 
    },
    { 
      id: 'note-1', 
      type: 'note', 
      title: 'Reunião com cliente', 
      description: 'Cliente demonstrou interesse no novo pacote premium',
      date: new Date(Date.now() - 1000 * 60 * 60 * 48) 
    },
    { 
      id: 'email-1', 
      type: 'email', 
      title: 'Follow-up após reunião', 
      description: 'Email enviado com detalhes dos produtos discutidos',
      date: new Date(Date.now() - 1000 * 60 * 60 * 72) 
    },
    { 
      id: 'document-1', 
      type: 'document', 
      title: 'Anexo inicial', 
      description: 'Versão preliminar do documento',
      date: new Date(Date.now() - 1000 * 60 * 60 * 96) 
    }
  ];

  // Combinamos todos os itens em uma única timeline
  const allItems: TimelineItem[] = [...assetItems, ...mockItems];

  // Ordenamos por data (mais recentes primeiro)
  const sortedItems = allItems.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Aplicamos o filtro selecionado
  const filteredItems = filter === 'all' 
    ? sortedItems 
    : sortedItems.filter(item => {
        // Convertemos o filtro para o tipo correspondente (ex: 'assets' -> 'asset')
        const filterType = filter.endsWith('s') ? filter.slice(0, -1) : filter;
        return item.type === filterType;
      });

  // Função para renderizar o ícone baseado no tipo do item
  const getItemIcon = (type: string) => {
    switch (type) {
      case 'asset': return <Image className="h-4 w-4 text-blue-500" />;
      case 'task': return <ClipboardList className="h-4 w-4 text-green-500" />;
      case 'note': return <FileText className="h-4 w-4 text-yellow-500" />;
      case 'email': return <Mail className="h-4 w-4 text-red-500" />;
      case 'document': return <Paperclip className="h-4 w-4 text-purple-500" />;
      default: return <CalendarDays className="h-4 w-4" />;
    }
  };

  // Função para formatar a data relativa
  const formatRelativeDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'} atrás`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'} atrás`;
    }
  };

  return (
    <div className="space-y-2">
      {filteredItems.length > 0 ? (
        <div className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-800">
          {filteredItems.map((item, index) => (
            <div key={item.id} className="mb-6 relative">
              {/* Marcador de tempo na timeline */}
              <div className="absolute -left-[17px] p-1 rounded-full bg-background border-2 border-gray-200 dark:border-gray-800">
                {getItemIcon(item.type)}
              </div>
              
              {/* Conteúdo do item */}
              <div className="p-3 border rounded-md ml-2 hover:bg-accent/10 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatRelativeDate(item.date)}
                  </div>
                </div>
                
                {item.description && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </div>
                )}
                
                <div className="flex justify-between mt-2">
                  <span className="text-xs bg-primary/10 px-2 py-1 rounded">
                    {item.type === 'document' ? 'anexo' : item.type}
                  </span>
                  {item.status && (
                    <span className="text-xs bg-primary/10 px-2 py-1 rounded">
                      {item.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-4 text-muted-foreground">
          Nenhum item disponível para este filtro.
        </div>
      )}
    </div>
  );
};

export default FocusTabContent;
