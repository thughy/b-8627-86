
import React from 'react';
import { Deal, Asset } from '@/pages/Workflows/models/WorkflowModels';
import { TimelineItemType } from './models/TimelineTypes';
import Timeline from './components/Timeline';
import NewAssetButton from './components/NewAssetButton';
import EmptyState from './components/EmptyState';
import { 
  assetsToTimelineItems, 
  getMockTimelineItems, 
  formatRelativeDate 
} from './utils/timelineUtils';

interface FocusTabContentProps {
  deal: Deal;
  assets?: Asset[]; 
  filter: string;
  onCreateAsset?: (dealId: string, asset?: Partial<Asset>) => void;
}

const FocusTabContent: React.FC<FocusTabContentProps> = ({ 
  deal, 
  assets = [],
  filter,
  onCreateAsset 
}) => {
  // Convert assets to timeline items
  const assetItems: TimelineItemType[] = assetsToTimelineItems(assets);

  // Get mock items for other types
  const mockItems: TimelineItemType[] = getMockTimelineItems();

  // Combine all items in a single timeline
  const allItems: TimelineItemType[] = [...assetItems, ...mockItems];

  // Sort by date (most recent first)
  const sortedItems = allItems.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Apply the selected filter
  const filteredItems = filter === 'all' 
    ? sortedItems 
    : sortedItems.filter(item => {
        // Convert the filter to the corresponding type (e.g., 'assets' -> 'asset')
        const filterType = filter.endsWith('s') ? filter.slice(0, -1) : filter;
        return item.type === filterType;
      });

  const handleAssetClick = (item: TimelineItemType) => {
    if (item.type === 'asset' && item.metadata?.asset) {
      console.log("Asset clicked:", item.metadata.asset);
      // The parent component should handle this click and open the modal
    }
  };

  const handleCreateAsset = () => {
    if (onCreateAsset) {
      onCreateAsset(deal.id);
    }
  };

  return (
    <div className="space-y-4">
      <NewAssetButton onClick={handleCreateAsset} />
      <Timeline 
        items={filteredItems} 
        onItemClick={handleAssetClick} 
        formatRelativeDate={formatRelativeDate} 
      />
    </div>
  );
};

export default FocusTabContent;
