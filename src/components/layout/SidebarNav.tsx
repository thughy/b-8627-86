
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Workflow,
  Users,
  Calendar,
  Mail,
  FileText,
  ShoppingBag,
  Briefcase,
  Settings,
} from "lucide-react";

export interface SidebarLink {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface SidebarNavProps {
  onCloseSidebar: () => void;
}

const SidebarNav = ({ onCloseSidebar }: SidebarNavProps) => {
  const location = useLocation();
  
  const sidebarLinks: SidebarLink[] = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <Workflow className="h-5 w-5" />,
      label: "Workflows",
      path: "/workflows",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Clientes",
      path: "/customers",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Arquivos",
      path: "/files",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Agenda",
      path: "/agenda",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      path: "/email",
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      label: "Marketplace",
      path: "/marketplace",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      label: "Vagas",
      path: "/jobs",
    },
  ];

  return (
    <ScrollArea className="flex-1 py-2">
      <div className="px-3 py-2 space-y-1">
        {sidebarLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center px-3 py-2 rounded-md transition-colors ${
              location.pathname === link.path
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            onClick={onCloseSidebar}
          >
            {link.icon}
            <span className="ml-3 text-sm">{link.label}</span>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
};

export default SidebarNav;
