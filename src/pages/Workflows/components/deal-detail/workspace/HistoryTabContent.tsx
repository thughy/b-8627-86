
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const HistoryTabContent = () => {
  const [filter, setFilter] = useState('all');

  const historyFilters = [
    { id: 'all', label: 'Todos' },
    { id: 'notes', label: 'Notas' },
    { id: 'tasks', label: 'Tarefas' },
    { id: 'emails', label: 'Emails' },
    { id: 'assets', label: 'Assets' },
    { id: 'docs', label: 'Documentos' }
  ];

  // Dados simulados de histórico
  const historyItems = [
    { id: 1, type: 'note', title: 'Nota adicionada', date: '2 dias atrás' },
    { id: 2, type: 'task', title: 'Tarefa concluída', date: '3 dias atrás' },
    { id: 3, type: 'email', title: 'Email enviado para cliente', date: '5 dias atrás' },
    { id: 4, type: 'asset', title: 'Asset atualizado', date: '1 semana atrás' },
  ];

  const filteredItems = filter === 'all' 
    ? historyItems 
    : historyItems.filter(item => item.type === filter.slice(0, -1)); // Remove 's' from filter

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {historyFilters.map(filterItem => (
          <Button
            key={filterItem.id}
            variant={filter === filterItem.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(filterItem.id)}
          >
            {filterItem.label}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className="p-3 border rounded-md">
              <div className="flex justify-between">
                <span className="font-medium">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              <div className="text-xs mt-1 bg-primary/10 w-fit px-2 py-0.5 rounded">
                {item.type}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-muted-foreground">
            Nenhum item de histórico disponível para este filtro.
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryTabContent;
