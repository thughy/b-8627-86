
import React from "react";

const VersionsView = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 border rounded-md">
      <div className="text-xl font-medium text-muted-foreground mb-2">
        Gerenciamento de versões
      </div>
      <p className="text-muted-foreground text-center max-w-md">
        O controle de versões de workflow está em desenvolvimento.
        Esta funcionalidade permitirá manter um histórico de mudanças
        e reverter para versões anteriores quando necessário.
      </p>
    </div>
  );
};

export default VersionsView;
