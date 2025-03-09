
import React from "react";
import { Deal } from "@/pages/Workflows/models/WorkflowModels";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface DealCardProps {
  deal: Deal;
  onAction: (action: string, data?: any) => void;
}

const DealCard = ({ deal, onAction }: DealCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-blue-500";
      case "won": return "bg-green-500";
      case "lost": return "bg-red-500";
      case "canceled": return "bg-gray-500";
      case "completed": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow" 
      onClick={() => onAction("viewDeal", deal)}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sm line-clamp-2">{deal.title}</h4>
          <div className={`w-2 h-2 mt-1 rounded-full ${getStatusColor(deal.status)}`}></div>
        </div>
        
        {deal.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {deal.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-3">
          {deal.customerOrganization && (
            <span className="text-xs bg-muted/50 px-2 py-0.5 rounded">
              {deal.customerOrganization}
            </span>
          )}
          
          {deal.amount && (
            <span className="text-xs font-medium">
              {formatCurrency(deal.amount)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DealCard;
