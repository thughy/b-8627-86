
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { CalendarDays, Clock, FileText, ClipboardList, Mail, Image, Paperclip } from 'lucide-react';

interface HistoryTabContentProps {
  deal?: Deal;
  filter: string;
}

const HistoryTabContent: React.FC<HistoryTabContentProps> = ({ deal, filter }) => {
  // Dados simulados de histórico
  const historyItems = [
    { id: 1, type: 'note', title: 'Nota adicionada', date: new Date(Date.now() - 1000 * 60 * 60 * 48) },
    { id: 2, type: 'task', title: 'Tarefa concluída', date: new Date(Date.now() - 1000 * 60 * 60 * 72) },
    { id: 3, type: 'email', title: 'Email enviado para cliente', date: new Date(Date.now() - 1000 * 60 * 60 * 120) },
    { id: 4, type: 'asset', title: 'Asset atualizado', date: new Date(Date.now() - 1000 * 60 * 60 * 168) },
    { id: 5, type: 'document', title: 'Anexo adicionado', date: new Date(Date.now() - 1000 * 60 * 60 * 180) },
  ];

  const filteredItems = filter === 'all' 
    ? historyItems 
    : historyItems.filter(item => {
        // Convertemos o filtro para o tipo correspondente (ex: 'assets' -> 'asset')
        const filterType = filter.endsWith('s') ? filter.slice(0, -1) : filter;
        return item.type === filterType;
      });

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

  // Função para obter o ícone baseado no tipo do registro
  const getItemIcon = (type: string) => {
    switch (type) {
      case 'asset': return <Image className="h-4 w-4" />;
      case 'task': return <ClipboardList className="h-4 w-4" />;
      case 'note': return <FileText className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'document': return <Paperclip className="h-4 w-4" />;
      default: return <CalendarDays className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-2">
      {filteredItems.length > 0 ? (
        <div className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-800">
          {filteredItems.map(item => (
            <div key={item.id} className="mb-6 relative">
              {/* Marcador de tempo na timeline */}
              <div className="absolute -left-[17px] p-1 rounded-full bg-background border-2 border-gray-200 dark:border-gray-800">
                {getItemIcon(item.type)}
              </div>
              
              {/* Conteúdo do item */}
              <div className="p-3 border rounded-md ml-2 hover:bg-accent/10 transition-colors">
                <div className="flex justify-between">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatRelativeDate(item.date)}
                  </span>
                </div>
                <div className="text-xs mt-1 bg-primary/10 w-fit px-2 py-0.5 rounded">
                  {item.type === 'document' ? 'anexo' : item.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-4 text-muted-foreground">
          Nenhum item de histórico disponível para este filtro.
        </div>
      )}
    </div>
  );
};

export default HistoryTabContent;
