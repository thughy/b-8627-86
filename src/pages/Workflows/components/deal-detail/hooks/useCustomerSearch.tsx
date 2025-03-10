
import { useState, useEffect, useCallback } from 'react';
import { Customer } from '@/pages/Workflows/models/CustomerModel';
import { filterCustomers } from '@/pages/Customers/services/customerFilterService';

export function useCustomerSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const fetchCustomers = useCallback(async (term: string) => {
    if (term.length >= 2) {
      setIsLoading(true);
      try {
        const result = filterCustomers({ 
          search: term,
          type: 'all',
          status: 'all'
        }, 1, 30);
        
        setCustomers(result.customers);
        setIsOpen(true);
      } catch (error) {
        console.error('Error searching customers:', error);
        setCustomers([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCustomers([]);
      if (term.length === 0) {
        setIsOpen(false);
      }
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCustomers(searchTerm);
    }, 300); // Increased debounce time for better UX

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchCustomers]);

  const clearSearch = () => {
    setSearchTerm('');
    setCustomers([]);
    setSelectedCustomer(null);
    setIsOpen(false);
  };

  const selectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSearchTerm('');
    setCustomers([]);
    setIsOpen(false);
  };

  const openDropdown = () => {
    if (searchTerm.length >= 2) {
      fetchCustomers(searchTerm);
    }
    setIsOpen(true);
  };

  return {
    searchTerm,
    setSearchTerm,
    customers,
    isLoading,
    clearSearch,
    isOpen,
    setIsOpen,
    selectedCustomer,
    selectCustomer,
    openDropdown
  };
}
