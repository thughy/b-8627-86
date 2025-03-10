
import React from "react";
import CompanyInfoFields from "./organization-form/CompanyInfoFields";
import ContactFields from "./organization-form/ContactFields";
import DocumentField from "./organization-form/DocumentField";
import AddressAndStatusFields from "./organization-form/AddressAndStatusFields";

const CustomerOrganizationForm: React.FC = () => {
  return (
    <div className="space-y-4">
      <CompanyInfoFields />
      <ContactFields />
      <DocumentField />
      <AddressAndStatusFields />
    </div>
  );
};

export default CustomerOrganizationForm;
