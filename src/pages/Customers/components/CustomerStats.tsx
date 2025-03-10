
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Building2, Users, TrendingUp } from "lucide-react";

interface CustomerStatsProps {
  totalCustomers: number;
  totalPersons: number;
  totalOrganizations: number;
  activeCustomers: number;
}

const CustomerStats: React.FC<CustomerStatsProps> = ({
  totalCustomers,
  totalPersons,
  totalOrganizations,
  activeCustomers
}) => {
  const activePercentage = totalCustomers > 0 
    ? Math.round((activeCustomers / totalCustomers) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Clientes</p>
              <h3 className="text-2xl font-bold mt-1">{totalCustomers}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pessoas Físicas</p>
              <h3 className="text-2xl font-bold mt-1">{totalPersons}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Empresas</p>
              <h3 className="text-2xl font-bold mt-1">{totalOrganizations}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Ativos</p>
              <h3 className="text-2xl font-bold mt-1">{activePercentage}%</h3>
              <p className="text-xs text-muted-foreground mt-1">{activeCustomers} de {totalCustomers} clientes</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerStats;
