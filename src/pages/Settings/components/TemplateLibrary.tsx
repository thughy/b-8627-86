
import React, { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getTemplates } from "../services/settingsService";

const TemplateLibrary = () => {
  const [templates, setTemplates] = React.useState<any[]>([]);
  const [filteredTemplates, setFilteredTemplates] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");

  useEffect(() => {
    const loadTemplates = () => {
      const templateData = getTemplates();
      setTemplates(templateData);
      setFilteredTemplates(templateData);
    };
    
    loadTemplates();
  }, []);

  useEffect(() => {
    let filtered = templates;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(template => 
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter(template => template.category === activeTab);
    }
    
    setFilteredTemplates(filtered);
  }, [searchTerm, activeTab, templates]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Biblioteca de Templates</CardTitle>
            <CardDescription>Use templates prontos para acelerar sua configuração</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Criar Template
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar templates..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full sm:w-auto" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="sales">Vendas</TabsTrigger>
              <TabsTrigger value="support">Suporte</TabsTrigger>
              <TabsTrigger value="other">Outros</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden flex flex-col">
              <CardContent className="p-4 flex-1">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-medium">{template.title}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {template.category}
                  </Badge>
                </div>
              </CardContent>
              <div className="bg-muted p-3 flex justify-end">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  <span>Usar</span>
                </Button>
              </div>
            </Card>
          ))}
          
          {filteredTemplates.length === 0 && (
            <div className="col-span-full text-center p-8 border rounded-md bg-muted/20">
              <p className="text-muted-foreground">Nenhum template encontrado</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateLibrary;
