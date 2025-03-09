
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoIcon, ImageIcon, HistoryIcon, SettingsIcon, ClipboardListIcon } from "lucide-react";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import AssetProfileTab from "./AssetProfileTab";
import AssetDetailsTab from "./AssetDetailsTab";
import AssetParamsTab from "./AssetParamsTab";
import AssetMediaTab from "./AssetMediaTab";
import AssetHistoryTab from "./AssetHistoryTab";

interface AssetTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  formData: Partial<Asset>;
  onChange: (key: string, value: any) => void;
}

const AssetTabs = ({ activeTab, setActiveTab, formData, onChange }: AssetTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-5">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <InfoIcon className="h-4 w-4" />
          <span>Perfil</span>
        </TabsTrigger>
        <TabsTrigger value="details" className="flex items-center gap-2">
          <ClipboardListIcon className="h-4 w-4" />
          <span>Detalhes</span>
        </TabsTrigger>
        <TabsTrigger value="params" className="flex items-center gap-2">
          <SettingsIcon className="h-4 w-4" />
          <span>Parâmetros</span>
        </TabsTrigger>
        <TabsTrigger value="media" className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          <span>Mídia</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <HistoryIcon className="h-4 w-4" />
          <span>Histórico</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4 mt-4">
        <AssetProfileTab 
          formData={formData} 
          onChange={onChange}
        />
      </TabsContent>

      <TabsContent value="details" className="space-y-4 mt-4">
        <AssetDetailsTab 
          formData={formData} 
          onChange={onChange}
        />
      </TabsContent>

      <TabsContent value="params" className="space-y-4 mt-4">
        <AssetParamsTab 
          formData={formData} 
          onChange={onChange}
        />
      </TabsContent>
      
      <TabsContent value="media" className="space-y-4 mt-4">
        <AssetMediaTab />
      </TabsContent>
      
      <TabsContent value="history" className="space-y-4 mt-4">
        <AssetHistoryTab />
      </TabsContent>
    </Tabs>
  );
};

export default AssetTabs;
