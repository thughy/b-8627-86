
import React from "react";
import { Stage, Deal } from "@/pages/Workflows/models/WorkflowModels";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropResult } from "react-beautiful-dnd";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface KanbanBoardProps {
  stages: Stage[];
  pipelineId?: string;
  onAction?: (action: string, data?: any) => void;
  deals: Deal[];
  onDragEnd: (result: DropResult) => void;
  onDealClick: (deal: Deal) => void;
  getChatPreview?: (dealId: string) => any[];
}

const KanbanBoard = ({ 
  stages, 
  pipelineId, 
  deals, 
  onDragEnd, 
  onDealClick,
  onAction,
  getChatPreview 
}: KanbanBoardProps) => {
  // Ordenar estágios pela ordem
  const sortedStages = [...stages].sort((a, b) => a.order - b.order);
  
  const getDealsByStage = (stageId: string) => {
    return deals.filter(deal => deal.stageId === stageId);
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return "Não definido";
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "Não definido";
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4" style={{ minWidth: Math.max(stages.length * 320, 100) + "px" }}>
        {sortedStages.map((stage) => {
          const stageDeals = getDealsByStage(stage.id);
          return (
            <div key={stage.id} className="flex-1 min-w-[300px]">
              <div className="bg-muted/40 rounded-md p-3 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm">{stage.title}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {stageDeals.length}
                  </span>
                </div>
                
                <div className="space-y-3 flex-1 min-h-[200px] rounded-md p-2">
                  {stageDeals.length > 0 ? (
                    stageDeals.map((deal) => {
                      const chatPreview = getChatPreview ? getChatPreview(deal.id) : [];
                      return (
                        <Card 
                          key={deal.id} 
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => onDealClick(deal)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm">{deal.title}</h4>
                              <Badge variant="outline" className="text-xs">
                                {deal.type || "Não definido"}
                              </Badge>
                            </div>
                            
                            {/* Customer info */}
                            {deal.customerName && (
                              <div className="mt-2 text-xs">
                                <span className="text-muted-foreground">Cliente: </span>
                                <span>{deal.customerName}</span>
                                {deal.customerOrganization && (
                                  <span className="text-muted-foreground ml-1">
                                    ({deal.customerOrganization})
                                  </span>
                                )}
                              </div>
                            )}
                            
                            {/* Deal amount */}
                            <div className="mt-1 text-xs">
                              <span className="text-muted-foreground">Valor: </span>
                              <span>{formatCurrency(deal.amount)}</span>
                            </div>
                            
                            {/* Dates */}
                            <div className="mt-1 text-xs">
                              <span className="text-muted-foreground">Criado: </span>
                              <span>{formatDate(deal.startDate)}</span>
                            </div>

                            {/* Status or reason for loss */}
                            <div className="mt-1 text-xs">
                              <span className="text-muted-foreground">Status: </span>
                              <Badge variant={
                                deal.status === 'won' ? "success" : 
                                deal.status === 'lost' ? "destructive" : 
                                "outline"
                              } className="text-xs">
                                {deal.status === 'won' ? 'Ganho' : 
                                 deal.status === 'lost' ? 'Perdido' : 'Aberto'}
                              </Badge>
                              {deal.status === 'lost' && deal.reasonForLoss && (
                                <span className="ml-1 text-xs text-muted-foreground">
                                  ({deal.reasonForLoss})
                                </span>
                              )}
                            </div>
                            
                            {/* Chat preview */}
                            {chatPreview.length > 0 && (
                              <div className="mt-2 border-t pt-2">
                                <div className="text-xs font-medium mb-1">Últimas mensagens:</div>
                                {chatPreview.map((msg, idx) => (
                                  <div key={idx} className="text-xs text-muted-foreground truncate">
                                    <span className="font-medium">{msg.sender === 'user' ? 'Você' : 'Agente'}: </span>
                                    {msg.text}
                                  </div>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-sm text-muted-foreground">Sem deals</p>
                    </div>
                  )}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-3 justify-start text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    if (onAction) {
                      onAction("createDeal", { stageId: stage.id, pipelineId });
                    }
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Deal
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
