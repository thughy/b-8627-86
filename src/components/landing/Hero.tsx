
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Automatize seus workflows com <span className="text-blue-400">AutB</span>
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          Plataforma SaaS de gestão de workflows empresariais com agentes de IA especializados.
          Otimize processos, aumente a produtividade e escale seu negócio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
            Começar gratuitamente
          </Button>
          <Button variant="outline" className="text-lg px-8 py-6">
            Ver demonstração
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
