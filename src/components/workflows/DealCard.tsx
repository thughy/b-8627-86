
import React from "react";
import { Deal } from "@/pages/Workflows/models/WorkflowModels";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { User, DollarSign, Calendar, Tag, MessageSquare, Award, Building, FileText, CheckSquare, Mail, File, HeartPulse, Flag } from "lucide-react";
import { formatCurrency, formatDate, getStatusBadgeVariant, getStatusText, getDealTypeBadge, getDealTypeGradient, getTopBarColor } from "./utils/dealUtils";

interface DealCardProps {
  deal: Deal;
  onDealClick: (deal: Deal) => void;
  chatPreview?: any[];
}

const DealCard: React.FC<DealCardProps> = ({
  deal,
  onDealClick,
  chatPreview = []
}) => {
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
        {/* Top row: Title and Type */}
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-sm truncate pr-2">{deal.title}</h4>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className={cn("text-xs font-semibold flex items-center px-2 py-0.5", typeBadge.color)}>
              {deal.type === 'new' ? <Tag className="h-3 w-3 mr-1" /> : <Award className="h-3 w-3 mr-1" />}
              {deal.type || "N/D"}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          {/* Row: Customer and Interest */}
          <div className="flex items-start justify-between gap-2">
            {/* Customer info */}
            <div className="flex items-start text-xs space-x-1.5 flex-1">
              <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 mt-0.5">
                <User className="h-3 w-3 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block truncate">
                  {deal.customerName || "Não definido"}
                </span>
                {deal.customerOrganization && (
                  <span className="text-muted-foreground text-xs flex items-center">
                    <Building className="h-3 w-3 inline mr-0.5" />
                    <span className="truncate">{deal.customerOrganization}</span>
                  </span>
                )}
              </div>
            </div>
            
            {/* Interest - Moved to right side */}
            {deal.interests && (
              <div className="flex items-start text-xs space-x-1.5 flex-shrink-0">
                <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-pink-500/10 mt-0.5">
                  <HeartPulse className="h-3 w-3 text-pink-500" />
                </div>
                <span className="truncate max-w-[80px]">{deal.interests}</span>
              </div>
            )}
          </div>
          
          {/* Row: Start Date and End Date */}
          <div className="flex items-start justify-between gap-2">
            {/* Start Date */}
            <div className="flex items-start text-xs space-x-1.5 flex-1">
              <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/10 mt-0.5">
                <Calendar className="h-3 w-3 text-indigo-500" />
              </div>
              <span className="truncate">{formatDate(deal.startDate)}</span>
            </div>
            
            {/* End Date - Moved to right side */}
            <div className="flex items-start text-xs space-x-1.5 flex-shrink-0">
              <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-orange-500/10 mt-0.5">
                <Flag className="h-3 w-3 text-orange-500" />
              </div>
              <span className="truncate">{deal.endDate ? formatDate(deal.endDate) : "N/D"}</span>
            </div>
          </div>
          
          {/* Row: Amount and Status */}
          <div className="flex items-center justify-between gap-2">
            {/* Amount */}
            <div className="flex items-center text-xs space-x-1.5 flex-1">
              <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10">
                <DollarSign className="h-3 w-3 text-emerald-500" />
              </div>
              <span>{formatCurrency(deal.amount)}</span>
            </div>
            
            {/* Status */}
            <div className="flex items-center text-xs gap-1">
              <Badge variant={getStatusBadgeVariant(deal.status)}>
                {getStatusText(deal.status)}
              </Badge>
            </div>
          </div>
          
          {/* Content counters */}
          <div className="flex items-center justify-start gap-2 text-xs pt-1 text-muted-foreground">
            <div className="flex items-center gap-0.5">
              <MessageSquare className="h-3 w-3" />
              <span>3</span>
            </div>
            <div className="flex items-center gap-0.5">
              <File className="h-3 w-3" />
              <span>2</span>
            </div>
            <div className="flex items-center gap-0.5">
              <CheckSquare className="h-3 w-3" />
              <span>4</span>
            </div>
            <div className="flex items-center gap-0.5">
              <FileText className="h-3 w-3" />
              <span>1</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Mail className="h-3 w-3" />
              <span>2</span>
            </div>
          </div>
        </div>
        
        {/* Chat preview */}
        {chatPreview && chatPreview.length > 0 && (
          <div className="mt-2 pt-2 border-t border-border/40">
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
};

export default DealCard;
