
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Workflow } from "@/pages/Workflows/models/WorkflowModels";

interface WorkflowBasicFormProps {
  formData: Partial<Workflow>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleStatusChange: (status: 'active' | 'inactive' | 'draft') => void;
}

const WorkflowBasicForm = ({ 
  formData, 
  handleChange, 
  handleStatusChange 
}: WorkflowBasicFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Título</Label>
        <Input 
          id="title"
          name="title"
          placeholder="Título do workflow"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea 
          id="description"
          name="description"
          placeholder="Descreva o objetivo deste workflow"
          rows={4}
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-2">
        <Label>Status</Label>
        <div className="flex space-x-4">
          <Button 
            type="button" 
            variant={formData.status === 'active' ? "default" : "outline"}
            onClick={() => handleStatusChange('active')}
            className="flex-1"
          >
            Ativo
          </Button>
          <Button 
            type="button" 
            variant={formData.status === 'inactive' ? "default" : "outline"}
            onClick={() => handleStatusChange('inactive')}
            className="flex-1"
          >
            Inativo
          </Button>
          <Button 
            type="button" 
            variant={formData.status === 'draft' ? "default" : "outline"}
            onClick={() => handleStatusChange('draft')}
            className="flex-1"
          >
            Rascunho
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBasicForm;
