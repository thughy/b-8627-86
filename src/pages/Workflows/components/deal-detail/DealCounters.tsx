
import React from 'react';
import { MessageSquare, ClipboardList, FileText, Mail, FolderKanban, Paperclip } from 'lucide-react';

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
    <div className="flex flex-wrap gap-3 mb-4">
      <div className="flex items-center gap-1 text-sm">
        <MessageSquare className="h-4 w-4 text-indigo-500" />
        <span className="text-muted-foreground">Chat:</span>
        <span className="font-medium">{counters.chat}</span>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <FolderKanban className="h-4 w-4 text-blue-500" />
        <span className="text-muted-foreground">Assets:</span>
        <span className="font-medium">{counters.assets}</span>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <ClipboardList className="h-4 w-4 text-green-500" />
        <span className="text-muted-foreground">Tarefas:</span>
        <span className="font-medium">{counters.tasks}</span>
      </div>
      {counters.notes !== undefined && (
        <div className="flex items-center gap-1 text-sm">
          <FileText className="h-4 w-4 text-yellow-500" />
          <span className="text-muted-foreground">Notas:</span>
          <span className="font-medium">{counters.notes}</span>
        </div>
      )}
      {counters.emails !== undefined && (
        <div className="flex items-center gap-1 text-sm">
          <Mail className="h-4 w-4 text-red-500" />
          <span className="text-muted-foreground">Emails:</span>
          <span className="font-medium">{counters.emails}</span>
        </div>
      )}
      {counters.documents !== undefined && (
        <div className="flex items-center gap-1 text-sm">
          <Paperclip className="h-4 w-4 text-purple-500" />
          <span className="text-muted-foreground">Anexos:</span>
          <span className="font-medium">{counters.documents}</span>
        </div>
      )}
    </div>
  );
};

export default DealCounters;
