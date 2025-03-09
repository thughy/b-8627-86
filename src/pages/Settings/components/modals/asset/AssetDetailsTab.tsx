
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";

interface AssetDetailsTabProps {
  asset: Partial<Asset>;
  onAssetChange: (field: string, value: any) => void;
}

const AssetDetailsTab: React.FC<AssetDetailsTabProps> = ({ asset, onAssetChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <Select 
          value={asset.status || "open"} 
          onValueChange={(value) => onAssetChange("status", value)}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Aberto</SelectItem>
            <SelectItem value="processing">Processando</SelectItem>
            <SelectItem value="completed">Concluído</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="amount">Valor</Label>
        <Input
          id="amount"
          type="number"
          value={asset.amount || ""}
          onChange={(e) => onAssetChange("amount", parseFloat(e.target.value))}
          placeholder="Valor do asset"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Data de Início</Label>
          <DatePicker 
            date={asset.startDate} 
            onSelect={(date) => onAssetChange("startDate", date)} 
            placeholder="Selecione a data de início"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">Data de Conclusão</Label>
          <DatePicker 
            date={asset.endDate} 
            onSelect={(date) => onAssetChange("endDate", date)} 
            placeholder="Selecione a data de conclusão"
          />
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsTab;
