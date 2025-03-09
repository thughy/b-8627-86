
import React from "react";
import { Template } from "@/pages/Workflows/models/WorkflowModels";
import { TemplateListHeader } from "./TemplateListHeader";
import { TemplateListItem } from "./TemplateListItem";

interface TemplateListProps {
  templates: Template[];
  onShowSpecifications: (template: Template) => void;
  onTemplateAction: (template: Template, action: 'install' | 'uninstall' | 'update') => void;
  onExportTemplate: (template: Template) => void;
  onGenerateTemplateReport: (template: Template) => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onShowSpecifications,
  onTemplateAction,
  onExportTemplate,
  onGenerateTemplateReport
}) => {
  return (
    <div className="border rounded-md">
      <TemplateListHeader />
      
      <div className="divide-y">
        {templates.length > 0 ? (
          templates.map((template) => (
            <TemplateListItem
              key={template.id}
              template={template}
              onShowSpecifications={onShowSpecifications}
              onTemplateAction={onTemplateAction}
              onExportTemplate={onExportTemplate}
              onGenerateTemplateReport={onGenerateTemplateReport}
            />
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            Nenhum template encontrado
          </div>
        )}
      </div>
    </div>
  );
};
