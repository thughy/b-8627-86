
import React from "react";
import { Template } from "@/pages/Workflows/models/WorkflowModels";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { flattenObject } from "./utils/templateUtils";
import { getTypeLabel } from "./utils/templateUtils";

interface TemplateSpecificationsDialogProps {
  template: Template;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TemplateSpecificationsDialog: React.FC<TemplateSpecificationsDialogProps> = ({
  template,
  open,
  onOpenChange
}) => {
  const renderSpecificationItems = (data: Record<string, any>) => {
    // Flatten nested objects for display
    const flattenedData = flattenObject(data);
    
    return Object.entries(flattenedData).map(([key, value]) => (
      <div key={key} className="py-2 border-b last:border-0">
        <div className="font-medium">{key}</div>
        <div className="text-sm text-muted-foreground">
          {Array.isArray(value) 
            ? value.join(', ')
            : typeof value === 'object' && value !== null
              ? JSON.stringify(value, null, 2)
              : String(value)}
        </div>
      </div>
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span className="mr-2">Especificações do Template</span>
            {getTypeLabel(template.type)}
          </DialogTitle>
          <DialogDescription>
            {template.name} (v{template.version})
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Dados do Template</h3>
            <div className="divide-y">
              {renderSpecificationItems(template.data)}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Atualizado em: {formatDate(template.updatedAt)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
