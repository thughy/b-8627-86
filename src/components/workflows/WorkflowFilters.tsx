
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  ChevronDown,
} from "lucide-react";

interface WorkflowFiltersProps {
  viewMode: "kanban" | "list";
  onViewModeChange: (mode: "kanban" | "list") => void;
}

const WorkflowFilters = ({ viewMode, onViewModeChange }: WorkflowFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <Tabs defaultValue="all" className="w-full max-w-md">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Ativos</TabsTrigger>
          <TabsTrigger value="archived">Arquivados</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none md:w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar workflows..."
            className="pl-8 pr-4 py-2 bg-muted w-full rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <div className="flex items-center rounded-md border bg-card shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-r-none ${viewMode === "kanban" && "bg-muted"}`}
            onClick={() => onViewModeChange("kanban")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-l-none ${viewMode === "list" && "bg-muted"}`}
            onClick={() => onViewModeChange("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowFilters;
