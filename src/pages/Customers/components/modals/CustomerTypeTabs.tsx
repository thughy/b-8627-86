
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormProvider } from "react-hook-form";
import CustomerPersonForm from "./CustomerPersonForm";
import CustomerOrganizationForm from "./CustomerOrganizationForm";
import { PersonFormValues, OrganizationFormValues } from "../../validations/customerSchema";
import { UseFormReturn } from "react-hook-form";

interface CustomerTypeTabsProps {
  activeTab: "person" | "organization";
  onTabChange: (type: "person" | "organization") => void;
  personMethods: UseFormReturn<PersonFormValues>;
  organizationMethods: UseFormReturn<OrganizationFormValues>;
  organizations: { id: string; name: string }[];
}

const CustomerTypeTabs: React.FC<CustomerTypeTabsProps> = ({
  activeTab,
  onTabChange,
  personMethods,
  organizationMethods,
  organizations
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mt-5">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="person" className="flex items-center gap-2">
          <span>Pessoa Física</span>
        </TabsTrigger>
        <TabsTrigger value="organization" className="flex items-center gap-2">
          <span>Pessoa Jurídica</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="person" className="space-y-4 mt-4">
        <FormProvider {...personMethods}>
          <CustomerPersonForm organizations={organizations} />
        </FormProvider>
      </TabsContent>

      <TabsContent value="organization" className="space-y-4 mt-4">
        <FormProvider {...organizationMethods}>
          <CustomerOrganizationForm />
        </FormProvider>
      </TabsContent>
    </Tabs>
  );
};

export default CustomerTypeTabs;
