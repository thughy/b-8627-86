
import React from "react";
import { Customer } from "@/pages/Workflows/models/CustomerModel";
import FormField from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomerPersonFormProps {
  formData: Partial<Customer>;
  onChange: (field: keyof Customer, value: any) => void;
}

const CustomerPersonForm: React.FC<CustomerPersonFormProps> = ({
  formData,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <FormField id="name" label="Nome completo" required>
        <Input
          id="name"
          value={formData.name || ""}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Digite o nome completo"
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

      <FormField id="cpfCnpj" label="CPF">
        <Input
          id="cpfCnpj"
          value={formData.cpfCnpj || ""}
          onChange={(e) => onChange("cpfCnpj", e.target.value)}
          placeholder="000.000.000-00"
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

export default CustomerPersonForm;
