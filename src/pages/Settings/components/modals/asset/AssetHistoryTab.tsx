
import React from "react";

const AssetHistoryTab = () => {
  // Normally we would fetch this data from API or some source
  const mockHistory = [
    { date: "2023-12-10T14:30:00", action: "Criação", user: "João Silva" },
    { date: "2023-12-15T09:15:00", action: "Atualização de status", user: "Maria Oliveira" },
    { date: "2023-12-20T16:45:00", action: "Edição de valor", user: "Pedro Santos" },
  ];

  return (
    <div className="space-y-4">
      <div className="border rounded-md overflow-hidden">
        <div className="grid grid-cols-3 gap-4 p-3 font-medium bg-muted/50">
          <div>Data</div>
          <div>Ação</div>
          <div>Usuário</div>
        </div>
        <div className="divide-y">
          {mockHistory.length > 0 ? (
            mockHistory.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-3">
                <div className="text-sm">
                  {new Date(item.date).toLocaleDateString('pt-BR', { 
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="text-sm">{item.action}</div>
                <div className="text-sm">{item.user}</div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              Nenhum histórico disponível
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetHistoryTab;
