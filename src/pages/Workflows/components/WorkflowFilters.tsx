
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, Filter, Columns, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Workflow, Pipeline } from '@/pages/Workflows/models/WorkflowModels';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WorkflowFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedWorkflow: string;
  onWorkflowChange: (value: string) => void;
  selectedPipeline: string;
  onPipelineChange: (value: string) => void;
  viewMode: 'kanban' | 'list';
  onViewModeChange: (mode: 'kanban' | 'list') => void;
  workflows: Workflow[];
  pipelines: Pipeline[];
}

const WorkflowFilters: React.FC<WorkflowFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedWorkflow,
  onWorkflowChange,
  selectedPipeline,
  onPipelineChange,
  viewMode,
  onViewModeChange,
  workflows,
  pipelines
}) => {
  // Find selected workflow and pipeline names for display
  const selectedWorkflowName = workflows.find(w => w.id === selectedWorkflow)?.title || "Selecionar Workflow";
  const selectedPipelineName = pipelines.find(p => p.id === selectedPipeline)?.title || "Selecionar Pipeline";

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="flex flex-col md:flex-row gap-3 w-full">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar negócios..."
            className="pl-8"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>

        {/* Department/Workflow Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-56 justify-between">
              <span>{selectedWorkflowName}</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-[#222222]">
            {workflows.map(workflow => (
              <DropdownMenuItem 
                key={workflow.id} 
                onClick={() => onWorkflowChange(workflow.id)}
                className="cursor-pointer"
              >
                {workflow.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Pipeline Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-56 justify-between">
              <span>{selectedPipelineName}</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-[#222222]">
            {pipelines.map(pipeline => (
              <DropdownMenuItem 
                key={pipeline.id} 
                onClick={() => onPipelineChange(pipeline.id)}
                className="cursor-pointer"
              >
                {pipeline.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onViewModeChange('kanban')}
        >
          <Columns className={`h-4 w-4 ${viewMode === 'kanban' ? 'text-primary' : ''}`} />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onViewModeChange('list')}
        >
          <List className={`h-4 w-4 ${viewMode === 'list' ? 'text-primary' : ''}`} />
        </Button>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WorkflowFilters;
