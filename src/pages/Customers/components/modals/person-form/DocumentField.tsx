
import React from "react";
import FormField from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { PersonFormValues } from "../../../validations/customerSchema";
import InputMask from "react-input-mask";

const DocumentField: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<PersonFormValues>();

  return (
    <FormField id="cpfCnpj" label="CPF">
      <Controller
        name="cpfCnpj"
        control={control}
        render={({ field }) => (
          <>
            <InputMask
              mask="999.999.999-99"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            >
              {(inputProps: any) => (
                <Input
                  id="cpfCnpj"
                  {...inputProps}
                  placeholder="000.000.000-00"
                  className={errors.cpfCnpj ? "border-red-500" : ""}
                />
              )}
            </InputMask>
            {errors.cpfCnpj && (
              <p className="text-red-500 text-sm mt-1">{errors.cpfCnpj.message}</p>
            )}
          </>
        )}
      />
    </FormField>
  );
};

export default DocumentField;
