
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LockKeyhole, Mail, Eye, EyeOff } from "lucide-react";
import Logo from "@/components/ui/Logo";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Em um aplicativo real, esta seria uma chamada à API para fazer login
      console.log("Realizando login com:", { email, password });
      
      // Simular se é usuário Master ou comum (em produção, isso viria do backend)
      const isMasterUser = email.includes("master") || email.includes("admin");
      
      // Simular login bem-sucedido
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Login realizado com sucesso",
          description: isMasterUser ? 
            "Bem-vindo, administrador do sistema" : 
            "Bem-vindo ao AutB",
        });
        
        // Redirecionamento baseado no tipo de usuário
        // Se for Master (ou primeiro usuário), vai direto para o dashboard
        // Se for usuário comum, vai para o dashboard também
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Erro no login",
        description: "Email ou senha inválidos",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/90 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold">Entrar na sua conta</CardTitle>
          <CardDescription>Digite seu email e senha para acessar o sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded border-gray-300" />
                <label htmlFor="remember" className="text-sm text-muted-foreground">
                  Lembrar-me
                </label>
              </div>
              <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Ou</span>
            </div>
          </div>
          <div className="text-center text-sm">
            Ainda não tem uma conta?{" "}
            <Link to="/auth/register" className="text-primary hover:underline">
              Cadastre-se
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
