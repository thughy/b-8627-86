
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface CollaboratorsSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const CollaboratorsSearch: React.FC<CollaboratorsSearchProps> = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar colaboradores..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline" size="icon" className="flex-shrink-0">
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default React.memo(CollaboratorsSearch);
