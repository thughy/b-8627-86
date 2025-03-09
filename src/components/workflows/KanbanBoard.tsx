
import React from "react";
import { Stage, Deal } from "@/pages/Workflows/models/WorkflowModels";
import { Button } from "@/components/ui/button";
import { Plus, User, DollarSign, Calendar, Tag, MessageSquare, Award, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropResult } from "react-beautiful-dnd";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from "@/lib/utils";

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

  // Function to get status badge variant based on deal status
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'won': return "default";
      case 'lost': return "destructive";
      default: return "outline";
    }
  };

  // Function to get status badge text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'won': return 'Ganho';
      case 'lost': return 'Perdido';
      default: return 'Em andamento';
    }
  };

  // Function to get deal type badge styles
  const getDealTypeBadge = (type: string) => {
    const types: Record<string, { color: string, icon: React.ReactNode }> = {
      'new': { 
        color: "bg-blue-500/15 text-blue-500 border-blue-500/20", 
        icon: <Tag className="h-3 w-3 mr-1" />
      },
      'renewal': { 
        color: "bg-purple-500/15 text-purple-500 border-purple-500/20", 
        icon: <Award className="h-3 w-3 mr-1" />
      },
      'upsell': { 
        color: "bg-green-500/15 text-green-500 border-green-500/20", 
        icon: <Award className="h-3 w-3 mr-1" />
      },
      'cross-sell': { 
        color: "bg-amber-500/15 text-amber-500 border-amber-500/20", 
        icon: <Award className="h-3 w-3 mr-1" />
      },
      'default': { 
        color: "bg-slate-500/15 text-slate-500 border-slate-500/20", 
        icon: <Tag className="h-3 w-3 mr-1" />
      }
    };
    
    return types[type as keyof typeof types] || types.default;
  };

  // Function to get a gradient background based on deal type
  const getDealTypeGradient = (type: string) => {
    const gradients = {
      'new': 'bg-gradient-to-r from-blue-500/10 to-cyan-400/10 border-blue-500/20',
      'renewal': 'bg-gradient-to-r from-purple-500/10 to-pink-400/10 border-purple-500/20',
      'upsell': 'bg-gradient-to-r from-green-500/10 to-emerald-400/10 border-green-500/20',
      'cross-sell': 'bg-gradient-to-r from-amber-500/10 to-yellow-400/10 border-amber-500/20',
      'default': 'bg-gradient-to-r from-slate-500/10 to-gray-400/10 border-slate-500/20'
    };
    
    return gradients[type as keyof typeof gradients] || gradients.default;
  };

  // Function to get the top bar color based on deal type
  const getTopBarColor = (type: string) => {
    const colors = {
      'new': 'bg-gradient-to-r from-blue-500 to-cyan-400',
      'renewal': 'bg-gradient-to-r from-purple-500 to-pink-400',
      'upsell': 'bg-gradient-to-r from-green-500 to-emerald-400',
      'cross-sell': 'bg-gradient-to-r from-amber-500 to-yellow-400',
      'default': 'bg-gradient-to-r from-slate-500 to-gray-400'
    };
    
    return colors[type as keyof typeof colors] || colors.default;
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4" style={{ minWidth: Math.max(stages.length * 320, 100) + "px" }}>
        {sortedStages.map((stage) => {
          const stageDeals = getDealsByStage(stage.id);
          return (
            <div key={stage.id} className="flex-1 min-w-[300px]">
              <div className="bg-muted/40 rounded-md p-3 h-full flex flex-col border border-border/40">
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
                      const dealTypeGradient = getDealTypeGradient(deal.type || 'default');
                      const topBarColor = getTopBarColor(deal.type || 'default');
                      const typeBadge = getDealTypeBadge(deal.type || 'default');
                      
                      return (
                        <Card 
                          key={deal.id} 
                          className={cn(
                            "cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden",
                            "hover:-translate-y-1 border",
                            dealTypeGradient
                          )}
                          onClick={() => onDealClick(deal)}
                        >
                          <div className={`h-1.5 w-full ${topBarColor}`}></div>
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-sm">{deal.title}</h4>
                              <Badge 
                                variant="outline" 
                                className={cn("text-xs font-semibold flex items-center px-2 py-1", typeBadge.color)}
                              >
                                {typeBadge.icon}
                                {deal.type || "Não definido"}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 mt-2">
                              {/* Customer info */}
                              {deal.customerName && (
                                <div className="flex items-center text-xs space-x-1.5">
                                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                                    <User className="h-3 w-3 text-primary" />
                                  </div>
                                  <div className="flex-1 truncate">
                                    <span className="font-medium">{deal.customerName}</span>
                                    {deal.customerOrganization && (
                                      <span className="ml-1">
                                        <Building className="h-3 w-3 inline mr-0.5" />
                                        {deal.customerOrganization}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {/* Deal amount */}
                              <div className="flex items-center text-xs space-x-1.5">
                                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                                  <DollarSign className="h-3 w-3 text-primary" />
                                </div>
                                <span className="font-medium">{formatCurrency(deal.amount)}</span>
                              </div>
                              
                              {/* Dates */}
                              <div className="flex items-center text-xs space-x-1.5">
                                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                                  <Calendar className="h-3 w-3 text-primary" />
                                </div>
                                <span>{formatDate(deal.startDate)}</span>
                              </div>

                              {/* Status */}
                              <div className="flex items-center justify-between text-xs">
                                <Badge variant={getStatusBadgeVariant(deal.status)}>
                                  {getStatusText(deal.status)}
                                </Badge>
                                
                                {deal.status === 'lost' && deal.reasonForLoss && (
                                  <span className="text-xs text-muted-foreground">
                                    {deal.reasonForLoss}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Chat preview */}
                            {chatPreview && chatPreview.length > 0 && (
                              <div className="mt-3 pt-2 border-t border-border/40">
                                <div className="flex items-center text-xs space-x-1.5 mb-1">
                                  <MessageSquare className="h-3 w-3 text-muted-foreground" />
                                  <span className="font-medium">Últimas mensagens</span>
                                </div>
                                <div className="space-y-1">
                                  {chatPreview.map((msg, idx) => (
                                    <div key={idx} className="text-xs text-muted-foreground flex items-start">
                                      <span className="font-medium min-w-[40px]">{msg.sender === 'user' ? 'Você:' : 'Agente:'}</span>
                                      <span className="truncate">{msg.text}</span>
                                    </div>
                                  ))}
                                </div>
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
