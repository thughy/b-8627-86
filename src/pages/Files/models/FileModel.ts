
export interface File {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other';
  size: number;
  extension: string;
  url: string;
  path: string;
  folder: 'workflow' | 'department' | 'pipeline' | 'stage' | 'deal' | 'asset' | 'other';
  parentId?: string;
  parentName?: string;
  description?: string;
  uploadedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FileFilter {
  search?: string;
  type?: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'all';
  folder?: 'workflow' | 'department' | 'pipeline' | 'stage' | 'deal' | 'asset' | 'all';
}
