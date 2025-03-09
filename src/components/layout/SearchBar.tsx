
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative hidden sm:block max-w-md">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Buscar..."
        className="pl-8 pr-4 py-2 bg-[#1a1a1a] w-full rounded-md focus:outline-none focus:ring-1 focus:ring-primary thin-border"
      />
    </div>
  );
};

export default SearchBar;
