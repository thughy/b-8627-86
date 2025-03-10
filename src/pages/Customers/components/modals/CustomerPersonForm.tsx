
import React from "react";
import PersonalInfoFields from "./person-form/PersonalInfoFields";
import DocumentField from "./person-form/DocumentField";
import OrganizationSelector from "./person-form/OrganizationSelector";
import AddressAndStatusFields from "./person-form/AddressAndStatusFields";

interface CustomerPersonFormProps {
  organizations?: { id: string; name: string }[];
}

const CustomerPersonForm: React.FC<CustomerPersonFormProps> = ({
  organizations = []
}) => {
  return (
    <div className="space-y-4">
      <PersonalInfoFields />
      <DocumentField />
      <OrganizationSelector organizations={organizations} />
      <AddressAndStatusFields />
    </div>
  );
};

export default CustomerPersonForm;
