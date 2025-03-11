
import React, { useState } from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDate } from '@/components/workflows/utils/dealUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DealListViewProps {
  deals: Deal[];
  onDealClick: (deal: Deal) => void;
}

const DealListView: React.FC<DealListViewProps> = ({ deals, onDealClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filtrar deals com base no termo de busca e filtro de status
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = 
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (deal.customerName && deal.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (deal.description && deal.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || deal.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Ordenar deals
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    // Função de comparação baseada na coluna
    let comparison = 0;
    
    switch (sortColumn) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'customer':
        comparison = (a.customerName || '').localeCompare(b.customerName || '');
        break;
      case 'amount':
        comparison = (a.amount || 0) - (b.amount || 0);
        break;
      case 'startDate':
        comparison = new Date(a.startDate || 0).getTime() - new Date(b.startDate || 0).getTime();
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'createdAt':
      default:
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    
    // Aplicar direção
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Função para alternar ordenação
  const toggleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Renderizar ícone de ordenação
  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-1 h-4 w-4" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  // Formatação de status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200">Em aberto</Badge>;
      case 'won':
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">Ganho</Badge>;
      case 'lost':
        return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200">Perdido</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-200">Concluído</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Formatação de valores
  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-2 pb-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar deals..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-auto">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="open">Em aberto</SelectItem>
              <SelectItem value="won">Ganhos</SelectItem>
              <SelectItem value="lost">Perdidos</SelectItem>
              <SelectItem value="completed">Concluídos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="rounded-md border h-[calc(100vh-300px)]">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => toggleSort('title')}
              >
                <div className="flex items-center">
                  Título
                  {renderSortIcon('title')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => toggleSort('customer')}
              >
                <div className="flex items-center">
                  Cliente
                  {renderSortIcon('customer')}
                </div>
              </TableHead>
              <TableHead 
                className="text-right cursor-pointer"
                onClick={() => toggleSort('amount')}
              >
                <div className="flex items-center justify-end">
                  Valor
                  {renderSortIcon('amount')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => toggleSort('startDate')}
              >
                <div className="flex items-center">
                  Data
                  {renderSortIcon('startDate')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => toggleSort('status')}
              >
                <div className="flex items-center">
                  Status
                  {renderSortIcon('status')}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDeals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32">
                  Nenhum deal encontrado
                </TableCell>
              </TableRow>
            ) : (
              sortedDeals.map((deal) => (
                <TableRow 
                  key={deal.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onDealClick(deal)}
                >
                  <TableCell className="font-medium">{deal.title}</TableCell>
                  <TableCell>{deal.customerName || '-'}</TableCell>
                  <TableCell className="text-right">{formatCurrency(deal.amount)}</TableCell>
                  <TableCell>{formatDate(deal.startDate)}</TableCell>
                  <TableCell>{getStatusBadge(deal.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default DealListView;
