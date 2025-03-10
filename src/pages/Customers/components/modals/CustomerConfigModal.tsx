
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Customer, Person, Organization } from "@/pages/Workflows/models/CustomerModel";
import CustomerPersonForm from "./CustomerPersonForm";
import CustomerOrganizationForm from "./CustomerOrganizationForm";
import { getOrganizations } from "@/pages/Customers/services/organizationService";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  customerSchema, 
  personSchema, 
  organizationSchema,
  PersonFormValues,
  OrganizationFormValues
} from "../../validations/customerSchema";

interface CustomerConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
  customer: Customer | null;
}

const CustomerConfigModal: React.FC<CustomerConfigModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  customer
}) => {
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
  }, [customer, isOpen]);

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

  const handleDelete = () => {
    if (customer?.id) {
      onDelete(customer.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {customer ? "Editar Cliente" : "Novo Cliente"}
          </DialogTitle>
          <DialogDescription>
            {customer
              ? "Atualize as informações do cliente no sistema."
              : "Preencha os dados para cadastrar um novo cliente."}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTypeChange} className="mt-5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="person" className="flex items-center gap-2">
              <span>Pessoa Física</span>
            </TabsTrigger>
            <TabsTrigger value="organization" className="flex items-center gap-2">
              <span>Pessoa Jurídica</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="person" className="space-y-4 mt-4">
            <FormProvider {...personMethods}>
              <CustomerPersonForm organizations={organizations} />
            </FormProvider>
          </TabsContent>

          <TabsContent value="organization" className="space-y-4 mt-4">
            <FormProvider {...organizationMethods}>
              <CustomerOrganizationForm />
            </FormProvider>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          {customer && (
            <Button 
              variant="destructive" 
              onClick={handleDelete}
            >
              Excluir
            </Button>
          )}
          <Button onClick={handleSubmit}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerConfigModal;
