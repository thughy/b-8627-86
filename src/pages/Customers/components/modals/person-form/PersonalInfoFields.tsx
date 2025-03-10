
import React from "react";
import FormField from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { PersonFormValues } from "../../../validations/customerSchema";
import InputMask from "react-input-mask";

const PersonalInfoFields: React.FC = () => {
  const { control, formState: { errors } } = useFormContext<PersonFormValues>();

  return (
    <>
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
                <InputMask
                  mask="(99) 99999-9999"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  {(inputProps: any) => (
                    <Input
                      id="phone"
                      {...inputProps}
                      placeholder="(00) 00000-0000"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                  )}
                </InputMask>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </>
            )}
          />
        </FormField>
      </div>
    </>
  );
};

export default PersonalInfoFields;
