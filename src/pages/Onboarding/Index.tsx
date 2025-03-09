
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ArrowRight } from "lucide-react";
import OnboardingWorkflows from "./OnboardingWorkflows";
import OnboardingChannels from "./OnboardingChannels";
import OnboardingTutorial from "./OnboardingTutorial";

const OnboardingIndex = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleCompleteStep = (stepNumber: number) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
    
    if (stepNumber < 3) {
      setStep(stepNumber + 1);
    } else {
      // All steps completed, redirect to dashboard
      toast({
        title: "Onboarding concluído!",
        description: "Você está pronto para começar a usar o AutB.",
      });
      navigate("/dashboard");
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <OnboardingWorkflows onComplete={() => handleCompleteStep(1)} />;
      case 2:
        return <OnboardingChannels onComplete={() => handleCompleteStep(2)} />;
      case 3:
        return <OnboardingTutorial onComplete={() => handleCompleteStep(3)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-300 mb-2">
            AutB
          </h1>
          <h2 className="text-2xl font-bold mb-6">Configuração inicial</h2>
          <p className="text-muted-foreground text-center max-w-xl">
            Vamos configurar seu ambiente para que você possa começar a usar o AutB.
            Siga os passos abaixo para uma experiência completa.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex items-center max-w-3xl w-full">
            {[1, 2, 3].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div
                  className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${
                    step === stepNumber
                      ? "bg-primary text-primary-foreground"
                      : completedSteps.includes(stepNumber)
                      ? "bg-primary/80 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  } transition-all`}
                >
                  {completedSteps.includes(stepNumber) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`flex-1 h-1 ${
                      completedSteps.includes(stepNumber) ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <Card className="max-w-4xl mx-auto mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">
                {step === 1
                  ? "Workflows e Templates"
                  : step === 2
                  ? "Canais de Comunicação"
                  : "Tutorial Rápido"}
              </h3>
              <div className="text-sm text-muted-foreground">
                Passo {step} de 3
              </div>
            </div>
            
            {renderStepContent()}
          </CardContent>
        </Card>

        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Configuração pulada",
                description: "Você pode retornar a qualquer momento nas configurações.",
              });
              navigate("/dashboard");
            }}
            className="hover:bg-transparent"
          >
            Pular onboarding <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingIndex;
