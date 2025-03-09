
import { Customer } from "@/pages/Workflows/models/CustomerModel";

// Dados de exemplo para desenvolvimento
const mockCustomers: Customer[] = [
  {
    id: "c1",
    name: "João Silva",
    type: "person",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    cpfCnpj: "123.456.789-01",
    status: "active",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-20")
  },
  {
    id: "c2",
    name: "Empresa ABC Ltda",
    type: "organization",
    email: "contato@empresaabc.com",
    phone: "(11) 3456-7890",
    organization: "Empresa ABC",
    cpfCnpj: "12.345.678/0001-90",
    address: "Av. Paulista, 1000, São Paulo - SP",
    status: "active",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-05-15")
  },
  {
    id: "c3",
    name: "Maria Oliveira",
    type: "person",
    email: "maria.oliveira@email.com",
    phone: "(21) 99876-5432",
    cpfCnpj: "987.654.321-09",
    status: "inactive",
    createdAt: new Date("2023-03-22"),
    updatedAt: new Date("2023-07-01")
  },
  {
    id: "c4",
    name: "Tech Solutions S.A.",
    type: "organization",
    email: "contato@techsolutions.com",
    phone: "(11) 2345-6789",
    organization: "Tech Solutions",
    cpfCnpj: "98.765.432/0001-10",
    address: "Rua Vergueiro, 500, São Paulo - SP",
    status: "active",
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-06-10")
  },
  {
    id: "c5",
    name: "Carlos Ferreira",
    type: "person",
    email: "carlos.ferreira@email.com",
    phone: "(31) 98765-1234",
    cpfCnpj: "456.789.123-45",
    status: "active",
    createdAt: new Date("2023-05-18"),
    updatedAt: new Date("2023-08-01")
  },
  {
    id: "c6",
    name: "Global Services Ltda",
    type: "organization",
    email: "contato@globalservices.com",
    phone: "(11) 5678-9012",
    organization: "Global Services",
    cpfCnpj: "65.432.198/0001-76",
    address: "Av. Rebouças, 3000, São Paulo - SP",
    status: "inactive",
    createdAt: new Date("2023-01-25"),
    updatedAt: new Date("2023-07-15")
  },
  {
    id: "c7",
    name: "Ana Beatriz",
    type: "person",
    email: "ana.beatriz@email.com",
    phone: "(11) 97654-3210",
    cpfCnpj: "321.654.987-12",
    status: "active",
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-08-20")
  },
  {
    id: "c8",
    name: "Mega Industries S.A.",
    type: "organization",
    email: "contato@megaindustries.com",
    phone: "(11) 4567-8901",
    organization: "Mega Industries",
    cpfCnpj: "54.321.098/0001-54",
    address: "Rua Augusta, 2000, São Paulo - SP",
    status: "active",
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-06-15")
  }
];

export const getCustomers = () => {
  return [...mockCustomers];
};

export const getCustomerById = (id: string): Customer | undefined => {
  return mockCustomers.find(customer => customer.id === id);
};

export const createCustomer = (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Customer => {
  const newCustomer: Customer = {
    ...customer,
    id: `c${mockCustomers.length + 1}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockCustomers.push(newCustomer);
  return newCustomer;
};

export const updateCustomer = (id: string, customerData: Partial<Customer>): Customer | undefined => {
  const customerIndex = mockCustomers.findIndex(c => c.id === id);
  
  if (customerIndex === -1) return undefined;
  
  const updatedCustomer: Customer = {
    ...mockCustomers[customerIndex],
    ...customerData,
    updatedAt: new Date()
  };
  
  mockCustomers[customerIndex] = updatedCustomer;
  return updatedCustomer;
};

export const deleteCustomer = (id: string): boolean => {
  const customerIndex = mockCustomers.findIndex(c => c.id === id);
  
  if (customerIndex === -1) return false;
  
  mockCustomers.splice(customerIndex, 1);
  return true;
};

export const filterCustomers = (filters: {
  search?: string;
  type?: 'person' | 'organization' | 'all';
  status?: 'active' | 'inactive' | 'all';
}, page: number = 1, limit: number = 10) => {
  let filtered = [...mockCustomers];
  
  // Aplicar filtro de pesquisa
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(customer => 
      customer.name.toLowerCase().includes(searchLower) ||
      customer.email?.toLowerCase().includes(searchLower) ||
      customer.organization?.toLowerCase().includes(searchLower) ||
      customer.cpfCnpj?.toLowerCase().includes(searchLower)
    );
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
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / limit);
  const start = (page - 1) * limit;
  const end = Math.min(start + limit, totalItems);
  const paginatedItems = filtered.slice(start, end);
  
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
