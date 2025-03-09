
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AssetFilters from "./assets/AssetFilters";
import AssetList from "./assets/AssetList";
import AssetConfigModal from "./modals/AssetConfigModal";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import { getAssets } from "../services/settingsService";

const AssetSettings = () => {
  // States for the component
  const [assets, setAssets] = React.useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = React.useState<Asset[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentAsset, setCurrentAsset] = React.useState<Asset | null>(null);

  // Fetch assets when component mounts
  useEffect(() => {
    const loadAssets = () => {
      const assetData = getAssets();
      setAssets(assetData);
      setFilteredAssets(assetData);
    };
    
    loadAssets();
  }, []);

  // Filter assets based on search term and status
  useEffect(() => {
    const filtered = assets.filter(asset => {
      const matchesSearch = 
        asset.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        asset.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || asset.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    setFilteredAssets(filtered);
  }, [searchTerm, statusFilter, assets]);

  // Handle opening the modal for creating a new asset
  const handleAddAsset = () => {
    setCurrentAsset(null);
    setIsModalOpen(true);
  };

  // Handle opening the modal for editing an existing asset
  const handleEditAsset = (asset: Asset) => {
    setCurrentAsset(asset);
    setIsModalOpen(true);
  };

  // Handle saving an asset (both create and update)
  const handleSaveAsset = (asset: Asset) => {
    if (currentAsset) {
      // Update existing asset
      setAssets(prev => 
        prev.map(a => a.id === asset.id ? asset : a)
      );
    } else {
      // Create new asset
      setAssets(prev => [...prev, asset]);
    }
    
    setIsModalOpen(false);
  };

  // Handle deleting an asset
  const handleDeleteAsset = (assetId: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== assetId));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <AssetFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            onAddAsset={handleAddAsset}
          />
          
          <AssetList
            assets={filteredAssets}
            onEditAsset={handleEditAsset}
            onDeleteAsset={handleDeleteAsset}
          />
        </CardContent>
      </Card>
      
      {isModalOpen && (
        <AssetConfigModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          asset={currentAsset}
          onSave={handleSaveAsset}
          onDelete={handleDeleteAsset}
        />
      )}
    </div>
  );
};

export default AssetSettings;
