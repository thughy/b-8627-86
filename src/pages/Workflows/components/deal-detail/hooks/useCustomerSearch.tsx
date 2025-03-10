
import { useState, useEffect } from 'react';
import { Customer } from '@/pages/Workflows/models/CustomerModel';
import { filterCustomers } from '@/pages/Customers/services/customerService';

export function useCustomerSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (searchTerm.length > 0) {
        setIsLoading(true);
        try {
          console.log('Buscando clientes com termo:', searchTerm);
          // Usar o serviço existente para filtrar clientes
          const result = filterCustomers({ 
            search: searchTerm,
            type: 'all',
            status: 'all'
          }, 1, 10);
          
          console.log('Clientes encontrados:', result.customers);
          setCustomers(result.customers);
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
    setSelectedCustomer(null);
  };

  // Função para selecionar um cliente
  const selectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSearchTerm(''); // Limpar o termo de busca
    setCustomers([]); // Limpar os resultados
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
