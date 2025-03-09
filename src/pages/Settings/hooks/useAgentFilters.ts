
import { useState } from "react";
import { Agent } from "@/pages/Workflows/models/WorkflowModels";

interface AgentFilters {
  search: string;
  status: string;
  department: string;
}

export const useAgentFilters = (agents: Agent[]) => {
  const [filters, setFilters] = useState<AgentFilters>({
    search: "",
    status: "all",
    department: "all"
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Filter agents based on filters
  const filteredAgents = agents.filter(agent => {
    // Search filter
    if (filters.search && 
        !agent.profile.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !agent.profile.role.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (filters.status !== "all" && agent.status !== filters.status) {
      return false;
    }
    
    // Department filter
    if (filters.department !== "all" && 
        agent.workEnvironment.departmentTitle !== filters.department) {
      return false;
    }
    
    return true;
  });

  return {
    filters,
    handleFilterChange,
    filteredAgents
  };
};
