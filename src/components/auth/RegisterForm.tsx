
import React, { useState } from "react";
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
      // In a real app, this would be an API call
      console.log("Registering with:", formData);
      
      // Simulate registration success
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Conta criada com sucesso",
          description: "Agora vamos escolher seu plano",
        });
        navigate("/auth/plans");
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
