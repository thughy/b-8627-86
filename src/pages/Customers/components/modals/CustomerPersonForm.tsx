
import React from "react";
import { Person } from "@/pages/Workflows/models/CustomerModel";
import FormField from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext, Controller } from "react-hook-form";
import { PersonFormValues } from "../../validations/customerSchema";

interface CustomerPersonFormProps {
  organizations?: { id: string; name: string }[];
}

const CustomerPersonForm: React.FC<CustomerPersonFormProps> = ({
  organizations = []
}) => {
  const { control, formState: { errors } } = useFormContext<PersonFormValues>();

  return (
    <div className="space-y-4">
      <FormField id="name" label="Nome completo" required>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <>
              <Input
                id="name"
                {...field}
                placeholder="Digite o nome completo"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </>
          )}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField id="email" label="Email">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  id="email"
                  type="email"
                  {...field}
                  placeholder="email@exemplo.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </>
            )}
          />
        </FormField>

        <FormField id="phone" label="Telefone">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  id="phone"
                  {...field}
                  placeholder="(00) 00000-0000"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </>
            )}
          />
        </FormField>
      </div>

      <FormField id="cpfCnpj" label="CPF">
        <Controller
          name="cpfCnpj"
          control={control}
          render={({ field }) => (
            <>
              <Input
                id="cpfCnpj"
                {...field}
                placeholder="000.000.000-00"
                className={errors.cpfCnpj ? "border-red-500" : ""}
              />
              {errors.cpfCnpj && (
                <p className="text-red-500 text-sm mt-1">{errors.cpfCnpj.message}</p>
              )}
            </>
          )}
        />
      </FormField>

      <FormField id="organizationId" label="Organização">
        <Controller
          name="organizationId"
          control={control}
          render={({ field }) => (
            <>
              <Select
                value={field.value || ""}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              >
                <SelectTrigger className={errors.organizationId ? "border-red-500" : ""}>
                  <SelectValue placeholder="Selecione uma organização (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sem organização</SelectItem>
                  {organizations.map(org => (
                    <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.organizationId && (
                <p className="text-red-500 text-sm mt-1">{errors.organizationId.message}</p>
              )}
            </>
          )}
        />
      </FormField>

      <FormField id="address" label="Endereço">
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <>
              <Input
                id="address"
                {...field}
                placeholder="Rua, número, bairro, cidade, estado"
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </>
          )}
        />
      </FormField>

      <FormField id="status" label="Status">
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <>
              <Select
                value={field.value || "active"}
                onValueChange={field.onChange}
              >
                <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
              )}
            </>
          )}
        />
      </FormField>
    </div>
  );
};

export default CustomerPersonForm;
