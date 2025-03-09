
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";

interface CollaboratorFormProps {
  formData: Partial<Collaborator>;
  onChange: (field: keyof Collaborator, value: string) => void;
}

const CollaboratorForm: React.FC<CollaboratorFormProps> = ({
  formData,
  onChange
}) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome *</Label>
          <Input
            id="name"
            value={formData.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Nome completo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="email@exemplo.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="role">Função *</Label>
          <Input
            id="role"
            value={formData.role || ""}
            onChange={(e) => onChange("role", e.target.value)}
            placeholder="Cargo ou função"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={formData.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hierarchyLevel">Nível Hierárquico</Label>
          <Input
            id="hierarchyLevel"
            value={formData.hierarchyLevel || ""}
            onChange={(e) => onChange("hierarchyLevel", e.target.value)}
            placeholder="Nível na organização"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Tipo de Usuário</Label>
          <Select 
            value={formData.type || "collaborator"} 
            onValueChange={(value) => onChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de usuário" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="subscriber">Assinante</SelectItem>
                <SelectItem value="collaborator">Colaborador</SelectItem>
                <SelectItem value="developer">Desenvolvedor</SelectItem>
                <SelectItem value="master">Master</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select 
          value={formData.status || "active"} 
          onValueChange={(value) => onChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CollaboratorForm;
