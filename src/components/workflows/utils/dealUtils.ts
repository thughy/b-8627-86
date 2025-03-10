
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Deal } from "@/pages/Workflows/models/WorkflowModels";

export const formatCurrency = (amount?: number) => {
  if (!amount) return "Não definido";
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
};

export const formatDate = (date?: Date) => {
  if (!date) return "Não definido";
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
};

// Function to get status badge variant based on deal status
export const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'won': return "default";
    case 'lost': return "destructive";
    default: return "outline";
  }
};

// Function to get status badge text
export const getStatusText = (status: string) => {
  switch (status) {
    case 'won': return 'Ganho';
    case 'lost': return 'Perdido';
    default: return 'Em andamento';
  }
};

// Function to get deal type badge styles
export const getDealTypeBadge = (type: string) => {
  const types: Record<string, { color: string, icon: React.ReactNode }> = {
    'new': { 
      color: "bg-blue-500/15 text-blue-500 border-blue-500/20", 
      icon: null  // Icon will be set in the component
    },
    'renewal': { 
      color: "bg-purple-500/15 text-purple-500 border-purple-500/20", 
      icon: null
    },
    'upsell': { 
      color: "bg-green-500/15 text-green-500 border-green-500/20", 
      icon: null
    },
    'cross-sell': { 
      color: "bg-amber-500/15 text-amber-500 border-amber-500/20", 
      icon: null
    },
    'default': { 
      color: "bg-slate-500/15 text-slate-500 border-slate-500/20", 
      icon: null
    }
  };
  
  return types[type] || types.default;
};

// Function to get a gradient background based on deal type
export const getDealTypeGradient = (type: string) => {
  const gradients = {
    'new': 'bg-gradient-to-r from-blue-500/10 to-cyan-400/10 border-blue-500/20',
    'renewal': 'bg-gradient-to-r from-purple-500/10 to-pink-400/10 border-purple-500/20',
    'upsell': 'bg-gradient-to-r from-green-500/10 to-emerald-400/10 border-green-500/20',
    'cross-sell': 'bg-gradient-to-r from-amber-500/10 to-yellow-400/10 border-amber-500/20',
    'default': 'bg-gradient-to-r from-slate-500/10 to-gray-400/10 border-slate-500/20'
  };
  
  return gradients[type] || gradients.default;
};

// Function to get the top bar color based on deal type
export const getTopBarColor = (type: string) => {
  const colors = {
    'new': 'bg-gradient-to-r from-blue-500 to-cyan-400',
    'renewal': 'bg-gradient-to-r from-purple-500 to-pink-400',
    'upsell': 'bg-gradient-to-r from-green-500 to-emerald-400',
    'cross-sell': 'bg-gradient-to-r from-amber-500 to-yellow-400',
    'default': 'bg-gradient-to-r from-slate-500 to-gray-400'
  };
  
  return colors[type] || colors.default;
};

// Helper function to get deals by stage
export const getDealsByStage = (deals: Deal[], stageId: string) => {
  return deals.filter(deal => deal.stageId === stageId);
};

// New functions for status and interest background colors

// Function to get status background color
export const getStatusBackgroundColor = (status: string) => {
  switch (status) {
    case 'won': 
      return 'bg-green-500/10 text-green-500';
    case 'lost': 
      return 'bg-red-500/10 text-red-500';
    case 'open': 
      return 'bg-blue-500/10 text-blue-500';
    case 'completed': 
      return 'bg-purple-500/10 text-purple-500';
    default: 
      return 'bg-slate-500/10 text-slate-500';
  }
};

// Function to get interest background color
export const getInterestBackgroundColor = (interest?: string) => {
  if (!interest) return 'bg-slate-500/10 text-slate-500';
  
  // Map interests to different background colors
  if (interest.includes('undecided')) return 'bg-slate-500/10 text-slate-500';
  if (interest.includes('interested')) return 'bg-blue-500/10 text-blue-500';
  if (interest.includes('negotiate')) return 'bg-amber-500/10 text-amber-500';
  if (interest.includes('buy')) return 'bg-green-500/10 text-green-500';
  
  // Default color for other interests
  return 'bg-pink-500/10 text-pink-500';
};
