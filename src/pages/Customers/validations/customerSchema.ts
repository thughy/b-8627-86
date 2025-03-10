
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
  cpfCnpj: z.string().optional().or(z.literal("")),
  organizationId: z.string().optional().or(z.literal("")),
  organizationName: z.string().optional().or(z.literal(""))
});

// Organization schema
export const organizationSchema = customerBaseSchema.extend({
  type: z.literal("organization"),
  tradingName: z.string().optional().or(z.literal("")),
  cnpj: z.string().optional().or(z.literal(""))
});

// Combined schema for both types
export const customerSchema = z.discriminatedUnion("type", [
  personSchema,
  organizationSchema
]);

export type PersonFormValues = z.infer<typeof personSchema>;
export type OrganizationFormValues = z.infer<typeof organizationSchema>;
export type CustomerFormValues = z.infer<typeof customerSchema>;
