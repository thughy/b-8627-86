
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AgentFilters from "./agents/AgentFilters";
import AgentList from "./agents/AgentList";
import AgentConfigModal from "./modals/AgentConfigModal";
import { useAgentCrud } from "../hooks/useAgentCrud";
import { useAgentFilters } from "../hooks/useAgentFilters";
import { getMockAgents } from "../services/agentDataService";

const AgentSettings = () => {
  // Use our custom hooks
  const {
    agents,
    setAgents,
    selectedAgent,
    isModalOpen,
    setIsModalOpen,
    handleAddAgent,
    handleEditAgent,
    handleDeleteAgent,
    handleSaveAgent
  } = useAgentCrud();

  const { filters, handleFilterChange, filteredAgents } = useAgentFilters(agents);

  // Load agents on component mount
  useEffect(() => {
    // In a real application, this would be an API call
    setAgents(getMockAgents());
  }, [setAgents]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <AgentFilters
            searchTerm={filters.search}
            status={filters.status}
            department={filters.department}
            onSearchChange={(value) => handleFilterChange("search", value)}
            onStatusChange={(value) => handleFilterChange("status", value)}
            onDepartmentChange={(value) => handleFilterChange("department", value)}
            onAddAgent={handleAddAgent}
          />
          
          <AgentList
            agents={filteredAgents}
            onEditAgent={handleEditAgent}
            onDeleteAgent={handleDeleteAgent}
          />
        </CardContent>
      </Card>
      
      {isModalOpen && (
        <AgentConfigModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          agent={selectedAgent}
          onSave={handleSaveAgent}
          onDelete={handleDeleteAgent}
        />
      )}
    </div>
  );
};

export default AgentSettings;
