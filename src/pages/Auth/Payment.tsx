
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, QrCode, Receipt, ArrowLeft } from "lucide-react";

const Payment = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === "number") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
      
      setCardData((prev) => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Format expiry date as MM/YY
    if (name === "expiry") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/g, "$1/$2")
        .slice(0, 5);
      
      setCardData((prev) => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Limit CVC to 3 or 4 digits
    if (name === "cvc") {
      const formattedValue = value.replace(/\D/g, "").slice(0, 4);
      setCardData((prev) => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to process payment
      console.log("Processing payment with:", { method: paymentMethod, cardData });
      
      // Simulate payment processing
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Pagamento processado com sucesso",
          description: "Sua assinatura foi ativada",
        });
        navigate("/onboarding");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Erro no processamento",
        description: "Não foi possível processar o pagamento",
        variant: "destructive",
      });
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/90 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="icon" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-300">
              AutB
            </h1>
            <div className="w-8"></div> {/* Spacer for centering */}
          </div>
          <CardTitle className="text-2xl font-bold text-center">Pagamento</CardTitle>
          <CardDescription className="text-center">Escolha como deseja pagar sua assinatura</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Cartão</span>
              </TabsTrigger>
              <TabsTrigger value="pix" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">PIX</span>
              </TabsTrigger>
              <TabsTrigger value="boleto" className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                <span className="hidden sm:inline">Boleto</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="card">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="number" className="text-sm font-medium">
                    Número do cartão
                  </label>
                  <Input
                    id="number"
                    name="number"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={handleCardInputChange}
                    className="font-mono"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome no cartão
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="NOME COMO APARECE NO CARTÃO"
                    value={cardData.name}
                    onChange={handleCardInputChange}
                    className="uppercase"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="expiry" className="text-sm font-medium">
                      Validade
                    </label>
                    <Input
                      id="expiry"
                      name="expiry"
                      placeholder="MM/AA"
                      value={cardData.expiry}
                      onChange={handleCardInputChange}
                      className="font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cvc" className="text-sm font-medium">
                      CVC
                    </label>
                    <Input
                      id="cvc"
                      name="cvc"
                      placeholder="123"
                      value={cardData.cvc}
                      onChange={handleCardInputChange}
                      className="font-mono"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                  {isLoading ? "Processando..." : "Finalizar pagamento"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="pix">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <QrCode className="h-48 w-48 text-black" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Escaneie o QR Code acima com seu aplicativo de banco</p>
                  <p className="font-mono bg-muted p-2 rounded text-xs">
                    00020126580014br.gov.bcb.pix0136abcdef-1234-5678-abcd-1234567890ab5204000053039865802BR5913AutB Pagamentos6008Sao Paulo62070503***63041234
                  </p>
                  <Button className="mt-4" onClick={() => toast({ title: "Código PIX copiado!" })}>
                    Copiar código PIX
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="boleto">
              <div className="flex flex-col items-center space-y-4">
                <Receipt className="h-32 w-32 text-primary" />
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Gere um boleto para pagamento da sua assinatura
                  </p>
                  <p className="text-xs text-muted-foreground">
                    O boleto tem vencimento de 3 dias úteis e sua assinatura será ativada após a confirmação do pagamento.
                  </p>
                  <Button className="mt-4" onClick={() => toast({ title: "Boleto gerado com sucesso!" })}>
                    Gerar boleto
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-xs text-muted-foreground">
            Pagamentos processados com segurança. Você pode cancelar sua assinatura a qualquer momento.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Payment;
