
import React from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Department } from "@/pages/Workflows/models/WorkflowModels";

interface DepartmentDropdownProps {
  departments: Department[];
  selectedDepartment: Department | null;
  onSelectDepartment: (department: Department) => void;
}

const DepartmentDropdown = ({ 
  departments, 
  selectedDepartment, 
  onSelectDepartment 
}: DepartmentDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span className="mr-1">Departamento:</span>
          <span className="font-medium">
            {selectedDepartment ? selectedDepartment.title : "Todos"}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={() => onSelectDepartment(null as any)}
        >
          Todos os Departamentos
        </DropdownMenuItem>
        {departments.map((department) => (
          <DropdownMenuItem
            key={department.id}
            className="cursor-pointer"
            onClick={() => onSelectDepartment(department)}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: department.color || "#cbd5e1" }}
              />
              {department.title}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DepartmentDropdown;
