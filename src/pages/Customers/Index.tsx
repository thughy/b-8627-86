
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Customer, CustomerFilter } from "@/pages/Workflows/models/CustomerModel";
import { filterCustomers } from "./services/customerService";
import CustomerHeader from "./components/CustomerHeader";
import CustomerSearch from "./components/CustomerSearch";
import CustomerList from "./components/CustomerList";
import CustomerConfigModal from "./components/modals/CustomerConfigModal";

const CustomersPage = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filters, setFilters] = useState<CustomerFilter>({
    search: "",
    type: "all",
    status: "all"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    loadCustomers();
  }, [filters, currentPage]);

  const loadCustomers = () => {
    const result = filterCustomers(filters, currentPage, itemsPerPage);
    setCustomers(result.customers);
    setTotalPages(result.pagination.totalPages);
    setTotalItems(result.pagination.totalItems);
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = (customerId: string) => {
    // Aqui implementaríamos a lógica real de exclusão
    toast({
      title: "Cliente excluído",
      description: "O cliente foi excluído com sucesso."
    });
    loadCustomers();
  };

  const handleSaveCustomer = (customer: Customer) => {
    // Aqui implementaríamos a lógica real de salvar
    toast({
      title: selectedCustomer ? "Cliente atualizado" : "Cliente criado",
      description: `O cliente ${customer.name} foi ${selectedCustomer ? "atualizado" : "criado"} com sucesso.`
    });
    loadCustomers();
  };

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof CustomerFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <Card>
          <CardContent className="p-6 space-y-6">
            <CustomerHeader onAddCustomer={handleAddCustomer} />
            
            <CustomerSearch 
              search={filters.search || ""}
              type={filters.type || "all"}
              status={filters.status || "all"}
              onSearchChange={handleSearchChange}
              onTypeChange={(value) => handleFilterChange("type", value)}
              onStatusChange={(value) => handleFilterChange("status", value)}
            />
            
            <CustomerList
              customers={customers}
              onEditCustomer={handleEditCustomer}
              onDeleteCustomer={handleDeleteCustomer}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
          </CardContent>
        </Card>

        {isModalOpen && (
          <CustomerConfigModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveCustomer}
            onDelete={handleDeleteCustomer}
            customer={selectedCustomer}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomersPage;
