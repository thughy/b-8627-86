
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
import { Plus, Search, Filter, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import CollaboratorConfigModal from "./modals/CollaboratorConfigModal";
import { getCollaborators } from "../services/settingsService";

const CollaboratorsSettings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [collaborators, setCollaborators] = useState<Collaborator[]>(getCollaborators());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCollaborator, setCurrentCollaborator] = useState<Collaborator | null>(null);

  const filteredCollaborators = collaborators.filter((collaborator) => 
    collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCollaborator = () => {
    setCurrentCollaborator(null);
    setIsModalOpen(true);
  };

  const handleEditCollaborator = (collaborator: Collaborator) => {
    setCurrentCollaborator(collaborator);
    setIsModalOpen(true);
  };

  const handleSaveCollaborator = (savedCollaborator: Collaborator) => {
    if (currentCollaborator) {
      // Editar colaborador existente
      setCollaborators(collaborators.map(c => 
        c.id === savedCollaborator.id ? savedCollaborator : c
      ));
      toast({
        title: "Colaborador atualizado",
        description: `${savedCollaborator.name} foi atualizado com sucesso.`,
      });
    } else {
      // Adicionar novo colaborador
      setCollaborators([...collaborators, savedCollaborator]);
      toast({
        title: "Colaborador adicionado",
        description: `${savedCollaborator.name} foi adicionado com sucesso.`,
      });
    }
    setIsModalOpen(false);
  };

  const handleDeleteCollaborator = (id: string) => {
    setCollaborators(collaborators.filter(c => c.id !== id));
    toast({
      title: "Colaborador removido",
      description: "O colaborador foi removido com sucesso.",
    });
    setIsModalOpen(false);
  };

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case 'subscriber':
      case 'assinante':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Assinante</Badge>;
      case 'collaborator':
      case 'colaborador':
        return <Badge className="bg-green-500 hover:bg-green-600">Colaborador</Badge>;
      case 'developer':
      case 'desenvolvedor':
        return <Badge className="bg-purple-500 hover:bg-purple-600">Desenvolvedor</Badge>;
      case 'master':
        return <Badge className="bg-red-500 hover:bg-red-600">Master</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status.toLowerCase() === 'active' || status.toLowerCase() === 'ativo' ? 
      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">Ativo</Badge> : 
      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200">Inativo</Badge>;
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Colaboradores</CardTitle>
              <CardDescription>
                Gerencie usuários e permissões de acesso
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
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
              <div className="col-span-4 md:col-span-3">Nome</div>
              <div className="col-span-3 hidden md:block">E-mail</div>
              <div className="col-span-3 md:col-span-2">Função</div>
              <div className="col-span-3 md:col-span-2">Tipo</div>
              <div className="col-span-2 hidden md:block">Status</div>
              <div className="col-span-2 text-right">Ações</div>
            </div>

            <div className="divide-y">
              {filteredCollaborators.length > 0 ? (
                filteredCollaborators.map((collaborator) => (
                  <div key={collaborator.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                    <div className="col-span-4 md:col-span-3">
                      <div className="font-medium">{collaborator.name}</div>
                      <div className="text-sm text-muted-foreground md:hidden">
                        {collaborator.email}
                      </div>
                    </div>
                    <div className="col-span-3 hidden md:block text-muted-foreground">
                      {collaborator.email}
                    </div>
                    <div className="col-span-3 md:col-span-2 text-muted-foreground">
                      {collaborator.role}
                    </div>
                    <div className="col-span-3 md:col-span-2">
                      {getRoleBadge(collaborator.type)}
                    </div>
                    <div className="col-span-2 hidden md:block">
                      {getStatusBadge(collaborator.status)}
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditCollaborator(collaborator)}
                      >
                        <UserCog className="h-4 w-4" />
                      </Button>
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
      </Card>

      <CollaboratorConfigModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCollaborator}
        onDelete={handleDeleteCollaborator}
        collaborator={currentCollaborator}
      />
    </>
  );
};

export default CollaboratorsSettings;
