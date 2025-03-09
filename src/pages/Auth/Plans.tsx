
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

interface PlanProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  workflows: string[];
}

const Plans = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const plans: PlanProps[] = [
    {
      title: "Básico",
      price: "R$39,98/mês",
      description: "Ideal para empresas pequenas e iniciantes",
      features: ["2 workflows inclusos", "Suporte básico", "Acesso a recursos essenciais"],
      workflows: ["Comercial", "Suporte"],
    },
    {
      title: "Intermediário",
      price: "R$59,97/mês",
      description: "Perfeito para empresas em crescimento",
      features: ["3 workflows inclusos", "Suporte prioritário", "Acesso a recursos avançados"],
      recommended: true,
      workflows: ["Comercial", "Suporte", "Marketing"],
    },
    {
      title: "Avançado",
      price: "R$79,96/mês",
      description: "Solução completa para negócios estabelecidos",
      features: ["4 workflows inclusos", "Suporte dedicado", "Acesso total aos recursos"],
      workflows: ["Comercial", "Suporte", "Marketing", "Financeiro"],
    },
  ];

  const handleSelectPlan = (planTitle: string) => {
    setSelectedPlan(planTitle);
  };

  const handleContinue = () => {
    if (!selectedPlan) {
      toast({
        title: "Selecione um plano",
        description: "Por favor, escolha um plano para continuar",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for payment
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Plano selecionado",
        description: `Você escolheu o plano ${selectedPlan}`,
      });
      navigate("/auth/payment");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/90 p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-300 mb-2">
            AutB
          </h1>
          <h2 className="text-2xl font-bold mb-4">Escolha seu plano</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Escolha o plano ideal para o seu negócio. Todos os planos incluem acesso à nossa plataforma
            e podem ser personalizados com itens adicionais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan) => (
            <Card
              key={plan.title}
              className={`relative ${
                selectedPlan === plan.title
                  ? "border-primary ring-2 ring-primary ring-opacity-50"
                  : ""
              } ${plan.recommended ? "transform md:-translate-y-4" : ""} transition-all hover:shadow-lg`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Recomendado
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.title}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Workflows inclusos:</h4>
                  <ul className="space-y-1 text-sm">
                    {plan.workflows.map((workflow) => (
                      <li key={workflow} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>{workflow}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Recursos:</h4>
                  <ul className="space-y-1 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant={selectedPlan === plan.title ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleSelectPlan(plan.title)}
                >
                  {selectedPlan === plan.title ? "Selecionado" : "Selecionar"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={isLoading || !selectedPlan}
            className="px-8"
          >
            {isLoading ? "Processando..." : "Continuar para pagamento"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
