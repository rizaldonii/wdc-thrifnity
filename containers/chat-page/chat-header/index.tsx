"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  MoreVertical,
  Phone,
  Video,
  ShoppingBag,
  MessageSquare,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tailor } from "@/types/tailor";

interface ChatHeaderProps {
  tailor: Tailor;
  hasActiveOrder: boolean;
  activeTab: "chat" | "order";
  onTabChange: (tab: string) => void;
}

export default function ChatHeader({
  tailor,
  hasActiveOrder,
  activeTab,
  onTabChange,
}: ChatHeaderProps) {
  const [isOnline] = useState(true); // In a real app, this would be determined by the server

  return (
    <div className="border-b">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link href={`/tailors/${tailor.slug}`} className="mr-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>

          <div className="flex items-center">
            <div className="relative">
              <Avatar className="h-10 w-10 border">
                <AvatarImage
                  src={tailor.avatar || "/placeholder.svg"}
                  alt={tailor.name}
                />
                <AvatarFallback>{tailor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isOnline && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
              )}
            </div>

            <div className="ml-3">
              <div className="flex items-center">
                <h3 className="font-medium text-base">{tailor.name}</h3>
                {tailor.isVerified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CheckCircle2 className="h-4 w-4 ml-1 text-primary" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Verified Tailor</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>
                  {tailor.location.city}, {tailor.location.province}
                </span>
                {isOnline && (
                  <>
                    <span className="mx-1.5">•</span>
                    <span className="text-green-500 font-medium">Online</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Phone className="h-5 w-5" />
                  <span className="sr-only">Call</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Call Tailor</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Video className="h-5 w-5" />
                  <span className="sr-only">Video Call</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Video Call</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Tailor Profile</DropdownMenuItem>
              <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Block Tailor
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Report Issue
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange} className="px-4 pb-2">
        <TabsList className="h-9 grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="chat" className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" />
            <span>Chat</span>
          </TabsTrigger>
          <TabsTrigger value="order" className="flex items-center gap-1.5">
            <ShoppingBag className="h-4 w-4" />
            <span>Order</span>
            {hasActiveOrder && (
              <Badge
                variant="secondary"
                className="ml-1 h-5 px-1.5 bg-primary/10 text-primary"
              >
                <Clock className="h-3 w-3 mr-0.5" />
                Active
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
