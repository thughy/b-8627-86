
import React from "react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-[#1a1a1a]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pronto para transformar seus workflows?
        </h2>
        <p className="text-xl text-gray-300 mb-10">
          Comece a usar o AutB hoje mesmo e veja como nossos agentes de IA podem otimizar seus processos empresariais.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
            Começar gratuitamente
          </Button>
          <Button variant="outline" className="text-lg px-8 py-6">
            Agendar demonstração
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
