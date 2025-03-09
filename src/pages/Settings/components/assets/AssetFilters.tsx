
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ListFilter } from "lucide-react";

interface AssetFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const AssetFilters = ({ searchTerm, setSearchTerm }: AssetFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar assets..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline">
          <ListFilter className="h-4 w-4 mr-2" />
          <span>Filtrar por Tipo</span>
        </Button>
      </div>
    </div>
  );
};

export default AssetFilters;
