
import { z } from 'zod';

// Base schema for common fields between person and organization
const customerBaseSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  status: z.enum(["active", "inactive"])
});

// Person schema
export const personSchema = customerBaseSchema.extend({
  type: z.literal("person"),
  cpfCnpj: z.string()
    .optional()
    .or(z.literal(""))
    .refine(val => !val || validateCPF(val.replace(/[^\d]/g, "")), {
      message: "CPF inválido"
    }),
  organizationId: z.string().optional().or(z.literal("")),
  organizationName: z.string().optional().or(z.literal(""))
});

// Organization schema
export const organizationSchema = customerBaseSchema.extend({
  type: z.literal("organization"),
  tradingName: z.string().optional().or(z.literal("")),
  cnpj: z.string()
    .optional()
    .or(z.literal(""))
    .refine(val => !val || validateCNPJ(val.replace(/[^\d]/g, "")), {
      message: "CNPJ inválido"
    })
});

// Combined schema for both types
export const customerSchema = z.discriminatedUnion("type", [
  personSchema,
  organizationSchema
]);

// Helper function to validate CPF
function validateCPF(cpf: string): boolean {
  if (!cpf || cpf.length !== 11) return false;
  
  // Check if all digits are the same (invalid case)
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Calculate first digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  let digit1 = (remainder === 10 || remainder === 11) ? 0 : remainder;
  
  // Calculate second digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  let digit2 = (remainder === 10 || remainder === 11) ? 0 : remainder;
  
  // Check if calculated digits match the provided ones
  return (
    parseInt(cpf.charAt(9)) === digit1 &&
    parseInt(cpf.charAt(10)) === digit2
  );
}

// Helper function to validate CNPJ
function validateCNPJ(cnpj: string): boolean {
  if (!cnpj || cnpj.length !== 14) return false;
  
  // Check if all digits are the same (invalid case)
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  
  // Calculate first digit
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;
  
  // Calculate second digit
  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits.charAt(1));
}

export type PersonFormValues = z.infer<typeof personSchema>;
export type OrganizationFormValues = z.infer<typeof organizationSchema>;
export type CustomerFormValues = z.infer<typeof customerSchema>;
