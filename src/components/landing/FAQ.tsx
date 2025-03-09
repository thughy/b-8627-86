
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const FAQItem = ({ question, answer, isExpanded, onToggle }: FAQItemProps) => (
  <div className="bg-[#252525] rounded-lg overflow-hidden">
    <button 
      className="w-full px-6 py-4 text-left flex justify-between items-center"
      onClick={onToggle}
    >
      <span className="font-medium">{question}</span>
      <ChevronRight 
        className={`h-5 w-5 transition-transform ${
          isExpanded ? 'transform rotate-90' : ''
        }`}
      />
    </button>
    {isExpanded && (
      <div className="px-6 py-4 border-t border-gray-700">
        <p className="text-gray-300">{answer}</p>
      </div>
    )}
  </div>
);

const FAQ = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Como funciona a integração dos agentes de IA?",
      answer: "Os agentes de IA são integrados diretamente aos seus workflows, automatizando tarefas específicas em cada estágio do processo. A integração ocorre via webhooks com o n8n, permitindo flexibilidade e personalização."
    },
    {
      question: "Posso personalizar os workflows para meu negócio específico?",
      answer: "Sim! O AutB foi projetado para ser altamente personalizável. Você pode criar workflows do zero ou adaptar templates do marketplace para atender às necessidades específicas do seu negócio."
    },
    {
      question: "Existe algum limite de usuários ou colaboradores?",
      answer: "Cada plano inclui um número específico de colaboradores. O plano Básico inclui 5 colaboradores, o Intermediário 10 e o Avançado 25. Você pode adicionar mais colaboradores por uma taxa adicional."
    },
    {
      question: "Como é feito o processo de onboarding?",
      answer: "Nosso processo de onboarding é dividido em 3 passos simples: configuração de workflows, definição de assets e configuração de agentes. Oferecemos tutoriais guiados e suporte para garantir uma experiência tranquila."
    },
    {
      question: "O AutB é compatível com dispositivos móveis?",
      answer: "Sim! O AutB foi desenvolvido com abordagem mobile-first, garantindo uma experiência fluida e responsiva em smartphones, tablets e desktops."
    }
  ];

  return (
    <section className="py-16 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Perguntas Frequentes
        </h2>
        <p className="text-xl text-gray-300 mb-12 text-center">
          Tire suas dúvidas sobre o AutB
        </p>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isExpanded={expandedFaq === index}
              onToggle={() => setExpandedFaq(expandedFaq === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
