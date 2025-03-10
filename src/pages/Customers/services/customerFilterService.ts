
import { Customer, CustomerFilter } from "@/pages/Workflows/models/CustomerModel";
import { mockCustomers } from "./mockCustomerData";

export const filterCustomers = (filters: {
  search?: string;
  type?: 'person' | 'organization' | 'all';
  status?: 'active' | 'inactive' | 'all';
}, page: number = 1, limit: number = 10) => {
  let filtered = [...mockCustomers];
  
  // Aplicar filtro de pesquisa
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(customer => {
      return filterBySearchTerm(customer, searchLower);
    });
  }
  
  // Aplicar filtro de tipo
  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(customer => customer.type === filters.type);
  }
  
  // Aplicar filtro de status
  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(customer => customer.status === filters.status);
  }
  
  // Calcular paginação
  return paginateResults(filtered, page, limit);
};

const filterBySearchTerm = (customer: Customer, searchTerm: string): boolean => {
  if (customer.name.toLowerCase().includes(searchTerm) || 
      customer.email?.toLowerCase().includes(searchTerm)) {
    return true;
  }
  
  if (customer.type === 'person') {
    const person = customer as any;
    return person.cpfCnpj?.toLowerCase().includes(searchTerm) ||
          person.organizationName?.toLowerCase().includes(searchTerm);
  } else {
    const org = customer as any;
    return org.tradingName?.toLowerCase().includes(searchTerm) ||
          org.cnpj?.toLowerCase().includes(searchTerm);
  }
};

const paginateResults = (data: Customer[], page: number, limit: number) => {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / limit);
  const start = (page - 1) * limit;
  const end = Math.min(start + limit, totalItems);
  const paginatedItems = data.slice(start, end);
  
  return {
    customers: paginatedItems,
    pagination: {
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit
    }
  };
};
