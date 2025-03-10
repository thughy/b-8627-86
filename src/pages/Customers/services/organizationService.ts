
import { Organization } from "@/pages/Workflows/models/CustomerModel";
import { createCustomer, updateCustomer, getCustomerById } from "./customerBaseService";
import { mockCustomers } from "./mockCustomerData";
import { getPersonsByOrganization } from "./personService";

export const getOrganizations = () => {
  return mockCustomers.filter(customer => customer.type === "organization") as Organization[];
};

export const getOrganizationById = (id: string): Organization | undefined => {
  const customer = getCustomerById(id);
  if (customer && customer.type === "organization") {
    return customer as Organization;
  }
  return undefined;
};

export const createOrganization = (organization: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>): Organization => {
  return createCustomer({
    ...organization,
    type: "organization"
  }) as Organization;
};

export const updateOrganization = (id: string, organizationData: Partial<Organization>): Organization | undefined => {
  return updateCustomer(id, organizationData) as Organization | undefined;
};

export const getOrganizationWithEmployees = (organizationId: string): Organization | undefined => {
  const organization = getOrganizationById(organizationId);
  if (organization) {
    const employees = getPersonsByOrganization(organizationId);
    return {
      ...organization,
      employees
    };
  }
  return undefined;
};
