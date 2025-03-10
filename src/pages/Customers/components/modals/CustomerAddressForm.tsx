
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectField from "@/components/ui/select-field";
import FormField from "@/components/ui/form-field";

interface AddressFormProps {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  onChange: (field: string, value: string) => void;
}

const stateOptions = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" }
];

const countryOptions = [
  { value: "Brasil", label: "Brasil" },
  { value: "Estados Unidos", label: "Estados Unidos" },
  { value: "Argentina", label: "Argentina" },
  { value: "Chile", label: "Chile" },
  { value: "Uruguai", label: "Uruguai" },
  { value: "Paraguai", label: "Paraguai" },
  { value: "Colômbia", label: "Colômbia" },
  { value: "Peru", label: "Peru" },
  { value: "México", label: "México" },
  { value: "Canadá", label: "Canadá" }
];

const CustomerAddressForm: React.FC<AddressFormProps> = ({
  address,
  city,
  state,
  zipCode,
  country,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <FormField id="address" label="Endereço">
        <Input
          id="address"
          placeholder="Rua, número, complemento"
          value={address}
          onChange={(e) => onChange("address", e.target.value)}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField id="city" label="Cidade">
          <Input
            id="city"
            placeholder="Cidade"
            value={city}
            onChange={(e) => onChange("city", e.target.value)}
          />
        </FormField>

        <SelectField
          id="state"
          label="Estado"
          value={state}
          onChange={(value) => onChange("state", value)}
          options={stateOptions}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField id="zipCode" label="CEP">
          <Input
            id="zipCode"
            placeholder="CEP"
            value={zipCode}
            onChange={(e) => onChange("zipCode", e.target.value)}
          />
        </FormField>

        <SelectField
          id="country"
          label="País"
          value={country}
          onChange={(value) => onChange("country", value)}
          options={countryOptions}
        />
      </div>
    </div>
  );
};

export default CustomerAddressForm;
