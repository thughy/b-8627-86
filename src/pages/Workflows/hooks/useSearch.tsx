
import { useState, useEffect } from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';

export const useSearch = (deals: Deal[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>(deals);

  useEffect(() => {
    const filtered = deals.filter(deal =>
      deal.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDeals(filtered);
  }, [searchTerm, deals]);

  return {
    searchTerm,
    setSearchTerm,
    filteredDeals
  };
};
