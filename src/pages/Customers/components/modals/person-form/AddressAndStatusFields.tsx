
import React from "react";
import FormField from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { PersonFormValues } from "../../../validations/customerSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddressAndStatusFields: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<PersonFormValues>();

  return (
    <>
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
    </>
  );
};

export default AddressAndStatusFields;
