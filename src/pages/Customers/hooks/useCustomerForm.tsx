
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  personSchema, 
  organizationSchema,
  PersonFormValues,
  OrganizationFormValues
} from "../validations/customerSchema";
import { Customer, Person, Organization } from "@/pages/Workflows/models/CustomerModel";
import { getOrganizations } from "../services/organizationService";

export function useCustomerForm(customer: Customer | null, onSave: (customer: Customer) => void, onClose: () => void) {
  const [activeTab, setActiveTab] = useState<"person" | "organization">(
    customer?.type || "person"
  );
  const [organizations, setOrganizations] = useState<{id: string, name: string}[]>([]);
  
  // Initialize form with either person or organization schema based on active tab
  const personMethods = useForm<PersonFormValues>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      type: "person",
      name: customer?.name || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
      status: customer?.status || "active",
      cpfCnpj: (customer as Person)?.cpfCnpj || "",
      organizationId: (customer as Person)?.organizationId || "",
      organizationName: (customer as Person)?.organizationName || "",
      address: customer?.address || ""
    }
  });

  const organizationMethods = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      type: "organization",
      name: customer?.name || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
      status: customer?.status || "active",
      tradingName: (customer as Organization)?.tradingName || "",
      cnpj: (customer as Organization)?.cnpj || "",
      address: customer?.address || ""
    }
  });

  // Get the current form methods based on active tab
  const currentMethods = activeTab === "person" ? personMethods : organizationMethods;
  
  useEffect(() => {
    // Reset form when modal opens with customer data
    if (customer) {
      if (customer.type === "person") {
        personMethods.reset({
          type: "person",
          name: customer.name,
          email: customer.email || "",
          phone: customer.phone || "",
          status: customer.status,
          cpfCnpj: (customer as Person).cpfCnpj || "",
          organizationId: (customer as Person).organizationId || "",
          organizationName: (customer as Person).organizationName || "",
          address: customer.address || ""
        });
      } else {
        organizationMethods.reset({
          type: "organization",
          name: customer.name,
          email: customer.email || "",
          phone: customer.phone || "",
          status: customer.status,
          tradingName: (customer as Organization).tradingName || "",
          cnpj: (customer as Organization).cnpj || "",
          address: customer.address || ""
        });
      }
    }
  }, [customer]);

  useEffect(() => {
    // Load organizations for the dropdown in person form
    if (activeTab === "person") {
      const orgs = getOrganizations();
      const orgList = orgs.map(org => ({ id: org.id, name: org.name }));
      setOrganizations(orgList);
    }
  }, [activeTab]);

  const handleTypeChange = (type: "person" | "organization") => {
    setActiveTab(type);
    
    // Reset forms when changing types
    if (type === "person") {
      personMethods.reset({
        type: "person",
        name: customer?.name || "",
        email: customer?.email || "",
        phone: customer?.phone || "",
        status: customer?.status || "active",
        cpfCnpj: (customer as Person)?.cpfCnpj || "",
        organizationId: (customer as Person)?.organizationId || "",
        organizationName: (customer as Person)?.organizationName || "",
        address: customer?.address || ""
      });
    } else {
      organizationMethods.reset({
        type: "organization",
        name: customer?.name || "",
        email: customer?.email || "",
        phone: customer?.phone || "",
        status: customer?.status || "active",
        tradingName: (customer as Organization)?.tradingName || "",
        cnpj: (customer as Organization)?.cnpj || "",
        address: customer?.address || ""
      });
    }
  };

  const handleSubmit = currentMethods.handleSubmit((formData) => {
    const updatedCustomer = {
      ...formData,
      id: customer?.id || crypto.randomUUID(),
      createdAt: customer?.createdAt || new Date(),
      updatedAt: new Date()
    } as Customer;
    
    onSave(updatedCustomer);
    onClose();
  });

  return {
    activeTab,
    organizations,
    personMethods,
    organizationMethods,
    currentMethods,
    handleTypeChange,
    handleSubmit
  };
}
