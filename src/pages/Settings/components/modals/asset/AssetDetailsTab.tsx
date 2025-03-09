
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";
import { formatCurrency } from "@/lib/utils";

interface AssetDetailsTabProps {
  asset: Partial<Asset>;
  onAssetChange: (field: string, value: any) => void;
}

const AssetDetailsTab: React.FC<AssetDetailsTabProps> = ({ asset, onAssetChange }) => {
  // Helper function to format currency input values
  const formatAmountForDisplay = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    if (!numericValue) return '';
    
    const amount = parseInt(numericValue, 10);
    return amount.toString();
  };

  return (
    <div className="space-y-6">
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
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-muted-foreground">R$</span>
          <Input
            id="amount"
            type="text"
            inputMode="numeric"
            value={asset.amount ? asset.amount.toString() : ''}
            onChange={(e) => {
              const formatted = formatAmountForDisplay(e.target.value);
              onAssetChange("amount", formatted ? parseFloat(formatted) : undefined);
            }}
            placeholder="0,00"
            className="pl-9"
          />
        </div>
        {asset.amount && (
          <div className="text-sm text-muted-foreground">
            Valor formatado: {formatCurrency(asset.amount)}
          </div>
        )}
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

      <div className="grid gap-2">
        <Label htmlFor="description">Descrição Detalhada</Label>
        <textarea
          id="description"
          className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={asset.description || ''}
          onChange={(e) => onAssetChange("description", e.target.value)}
          placeholder="Descreva os detalhes deste asset..."
        />
      </div>
    </div>
  );
};

export default AssetDetailsTab;
