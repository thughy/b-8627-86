
import { WorkflowTemplate } from "../models/WorkflowTemplate";

export const getWorkflowTemplates = (): WorkflowTemplate[] => {
  return [
    {
      id: "comercial",
      title: "Workflow Comercial",
      description: "Gerenciamento completo de leads, oportunidades e vendas",
      type: "Workflow Completo",
    },
    {
      id: "suporte",
      title: "Workflow Suporte",
      description: "Atendimento ao cliente e gestão de tickets",
      type: "Workflow Completo",
    },
    {
      id: "marketing",
      title: "Workflow Marketing",
      description: "Automação de campanhas e nutrição de leads",
      type: "Workflow Completo",
    },
    {
      id: "financeiro",
      title: "Workflow Financeiro",
      description: "Gestão de cobranças e pagamentos",
      type: "Workflow Completo",
    },
  ];
};
