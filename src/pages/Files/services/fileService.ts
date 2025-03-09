
import { File, FileFilter } from "@/pages/Files/models/FileModel";

// Dados de exemplo para desenvolvimento
const mockFiles: File[] = [
  {
    id: "f1",
    name: "Proposta Comercial.pdf",
    type: "document",
    size: 1450000,
    extension: "pdf",
    url: "/files/proposta-comercial.pdf",
    path: "/workflows/comercial/propostas/",
    folder: "workflow",
    parentId: "w1",
    parentName: "Workflow Comercial",
    description: "Proposta comercial padrão para novos clientes",
    uploadedBy: "João Silva",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-20")
  },
  {
    id: "f2",
    name: "Contrato de Serviço.docx",
    type: "document",
    size: 985000,
    extension: "docx",
    url: "/files/contrato-servico.docx",
    path: "/workflows/comercial/contratos/",
    folder: "department",
    parentId: "d1",
    parentName: "Departamento Jurídico",
    description: "Modelo de contrato para prestação de serviços",
    uploadedBy: "Maria Oliveira",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-05-15")
  },
  {
    id: "f3",
    name: "Apresentação Institucional.pptx",
    type: "document",
    size: 7850000,
    extension: "pptx",
    url: "/files/apresentacao-institucional.pptx",
    path: "/workflows/marketing/apresentacoes/",
    folder: "pipeline",
    parentId: "p1",
    parentName: "Pipeline de Marketing",
    description: "Apresentação institucional atualizada",
    uploadedBy: "Carlos Ferreira",
    createdAt: new Date("2023-03-22"),
    updatedAt: new Date("2023-07-01")
  },
  {
    id: "f4",
    name: "Logo Empresa.png",
    type: "image",
    size: 2500000,
    extension: "png",
    url: "/files/logo-empresa.png",
    path: "/workflows/marketing/identidade-visual/",
    folder: "asset",
    parentId: "a1",
    parentName: "Asset de Identidade Visual",
    description: "Logo oficial da empresa em alta resolução",
    uploadedBy: "Ana Beatriz",
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-06-10")
  },
  {
    id: "f5",
    name: "Vídeo Treinamento.mp4",
    type: "video",
    size: 45000000,
    extension: "mp4",
    url: "/files/video-treinamento.mp4",
    path: "/workflows/rh/treinamentos/",
    folder: "stage",
    parentId: "s1",
    parentName: "Estágio de Onboarding",
    description: "Vídeo de treinamento para novos colaboradores",
    uploadedBy: "Paulo Santos",
    createdAt: new Date("2023-05-18"),
    updatedAt: new Date("2023-08-01")
  },
  {
    id: "f6",
    name: "Áudio Reunião.mp3",
    type: "audio",
    size: 15000000,
    extension: "mp3",
    url: "/files/audio-reuniao.mp3",
    path: "/workflows/comercial/reunioes/",
    folder: "deal",
    parentId: "deal1",
    parentName: "Deal com Cliente ABC",
    description: "Gravação da reunião de alinhamento",
    uploadedBy: "Roberto Almeida",
    createdAt: new Date("2023-01-25"),
    updatedAt: new Date("2023-07-15")
  },
  {
    id: "f7",
    name: "Arquivos do Projeto.zip",
    type: "archive",
    size: 120000000,
    extension: "zip",
    url: "/files/arquivos-projeto.zip",
    path: "/workflows/tecnologia/projetos/",
    folder: "asset",
    parentId: "a2",
    parentName: "Asset de Desenvolvimento",
    description: "Arquivos compactados do projeto",
    uploadedBy: "Fernanda Lima",
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-08-20")
  },
  {
    id: "f8",
    name: "Relatório Financeiro.xlsx",
    type: "document",
    size: 3500000,
    extension: "xlsx",
    url: "/files/relatorio-financeiro.xlsx",
    path: "/workflows/financeiro/relatorios/",
    folder: "department",
    parentId: "d2",
    parentName: "Departamento Financeiro",
    description: "Relatório financeiro trimestral",
    uploadedBy: "Marcelo Costa",
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-06-15")
  },
  {
    id: "f9",
    name: "Manual do Produto.pdf",
    type: "document",
    size: 5200000,
    extension: "pdf",
    url: "/files/manual-produto.pdf",
    path: "/workflows/suporte/manuais/",
    folder: "pipeline",
    parentId: "p2",
    parentName: "Pipeline de Suporte",
    description: "Manual de instruções do produto",
    uploadedBy: "Juliana Mendes",
    createdAt: new Date("2023-04-22"),
    updatedAt: new Date("2023-09-05")
  },
  {
    id: "f10",
    name: "Imagem de Capa.jpg",
    type: "image",
    size: 3800000,
    extension: "jpg",
    url: "/files/imagem-capa.jpg",
    path: "/workflows/marketing/campanhas/",
    folder: "stage",
    parentId: "s2",
    parentName: "Estágio de Campanha",
    description: "Imagem de capa para campanha nas redes sociais",
    uploadedBy: "Carolina Souza",
    createdAt: new Date("2023-05-05"),
    updatedAt: new Date("2023-07-20")
  }
];

export const getFiles = () => {
  return [...mockFiles];
};

export const getFileById = (id: string): File | undefined => {
  return mockFiles.find(file => file.id === id);
};

export const createFile = (file: Omit<File, 'id' | 'createdAt' | 'updatedAt'>): File => {
  const newFile: File = {
    ...file,
    id: `f${mockFiles.length + 1}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockFiles.push(newFile);
  return newFile;
};

export const updateFile = (id: string, fileData: Partial<File>): File | undefined => {
  const fileIndex = mockFiles.findIndex(f => f.id === id);
  
  if (fileIndex === -1) return undefined;
  
  const updatedFile: File = {
    ...mockFiles[fileIndex],
    ...fileData,
    updatedAt: new Date()
  };
  
  mockFiles[fileIndex] = updatedFile;
  return updatedFile;
};

export const deleteFile = (id: string): boolean => {
  const fileIndex = mockFiles.findIndex(f => f.id === id);
  
  if (fileIndex === -1) return false;
  
  mockFiles.splice(fileIndex, 1);
  return true;
};

export const filterFiles = (filters: FileFilter, page: number = 1, limit: number = 10) => {
  let filtered = [...mockFiles];
  
  // Aplicar filtro de pesquisa
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(file => 
      file.name.toLowerCase().includes(searchLower) ||
      file.description?.toLowerCase().includes(searchLower) ||
      file.parentName?.toLowerCase().includes(searchLower)
    );
  }
  
  // Aplicar filtro de tipo
  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(file => file.type === filters.type);
  }
  
  // Aplicar filtro de pasta
  if (filters.folder && filters.folder !== 'all') {
    filtered = filtered.filter(file => file.folder === filters.folder);
  }
  
  // Calcular paginação
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / limit);
  const start = (page - 1) * limit;
  const end = Math.min(start + limit, totalItems);
  const paginatedItems = filtered.slice(start, end);
  
  return {
    files: paginatedItems,
    pagination: {
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit
    }
  };
};
