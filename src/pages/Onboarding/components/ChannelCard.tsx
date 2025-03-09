
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChannelProps } from "../models/ChannelModel";

interface ChannelCardProps {
  channel: ChannelProps;
  enabled: boolean;
  toggleChannel: (channelId: string) => void;
  config: Record<string, string>;
  onConfigChange: (fieldId: string, value: string) => void;
}

const ChannelCard = ({ 
  channel, 
  enabled, 
  toggleChannel, 
  config, 
  onConfigChange 
}: ChannelCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {channel.icon}
            <Label htmlFor={`enable-${channel.id}`} className="font-medium">
              {channel.name}
            </Label>
          </div>
          <Switch
            id={`enable-${channel.id}`}
            checked={enabled}
            onCheckedChange={() => toggleChannel(channel.id)}
          />
        </div>

        {enabled && (
          <div className="space-y-3 pt-2 border-t border-border">
            {channel.configFields.map((field) => (
              <div key={field.id} className="space-y-1.5">
                <Label htmlFor={`${channel.id}-${field.id}`} className="text-sm">
                  {field.label}
                </Label>
                <Input
                  id={`${channel.id}-${field.id}`}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={config?.[field.id] || ""}
                  onChange={(e) => onConfigChange(field.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChannelCard;
