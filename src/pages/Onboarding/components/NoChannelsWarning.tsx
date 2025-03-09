
import React from "react";
import { AlertCircle } from "lucide-react";

const NoChannelsWarning = () => {
  return (
    <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-md text-sm text-muted-foreground">
      <AlertCircle className="h-4 w-4 text-yellow-500" />
      <p>
        Recomendamos configurar pelo menos um canal para comunicação com seus clientes.
      </p>
    </div>
  );
};

export default NoChannelsWarning;
