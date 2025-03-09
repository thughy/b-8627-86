
import React, { ReactNode } from "react";

interface FormSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  columns?: 1 | 2;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  columns = 1,
}) => {
  return (
    <div className="space-y-3">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className={`grid ${columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {children}
      </div>
    </div>
  );
};

export default FormSection;
