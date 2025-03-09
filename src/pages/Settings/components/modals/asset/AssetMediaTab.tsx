
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Plus } from "lucide-react";

const AssetMediaTab = () => {
  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <Label htmlFor="fileUpload" className="block text-center">
          <div className="flex flex-col items-center justify-center py-8 cursor-pointer">
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <span className="text-sm font-medium">Arraste arquivos ou clique para upload</span>
            <span className="text-xs text-muted-foreground mt-1">
              Suporta PDFs, imagens, documentos e outros arquivos
            </span>
          </div>
          <Input 
            id="fileUpload" 
            type="file" 
            multiple 
            className="hidden" 
          />
        </Label>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Arquivos Anexados</h3>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar URL
          </Button>
        </div>
        
        <div className="flex items-center justify-center h-24 border rounded-md text-muted-foreground text-sm">
          Nenhum arquivo anexado
        </div>
      </div>
    </div>
  );
};

export default AssetMediaTab;
