"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Plus, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useChat } from "./ChatContext";

interface MobileChatSidebarProps {
  onClose: () => void;
}

export default function MobileChatSidebar({ onClose }: MobileChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { conversations, activeConversationId, setActiveConversationId } =
    useChat();

  const filteredConversations = conversations.filter((conv) =>
    conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationClick = (id: number) => {
    setActiveConversationId(id);
    onClose();
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 w-full h-full z-50 bg-background"
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-primary">Messages</h1>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <div className="flex justify-between items-center mb-2 px-2">
              <h2 className="font-semibold text-foreground">Recent</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                <Plus className="h-4 w-4 mr-1" /> New
              </Button>
            </div>

            <div className="space-y-1">
              {filteredConversations.map((conv) => (
                <motion.div
                  key={conv.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleConversationClick(conv.id)}
                  className={`flex items-center p-2 rounded-lg cursor-pointer ${
                    activeConversationId === conv.id
                      ? "bg-primary/10 border-l-2 border-primary"
                      : "hover:bg-accent"
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border">
                      <AvatarImage
                        src={conv.contact.avatar}
                        alt={conv.contact.name}
                      />
                      <AvatarFallback>
                        {conv.contact.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {conv.unread > 0 && (
                      <Badge
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                        variant="default"
                      >
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-foreground">
                        {conv.contact.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {conv.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
