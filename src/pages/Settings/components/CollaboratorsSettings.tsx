
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { getCollaborators } from "../services/settingsService";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import CollaboratorConfigModal from "./modals/CollaboratorConfigModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const CollaboratorsSettings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [collaborators, setCollaborators] = useState<Collaborator[]>(getCollaborators());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);

  const filteredCollaborators = collaborators.filter((collaborator) => 
    collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCollaborator = () => {
    setSelectedCollaborator(null);
    setIsModalOpen(true);
  };

  const handleEditCollaborator = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setIsModalOpen(true);
  };

  const handleDeleteCollaborator = (collaborator: Collaborator) => {
    if (collaborator.id) {
      setCollaborators(prev => prev.filter(c => c.id !== collaborator.id));
      toast({
        title: "Colaborador removido",
        description: `O colaborador ${collaborator.name} foi removido com sucesso.`,
      });
    }
  };

  const handleSaveCollaborator = (collaboratorData: Collaborator) => {
    if (selectedCollaborator) {
      // Update existing collaborator
      setCollaborators(prev => 
        prev.map(c => 
          c.id === collaboratorData.id ? collaboratorData : c
        )
      );
      toast({
        title: "Colaborador atualizado",
        description: `As informações do colaborador ${collaboratorData.name} foram atualizadas com sucesso.`,
      });
    } else {
      // Add new collaborator
      setCollaborators(prev => [...prev, collaboratorData]);
      toast({
        title: "Colaborador adicionado",
        description: `O colaborador ${collaboratorData.name} foi adicionado com sucesso.`,
      });
    }
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Ativo</Badge>;
      case 'inactive':
        return <Badge className="bg-red-500 hover:bg-red-600">Inativo</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Gerenciamento de Colaboradores</CardTitle>
            <CardDescription>
              Configure e gerencie os colaboradores do sistema
            </CardDescription>
          </div>
          <Button onClick={handleAddCollaborator} className="flex-shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Colaborador
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar colaboradores..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="border rounded-md">
          <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
            <div className="col-span-2">Nome / Função</div>
            <div className="col-span-1">Email</div>
            <div className="col-span-1 hidden md:block">Tipo</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-right">Ações</div>
          </div>

          <div className="divide-y">
            {filteredCollaborators.length > 0 ? (
              filteredCollaborators.map((collaborator) => (
                <div key={collaborator.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                  <div className="col-span-2">
                    <div className="font-medium">{collaborator.name}</div>
                    <div className="text-sm text-muted-foreground">{collaborator.role}</div>
                  </div>
                  <div className="col-span-1 text-muted-foreground truncate">
                    {collaborator.email}
                  </div>
                  <div className="col-span-1 hidden md:block text-muted-foreground capitalize">
                    {collaborator.type}
                  </div>
                  <div className="col-span-1">
                    {getStatusBadge(collaborator.status)}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditCollaborator(collaborator)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteCollaborator(collaborator)}
                          className="text-red-500 focus:text-red-500"
                        >
                          Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                Nenhum colaborador encontrado
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CollaboratorConfigModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        collaborator={selectedCollaborator}
        onSave={handleSaveCollaborator}
        onDelete={handleDeleteCollaborator}
      />
    </Card>
  );
};

export default CollaboratorsSettings;
