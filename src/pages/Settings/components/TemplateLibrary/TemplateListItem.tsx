
import React from "react";
import { Template } from "@/pages/Workflows/models/WorkflowModels";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FileText, MoreHorizontal } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getTypeLabel } from "./utils/templateUtils";

interface TemplateListItemProps {
  template: Template;
  onShowSpecifications: (template: Template) => void;
  onTemplateAction: (template: Template, action: 'install' | 'uninstall' | 'update') => void;
  onExportTemplate: (template: Template) => void;
  onGenerateTemplateReport: (template: Template) => void;
}

export const TemplateListItem: React.FC<TemplateListItemProps> = ({
  template,
  onShowSpecifications,
  onTemplateAction,
  onExportTemplate,
  onGenerateTemplateReport
}) => {
  return (
    <div className="grid grid-cols-8 gap-4 p-4 items-center">
      <div className="col-span-2">
        <div className="font-medium">{template.name}</div>
        <div className="text-sm text-muted-foreground truncate">
          {Object.keys(template.data).slice(0, 2).join(", ")}
          {Object.keys(template.data).length > 2 && "..."}
        </div>
      </div>
      <div className="col-span-1">
        {getTypeLabel(template.type)}
      </div>
      <div className="col-span-1 text-muted-foreground">
        v{template.version}
      </div>
      <div className="col-span-2 flex justify-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onShowSpecifications(template)}
          className="h-8 w-8"
          title="Ver especificações"
        >
          <FileText className="h-4 w-4" />
        </Button>
      </div>
      <div className="col-span-1 hidden md:block text-muted-foreground">
        {formatDate(template.updatedAt)}
      </div>
      <div className="col-span-1 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onTemplateAction(template, 'install')}>
              Instalar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onTemplateAction(template, 'update')}>
              Atualizar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onTemplateAction(template, 'uninstall')}>
              Desinstalar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExportTemplate(template)}>
              Exportar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onGenerateTemplateReport(template)}>
              Gerar relatório
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
