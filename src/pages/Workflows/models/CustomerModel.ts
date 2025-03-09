
export interface Customer {
  id: string;
  name: string;
  type: 'person' | 'organization';
  email?: string;
  phone?: string;
  organization?: string;
  cpfCnpj?: string;
  address?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerFilter {
  search?: string;
  type?: 'person' | 'organization' | 'all';
  status?: 'active' | 'inactive' | 'all';
}
