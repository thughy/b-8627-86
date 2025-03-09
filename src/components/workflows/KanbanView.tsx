
import React from "react";
import WorkflowCard from "./WorkflowCard";

interface KanbanViewProps {
  onAction: (action: string) => void;
}

const KanbanView = ({ onAction }: KanbanViewProps) => {
  const workflows = ["Comercial", "Suporte", "Marketing"];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {workflows.map((workflow, index) => (
        <WorkflowCard 
          key={index} 
          title={workflow} 
          index={index} 
          onAction={onAction} 
        />
      ))}
    </div>
  );
};

export default KanbanView;
