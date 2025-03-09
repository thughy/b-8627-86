
import React from 'react';
import { MessageCircle, CheckSquare, FileText } from 'lucide-react';

interface CountersProps {
  counters: {
    chat: number;
    assets: number;
    tasks: number;
    notes?: number;
    emails?: number;
    documents?: number;
  };
}

const DealCounters: React.FC<CountersProps> = ({ counters }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="flex items-center gap-1 text-sm">
        <MessageCircle className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Mensagens:</span>
        <span className="font-medium">{counters.chat}</span>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Ativos:</span>
        <span className="font-medium">{counters.assets}</span>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <CheckSquare className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Tarefas:</span>
        <span className="font-medium">{counters.tasks}</span>
      </div>
    </div>
  );
};

export default DealCounters;
