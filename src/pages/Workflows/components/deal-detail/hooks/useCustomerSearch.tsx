
import { useState, useEffect } from 'react';
import { Customer } from '@/pages/Workflows/models/CustomerModel';
import { filterCustomers } from '@/pages/Customers/services/customerService';

export function useCustomerSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsLoading(true);
      // Use the existing customer service to filter customers
      const { customers: filteredCustomers } = filterCustomers({ 
        search: searchTerm,
        type: 'all',
        status: 'all'
      }, 1, 10);
      
      setCustomers(filteredCustomers);
      setIsLoading(false);
    } else {
      setCustomers([]);
    }
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    customers,
    isLoading
  };
}
