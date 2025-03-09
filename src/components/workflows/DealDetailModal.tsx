import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { Deal, Asset } from "@/pages/Workflows/models/WorkflowModels";
import { Building2, Calendar, CreditCard, FileText, MessageSquare, User, CheckCircle2, XCircle, AlertTriangle, Clock, Plus } from "lucide-react";

interface DealDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal | null;
  onAction: (action: string, data?: any) => void;
}

const DealDetailModal = ({ isOpen, onClose, deal, onAction }: DealDetailModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!deal) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-blue-500/20 text-blue-700";
      case "won": return "bg-green-500/20 text-green-700";
      case "lost": return "bg-red-500/20 text-red-700";
      case "canceled": return "bg-gray-500/20 text-gray-700";
      case "completed": return "bg-purple-500/20 text-purple-700";
      default: return "bg-gray-500/20 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open": return "Aberto";
      case "won": return "Ganho";
      case "lost": return "Perdido";
      case "canceled": return "Cancelado";
      case "completed": return "Concluído";
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return <Clock className="h-4 w-4" />;
      case "won": return <CheckCircle2 className="h-4 w-4" />;
      case "lost": return <XCircle className="h-4 w-4" />;
      case "canceled": return <AlertTriangle className="h-4 w-4" />;
      case "completed": return <CheckCircle2 className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  // Mock assets for demo
  const assets: Asset[] = [
    {
      id: "asset-1",
      dealId: deal.id,
      title: "Contrato de Serviço",
      description: "Contrato padrão para prestação de serviços",
      type: "contract",
      amount: 1500,
      status: "completed",
      createdAt: new Date(),
      updatedAt: new Date(),
      workEnvironment: {
        workflowTitle: "Comercial",
        departmentTitle: "Vendas",
        stageTitle: "Negociação"
      }
    },
    {
      id: "asset-2",
      dealId: deal.id,
      title: "Proposta Comercial",
      description: "Proposta detalhada com valores e condições",
      type: "proposal",
      status: "open",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">{deal.title}</DialogTitle>
              <DialogDescription>{deal.description}</DialogDescription>
            </div>
            <Badge variant="outline" className={`ml-2 ${getStatusColor(deal.status)}`}>
              <div className="flex items-center gap-1">
                {getStatusIcon(deal.status)}
                {getStatusText(deal.status)}
              </div>
            </Badge>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="assets">Ativos</TabsTrigger>
            <TabsTrigger value="activity">Atividades</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-1">
            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Informações do Deal</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <dl className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">ID:</dt>
                        <dd className="font-medium">{deal.id.substring(0, 8)}</dd>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Tipo:</dt>
                        <dd className="font-medium">{deal.type || "Não especificado"}</dd>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Valor:</dt>
                        <dd className="font-medium">{deal.amount ? formatCurrency(deal.amount) : "Não especificado"}</dd>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Data de Início:</dt>
                        <dd className="font-medium">{deal.startDate ? format(new Date(deal.startDate), 'dd/MM/yyyy') : "Não especificado"}</dd>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Data de Término:</dt>
                        <dd className="font-medium">{deal.endDate ? format(new Date(deal.endDate), 'dd/MM/yyyy') : "Não especificado"}</dd>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Criado em:</dt>
                        <dd className="font-medium">{format(new Date(deal.createdAt), 'dd/MM/yyyy')}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Cliente</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    {(deal.customerName || deal.customerOrganization) ? (
                      <dl className="space-y-2 text-sm">
                        {deal.customerName && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <dt className="text-muted-foreground">Nome:</dt>
                            <dd className="font-medium">{deal.customerName}</dd>
                          </div>
                        )}
                        
                        {deal.customerOrganization && (
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <dt className="text-muted-foreground">Organização:</dt>
                            <dd className="font-medium">{deal.customerOrganization}</dd>
                          </div>
                        )}
                      </dl>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground text-sm">Nenhum cliente associado</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => onAction("addCustomer", deal)}
                        >
                          <User className="h-4 w-4 mr-1" />
                          Adicionar Cliente
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="assets" className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Ativos do Deal</h3>
                <Button 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => onAction("createAsset", { dealId: deal.id })}
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Ativo
                </Button>
              </div>
              
              {assets.length > 0 ? (
                <div className="space-y-3">
                  {assets.map(asset => (
                    <Card 
                      key={asset.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => onAction("viewAsset", asset)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{asset.title}</h4>
                            {asset.description && (
                              <p className="text-sm text-muted-foreground">{asset.description}</p>
                            )}
                          </div>
                          <Badge variant="outline" className={getStatusColor(asset.status)}>
                            {getStatusText(asset.status)}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            <span>{asset.type || "Sem tipo"}</span>
                          </div>
                          
                          {asset.amount && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <CreditCard className="h-4 w-4" />
                              <span>{formatCurrency(asset.amount)}</span>
                            </div>
                          )}
                          
                          {asset.startDate && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{format(new Date(asset.startDate), 'dd/MM/yyyy')}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-muted/30 rounded-lg">
                  <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium">Nenhum ativo associado</h3>
                  <p className="text-muted-foreground mb-4">Adicione ativos a este deal para começar</p>
                  <Button onClick={() => onAction("createAsset", { dealId: deal.id })}>
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar Ativo
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Histórico de Atividades</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex flex-col space-y-2 py-4">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Sistema adicionou um comentário</p>
                        <p className="text-xs text-muted-foreground">Cliente solicitou mais informações sobre o projeto</p>
                        <p className="text-xs text-muted-foreground mt-1">Hoje às {format(new Date(), 'HH:mm')}</p>
                      </div>
                    </div>
                    
                    <Separator className="my-1" />
                    
                    <div className="flex items-start gap-2">
                      <User className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Sistema adicionou um cliente</p>
                        <p className="text-xs text-muted-foreground">Cliente: {deal.customerName || "Nome do cliente"}</p>
                        <p className="text-xs text-muted-foreground mt-1">Ontem às 15:30</p>
                      </div>
                    </div>
                    
                    <Separator className="my-1" />
                    
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Sistema adicionou um ativo</p>
                        <p className="text-xs text-muted-foreground">Ativo: Proposta Comercial</p>
                        <p className="text-xs text-muted-foreground mt-1">10/06/2023 às 09:15</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DealDetailModal;
