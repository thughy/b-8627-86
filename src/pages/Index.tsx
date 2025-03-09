
import { useState } from "react";
import { Github, Linkedin, Mail, Twitter, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const features = [
    { title: "Automação de Workflows", description: "Otimize processos empresariais com agentes de IA especializados." },
    { title: "Interface Intuitiva", description: "Design minimalista e responsivo para uma experiência fluida em qualquer dispositivo." },
    { title: "Marketplace de Templates", description: "Acesse templates pré-configurados para diversos nichos de mercado." },
    { title: "Agentes de IA Verticais", description: "Agentes especializados que se adaptam às necessidades do seu negócio." },
    { title: "Integração Flexível", description: "Conecte-se facilmente com diversas ferramentas e plataformas." },
    { title: "Customização Total", description: "Adapte workflows, departamentos, pipelines e estágios conforme necessário." }
  ];

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

  const pricingPlans = [
    {
      name: "Básico",
      price: "R$149,90",
      description: "Ideal para pequenas empresas",
      features: [
        "2 Workflows",
        "Departamento Comercial",
        "Departamento de Suporte",
        "3 Agentes de IA",
        "5 Colaboradores"
      ]
    },
    {
      name: "Intermediário",
      price: "R$249,90",
      description: "Perfeito para empresas em crescimento",
      features: [
        "5 Workflows",
        "Departamentos Comercial, Suporte e Marketing",
        "10 Agentes de IA",
        "10 Colaboradores",
        "Acesso ao Marketplace"
      ],
      popular: true
    },
    {
      name: "Avançado",
      price: "R$449,90",
      description: "Para empresas que buscam crescimento acelerado",
      features: [
        "Workflows ilimitados",
        "Todos os Departamentos",
        "Agentes de IA ilimitados",
        "25 Colaboradores",
        "Acesso completo ao Marketplace",
        "Suporte prioritário"
      ]
    }
  ];

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

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Hero Section */}
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

      {/* Features Section */}
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
              <div key={index} className="bg-[#252525] p-8 rounded-2xl hover:bg-[#2a2a2a] transition-all">
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              <div key={index} className="bg-[#252525] p-8 rounded-2xl hover:bg-[#2a2a2a] transition-all">
                <p className="text-gray-300 mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-gray-400">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 px-4 md:px-6 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Planos e Preços
          </h2>
          <p className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto">
            Escolha o plano ideal para o seu negócio
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-[#252525] p-8 rounded-2xl hover:bg-[#2a2a2a] transition-all relative ${
                  plan.popular ? 'border-2 border-blue-500' : ''
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Mais popular
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <p className="text-3xl font-bold mb-6">{plan.price}<span className="text-sm text-gray-400">/mês</span></p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Escolher plano
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              <div key={index} className="bg-[#252525] rounded-lg overflow-hidden">
                <button 
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-medium">{item.question}</span>
                  <ChevronRight 
                    className={`h-5 w-5 transition-transform ${
                      expandedFaq === index ? 'transform rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 border-t border-gray-700">
                    <p className="text-gray-300">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AutB</h3>
            <p className="text-gray-400 mb-4">
              Plataforma SaaS para gestão de workflows empresariais com agentes de IA.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Produto</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Recursos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Preços</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Marketplace</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Integrações</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Sobre nós</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Carreiras</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contato</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Centro de ajuda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Documentação</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Status</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2023 AutB. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
