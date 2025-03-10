
import { useState, useEffect } from 'react';
import { Customer } from '@/pages/Workflows/models/CustomerModel';
import { filterCustomers } from '@/pages/Customers/services/customerFilterService';

export function useCustomerSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (searchTerm.length >= 2) {
        setIsLoading(true);
        try {
          const result = filterCustomers({ 
            search: searchTerm,
            type: 'all',
            status: 'all'
          }, 1, 30);
          
          setCustomers(result.customers);
          setIsOpen(true);
        } catch (error) {
          console.error('Erro ao buscar clientes:', error);
          setCustomers([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCustomers([]);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchCustomers();
    }, 200); // Reduced debounce for faster response

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

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

  return {
    searchTerm,
    setSearchTerm,
    customers,
    isLoading,
    clearSearch,
    isOpen,
    setIsOpen,
    selectedCustomer,
    selectCustomer
  };
}
