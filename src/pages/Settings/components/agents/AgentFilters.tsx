
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AgentFiltersProps {
  searchTerm?: string;
  search?: string;
  status?: string;
  department?: string;
  onSearchChange?: (value: string) => void;
  onStatusChange?: (value: string) => void;
  onDepartmentChange?: (value: string) => void;
  onAddAgent?: () => void;
}

const AgentFilters = ({
  searchTerm,
  search,
  status = "all",
  department = "all",
  onSearchChange,
  onStatusChange,
  onDepartmentChange,
  onAddAgent,
}: AgentFiltersProps) => {
  // Use searchTerm or search, whichever is provided
  const searchValue = searchTerm || search || "";
  
  // Mock department options
  const departmentOptions = [
    { value: "all", label: "Todos os Departamentos" },
    { value: "Comercial", label: "Comercial" },
    { value: "Suporte", label: "Suporte" },
    { value: "Marketing", label: "Marketing" },
    { value: "Financeiro", label: "Financeiro" },
  ];

  // Mock status options
  const statusOptions = [
    { value: "all", label: "Todos os Status" },
    { value: "active", label: "Ativo" },
    { value: "paused", label: "Pausado" },
    { value: "blocked", label: "Bloqueado" },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
      <div className="flex flex-1 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar agentes..."
            className="pl-8"
            value={searchValue}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
        </div>
        
        <Select
          value={status}
          onValueChange={(value) => onStatusChange && onStatusChange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={department}
          onValueChange={(value) => onDepartmentChange && onDepartmentChange(value)}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Departamento" />
          </SelectTrigger>
          <SelectContent>
            {departmentOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button onClick={onAddAgent}>
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Agente
      </Button>
    </div>
  );
};

export default AgentFilters;
