
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PlanFeature {
  text: string;
}

interface PricingPlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const PricingPlan = ({ name, price, description, features, popular }: PricingPlanProps) => (
  <div 
    className={`bg-[#252525] p-8 rounded-2xl hover:bg-[#2a2a2a] transition-all relative ${
      popular ? 'border-2 border-blue-500' : ''
    }`}
  >
    {popular && (
      <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
        Mais popular
      </span>
    )}
    <h3 className="text-2xl font-bold mb-2">{name}</h3>
    <p className="text-gray-400 mb-4">{description}</p>
    <p className="text-3xl font-bold mb-6">{price}<span className="text-sm text-gray-400">/mês</span></p>
    <ul className="space-y-3 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center">
          <Check className="h-5 w-5 text-green-500 mr-2" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Button 
      className={`w-full ${popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
      variant={popular ? 'default' : 'outline'}
    >
      Escolher plano
    </Button>
  </div>
);

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Básico",
      price: "R$149,90",
      description: "Ideal para pequenas empresas",
      features: [
        "2 Workflows",
        "Departamento Comercial",
        "Departamento de Suporte",
        "3 Agentes de IA",
        "5 Colaboradores"
      ]
    },
    {
      name: "Intermediário",
      price: "R$249,90",
      description: "Perfeito para empresas em crescimento",
      features: [
        "5 Workflows",
        "Departamentos Comercial, Suporte e Marketing",
        "10 Agentes de IA",
        "10 Colaboradores",
        "Acesso ao Marketplace"
      ],
      popular: true
    },
    {
      name: "Avançado",
      price: "R$449,90",
      description: "Para empresas que buscam crescimento acelerado",
      features: [
        "Workflows ilimitados",
        "Todos os Departamentos",
        "Agentes de IA ilimitados",
        "25 Colaboradores",
        "Acesso completo ao Marketplace",
        "Suporte prioritário"
      ]
    }
  ];

  return (
    <section className="py-16 px-4 md:px-6 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Planos e Preços
        </h2>
        <p className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto">
          Escolha o plano ideal para o seu negócio
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingPlan
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
