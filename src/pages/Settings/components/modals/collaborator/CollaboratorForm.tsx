
import React from "react";
import { Collaborator } from "@/pages/Workflows/models/WorkflowModels";
import FormField from "./form/FormField";
import SelectField from "./form/SelectField";
import FormSection from "./form/FormSection";

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
    <div className="space-y-6 py-4">
      <FormSection title="Informações Básicas" columns={2}>
        <FormField
          id="name"
          label="Nome"
          value={formData.name || ""}
          onChange={(value) => onChange("name", value)}
          placeholder="Nome completo"
          required
        />
        <FormField
          id="email"
          label="E-mail"
          value={formData.email || ""}
          onChange={(value) => onChange("email", value)}
          placeholder="email@exemplo.com"
          type="email"
          required
        />
      </FormSection>

      <FormSection title="Informações Profissionais" columns={2}>
        <FormField
          id="role"
          label="Função"
          value={formData.role || ""}
          onChange={(value) => onChange("role", value)}
          placeholder="Cargo ou função"
          required
        />
        <FormField
          id="phone"
          label="Telefone"
          value={formData.phone || ""}
          onChange={(value) => onChange("phone", value)}
          placeholder="(00) 00000-0000"
        />
      </FormSection>

      <FormSection title="Perfil do Sistema" columns={2}>
        <FormField
          id="hierarchyLevel"
          label="Nível Hierárquico"
          value={formData.hierarchyLevel || ""}
          onChange={(value) => onChange("hierarchyLevel", value)}
          placeholder="Nível na organização"
        />
        <SelectField
          id="type"
          label="Tipo de Usuário"
          value={formData.type || "collaborator"}
          onChange={(value) => onChange("type", value)}
          options={userTypeOptions}
        />
      </FormSection>

      <FormSection>
        <SelectField
          id="status"
          label="Status"
          value={formData.status || "active"}
          onChange={(value) => onChange("status", value)}
          options={statusOptions}
        />
      </FormSection>
    </div>
  );
};

export default CollaboratorForm;
