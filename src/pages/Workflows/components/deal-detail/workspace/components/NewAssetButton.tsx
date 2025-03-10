
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface NewAssetButtonProps {
  onClick: () => void;
}

const NewAssetButton: React.FC<NewAssetButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-end mb-4">
      <Button 
        size="sm" 
        onClick={onClick}
        className="flex items-center gap-1"
      >
        <Plus className="h-4 w-4 mr-1" />
        Novo Asset
      </Button>
    </div>
  );
};

export default NewAssetButton;
