
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import CustomerHeader from "./CustomerHeader";
import CustomerSearch from "./CustomerSearch";
import CustomerList from "./CustomerList";
import CustomerConfigModal from "./modals/CustomerConfigModal";
import CustomerViewModal from "./modals/CustomerViewModal";
import { Customer } from "@/pages/Workflows/models/CustomerModel";

interface CustomersContentProps {
  customers: Customer[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  search: string;
  type: string;
  status: string;
  isModalOpen: boolean;
  isViewModalOpen: boolean;
  selectedCustomer: Customer | null;
  onAddCustomer: () => void;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (customerId: string) => void;
  onViewCustomer: (customer: Customer) => void;
  onSaveCustomer: (customer: Customer) => void;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onExportCustomers: () => void;
  onImportCustomers: () => void;
  onCloseModal: () => void;
  onCloseViewModal: () => void;
}

const CustomersContent: React.FC<CustomersContentProps> = ({
  customers,
  currentPage,
  totalPages,
  itemsPerPage,
  search,
  type,
  status,
  isModalOpen,
  isViewModalOpen,
  selectedCustomer,
  onAddCustomer,
  onEditCustomer,
  onDeleteCustomer,
  onViewCustomer,
  onSaveCustomer,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onPageChange,
  onExportCustomers,
  onImportCustomers,
  onCloseModal,
  onCloseViewModal
}) => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CustomerHeader onAddCustomer={onAddCustomer} />
            
            <div className="flex gap-2 self-end">
              <Button variant="outline" size="sm" onClick={onExportCustomers}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm" onClick={onImportCustomers}>
                <Upload className="h-4 w-4 mr-2" />
                Importar
              </Button>
            </div>
          </div>
          
          <CustomerSearch 
            search={search}
            type={type}
            status={status}
            onSearchChange={onSearchChange}
            onTypeChange={onTypeChange}
            onStatusChange={onStatusChange}
          />
          
          <CustomerList
            customers={customers}
            onEditCustomer={onEditCustomer}
            onDeleteCustomer={onDeleteCustomer}
            onViewCustomer={onViewCustomer}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
          />
        </CardContent>
      </Card>

      {isModalOpen && (
        <CustomerConfigModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          onSave={onSaveCustomer}
          onDelete={onDeleteCustomer}
          customer={selectedCustomer}
        />
      )}

      {isViewModalOpen && selectedCustomer && (
        <CustomerViewModal 
          isOpen={isViewModalOpen}
          onClose={onCloseViewModal}
          onEdit={onEditCustomer}
          customer={selectedCustomer}
        />
      )}
    </div>
  );
};

export default CustomersContent;
