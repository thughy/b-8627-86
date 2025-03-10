
import React from "react";
import FormField from "@/components/ui/form-field";
import { Controller, useFormContext } from "react-hook-form";
import { PersonFormValues } from "../../../validations/customerSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrganizationSelectorProps {
  organizations: { id: string; name: string }[];
}

const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({ organizations }) => {
  const { control, formState: { errors } } = useFormContext<PersonFormValues>();

  return (
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
  );
};

export default OrganizationSelector;
