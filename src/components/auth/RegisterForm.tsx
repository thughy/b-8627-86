
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, LockKeyhole, Building, Phone, Eye, EyeOff } from "lucide-react";
import FormInput from "./FormInput";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  organization: string;
  phone: string;
}

const RegisterForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFirstUser, setIsFirstUser] = useState(false);

  // Verificar se é o primeiro usuário
  useEffect(() => {
    const checkFirstUser = async () => {
      try {
        // Em um app real, esta seria uma chamada à API para verificar se existem usuários
        // Por enquanto vamos simular que não existem usuários (é o primeiro)
        const mockCheckFirstUser = () => {
          return new Promise<boolean>((resolve) => {
            setTimeout(() => {
              // Simular que é o primeiro usuário
              resolve(true);
            }, 500);
          });
        };

        const result = await mockCheckFirstUser();
        setIsFirstUser(result);
      } catch (error) {
        console.error("Erro ao verificar se é o primeiro usuário:", error);
      }
    };

    checkFirstUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "Por favor, verifique se as senhas são idênticas",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      // Aqui simularemos o cadastro
      console.log("Registrando com:", formData);
      console.log("Tipo de usuário:", isFirstUser ? "Master" : "Comum");
      
      // Simular sucesso no registro
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: isFirstUser 
            ? "Conta Master criada com sucesso" 
            : "Conta criada com sucesso",
          description: isFirstUser 
            ? "Você é o administrador principal do sistema" 
            : "Agora vamos escolher seu plano",
        });
        
        // Redirecionar para a página apropriada
        navigate(isFirstUser ? "/dashboard" : "/auth/plans");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível criar sua conta",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {isFirstUser && (
        <div className="bg-primary/10 border border-primary/30 rounded-md p-3 mb-4">
          <p className="text-sm font-medium text-primary">
            Você será o usuário Master do sistema com acesso total às funcionalidades.
          </p>
        </div>
      )}
      
      <FormInput
        type="text"
        name="name"
        placeholder="Nome completo"
        value={formData.name}
        onChange={handleChange}
        icon={User}
        required
      />
      
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        icon={Mail}
        required
      />
      
      <FormInput
        type="text"
        name="organization"
        placeholder="Nome da organização"
        value={formData.organization}
        onChange={handleChange}
        icon={Building}
        required
      />
      
      <div className="space-y-2">
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <InputMask
            mask="(99) 99999-9999"
            value={formData.phone}
            onChange={handleChange}
            name="phone"
          >
            {(inputProps: any) => (
              <Input
                {...inputProps}
                placeholder="(00) 00000-0000"
                className="pl-10"
                required
              />
            )}
          </InputMask>
        </div>
      </div>
      
      <FormInput
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        icon={LockKeyhole}
        required
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        }
      />
      
      <FormInput
        type={showPassword ? "text" : "password"}
        name="confirmPassword"
        placeholder="Confirme a senha"
        value={formData.confirmPassword}
        onChange={handleChange}
        icon={LockKeyhole}
        required
      />
      
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="terms" className="rounded border-gray-300" required />
        <label htmlFor="terms" className="text-sm text-muted-foreground">
          Concordo com os{" "}
          <Link to="/terms" className="text-primary hover:underline">
            Termos de Uso
          </Link>{" "}
          e{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Política de Privacidade
          </Link>
        </label>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
};

export default RegisterForm;
