
import { Asset } from '@/pages/Workflows/models/WorkflowModels';

export type TimelineItemType = {
  id: string;
  type: 'asset' | 'task' | 'note' | 'email' | 'document';
  title: string;
  description?: string;
  status?: string;
  date: Date;
  metadata?: Record<string, any>;
};

export interface TimelineDataProps {
  assetItems: TimelineItemType[];
  mockItems: TimelineItemType[];
}
