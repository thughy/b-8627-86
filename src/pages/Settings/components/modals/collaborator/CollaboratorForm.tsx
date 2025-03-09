
import React from "react";
import { Input } from "@/components/ui/input";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import FormField from "@/components/ui/form-field";
import SelectField from "@/components/ui/select-field";

interface CollaboratorFormProps {
  formData: Partial<Collaborator>;
  onChange: (field: keyof Collaborator, value: string) => void;
}

const CollaboratorForm: React.FC<CollaboratorFormProps> = ({
  formData,
  onChange
}) => {
  const userTypeOptions = [
    { value: "subscriber", label: "Assinante" },
    { value: "collaborator", label: "Colaborador" },
    { value: "developer", label: "Desenvolvedor" },
    { value: "master", label: "Master" }
  ];

  const statusOptions = [
    { value: "active", label: "Ativo" },
    { value: "inactive", label: "Inativo" },
    { value: "pending", label: "Pendente" }
  ];

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField id="name" label="Nome" required>
          <Input
            id="name"
            value={formData.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Nome completo"
          />
        </FormField>

        <FormField id="email" label="E-mail" required>
          <Input
            id="email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="email@exemplo.com"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField id="role" label="Função" required>
          <Input
            id="role"
            value={formData.role || ""}
            onChange={(e) => onChange("role", e.target.value)}
            placeholder="Cargo ou função"
          />
        </FormField>

        <FormField id="phone" label="Telefone">
          <Input
            id="phone"
            value={formData.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="(00) 00000-0000"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField id="hierarchyLevel" label="Nível Hierárquico">
          <Input
            id="hierarchyLevel"
            value={formData.hierarchyLevel || ""}
            onChange={(e) => onChange("hierarchyLevel", e.target.value)}
            placeholder="Nível na organização"
          />
        </FormField>

        <SelectField
          id="type"
          label="Tipo de Usuário"
          value={formData.type || "collaborator"}
          onChange={(value) => onChange("type", value)}
          options={userTypeOptions}
          placeholder="Selecione o tipo de usuário"
        />
      </div>

      <SelectField
        id="status"
        label="Status"
        value={formData.status || "active"}
        onChange={(value) => onChange("status", value)}
        options={statusOptions}
        placeholder="Selecione o status"
      />
    </div>
  );
};

export default CollaboratorForm;
