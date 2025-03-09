
export interface Customer {
  id: string;
  type: 'person' | 'organization';
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Person extends Customer {
  type: 'person';
  cpfCnpj?: string;
  organizationId?: string; // Reference to organization if person belongs to one
  organizationName?: string; // Name of the organization if belongs to one
}

export interface Organization extends Customer {
  type: 'organization';
  tradingName?: string; // Nome Fantasia
  cnpj?: string;
  employees?: Person[]; // People who belong to this organization
}

export interface CustomerFilter {
  search?: string;
  type?: 'person' | 'organization' | 'all';
  status?: 'active' | 'inactive' | 'all';
}
