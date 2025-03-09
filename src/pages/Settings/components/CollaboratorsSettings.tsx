
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
import { Plus, Search, Filter, Edit, Trash, UserCog, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { getCollaborators } from "../services/settingsService";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CollaboratorsSettings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [collaborators, setCollaborators] = useState<Collaborator[]>(getCollaborators());

  const filteredCollaborators = collaborators.filter((collaborator) => 
    collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCollaborator = () => {
    toast({
      title: "Adicionar Colaborador",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handleEditCollaborator = (collaborator: Collaborator) => {
    toast({
      title: "Editar Colaborador",
      description: `Editar colaborador: ${collaborator.name}`,
    });
  };

  const handleDeleteCollaborator = (collaborator: Collaborator) => {
    toast({
      title: "Remover Colaborador",
      description: `Remover colaborador: ${collaborator.name}`,
      variant: "destructive",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getTypeColor = (type: Collaborator['type']) => {
    switch (type) {
      case 'subscriber':
        return 'bg-blue-500';
      case 'collaborator':
        return 'bg-green-500';
      case 'developer':
        return 'bg-purple-500';
      case 'master':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: Collaborator['type']) => {
    switch (type) {
      case 'subscriber':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Assinante</Badge>;
      case 'collaborator':
        return <Badge className="bg-green-500 hover:bg-green-600">Colaborador</Badge>;
      case 'developer':
        return <Badge className="bg-purple-500 hover:bg-purple-600">Desenvolvedor</Badge>;
      case 'master':
        return <Badge className="bg-amber-500 hover:bg-amber-600">Master</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Collaborator['status']) => {
    return status === 'active' 
      ? <Badge className="bg-green-500 hover:bg-green-600">Ativo</Badge>
      : <Badge className="bg-red-500 hover:bg-red-600">Inativo</Badge>;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Colaboradores</CardTitle>
            <CardDescription>
              Gerencie membros da equipe e suas permissões
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

        <div className="space-y-4">
          {filteredCollaborators.length > 0 ? (
            filteredCollaborators.map((collaborator) => (
              <Card key={collaborator.id} className="overflow-hidden">
                <div className="p-4 flex items-center">
                  <Avatar className={`h-12 w-12 mr-4 ${getTypeColor(collaborator.type)}`}>
                    <AvatarFallback>{getInitials(collaborator.name)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{collaborator.name}</h3>
                      {getStatusBadge(collaborator.status)}
                      {getTypeLabel(collaborator.type)}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">{collaborator.role}</div>
                    
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Mail className="h-3 w-3 mr-1" />
                        {collaborator.email}
                      </div>
                      {collaborator.phone && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Phone className="h-3 w-3 mr-1" />
                          {collaborator.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditCollaborator(collaborator)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteCollaborator(collaborator)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              Nenhum colaborador encontrado
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaboratorsSettings;
