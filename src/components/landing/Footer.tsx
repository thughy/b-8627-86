
import React from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <a href={href} className="text-gray-400 hover:text-white">
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="py-12 px-4 md:px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">AutB</h3>
          <p className="text-gray-400 mb-4">
            Plataforma SaaS para gestão de workflows empresariais com agentes de IA.
          </p>
          <div className="flex space-x-4">
            <FooterLink href="#">
              <Github className="h-5 w-5" />
            </FooterLink>
            <FooterLink href="#">
              <Twitter className="h-5 w-5" />
            </FooterLink>
            <FooterLink href="#">
              <Linkedin className="h-5 w-5" />
            </FooterLink>
            <FooterLink href="#">
              <Mail className="h-5 w-5" />
            </FooterLink>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold mb-4">Produto</h3>
          <ul className="space-y-2">
            <li><FooterLink href="#">Recursos</FooterLink></li>
            <li><FooterLink href="#">Preços</FooterLink></li>
            <li><FooterLink href="#">Marketplace</FooterLink></li>
            <li><FooterLink href="#">Integrações</FooterLink></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold mb-4">Empresa</h3>
          <ul className="space-y-2">
            <li><FooterLink href="#">Sobre nós</FooterLink></li>
            <li><FooterLink href="#">Carreiras</FooterLink></li>
            <li><FooterLink href="#">Blog</FooterLink></li>
            <li><FooterLink href="#">Contato</FooterLink></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold mb-4">Suporte</h3>
          <ul className="space-y-2">
            <li><FooterLink href="#">Centro de ajuda</FooterLink></li>
            <li><FooterLink href="#">Documentação</FooterLink></li>
            <li><FooterLink href="#">Status</FooterLink></li>
            <li><FooterLink href="#">API</FooterLink></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>© 2023 AutB. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
