
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface TutorialNavigationProps {
  onSkip: () => void;
  onComplete: () => void;
}

const TutorialNavigation = ({ onSkip, onComplete }: TutorialNavigationProps) => {
  return (
    <div className="flex justify-between pt-4">
      <Button variant="ghost" onClick={onSkip}>
        Pular tutoriais
      </Button>
      <Button onClick={onComplete} className="flex items-center">
        Concluir onboarding <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default TutorialNavigation;
