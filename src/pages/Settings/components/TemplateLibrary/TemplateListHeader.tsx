
import React from "react";

export const TemplateListHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-8 gap-4 p-4 font-medium border-b">
      <div className="col-span-2">Nome</div>
      <div className="col-span-1">Tipo</div>
      <div className="col-span-1">Versão</div>
      <div className="col-span-2 text-center">Especificações</div>
      <div className="col-span-1 hidden md:block">Atualizado</div>
      <div className="col-span-1 text-right">Ações</div>
    </div>
  );
};
