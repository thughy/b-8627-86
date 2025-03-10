
import { Person, Organization } from "@/pages/Workflows/models/CustomerModel";

// Dados de exemplo para desenvolvimento
export const mockCustomers: Array<Person | Organization> = [
  {
    id: "c1",
    name: "João Silva",
    type: "person",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    cpfCnpj: "123.456.789-01",
    status: "active",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-20")
  } as Person,
  {
    id: "c2",
    name: "Empresa ABC Ltda",
    type: "organization",
    email: "contato@empresaabc.com",
    phone: "(11) 3456-7890",
    tradingName: "Empresa ABC",
    cnpj: "12.345.678/0001-90",
    address: "Av. Paulista, 1000, São Paulo - SP",
    status: "active",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-05-15")
  } as Organization,
  {
    id: "c3",
    name: "Maria Oliveira",
    type: "person",
    email: "maria.oliveira@email.com",
    phone: "(21) 99876-5432",
    cpfCnpj: "987.654.321-09",
    status: "inactive",
    createdAt: new Date("2023-03-22"),
    updatedAt: new Date("2023-07-01")
  } as Person,
  {
    id: "c4",
    name: "Tech Solutions S.A.",
    type: "organization",
    email: "contato@techsolutions.com",
    phone: "(11) 2345-6789",
    tradingName: "Tech Solutions",
    cnpj: "98.765.432/0001-10",
    address: "Rua Vergueiro, 500, São Paulo - SP",
    status: "active",
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-06-10")
  } as Organization,
  {
    id: "c5",
    name: "Carlos Ferreira",
    type: "person",
    email: "carlos.ferreira@email.com",
    phone: "(31) 98765-1234",
    cpfCnpj: "456.789.123-45",
    status: "active",
    createdAt: new Date("2023-05-18"),
    updatedAt: new Date("2023-08-01")
  } as Person,
  {
    id: "c6",
    name: "Global Services Ltda",
    type: "organization",
    email: "contato@globalservices.com",
    phone: "(11) 5678-9012",
    tradingName: "Global Services",
    cnpj: "65.432.198/0001-76",
    address: "Av. Rebouças, 3000, São Paulo - SP",
    status: "inactive",
    createdAt: new Date("2023-01-25"),
    updatedAt: new Date("2023-07-15")
  } as Organization,
  {
    id: "c7",
    name: "Ana Beatriz",
    type: "person",
    email: "ana.beatriz@email.com",
    phone: "(11) 97654-3210",
    cpfCnpj: "321.654.987-12",
    status: "active",
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-08-20")
  } as Person,
  {
    id: "c8",
    name: "Mega Industries S.A.",
    type: "organization",
    email: "contato@megaindustries.com",
    phone: "(11) 4567-8901",
    tradingName: "Mega Industries",
    cnpj: "54.321.098/0001-54",
    address: "Rua Augusta, 2000, São Paulo - SP",
    status: "active",
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-06-15")
  } as Organization
];
