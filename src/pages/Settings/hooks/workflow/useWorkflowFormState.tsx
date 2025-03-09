
import { useState, useEffect } from "react";
import { Workflow } from "@/pages/Workflows/models/WorkflowModels";

export interface WorkflowFormState {
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  id?: string;
}

export const useWorkflowFormState = (initialWorkflow?: Workflow) => {
  const [formData, setFormData] = useState<Partial<WorkflowFormState>>(
    initialWorkflow || {
      title: "",
      description: "",
      status: "draft"
    }
  );

  // Update form data when workflow changes
  useEffect(() => {
    if (initialWorkflow) {
      setFormData(initialWorkflow);
    } else {
      setFormData({
        title: "",
        description: "",
        status: "draft"
      });
    }
  }, [initialWorkflow]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status: 'active' | 'inactive' | 'draft') => {
    setFormData(prev => ({ ...prev, status }));
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleStatusChange
  };
};
