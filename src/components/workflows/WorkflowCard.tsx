
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Workflow, MoreVertical, ArrowRight } from "lucide-react";

interface WorkflowCardProps {
  title: string;
  onAction: (action: string) => void;
  index: number;
}

const WorkflowCard = ({ title, onAction, index }: WorkflowCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5 text-primary" />
            <span>{title}</span>
          </CardTitle>
          <CardDescription>
            Workflow para gerenciamento de {title.toLowerCase()}
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAction(`Editar ${title}`)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction(`Duplicar ${title}`)}>
              Duplicar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction(`Arquivar ${title}`)}>
              Arquivar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onAction(`Excluir ${title}`)}
              className="text-destructive"
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Departamento:</p>
              <p>{title}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Pipelines:</p>
              <p>2</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Deals:</p>
              <p>{10 - index * 2}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status:</p>
              <p className="text-emerald-500">Ativo</p>
            </div>
          </div>
        </div>
      </CardContent>
      <div className="px-6 py-4 bg-muted/30 flex justify-end rounded-b-lg">
        <Button 
          variant="ghost" 
          className="text-primary" 
          onClick={() => onAction(`Visualizar ${title}`)}
        >
          Visualizar <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default WorkflowCard;
