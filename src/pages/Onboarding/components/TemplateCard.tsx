
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { WorkflowTemplate } from "../models/WorkflowTemplate";

interface TemplateCardProps {
  template: WorkflowTemplate;
  isSelected: boolean;
  onClick: () => void;
}

const TemplateCard = ({ template, isSelected, onClick }: TemplateCardProps) => (
  <Card
    className={`cursor-pointer transition-all hover:shadow-md ${
      isSelected ? "border-primary ring-2 ring-primary ring-opacity-50" : ""
    }`}
    onClick={onClick}
  >
    <CardHeader className="p-4 pb-2">
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg">{template.title}</CardTitle>
        {isSelected && <CheckCircle2 className="h-5 w-5 text-primary" />}
      </div>
      <CardDescription className="text-xs">{template.type}</CardDescription>
    </CardHeader>
    <CardContent className="p-4 pt-2">
      <p className="text-sm text-muted-foreground">{template.description}</p>
    </CardContent>
  </Card>
);

export default TemplateCard;
