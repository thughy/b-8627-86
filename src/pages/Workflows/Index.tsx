
import React, { useState, useEffect } from 'react';
import {
  Workflow,
  Pipeline,
  Stage,
  Deal,
  Asset
} from '@/pages/Workflows/models/WorkflowModels';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, MoreHorizontal, Columns, List } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatDate } from '@/lib/utils';
import DealDetailModal from '@/components/workflows/DealDetailModal';
import KanbanBoard from '@/components/workflows/KanbanBoard';

// Mock data - replace with API calls later
const mockWorkflows: Workflow[] = [
  {
    id: 'workflow-1',
    title: 'Workflow de Vendas',
    description: 'Processo de vendas completo',
    status: 'active',
    departmentId: 'dept-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockPipelines: Pipeline[] = [
  {
    id: 'pipeline-1',
    departmentId: 'dept-1',
    title: 'Pipeline de Vendas Principal',
    description: 'Pipeline para gerenciar oportunidades de vendas',
    stages: [],
  },
];

const mockStages: Stage[] = [
  {
    id: 'stage-1',
    pipelineId: 'pipeline-1',
    title: 'Prospecção',
    description: 'Primeiro contato com o cliente',
    order: 1,
  },
  {
    id: 'stage-2',
    pipelineId: 'pipeline-1',
    title: 'Qualificação',
    description: 'Entendimento das necessidades do cliente',
    order: 2,
  },
  {
    id: 'stage-3',
    pipelineId: 'pipeline-1',
    title: 'Proposta',
    description: 'Apresentação da solução',
    order: 3,
  },
];

const mockDeals: Deal[] = [
  {
    id: 'deal-1',
    title: 'Venda de Software para Empresa X',
    description: 'Oportunidade de venda de licenças de software',
    stageId: 'stage-1',
    status: 'open',
    type: 'software',
    amount: 15000,
    customerName: 'Empresa X',
    customerOrganization: 'Tech Solutions Inc.',
    createdAt: new Date(),
  },
  {
    id: 'deal-2',
    title: 'Consultoria em Marketing Digital',
    description: 'Serviços de consultoria para otimizar campanhas',
    stageId: 'stage-2',
    status: 'won',
    type: 'consulting',
    amount: 8000,
    customerName: 'João Silva',
    customerOrganization: 'Marketing Pro',
    createdAt: new Date(),
  },
  {
    id: 'deal-3',
    title: 'Treinamento para Equipe de Vendas',
    description: 'Capacitação da equipe comercial',
    stageId: 'stage-3',
    status: 'open',
    type: 'training',
    amount: 12000,
    customerName: 'Maria Oliveira',
    customerOrganization: 'Global Sales Corp',
    createdAt: new Date(),
  },
];

export default function WorkflowsPage() {
  const { toast } = useToast();
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [pipelines, setPipelines] = useState<Pipeline[]>(mockPipelines);
  const [stages, setStages] = useState<Stage[]>(mockStages);
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>(workflows[0]?.id || '');
  const [selectedPipeline, setSelectedPipeline] = useState<string>(pipelines[0]?.id || '');

  const filteredDeals = deals.filter(deal =>
    deal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDealModalOpen(true);
  };

  const handleCreateAsset = (dealId: string, asset: Partial<Asset>) => {
    // Implement the logic to create a new asset and associate it with the deal
    // This could involve making an API call to your backend
    console.log(`Creating asset for deal ${dealId}:`, asset);
    toast({
      title: "Asset adicionado",
      description: `O asset foi adicionado ao negócio com sucesso.`,
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;
    
    // Update the deal's stageId
    setDeals(prevDeals => 
      prevDeals.map(deal => 
        deal.id === draggableId 
          ? { ...deal, stageId: destination.droppableId } 
          : deal
      )
    );
    
    toast({
      title: "Negócio movido",
      description: "O negócio foi movido para um novo estágio com sucesso.",
    });
  };

  const handleCreateDeal = () => {
    // Implement the logic to create a new deal
    // This would typically open a modal form
    toast({
      title: "Criar novo negócio",
      description: "Funcionalidade em desenvolvimento.",
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="text-2xl font-bold">Workflows</div>
          <Button onClick={handleCreateDeal}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Negócio
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar negócios..."
                className="pl-8"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <Select
              value={selectedWorkflow}
              onValueChange={setSelectedWorkflow}
            >
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="Selecionar Workflow" />
              </SelectTrigger>
              <SelectContent>
                {workflows.map(workflow => (
                  <SelectItem key={workflow.id} value={workflow.id}>
                    {workflow.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedPipeline}
              onValueChange={setSelectedPipeline}
            >
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="Selecionar Pipeline" />
              </SelectTrigger>
              <SelectContent>
                {pipelines.map(pipeline => (
                  <SelectItem key={pipeline.id} value={pipeline.id}>
                    {pipeline.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => setViewMode('kanban')}>
              <Columns className={`h-4 w-4 ${viewMode === 'kanban' ? 'text-primary' : ''}`} />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setViewMode('list')}>
              <List className={`h-4 w-4 ${viewMode === 'list' ? 'text-primary' : ''}`} />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {viewMode === 'kanban' ? (
          <KanbanBoard 
            stages={stages} 
            deals={filteredDeals} 
            onDragEnd={handleDragEnd} 
            onDealClick={handleDealClick}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map(deal => (
              <Card key={deal.id} className="cursor-pointer" onClick={() => handleDealClick(deal)}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="text-lg font-medium">{deal.title}</div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Duplicar</DropdownMenuItem>
                        <DropdownMenuItem>Compartilhar</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 focus:text-red-500">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <span>Excluir</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta ação não pode ser desfeita. Tem certeza de que deseja excluir este negócio?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction>Excluir</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {deal.description}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">Valor</div>
                      <div className="font-medium">{formatCurrency(deal.amount || 0)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Status</div>
                      <Badge className={
                        deal.status === 'won' ? 'bg-green-500' :
                          deal.status === 'lost' ? 'bg-red-500' : 'bg-blue-500'
                      }>
                        {deal.status === 'won' ? 'Ganho' :
                          deal.status === 'lost' ? 'Perdido' :
                            deal.status === 'completed' ? 'Concluído' : 'Aberto'}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    Criado em: {formatDate(deal.createdAt)}
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredDeals.length === 0 && (
              <div className="col-span-full text-center p-8 border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Nenhum negócio encontrado</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {selectedDeal && (
        <DealDetailModal
          isOpen={isDealModalOpen}
          onClose={() => setIsDealModalOpen(false)}
          deal={selectedDeal}
          onCreateAsset={handleCreateAsset}
        />
      )}
    </DashboardLayout>
  );
}
