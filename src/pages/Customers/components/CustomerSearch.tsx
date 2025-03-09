
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, Building2, FilterX } from "lucide-react";

interface CustomerSearchProps {
  search: string;
  type: string;
  status: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({
  search,
  type,
  status,
  onSearchChange,
  onTypeChange,
  onStatusChange
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nome, email, CPF/CNPJ..."
          className="pl-8"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Select value={type} onValueChange={onTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="flex items-center gap-2">
                <FilterX className="h-4 w-4" />
                <span>Todos os tipos</span>
              </SelectItem>
              <SelectItem value="person" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Pessoa Física</span>
              </SelectItem>
              <SelectItem value="organization" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>Pessoa Jurídica</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CustomerSearch);
