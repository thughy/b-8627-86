
import React from "react";
import { Deal } from "@/pages/Workflows/models/WorkflowModels";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clipboard, CreditCard, Calendar, User, Building2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

interface DealCardProps {
  deal: Deal;
  onAction: (action: string, data?: any) => void;
}

const DealCard = ({ deal, onAction }: DealCardProps) => {
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

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow border-l-4"
      style={{ borderLeftColor: deal.status === 'open' ? '#3b82f6' : 
                              deal.status === 'won' ? '#10b981' : 
                              deal.status === 'lost' ? '#ef4444' : 
                              deal.status === 'completed' ? '#8b5cf6' : '#6b7280' }}
      onClick={() => onAction("viewDeal", deal)}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sm line-clamp-2 flex items-center gap-1">
            <Clipboard className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
            {deal.title}
          </h4>
          <Badge variant="outline" className={`text-xs ${getStatusColor(deal.status)}`}>
            {getStatusText(deal.status)}
          </Badge>
        </div>
        
        {deal.description && (
          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
            {deal.description}
          </p>
        )}
        
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-3 text-xs">
          {deal.amount && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <CreditCard className="h-3 w-3" />
              <span className="font-medium text-foreground">
                {formatCurrency(deal.amount)}
              </span>
            </div>
          )}
          
          {deal.startDate && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{format(new Date(deal.startDate), 'dd/MM/yyyy')}</span>
            </div>
          )}
          
          {deal.customerName && (
            <div className="flex items-center gap-1 text-muted-foreground col-span-2 truncate">
              <User className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{deal.customerName}</span>
            </div>
          )}
          
          {deal.customerOrganization && (
            <div className="flex items-center gap-1 text-muted-foreground col-span-2 truncate">
              <Building2 className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{deal.customerOrganization}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DealCard;
