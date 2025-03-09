
import React from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Building2, Calendar, CreditCard, MessageSquare, CheckSquare, User, Package, Mail, FileText } from 'lucide-react';

interface DealSummaryProps {
  deal: Deal;
  counters: {
    chat: number;
    assets: number;
    tasks: number;
    notes: number;
    emails: number;
  };
}

const DealSummary: React.FC<DealSummaryProps> = ({ deal, counters }) => {
  return (
    <div className="bg-muted/40 rounded-md p-3 mb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <div className="flex gap-1 items-center text-xs text-muted-foreground mb-1">
            <User className="h-3 w-3" />
            <span>Cliente</span>
          </div>
          <div className="font-medium truncate">
            {deal.customerName || "Não especificado"}
          </div>
        </div>
        
        <div>
          <div className="flex gap-1 items-center text-xs text-muted-foreground mb-1">
            <Building2 className="h-3 w-3" />
            <span>Organização</span>
          </div>
          <div className="font-medium truncate">
            {deal.customerOrganization || "Não especificada"}
          </div>
        </div>
        
        <div>
          <div className="flex gap-1 items-center text-xs text-muted-foreground mb-1">
            <CreditCard className="h-3 w-3" />
            <span>Valor</span>
          </div>
          <div className="font-medium">
            {deal.amount !== undefined ? formatCurrency(deal.amount) : "N/A"}
          </div>
        </div>
        
        <div>
          <div className="flex gap-1 items-center text-xs text-muted-foreground mb-1">
            <Calendar className="h-3 w-3" />
            <span>Data</span>
          </div>
          <div className="font-medium">
            {deal.startDate ? formatDate(deal.startDate) : "N/A"}
          </div>
        </div>
      </div>
      
      {/* Counters */}
      <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t">
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="gap-1 py-0">
            <MessageSquare className="h-3 w-3" />
            <span>{counters.chat}</span>
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="gap-1 py-0">
            <Package className="h-3 w-3" />
            <span>{counters.assets}</span>
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="gap-1 py-0">
            <CheckSquare className="h-3 w-3" />
            <span>{counters.tasks}</span>
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="gap-1 py-0">
            <FileText className="h-3 w-3" />
            <span>{counters.notes}</span>
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="gap-1 py-0">
            <Mail className="h-3 w-3" />
            <span>{counters.emails}</span>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default DealSummary;
