
import React from "react";
import FormField from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { OrganizationFormValues } from "../../../validations/customerSchema";
import InputMask from "react-input-mask";

const DocumentField: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<OrganizationFormValues>();

  return (
    <FormField id="cnpj" label="CNPJ">
      <Controller
        name="cnpj"
        control={control}
        render={({ field }) => (
          <>
            <InputMask
              mask="99.999.999/9999-99"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            >
              {(inputProps: any) => (
                <Input
                  id="cnpj"
                  {...inputProps}
                  placeholder="00.000.000/0001-00"
                  className={errors.cnpj ? "border-red-500" : ""}
                />
              )}
            </InputMask>
            {errors.cnpj && (
              <p className="text-red-500 text-sm mt-1">{errors.cnpj.message}</p>
            )}
          </>
        )}
      />
    </FormField>
  );
};

export default DocumentField;
