
export function useDealOptions() {
  const statusOptions = [
    { value: 'open', label: 'Aberto' },
    { value: 'won', label: 'Ganho' },
    { value: 'lost', label: 'Perdido' },
    { value: 'completed', label: 'Concluído' },
  ];

  const typeOptions = [
    { value: 'product', label: 'Produto' },
    { value: 'service', label: 'Serviço' },
    { value: 'property', label: 'Imóvel' },
    { value: 'vehicle', label: 'Automóvel' },
    { value: 'rental', label: 'Aluguel' },
    { value: 'subscription', label: 'Assinatura' },
    { value: 'contract', label: 'Contrato' },
  ];

  const interestsOptions = [
    { value: 'undecided', label: 'Indeciso' },
    { value: 'interested', label: 'Interessado' },
    { value: 'negotiate', label: 'Negociar' },
    { value: 'buy', label: 'Comprar' },
  ];

  const reasonForLossOptions = [
    { value: 'price', label: 'Preços' },
    { value: 'deadline', label: 'Prazo' },
    { value: 'quality', label: 'Qualidade' },
    { value: 'technical', label: 'Técnica' },
    { value: 'unavailability', label: 'Indisponibilidade' },
    { value: 'delay', label: 'Atraso' },
    { value: 'competitor', label: 'Concorrência' },
  ];

  const customerTypeOptions = [
    { value: 'person', label: 'Pessoa Física' },
    { value: 'organization', label: 'Pessoa Jurídica' },
  ];

  return {
    statusOptions,
    typeOptions,
    interestsOptions,
    reasonForLossOptions,
    customerTypeOptions
  };
}
