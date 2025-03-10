
import React from "react";
import FormField from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { OrganizationFormValues } from "../../../validations/customerSchema";

const CompanyInfoFields: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<OrganizationFormValues>();

  return (
    <>
      <FormField id="name" label="Razão Social" required>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <>
              <Input
                id="name"
                {...field}
                placeholder="Digite a razão social"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </>
          )}
        />
      </FormField>

      <FormField id="tradingName" label="Nome Fantasia">
        <Controller
          name="tradingName"
          control={control}
          render={({ field }) => (
            <>
              <Input
                id="tradingName"
                {...field}
                placeholder="Digite o nome fantasia"
                className={errors.tradingName ? "border-red-500" : ""}
              />
              {errors.tradingName && (
                <p className="text-red-500 text-sm mt-1">{errors.tradingName.message}</p>
              )}
            </>
          )}
        />
      </FormField>
    </>
  );
};

export default CompanyInfoFields;
