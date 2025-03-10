
import { useToast } from '@/hooks/use-toast';

export const useContentActions = () => {
  const { toast } = useToast();

  const handleCreateTask = (dealId: string) => {
    console.log(`Criando tarefa para deal ${dealId}`);
    toast({
      title: "Tarefa Criada",
      description: "Nova tarefa adicionada ao negócio",
    });
  };

  const handleCreateNote = (dealId: string) => {
    console.log(`Criando nota para deal ${dealId}`);
    toast({
      title: "Nota Criada",
      description: "Nova nota adicionada ao negócio",
    });
  };

  const handleCreateDocument = (dealId: string) => {
    console.log(`Criando documento para deal ${dealId}`);
    toast({
      title: "Documento Criado",
      description: "Novo documento adicionado ao negócio",
    });
  };

  const handleCreateEmail = (dealId: string) => {
    console.log(`Criando email para deal ${dealId}`);
    toast({
      title: "Email Criado",
      description: "Novo email adicionado ao negócio",
    });
  };

  // Get chat preview (last 3 messages)
  const getChatPreview = (dealId: string) => {
    // In a real scenario, this would be loaded from the API
    return [
      { id: 'msg-3', text: 'Podemos fechar o contrato na próxima semana.', sender: 'user', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
      { id: 'msg-2', text: 'As condições parecem favoráveis.', sender: 'agent', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      { id: 'msg-1', text: 'Vamos revisar os termos do contrato.', sender: 'user', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) },
    ];
  };

  return {
    handleCreateTask,
    handleCreateNote,
    handleCreateDocument,
    handleCreateEmail,
    getChatPreview
  };
};
