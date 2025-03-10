
import { Person } from "@/pages/Workflows/models/CustomerModel";
import { createCustomer, updateCustomer, getCustomerById } from "./customerBaseService";
import { mockCustomers } from "./mockCustomerData";

export const getPersons = () => {
  return mockCustomers.filter(customer => customer.type === "person") as Person[];
};

export const getPersonById = (id: string): Person | undefined => {
  const customer = getCustomerById(id);
  if (customer && customer.type === "person") {
    return customer as Person;
  }
  return undefined;
};

export const createPerson = (person: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>): Person => {
  return createCustomer({
    ...person,
    type: "person"
  }) as Person;
};

export const updatePerson = (id: string, personData: Partial<Person>): Person | undefined => {
  return updateCustomer(id, personData) as Person | undefined;
};

export const getPersonsByOrganization = (organizationId: string): Person[] => {
  return mockCustomers.filter(
    customer => customer.type === "person" && (customer as Person).organizationId === organizationId
  ) as Person[];
};
