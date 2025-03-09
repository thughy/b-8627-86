
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, Filter, Columns, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Workflow, Pipeline } from '@/pages/Workflows/models/WorkflowModels';

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

        <Select
          value={selectedWorkflow}
          onValueChange={onWorkflowChange}
        >
          <SelectTrigger className="w-full md:w-56">
            <SelectValue placeholder="Selecionar Workflow" />
          </SelectTrigger>
          <SelectContent>
            {workflows.map(workflow => (
              <SelectItem key={workflow.id} value={workflow.id}>
                {workflow.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedPipeline}
          onValueChange={onPipelineChange}
        >
          <SelectTrigger className="w-full md:w-56">
            <SelectValue placeholder="Selecionar Pipeline" />
          </SelectTrigger>
          <SelectContent>
            {pipelines.map(pipeline => (
              <SelectItem key={pipeline.id} value={pipeline.id}>
                {pipeline.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
