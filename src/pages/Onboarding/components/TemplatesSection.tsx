
import React from "react";
import TemplateCard from "./TemplateCard";
import { WorkflowTemplate } from "../models/WorkflowTemplate";

interface TemplatesSectionProps {
  templates: WorkflowTemplate[];
  selectedTemplates: string[];
  onTemplateClick: (templateId: string) => void;
}

const TemplatesSection = ({ 
  templates, 
  selectedTemplates, 
  onTemplateClick 
}: TemplatesSectionProps) => {
  return (
    <>
      <p className="text-sm text-muted-foreground mb-4">
        Selecione um ou mais templates de workflows para começar. Você pode editar ou personalizar depois.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplates.includes(template.id)}
            onClick={() => onTemplateClick(template.id)}
          />
        ))}
      </div>
    </>
  );
};

export default TemplatesSection;
