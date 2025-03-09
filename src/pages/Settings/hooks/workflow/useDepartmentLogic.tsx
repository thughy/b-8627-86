
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Department, Pipeline, Stage, Agent } from "@/pages/Workflows/models/WorkflowModels";

export const useDepartmentLogic = (
  departments: Department[],
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>,
  pipelines: Pipeline[],
  setPipelines: React.Dispatch<React.SetStateAction<Pipeline[]>>,
  stages: Stage[],
  setStages: React.Dispatch<React.SetStateAction<Stage[]>>,
  agents: Agent[],
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>,
  selectedDepartment: Department | null,
  setSelectedDepartment: React.Dispatch<React.SetStateAction<Department | null>>,
  expandedDepartments: Record<string, boolean>,
  setExpandedDepartments: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const { toast } = useToast();
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({ title: "", description: "" });

  const toggleDepartmentExpand = (deptId: string) => {
    setExpandedDepartments(prev => ({
      ...prev,
      [deptId]: !prev[deptId]
    }));
  };

  const handleAddDepartment = () => {
    if (!newDepartment.title) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe um título para o departamento.",
        variant: "destructive",
      });
      return;
    }

    const department: Department = {
      id: `dept-${Date.now()}`,
      title: newDepartment.title,
      description: newDepartment.description || "",
      color: "#6366F1"
    };

    setDepartments(prev => [...prev, department]);
    setSelectedDepartment(department);
    setNewDepartment({ title: "", description: "" });
    
    setExpandedDepartments(prev => ({
      ...prev,
      [department.id]: true
    }));
    
    toast({
      title: "Departamento adicionado",
      description: `O departamento "${department.title}" foi adicionado com sucesso.`,
    });
  };

  const handleDeleteDepartment = (departmentId: string) => {
    toast({
      title: "Remover Departamento",
      description: `Tem certeza que deseja remover este departamento? Todos os pipelines e estágios associados também serão removidos.`,
      variant: "destructive",
      action: (
        <Button 
          variant="outline" 
          onClick={() => {
            setDepartments(prev => prev.filter(d => d.id !== departmentId));
            
            const pipelineIds = pipelines
              .filter(p => p.departmentId === departmentId)
              .map(p => p.id);
            
            setPipelines(prev => prev.filter(p => p.departmentId !== departmentId));
            
            const stageIds = stages
              .filter(s => pipelineIds.includes(s.pipelineId))
              .map(s => s.id);
            
            setStages(prev => prev.filter(s => !pipelineIds.includes(s.pipelineId)));
            
            setAgents(prev => prev.filter(a => !stageIds.includes(a.stageId)));
            
            if (selectedDepartment?.id === departmentId) {
              setSelectedDepartment(null);
            }
            
            toast({
              title: "Departamento removido",
              description: `O departamento e seus componentes foram removidos com sucesso.`,
            });
          }}
        >
          Confirmar
        </Button>
      ),
    });
  };

  return {
    newDepartment,
    setNewDepartment,
    toggleDepartmentExpand,
    handleAddDepartment,
    handleDeleteDepartment
  };
};
