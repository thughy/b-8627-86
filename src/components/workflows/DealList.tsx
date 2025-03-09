
import React from "react";
import { Deal } from "@/pages/Workflows/models/WorkflowModels";
import DealCard from "./DealCard";

interface DealListProps {
  deals: Deal[];
  onDealClick: (deal: Deal) => void;
  getChatPreview?: (dealId: string) => any[];
}

const DealList: React.FC<DealListProps> = ({ 
  deals, 
  onDealClick,
  getChatPreview
}) => {
  return (
    <div className="space-y-3">
      {deals.length > 0 ? (
        deals.map((deal) => (
          <DealCard 
            key={deal.id}
            deal={deal}
            onDealClick={onDealClick}
            chatPreview={getChatPreview ? getChatPreview(deal.id) : []}
          />
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-muted-foreground">Sem deals</p>
        </div>
      )}
    </div>
  );
};

export default DealList;
