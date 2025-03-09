
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, CheckCircle, Play } from "lucide-react";

interface OnboardingTutorialProps {
  onComplete: () => void;
}

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  videoId: string;
  duration: string;
}

const OnboardingTutorial = ({ onComplete }: OnboardingTutorialProps) => {
  const { toast } = useToast();
  const [watchedVideos, setWatchedVideos] = useState<number[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(1);

  const tutorialSteps: TutorialStep[] = [
    {
      id: 1,
      title: "Navegação básica",
      description: "Aprenda a navegar pela interface do AutB e entender as principais seções",
      videoId: "tutorial-navigation",
      duration: "2:45",
    },
    {
      id: 2,
      title: "Gerenciando workflows",
      description: "Como criar, editar e organizar seus workflows de maneira eficiente",
      videoId: "tutorial-workflows",
      duration: "3:20",
    },
    {
      id: 3,
      title: "Configurando agentes de IA",
      description: "Aprenda a configurar agentes de IA para automatizar tarefas em seus workflows",
      videoId: "tutorial-agents",
      duration: "4:15",
    },
    {
      id: 4,
      title: "Integrando canais de comunicação",
      description: "Como conectar e usar diferentes canais de comunicação em seus processos",
      videoId: "tutorial-channels",
      duration: "2:50",
    },
  ];

  const handleVideoComplete = (videoId: number) => {
    if (!watchedVideos.includes(videoId)) {
      setWatchedVideos([...watchedVideos, videoId]);
    }
    
    // Auto-select next video if available
    const nextVideoId = videoId + 1;
    if (tutorialSteps.find(step => step.id === nextVideoId)) {
      setActiveVideo(nextVideoId);
    }
  };

  const handleContinue = () => {
    if (watchedVideos.length === 0) {
      toast({
        title: "Nenhum tutorial assistido",
        description: "Recomendamos assistir pelo menos o primeiro tutorial",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Tutorial concluído!",
      description: "Você está pronto para começar a usar o AutB",
    });
    
    onComplete();
  };

  const handleSkipTutorial = () => {
    toast({
      title: "Tutorial pulado",
      description: "Você pode acessar os tutoriais a qualquer momento em Ajuda > Tutoriais",
    });
    
    onComplete();
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground mb-4">
        Assista aos tutoriais rápidos para aprender a usar as principais funcionalidades do AutB.
        Você pode assistir todos agora ou voltar para eles depois no menu de ajuda.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-3">
          {tutorialSteps.map((step) => (
            <div
              key={step.id}
              className={`p-3 rounded-md cursor-pointer transition-colors ${
                activeVideo === step.id
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-muted/30 hover:bg-muted/60"
              }`}
              onClick={() => setActiveVideo(step.id)}
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm flex items-center">
                  {step.title}
                  {watchedVideos.includes(step.id) && (
                    <CheckCircle className="h-3.5 w-3.5 text-primary ml-2" />
                  )}
                </h4>
                <span className="text-xs text-muted-foreground">{step.duration}</span>
              </div>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="md:col-span-2">
          {activeVideo && (
            <div className="space-y-4">
              <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* This would be a real video in a production app */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-background/80">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-primary mx-auto mb-2 opacity-80" />
                    <h3 className="text-lg font-medium">
                      {tutorialSteps.find(s => s.id === activeVideo)?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Clique para assistir o tutorial
                    </p>
                  </div>
                </div>
                
                {/* Simulate video controls */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-8 bg-primary/20 hover:bg-primary/40 border-none"
                      onClick={() => handleVideoComplete(activeVideo)}
                    >
                      <Play className="h-4 w-4 mr-1" /> Reproduzir
                    </Button>
                    <span className="text-xs text-white/80">
                      {tutorialSteps.find(s => s.id === activeVideo)?.duration}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const prevId = activeVideo - 1;
                    if (prevId >= 1) {
                      setActiveVideo(prevId);
                    }
                  }}
                  disabled={activeVideo <= 1}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const nextId = activeVideo + 1;
                    if (nextId <= tutorialSteps.length) {
                      setActiveVideo(nextId);
                    }
                  }}
                  disabled={activeVideo >= tutorialSteps.length}
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={handleSkipTutorial}>
          Pular tutoriais
        </Button>
        <Button onClick={handleContinue} className="flex items-center">
          Concluir onboarding <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingTutorial;
