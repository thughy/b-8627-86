
import { TutorialStep } from "../models/TutorialStep";

export const getTutorialSteps = (): TutorialStep[] => {
  return [
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
};
