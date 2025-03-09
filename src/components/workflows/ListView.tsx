
import React from "react";
import WorkflowListItem from "./WorkflowListItem";

interface ListViewProps {
  onAction: (action: string) => void;
}

const ListView = ({ onAction }: ListViewProps) => {
  const workflows = ["Comercial", "Suporte", "Marketing", "Financeiro"];
  
  return (
    <div className="space-y-4">
      {workflows.map((workflow, index) => (
        <WorkflowListItem 
          key={index} 
          title={workflow} 
          index={index} 
          onAction={onAction} 
        />
      ))}
    </div>
  );
};

export default ListView;
