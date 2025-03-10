
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Customer, CustomerFilter } from "@/pages/Workflows/models/CustomerModel";
import { filterCustomers } from "../services/customerFilterService";
import { createPerson, updatePerson } from "../services/personService";
import { createOrganization, updateOrganization } from "../services/organizationService";
import { deleteCustomer } from "../services/customerBaseService";

export const useCustomers = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
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

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
    setIsViewModalOpen(false);
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (deleteCustomer(customerId)) {
      toast({
        title: "Cliente excluído",
        description: "O cliente foi excluído com sucesso."
      });
      loadCustomers();
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o cliente.",
        variant: "destructive"
      });
    }
  };

  const handleSaveCustomer = (customer: Customer) => {
    try {
      if (customer.type === "person") {
        const personData = customer as any;
        if (selectedCustomer) {
          updatePerson(selectedCustomer.id, personData);
        } else {
          createPerson(personData);
        }
      } else {
        const organizationData = customer as any;
        if (selectedCustomer) {
          updateOrganization(selectedCustomer.id, organizationData);
        } else {
          createOrganization(organizationData);
        }
      }
      
      toast({
        title: selectedCustomer ? "Cliente atualizado" : "Cliente criado",
        description: `O cliente ${customer.name} foi ${selectedCustomer ? "atualizado" : "criado"} com sucesso.`
      });
      loadCustomers();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o cliente.",
        variant: "destructive"
      });
    }
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

  const handleExportCustomers = () => {
    // Simulação de exportação
    toast({
      title: "Exportação iniciada",
      description: "Seus dados estão sendo exportados para CSV."
    });
    
    // Simular conclusão após 2 segundos
    setTimeout(() => {
      toast({
        title: "Exportação concluída",
        description: "Seus dados foram exportados com sucesso."
      });
    }, 2000);
  };

  const handleImportCustomers = () => {
    // Simulação de importação
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A importação de clientes estará disponível em breve."
    });
  };

  return {
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
  };
};
