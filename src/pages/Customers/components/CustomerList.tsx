
import React from "react";
import { Customer } from "@/pages/Workflows/models/CustomerModel";
import CustomerListItem from "./CustomerListItem";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";

interface CustomerListProps {
  customers: Customer[];
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (customerId: string) => void;
  onViewCustomer: (customer: Customer) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  onEditCustomer,
  onDeleteCustomer,
  onViewCustomer,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage
}) => {
  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="page-1">
        <PaginationLink 
          href="#" 
          isActive={currentPage === 1}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(1);
          }}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Add ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i <= totalPages && i > 1) {
        items.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink 
              href="#" 
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink 
            href="#" 
            isActive={currentPage === totalPages}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(totalPages);
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="border rounded-md">
      <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
        <div className="col-span-2">Nome / Organização</div>
        <div className="col-span-1">Contato</div>
        <div className="col-span-1">Tipo</div>
        <div className="col-span-1 text-right">Ações</div>
      </div>

      <div className="divide-y">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <CustomerListItem
              key={customer.id}
              customer={customer}
              onEdit={onEditCustomer}
              onDelete={onDeleteCustomer}
              onView={onViewCustomer}
            />
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            Nenhum cliente encontrado
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="py-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      onPageChange(currentPage - 1);
                    }
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {renderPaginationItems()}
              
              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      onPageChange(currentPage + 1);
                    }
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="text-center text-sm text-muted-foreground mt-2">
            Mostrando {customers.length} de {itemsPerPage * (currentPage - 1) + customers.length} resultados
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
