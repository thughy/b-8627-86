
import { ReactNode } from "react";

export interface ChannelConfigField {
  id: string;
  label: string;
  placeholder: string;
  type: string;
}

export interface ChannelProps {
  id: string;
  name: string;
  icon: ReactNode;
  configFields: ChannelConfigField[];
}
