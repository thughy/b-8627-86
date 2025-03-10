
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CustomersContent from "./components/CustomersContent";
import { useCustomers } from "./hooks/useCustomers";

const CustomersPage = () => {
  const {
    customers,
    currentPage,
    totalPages,
    itemsPerPage,
    filters,
    isModalOpen,
    isViewModalOpen,
    selectedCustomer,
    handleAddCustomer,
    handleViewCustomer,
    handleEditCustomer,
    handleDeleteCustomer,
    handleSaveCustomer,
    handleSearchChange,
    handleFilterChange,
    handlePageChange,
    handleExportCustomers,
    handleImportCustomers,
    setIsModalOpen,
    setIsViewModalOpen
  } = useCustomers();

  return (
    <DashboardLayout>
      <CustomersContent 
        customers={customers}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        search={filters.search || ""}
        type={filters.type || "all"}
        status={filters.status || "all"}
        isModalOpen={isModalOpen}
        isViewModalOpen={isViewModalOpen}
        selectedCustomer={selectedCustomer}
        onAddCustomer={handleAddCustomer}
        onEditCustomer={handleEditCustomer}
        onDeleteCustomer={handleDeleteCustomer}
        onViewCustomer={handleViewCustomer}
        onSaveCustomer={handleSaveCustomer}
        onSearchChange={handleSearchChange}
        onTypeChange={(value) => handleFilterChange("type", value)}
        onStatusChange={(value) => handleFilterChange("status", value)}
        onPageChange={handlePageChange}
        onExportCustomers={handleExportCustomers}
        onImportCustomers={handleImportCustomers}
        onCloseModal={() => setIsModalOpen(false)}
        onCloseViewModal={() => setIsViewModalOpen(false)}
      />
    </DashboardLayout>
  );
};

export default CustomersPage;
