
import { useState, useEffect } from 'react';
import { Customer } from '@/pages/Workflows/models/CustomerModel';
import { filterCustomers } from '@/pages/Customers/services/customerService';

export function useCustomerSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (searchTerm.length > 0) {
        setIsLoading(true);
        try {
          // Usar o serviço existente para filtrar clientes
          const { customers: filteredCustomers } = filterCustomers({ 
            search: searchTerm,
            type: 'all',
            status: 'all'
          }, 1, 10);
          
          setCustomers(filteredCustomers);
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

    // Usar um pequeno delay para evitar muitas chamadas durante digitação
    const delayDebounceFn = setTimeout(() => {
      fetchCustomers();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Função para limpar a busca
  const clearSearch = () => {
    setSearchTerm('');
    setCustomers([]);
  };

  return {
    searchTerm,
    setSearchTerm,
    customers,
    isLoading,
    clearSearch
  };
}
