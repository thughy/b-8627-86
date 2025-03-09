
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  BarChart3, 
  Users, 
  ArrowRight, 
  BarChart, 
  DollarSign,
  CheckCircle2,
  Clock,
  Workflow
} from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `Ação: ${action}`,
      description: "Esta funcionalidade está em desenvolvimento",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo ao seu painel de controle! Aqui está o resumo das suas atividades.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => handleAction("Exportar relatório")}>
              Exportar relatório
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Deals ativos</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +15% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">
                +5% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Deals concluídos</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                +22% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tempo médio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6.2 dias</div>
              <p className="text-xs text-muted-foreground">
                -8% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>Desempenho dos workflows</CardTitle>
              <CardDescription>Visão geral dos seus workflows ativos</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[250px] flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Dados de performance serão exibidos aqui
                </span>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Workflows recentes</CardTitle>
                <CardDescription>Seus workflows mais utilizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Comercial", "Suporte", "Marketing"].map((workflow, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <Workflow className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Workflow {workflow}</h4>
                          <p className="text-xs text-muted-foreground">{5 - index} deals ativos</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Próximos eventos</CardTitle>
                <CardDescription>Agenda para os próximos dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Reunião com cliente", time: "Hoje, 15:30" },
                    { title: "Follow-up de proposta", time: "Amanhã, 10:00" },
                    { title: "Apresentação de produto", time: "26/06, 14:00" }
                  ].map((event, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Ver detalhes
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
