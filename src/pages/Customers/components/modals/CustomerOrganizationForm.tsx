
import React from "react";
import { Organization } from "@/pages/Workflows/models/CustomerModel";
import FormField from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomerOrganizationFormProps {
  formData: Partial<Organization>;
  onChange: (field: keyof Organization, value: any) => void;
}

const CustomerOrganizationForm: React.FC<CustomerOrganizationFormProps> = ({
  formData,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <FormField id="name" label="Razão Social" required>
        <Input
          id="name"
          value={formData.name || ""}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Digite a razão social"
        />
      </FormField>

      <FormField id="tradingName" label="Nome Fantasia">
        <Input
          id="tradingName"
          value={formData.tradingName || ""}
          onChange={(e) => onChange("tradingName", e.target.value)}
          placeholder="Digite o nome fantasia"
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField id="email" label="Email">
          <Input
            id="email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="email@exemplo.com"
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

      <FormField id="cnpj" label="CNPJ">
        <Input
          id="cnpj"
          value={formData.cnpj || ""}
          onChange={(e) => onChange("cnpj", e.target.value)}
          placeholder="00.000.000/0001-00"
        />
      </FormField>

      <FormField id="address" label="Endereço">
        <Input
          id="address"
          value={formData.address || ""}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="Rua, número, bairro, cidade, estado"
        />
      </FormField>

      <FormField id="status" label="Status">
        <Select
          value={formData.status || "active"}
          onValueChange={(value) => onChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
    </div>
  );
};

export default CustomerOrganizationForm;
