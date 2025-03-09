
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Settings } from "lucide-react";
import Logo from "@/components/ui/Logo";
import SidebarNav from "./SidebarNav";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ sidebarOpen, toggleSidebar }: SidebarProps) => {
  return (
    <>
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-card border-r border-border flex flex-col`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center">
            <Logo />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <SidebarNav onCloseSidebar={toggleSidebar} />

        <div className="p-4 border-t border-border mt-auto">
          <Link
            to="/settings"
            className="flex items-center px-3 py-2 rounded-md transition-colors text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={toggleSidebar}
          >
            <Settings className="h-5 w-5" />
            <span className="ml-3 text-sm">Configurações</span>
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
