
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AgentRagTabProps {
  ragDocuments: string[];
  onRagDocumentsChange: (value: string) => void;
}

const AgentRagTab = ({ ragDocuments, onRagDocumentsChange }: AgentRagTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="ragDocuments">Documentos RAG</Label>
        <Textarea 
          id="ragDocuments"
          value={ragDocuments?.join('\n') || ""}
          onChange={(e) => onRagDocumentsChange(e.target.value)}
          placeholder="Um documento por linha (ex: Produtos.pdf, Serviços.pdf)"
          rows={6}
        />
        <p className="text-xs text-muted-foreground">
          Exemplos: Produtos.pdf, Institucional.pdf, Serviços.pdf, Portfólio.pdf, Normativa.pdf, ProcedimentoOperacional.pdf
        </p>
      </div>
    </div>
  );
};

export default AgentRagTab;
