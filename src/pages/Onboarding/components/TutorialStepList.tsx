
import React from "react";
import { CheckCircle } from "lucide-react";
import { TutorialStep } from "../models/TutorialStep";

interface TutorialStepListProps {
  steps: TutorialStep[];
  activeVideo: number | null;
  watchedVideos: number[];
  onSelectVideo: (id: number) => void;
}

const TutorialStepList = ({
  steps,
  activeVideo,
  watchedVideos,
  onSelectVideo,
}: TutorialStepListProps) => {
  return (
    <div className="space-y-3">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`p-3 rounded-md cursor-pointer transition-colors ${
            activeVideo === step.id
              ? "bg-primary/10 border border-primary/20"
              : "bg-muted/30 hover:bg-muted/60"
          }`}
          onClick={() => onSelectVideo(step.id)}
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
  );
};

export default TutorialStepList;
