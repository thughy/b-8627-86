
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Customer } from "@/pages/Workflows/models/CustomerModel";
import { useCustomerForm } from "../../hooks/useCustomerForm";
import CustomerModalHeader from "./CustomerModalHeader";
import CustomerTypeTabs from "./CustomerTypeTabs";
import CustomerModalFooter from "./CustomerModalFooter";

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
  const {
    activeTab,
    organizations,
    personMethods,
    organizationMethods,
    handleTypeChange,
    handleSubmit
  } = useCustomerForm(customer, onSave, onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <CustomerModalHeader customer={customer} />

        <CustomerTypeTabs 
          activeTab={activeTab}
          onTabChange={handleTypeChange}
          personMethods={personMethods}
          organizationMethods={organizationMethods}
          organizations={organizations}
        />

        <CustomerModalFooter 
          customer={customer}
          onClose={onClose}
          onDelete={onDelete}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CustomerConfigModal;
