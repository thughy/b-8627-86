
import React from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, FileEdit, CheckCircle, AlertTriangle, Calendar, DollarSign } from 'lucide-react';

interface AssetHistoryTabProps {
  asset: Asset;
}

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  icon: JSX.Element;
}

const AssetHistoryTab: React.FC<AssetHistoryTabProps> = ({ asset }) => {
  // Generate simulated timeline events based on asset data
  const generateTimelineEvents = (): TimelineEvent[] => {
    const events: TimelineEvent[] = [];
    
    // Creation event
    events.push({
      id: 'creation',
      title: 'Asset criado',
      description: `O asset "${asset.title}" foi criado`,
      date: asset.createdAt,
      icon: <FileEdit className="h-4 w-4 text-blue-500" />
    });
    
    // Status changes
    if (asset.status === 'processing') {
      events.push({
        id: 'processing',
        title: 'Processamento iniciado',
        description: 'O asset entrou em processamento',
        date: new Date(asset.updatedAt.getTime() - 1000 * 60 * 60 * 24 * 2),
        icon: <Clock className="h-4 w-4 text-amber-500" />
      });
    } else if (asset.status === 'completed') {
      events.push({
        id: 'processing',
        title: 'Processamento iniciado',
        description: 'O asset entrou em processamento',
        date: new Date(asset.updatedAt.getTime() - 1000 * 60 * 60 * 24 * 5),
        icon: <Clock className="h-4 w-4 text-amber-500" />
      });
      events.push({
        id: 'completed',
        title: 'Asset concluído',
        description: 'O asset foi finalizado com sucesso',
        date: new Date(asset.updatedAt.getTime() - 1000 * 60 * 60 * 24 * 1),
        icon: <CheckCircle className="h-4 w-4 text-green-500" />
      });
    } else if (asset.status === 'cancelled') {
      events.push({
        id: 'cancelled',
        title: 'Asset cancelado',
        description: 'O asset foi cancelado',
        date: asset.updatedAt,
        icon: <AlertTriangle className="h-4 w-4 text-red-500" />
      });
    }
    
    // Date related events
    if (asset.startDate) {
      events.push({
        id: 'start-date',
        title: 'Data de início',
        description: `A data de início foi definida para ${asset.startDate.toLocaleDateString()}`,
        date: new Date(asset.createdAt.getTime() + 1000 * 60 * 30),
        icon: <Calendar className="h-4 w-4 text-indigo-500" />
      });
    }
    
    if (asset.endDate) {
      events.push({
        id: 'end-date',
        title: 'Data de término',
        description: `A data de término foi definida para ${asset.endDate.toLocaleDateString()}`,
        date: new Date(asset.createdAt.getTime() + 1000 * 60 * 45),
        icon: <Calendar className="h-4 w-4 text-indigo-500" />
      });
    }
    
    // Amount related events
    if (asset.amount) {
      events.push({
        id: 'amount',
        title: 'Valor definido',
        description: `O valor do asset foi definido como ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(asset.amount)}`,
        date: new Date(asset.createdAt.getTime() + 1000 * 60 * 15),
        icon: <DollarSign className="h-4 w-4 text-emerald-500" />
      });
    }
    
    // Sort events by date (newest first)
    return events.sort((a, b) => b.date.getTime() - a.date.getTime());
  };
  
  const timelineEvents = generateTimelineEvents();

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
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Histórico do Asset</h3>
      
      <div className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-800">
        {timelineEvents.map((event, index) => (
          <div key={event.id} className="mb-6 relative">
            {/* Marcador de tempo na timeline */}
            <div className="absolute -left-[17px] p-1 rounded-full bg-background border-2 border-gray-200 dark:border-gray-800">
              {event.icon}
            </div>
            
            {/* Conteúdo do evento */}
            <div className="p-3 border rounded-md ml-2 hover:bg-accent/10 transition-colors">
              <div className="flex justify-between items-start">
                <div className="font-medium">{event.title}</div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatRelativeDate(event.date)}
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground mt-1">
                {event.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetHistoryTab;
