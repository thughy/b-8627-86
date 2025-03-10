
import { useState, useEffect } from 'react';
import { Deal } from '@/pages/Workflows/models/WorkflowModels';
import { DealFilters } from '../components/AdvancedFiltersModal';

export const useSearch = (deals: Deal[]) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [advancedFilters, setAdvancedFilters] = useState<DealFilters>({});
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>(deals);

  useEffect(() => {
    // Filter deals based on both search term and advanced filters
    const filtered = deals.filter(deal => {
      // Basic search term filtering
      const matchesSearchTerm = searchTerm 
        ? deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (deal.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
        : true;
      
      if (!matchesSearchTerm) return false;
      
      // Apply advanced filters if they exist
      if (Object.keys(advancedFilters).length === 0) return true;
      
      // Title filter
      if (advancedFilters.title && 
          !deal.title.toLowerCase().includes(advancedFilters.title.toLowerCase())) {
        return false;
      }
      
      // Status filter
      if (advancedFilters.status?.length && 
          !advancedFilters.status.includes(deal.status)) {
        return false;
      }
      
      // Type filter
      if (advancedFilters.type?.length && 
          deal.type && !advancedFilters.type.includes(deal.type)) {
        return false;
      }
      
      // Amount range filter
      if (advancedFilters.minAmount !== undefined && 
          deal.amount !== undefined && 
          deal.amount < advancedFilters.minAmount) {
        return false;
      }
      
      if (advancedFilters.maxAmount !== undefined && 
          deal.amount !== undefined && 
          deal.amount > advancedFilters.maxAmount) {
        return false;
      }
      
      // Date range filters
      if (advancedFilters.startDateFrom && deal.startDate) {
        const filterDate = new Date(advancedFilters.startDateFrom);
        const dealDate = new Date(deal.startDate);
        if (dealDate < filterDate) return false;
      }
      
      if (advancedFilters.startDateTo && deal.startDate) {
        const filterDate = new Date(advancedFilters.startDateTo);
        const dealDate = new Date(deal.startDate);
        if (dealDate > filterDate) return false;
      }
      
      if (advancedFilters.endDateFrom && deal.endDate) {
        const filterDate = new Date(advancedFilters.endDateFrom);
        const dealDate = new Date(deal.endDate);
        if (dealDate < filterDate) return false;
      }
      
      if (advancedFilters.endDateTo && deal.endDate) {
        const filterDate = new Date(advancedFilters.endDateTo);
        const dealDate = new Date(deal.endDate);
        if (dealDate > filterDate) return false;
      }
      
      // Customer type filter
      if (advancedFilters.customerType?.length && 
          deal.customerType && 
          !advancedFilters.customerType.includes(deal.customerType)) {
        return false;
      }
      
      // Interests filter
      if (advancedFilters.interests?.length && 
          deal.interests && 
          !advancedFilters.interests.some(interest => deal.interests?.includes(interest))) {
        return false;
      }
      
      // Has description filter
      if (advancedFilters.hasDescription && !deal.description) {
        return false;
      }
      
      return true;
    });
    
    setFilteredDeals(filtered);
  }, [deals, searchTerm, advancedFilters]);

  return { 
    searchTerm, 
    setSearchTerm, 
    filteredDeals,
    advancedFilters,
    setAdvancedFilters
  };
};
