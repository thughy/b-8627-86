
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Customer, Person, Organization } from "@/pages/Workflows/models/CustomerModel";
import { Building2, Mail, Phone, MapPin, Calendar, User, Clock } from "lucide-react";
import { format } from "date-fns";

interface CustomerViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
  customer: Customer | null;
}

const CustomerViewModal: React.FC<CustomerViewModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  customer
}) => {
  if (!customer) return null;

  const isPerson = customer.type === "person";
  const person = customer as Person;
  const organization = customer as Organization;

  const formatDate = (date: Date) => {
    return format(new Date(date), "dd/MM/yyyy");
  };

  const renderPersonDetails = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-primary" />
        <div className="font-medium">Informações Pessoais</div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 pl-6">
        {person.cpfCnpj && (
          <div>
            <div className="text-sm text-muted-foreground">CPF</div>
            <div>{person.cpfCnpj}</div>
          </div>
        )}
        
        {person.organizationName && (
          <div>
            <div className="text-sm text-muted-foreground">Organização</div>
            <div>{person.organizationName}</div>
          </div>
        )}
      </div>
    </div>
  );

  const renderOrganizationDetails = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-primary" />
        <div className="font-medium">Informações da Empresa</div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 pl-6">
        {organization.tradingName && (
          <div>
            <div className="text-sm text-muted-foreground">Nome Fantasia</div>
            <div>{organization.tradingName}</div>
          </div>
        )}
        
        {organization.cnpj && (
          <div>
            <div className="text-sm text-muted-foreground">CNPJ</div>
            <div>{organization.cnpj}</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-3">
            {isPerson ? (
              <User className="h-5 w-5 text-primary" />
            ) : (
              <Building2 className="h-5 w-5 text-primary" />
            )}
            {customer.name}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {customer.email && (
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.email}</span>
                </div>
              )}
              
              {customer.phone && (
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.phone}</span>
                </div>
              )}
              
              {customer.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.address}</span>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Cadastrado em: {formatDate(customer.createdAt)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Atualizado em: {formatDate(customer.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            {isPerson ? renderPersonDetails() : renderOrganizationDetails()}
          </div>
        </div>

        <DialogFooter className="flex space-x-2 justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button onClick={() => onEdit(customer)}>
            Editar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerViewModal;
