
import { useState } from "react";

export interface WorkflowFormState {
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  id?: string;
}

export const useWorkflowFormLogic = (initialState?: Partial<WorkflowFormState>) => {
  const [formData, setFormData] = useState<Partial<WorkflowFormState>>(
    initialState || {
      title: "",
      description: "",
      status: "draft"
    }
  );

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
