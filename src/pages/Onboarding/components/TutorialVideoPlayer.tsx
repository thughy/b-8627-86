
import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { TutorialStep } from "../models/TutorialStep";

interface TutorialVideoPlayerProps {
  videoStep: TutorialStep | undefined;
  onVideoComplete: (videoId: number) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  isFirstVideo: boolean;
  isLastVideo: boolean;
}

const TutorialVideoPlayer = ({
  videoStep,
  onVideoComplete,
  onNavigate,
  isFirstVideo,
  isLastVideo,
}: TutorialVideoPlayerProps) => {
  if (!videoStep) return null;

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center relative overflow-hidden">
        {/* This would be a real video in a production app */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-background/80">
          <div className="text-center">
            <Play className="h-16 w-16 text-primary mx-auto mb-2 opacity-80" />
            <h3 className="text-lg font-medium">{videoStep.title}</h3>
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
              onClick={() => onVideoComplete(videoStep.id)}
            >
              <Play className="h-4 w-4 mr-1" /> Reproduzir
            </Button>
            <span className="text-xs text-white/80">{videoStep.duration}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('prev')}
          disabled={isFirstVideo}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('next')}
          disabled={isLastVideo}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};

export default TutorialVideoPlayer;
