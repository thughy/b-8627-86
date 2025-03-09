
import React from "react";
import { Bell, X, Info, AlertTriangle, Check, MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "success" | "message";
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  // Example notifications
  const notifications: Notification[] = [
    {
      id: "1",
      title: "New Message",
      message: "You received a new message from the team",
      time: "5 min ago",
      read: false,
      type: "message",
    },
    {
      id: "2",
      title: "System Update",
      message: "The system will be updated tonight at 2 AM",
      time: "2 hours ago",
      read: false,
      type: "info",
    },
    {
      id: "3",
      title: "Warning",
      message: "Your storage is almost full",
      time: "Yesterday",
      read: true,
      type: "warning",
    },
    {
      id: "4",
      title: "Task Completed",
      message: "Project X has been successfully completed",
      time: "3 days ago",
      read: true,
      type: "success",
    },
  ];

  const { toast } = useToast();

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-violet-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const markAllAsRead = () => {
    toast({
      title: "All notifications marked as read",
      description: "You have marked all notifications as read",
    });
    onClose();
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Notifications panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-full max-w-sm bg-card border-l border-border z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle className="text-lg">Notificações</CardTitle>
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
                {unreadCount} novas
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-125px)]">
          {notifications.length > 0 ? (
            <div className="p-2">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`mb-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                    !notification.read ? "border-l-2 border-l-primary" : ""
                  }`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-background p-2 rounded-full">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm">{notification.title}</p>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <Bell className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-muted-foreground text-center">
                Não há notificações no momento
              </p>
            </div>
          )}
        </ScrollArea>

        <div className="absolute bottom-0 w-full border-t border-border p-4 bg-card">
          <Button onClick={markAllAsRead} variant="outline" className="w-full">
            Marcar todas como lidas
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotificationsPanel;
