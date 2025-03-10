
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
  const [formData, setFormData] = useState<Partial<Person | Organization>>(
    customer || {
      name: "",
      type: "person",
      email: "",
      phone: "",
      status: "active"
    }
  );
  const [organizations, setOrganizations] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
    // Load organizations for the dropdown in person form
    if (activeTab === "person") {
      const orgs = getOrganizations();
      const orgList = orgs.map(org => ({ id: org.id, name: org.name }));
      setOrganizations(orgList);
    }
  }, [activeTab]);

  const handleChange = (field: keyof (Person | Organization), value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTypeChange = (type: "person" | "organization") => {
    setActiveTab(type);
    // Reset the form when changing types
    setFormData({
      ...customer,
      type,
      name: customer?.name || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
      status: customer?.status || "active"
    });
  };

  const handleSubmit = () => {
    const updatedCustomer = {
      ...formData,
      type: activeTab,
    } as Customer;
    
    onSave(updatedCustomer);
    onClose();
  };

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
            <CustomerPersonForm 
              formData={formData as Partial<Person>} 
              onChange={handleChange}
              organizations={organizations}
            />
          </TabsContent>

          <TabsContent value="organization" className="space-y-4 mt-4">
            <CustomerOrganizationForm 
              formData={formData as Partial<Organization>} 
              onChange={handleChange}
            />
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
