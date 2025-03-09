
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Asset } from "@/pages/Workflows/models/WorkflowModels";

interface AssetDetailsTabProps {
  formData: Partial<Asset>;
  onChange: (key: string, value: any) => void;
}

const AssetDetailsTab = ({ formData, onChange }: AssetDetailsTabProps) => {
  const handleStatusChange = (status: 'open' | 'processing' | 'completed' | 'canceled') => {
    onChange("status", status);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label>Status</Label>
        <div className="grid grid-cols-2 gap-2 md:flex md:space-x-2">
          <Button 
            type="button" 
            variant={formData.status === 'open' ? "default" : "outline"}
            onClick={() => handleStatusChange('open')}
            className="flex-1"
          >
            Aberto
          </Button>
          <Button 
            type="button" 
            variant={formData.status === 'processing' ? "default" : "outline"}
            onClick={() => handleStatusChange('processing')}
            className="flex-1"
          >
            Processando
          </Button>
          <Button 
            type="button" 
            variant={formData.status === 'completed' ? "default" : "outline"}
            onClick={() => handleStatusChange('completed')}
            className="flex-1"
          >
            Concluído
          </Button>
          <Button 
            type="button" 
            variant={formData.status === 'canceled' ? "default" : "outline"}
            onClick={() => handleStatusChange('canceled')}
            className="flex-1"
          >
            Cancelado
          </Button>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="amount">Valor</Label>
        <Input 
          id="amount"
          type="number"
          placeholder="Valor do asset"
          value={formData.amount || ""}
          onChange={(e) => onChange("amount", parseFloat(e.target.value))}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="startDate">Data de Início</Label>
          <Input 
            id="startDate"
            type="date"
            value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ""}
            onChange={(e) => onChange("startDate", new Date(e.target.value))}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="endDate">Data de Conclusão</Label>
          <Input 
            id="endDate"
            type="date"
            value={formData.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : ""}
            onChange={(e) => onChange("endDate", new Date(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsTab;
