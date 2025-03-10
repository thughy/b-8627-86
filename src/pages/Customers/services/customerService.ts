
// This file serves as a facade to all customer services
// Import and re-export functionality from specialized services

import { Customer } from "@/pages/Workflows/models/CustomerModel";
import { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from "./customerBaseService";
import { filterCustomers } from "./customerFilterService";
import { getPersons, getPersonById, createPerson, updatePerson, getPersonsByOrganization } from "./personService";
import { getOrganizations, getOrganizationById, createOrganization, updateOrganization, getOrganizationWithEmployees } from "./organizationService";

// Re-export all the functions for backward compatibility
export {
  // Base customer operations
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  
  // Filter operations
  filterCustomers,
  
  // Person-specific operations
  getPersons,
  getPersonById,
  createPerson,
  updatePerson,
  getPersonsByOrganization,
  
  // Organization-specific operations
  getOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  getOrganizationWithEmployees
};
