
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { 
  BarChart, 
  FileText, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

interface WorkflowStatsProps {
  deals: Deal[];
  selectedPipeline: string | null;
}

const WorkflowStats: React.FC<WorkflowStatsProps> = ({ deals, selectedPipeline }) => {
  // Filtrar deals pelo pipeline selecionado (via estágios)
  const filteredDeals = selectedPipeline 
    ? deals.filter(deal => {
        // Isso assume que temos um estágio que pertence ao pipeline selecionado
        return deal.stageId.startsWith(selectedPipeline);
      })
    : deals;
  
  // Calcular estatísticas
  const totalDeals = filteredDeals.length;
  const openDeals = filteredDeals.filter(deal => deal.status === 'open').length;
  const wonDeals = filteredDeals.filter(deal => deal.status === 'won').length;
  const lostDeals = filteredDeals.filter(deal => deal.status === 'lost').length;
  
  // Calcular valor total
  const totalValue = filteredDeals.reduce((sum, deal) => {
    return sum + (deal.amount || 0);
  }, 0);
  
  // Calcular total de assets
  const totalAssets = filteredDeals.reduce((sum, deal) => {
    return sum + (deal.assets?.length || 0);
  }, 0);
  
  // Formatação de valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total de Deals</p>
              <h3 className="text-2xl font-bold">{totalDeals}</h3>
            </div>
            <BarChart className="h-8 w-8 text-primary opacity-80" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Em Aberto</p>
              <h3 className="text-2xl font-bold">{openDeals}</h3>
            </div>
            <Clock className="h-8 w-8 text-yellow-500 opacity-80" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Ganhos</p>
              <h3 className="text-2xl font-bold">{wonDeals}</h3>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Perdidos</p>
              <h3 className="text-2xl font-bold">{lostDeals}</h3>
            </div>
            <XCircle className="h-8 w-8 text-red-500 opacity-80" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Valor Total</p>
              <h3 className="text-xl font-bold">{formatCurrency(totalValue)}</h3>
            </div>
            <DollarSign className="h-8 w-8 text-emerald-500 opacity-80" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowStats;
