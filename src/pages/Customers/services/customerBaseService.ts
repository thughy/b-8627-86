
import { Customer, Person, Organization } from "@/pages/Workflows/models/CustomerModel";
import { mockCustomers } from "./mockCustomerData";

// Core customer operations shared by all services
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
  
  mockCustomers.push(newCustomer as (Person | Organization));
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
  
  mockCustomers[customerIndex] = updatedCustomer as (Person | Organization);
  return updatedCustomer;
};

export const deleteCustomer = (id: string): boolean => {
  const customerIndex = mockCustomers.findIndex(c => c.id === id);
  
  if (customerIndex === -1) return false;
  
  mockCustomers.splice(customerIndex, 1);
  return true;
};
