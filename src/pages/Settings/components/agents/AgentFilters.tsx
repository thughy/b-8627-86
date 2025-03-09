
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ListFilter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AgentFiltersProps {
  searchTerm?: string;
  search?: string;
  status?: string;
  department?: string;
  setSearchTerm?: (value: string) => void;
  onSearchChange?: (value: string) => void;
  onStatusChange?: (value: string) => void;
  onDepartmentChange?: (value: string) => void;
  onAddAgent?: () => void;
}

const AgentFilters = ({
  searchTerm, 
  search,
  status,
  department,
  setSearchTerm,
  onSearchChange,
  onStatusChange,
  onDepartmentChange,
  onAddAgent
}: AgentFiltersProps) => {
  const handleSearchChange = (value: string) => {
    if (setSearchTerm) setSearchTerm(value);
    if (onSearchChange) onSearchChange(value);
  };

  const searchValue = searchTerm || search || "";

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar agentes..."
            className="pl-8"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {onAddAgent && (
            <Button onClick={onAddAgent}>Adicionar Agente</Button>
          )}
        </div>
      </div>

      {(status || department) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {status && onStatusChange && (
            <div>
              <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="paused">Pausado</SelectItem>
                  <SelectItem value="blocked">Bloqueado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {department && onDepartmentChange && (
            <div>
              <Select value={department} onValueChange={onDepartmentChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os departamentos</SelectItem>
                  <SelectItem value="Comercial">Comercial</SelectItem>
                  <SelectItem value="Suporte">Suporte</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Financeiro">Financeiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentFilters;
