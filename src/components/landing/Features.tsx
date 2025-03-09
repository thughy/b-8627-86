
import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <div className="bg-[#252525] p-8 rounded-2xl hover:bg-[#2a2a2a] transition-all">
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    { title: "Automação de Workflows", description: "Otimize processos empresariais com agentes de IA especializados." },
    { title: "Interface Intuitiva", description: "Design minimalista e responsivo para uma experiência fluida em qualquer dispositivo." },
    { title: "Marketplace de Templates", description: "Acesse templates pré-configurados para diversos nichos de mercado." },
    { title: "Agentes de IA Verticais", description: "Agentes especializados que se adaptam às necessidades do seu negócio." },
    { title: "Integração Flexível", description: "Conecte-se facilmente com diversas ferramentas e plataformas." },
    { title: "Customização Total", description: "Adapte workflows, departamentos, pipelines e estágios conforme necessário." }
  ];

  return (
    <section className="py-16 px-4 md:px-6 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Recursos Principais
        </h2>
        <p className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto">
          O AutB oferece tudo o que você precisa para otimizar seus workflows empresariais
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
