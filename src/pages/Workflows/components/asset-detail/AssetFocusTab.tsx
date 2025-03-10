
import React, { useState } from 'react';
import { Asset } from '@/pages/Workflows/models/WorkflowModels';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Paperclip, Plus, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface AssetFocusTabProps {
  asset: Asset;
  onCreateNote?: (assetId: string) => void;
  onCreateDocument?: (assetId: string) => void;
}

interface Note {
  id: string;
  content: string;
  date: Date;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  date: Date;
}

const AssetFocusTab: React.FC<AssetFocusTabProps> = ({ 
  asset, 
  onCreateNote, 
  onCreateDocument 
}) => {
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('notes');

  // Dados simulados para este exemplo
  const notes: Note[] = asset.parameters?.notes || [
    { id: 'note-1', content: 'Revisão inicial do asset concluída', date: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { id: 'note-2', content: 'Cliente aprovou as condições', date: new Date(Date.now() - 1000 * 60 * 60 * 48) }
  ];

  const documents: Document[] = asset.files?.map((file, index) => ({
    id: `doc-${index + 1}`,
    name: file,
    type: file.split('.').pop() || 'txt',
    size: 1024 * (index + 1),
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * (index + 1))
  })) || [
    { id: 'doc-1', name: 'Asset_details.pdf', type: 'pdf', size: 1024 * 1024, date: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { id: 'doc-2', name: 'Contract_draft.docx', type: 'docx', size: 512 * 1024, date: new Date(Date.now() - 1000 * 60 * 60 * 48) }
  ];

  // Função para formatar o tamanho do arquivo
  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
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

  const filterOptions = [
    { id: 'all', label: 'Todos' },
    { id: 'notes', label: 'Notas' },
    { id: 'documents', label: 'Anexos' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-1">
          {filterOptions.map(filterOption => (
            <Button
              key={filterOption.id}
              variant={filter === filterOption.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterOption.id)}
              className="h-8 px-2 text-xs"
            >
              {filterOption.label}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          {onCreateNote && (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => onCreateNote(asset.id)}
            >
              <Plus className="h-3.5 w-3.5" />
              <FileText className="h-3.5 w-3.5" />
              Nota
            </Button>
          )}
          
          {onCreateDocument && (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => onCreateDocument(asset.id)}
            >
              <Plus className="h-3.5 w-3.5" />
              <Paperclip className="h-3.5 w-3.5" />
              Anexo
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="notes" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            Notas
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex-1">
            <Paperclip className="h-4 w-4 mr-2" />
            Anexos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="notes" className="space-y-4 mt-4">
          {notes.length > 0 ? (
            <div className="space-y-4">
              {notes.map(note => (
                <div 
                  key={note.id} 
                  className="border rounded-md p-3 hover:bg-accent/10 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="font-medium">Nota</span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatRelativeDate(note.date)}
                    </div>
                  </div>
                  <div className="text-sm">{note.content}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              Nenhuma nota disponível para este asset.
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4 mt-4">
          {documents.length > 0 ? (
            <div className="space-y-4">
              {documents.map(doc => (
                <div 
                  key={doc.id} 
                  className="border rounded-md p-3 hover:bg-accent/10 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Paperclip className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="font-medium truncate max-w-[200px]">{doc.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatRelativeDate(doc.date)}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{doc.type.toUpperCase()}</span>
                    <span>{formatFileSize(doc.size)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              Nenhum anexo disponível para este asset.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssetFocusTab;
