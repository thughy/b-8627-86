
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TutorialStepList from "./components/TutorialStepList";
import TutorialVideoPlayer from "./components/TutorialVideoPlayer";
import TutorialNavigation from "./components/TutorialNavigation";
import { getTutorialSteps } from "./services/tutorialService";

interface OnboardingTutorialProps {
  onComplete: () => void;
}

const OnboardingTutorial = ({ onComplete }: OnboardingTutorialProps) => {
  const { toast } = useToast();
  const [watchedVideos, setWatchedVideos] = useState<number[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(1);
  
  const tutorialSteps = getTutorialSteps();

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

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!activeVideo) return;
    
    const nextId = direction === 'next' ? activeVideo + 1 : activeVideo - 1;
    if (direction === 'next' && nextId <= tutorialSteps.length) {
      setActiveVideo(nextId);
    } else if (direction === 'prev' && nextId >= 1) {
      setActiveVideo(nextId);
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

  const activeStep = tutorialSteps.find(step => step.id === activeVideo);
  const isFirstVideo = activeVideo === 1;
  const isLastVideo = activeVideo === tutorialSteps.length;

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground mb-4">
        Assista aos tutoriais rápidos para aprender a usar as principais funcionalidades do AutB.
        Você pode assistir todos agora ou voltar para eles depois no menu de ajuda.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <TutorialStepList 
            steps={tutorialSteps}
            activeVideo={activeVideo}
            watchedVideos={watchedVideos}
            onSelectVideo={setActiveVideo}
          />
        </div>

        <div className="md:col-span-2">
          <TutorialVideoPlayer 
            videoStep={activeStep}
            onVideoComplete={handleVideoComplete}
            onNavigate={handleNavigate}
            isFirstVideo={isFirstVideo}
            isLastVideo={isLastVideo}
          />
        </div>
      </div>

      <TutorialNavigation 
        onSkip={handleSkipTutorial}
        onComplete={handleContinue}
      />
    </div>
  );
};

export default OnboardingTutorial;
