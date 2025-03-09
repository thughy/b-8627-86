
import React from "react";

interface TestimonialCardProps {
  text: string;
  name: string;
  role: string;
  company: string;
}

const TestimonialCard = ({ text, name, role, company }: TestimonialCardProps) => (
  <div className="bg-[#252525] p-8 rounded-2xl hover:bg-[#2a2a2a] transition-all">
    <p className="text-gray-300 mb-6">"{text}"</p>
    <div>
      <p className="font-bold">{name}</p>
      <p className="text-gray-400">{role}, {company}</p>
    </div>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      name: "Renata Almeida",
      role: "Gerente de RH",
      company: "TechRecruit",
      text: "O AutB revolucionou nosso processo de recrutamento. Reduzimos o tempo de contratação em 40% com os agentes de IA."
    },
    {
      name: "Carlos Mendes",
      role: "CEO",
      company: "Imobiliária Central",
      text: "A automatização de nossos workflows de vendas trouxe resultados impressionantes. Fechamos mais negócios em menos tempo."
    },
    {
      name: "Fernanda Costa",
      role: "Diretora de Marketing",
      company: "AgênciaDigital",
      text: "A flexibilidade do AutB nos permitiu criar fluxos de trabalho personalizados para cada cliente. Eficiência em outro nível!"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          O que nossos clientes dizem
        </h2>
        <p className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto">
          Empresas de diversos setores estão transformando seus processos com o AutB
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              text={testimonial.text} 
              name={testimonial.name} 
              role={testimonial.role} 
              company={testimonial.company} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
