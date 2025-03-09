
import React from "react";
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: LucideIcon;
  required?: boolean;
  rightElement?: React.ReactNode;
}

const FormInput = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = false,
  rightElement,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`pl-10 ${rightElement ? "pr-10" : ""}`}
          required={required}
        />
        {rightElement && (
          <div className="absolute right-3 top-3">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
