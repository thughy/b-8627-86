
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Menu, Bell } from "lucide-react";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import NotificationsPanel from "./NotificationsPanel";
import { useToast } from "@/hooks/use-toast";

interface TopBarProps {
  toggleSidebar: () => void;
}

const TopBar = ({ toggleSidebar }: TopBarProps) => {
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const { toast } = useToast();

  const toggleNotificationsPanel = () => {
    setNotificationsPanelOpen(!notificationsPanelOpen);
  };

  const closeNotificationsPanel = () => {
    setNotificationsPanelOpen(false);
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <SearchBar />
      </div>

      <div className="flex items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={toggleNotificationsPanel}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notificações</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <UserMenu />
      </div>

      {/* Notifications Panel */}
      <NotificationsPanel 
        isOpen={notificationsPanelOpen} 
        onClose={closeNotificationsPanel} 
      />
    </header>
  );
};

export default TopBar;
