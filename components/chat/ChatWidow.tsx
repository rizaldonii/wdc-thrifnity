"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flag, Menu, MoreVertical, Send, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useChat } from "./ChatContext";
import ProductCard from "./ProductCard";
import MobileChatSidebar from "./MobileChatSidebar";

export default function ChatWindow() {
  const { conversations, activeConversationId, sendMessage, currentUser } =
    useChat();
  const [message, setMessage] = useState("");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [prevConversationId, setPrevConversationId] = useState<number | null>(
    null
  );

  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  );

  const [hasActiveConversation, setHasActiveConversation] = useState(
    !!activeConversation
  );

  // Detect conversation change
  useEffect(() => {
    if (activeConversationId !== prevConversationId) {
      // Reset scroll position when conversation changes
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = 0;
      }
      setAutoScroll(true);
      setPrevConversationId(activeConversationId);
    }

    setHasActiveConversation(!!activeConversation);
  }, [activeConversation, activeConversationId, prevConversationId]);

  // Handle scroll events to determine if auto-scroll should be enabled
  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 50;

    setAutoScroll(isScrolledToBottom);
  };

  // Add scroll event listener
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
      return () => chatContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Controlled scroll to bottom when messages change, but only if autoScroll is true
  useEffect(() => {
    if (
      hasActiveConversation &&
      autoScroll &&
      activeConversation?.messages.length
    ) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation?.messages, hasActiveConversation, autoScroll]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
      setAutoScroll(true);

      // Scroll to bottom after sending message
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  if (!hasActiveConversation) {
    return (
      <div className="flex-1 flex items-center justify-center">
        No conversation selected
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {showMobileSidebar && (
          <MobileChatSidebar onClose={() => setShowMobileSidebar(false)} />
        )}
      </AnimatePresence>

      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b bg-card dark:bg-card">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileSidebar(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Avatar className="h-10 w-10 border dark:border-gray-700">
            <AvatarImage
              src={activeConversation!.contact.avatar}
              alt={activeConversation!.contact.name}
            />
            <AvatarFallback>
              {activeConversation!.contact.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-foreground dark:text-foreground">
              {activeConversation!.contact.name}
            </h2>
            <Badge
              variant="outline"
              className={`text-xs h-5 ${
                activeConversation!.contact.online
                  ? "bg-green-500/10 text-green-500 border-green-500/20 dark:bg-green-500/20 dark:text-green-400"
                  : "bg-gray-500/10 text-gray-500 border-gray-500/20 dark:bg-gray-600/20 dark:text-gray-400"
              }`}
            >
              {activeConversation!.contact.online ? "Online" : "Offline"}
            </Badge>
          </div>
        </div>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent transition-colors duration-200"
              >
                <MoreVertical className="h-5 w-5 text-muted-foreground" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-50" sideOffset={5}>
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2 px-3">
                <UserPlus className="h-4 w-4 text-primary" />
                <span>Follow +</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2 px-3 text-destructive">
                <Flag className="h-4 w-4" />
                <span>Report User</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Chat messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-2 sm:p-4 bg-[var(--color-accent)]/5 dark:bg-[var(--color-accent)]/10"
      >
        <div className="space-y-4">
          {activeConversation!.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.senderId === currentUser.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] ${
                  msg.senderId === currentUser.id ? "order-2" : "order-1"
                }`}
              >
                {msg.senderId !== currentUser.id && (
                  <Avatar className="h-8 w-8 mb-1 border border-[var(--color-accent)]/10">
                    <AvatarImage
                      src={activeConversation!.contact.avatar}
                      alt={activeConversation!.contact.name}
                    />
                    <AvatarFallback className="bg-[var(--color-primary)]/5 text-[var(--color-primary)]">
                      {activeConversation!.contact.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}

                {msg.text && (
                  <div
                    className={`relative rounded-2xl p-3 sm:p-4 ${
                      msg.senderId === currentUser.id
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-[var(--background-start-rgb)] dark:bg-[var(--color-accent)] border border-[var(--color-accent)]/10"
                    }`}
                  >
                    <p
                      className={`text-sm sm:text-base ${
                        msg.senderId === currentUser.id
                          ? "text-white"
                          : "text-[var(--text-primary)]"
                      }`}
                    >
                      {msg.text}
                    </p>
                    <p
                      className={`text-xs mt-1.5 text-right ${
                        msg.senderId === currentUser.id
                          ? "text-white/80"
                          : "text-[var(--text-subtle)]"
                      }`}
                    >
                      {msg.time}
                    </p>

                    {/* Message tail */}
                    <div
                      className={`absolute bottom-0 ${
                        msg.senderId === currentUser.id
                          ? "right-0 transform translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-[var(--color-primary)]"
                          : "left-0 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-[var(--background-start-rgb)] dark:bg-[var(--color-accent)] border border-[var(--color-accent)]/10"
                      }`}
                    />
                  </div>
                )}

                {msg.product && (
                  <div className="mt-2">
                    <div className="relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md">
                      <div className="bg-[var(--background-start-rgb)] dark:bg-[var(--color-accent)] border border-[var(--color-accent)]/10 rounded-xl">
                        <ProductCard product={msg.product} />
                      </div>
                    </div>
                    <p
                      className={`text-xs mt-2 ${
                        msg.senderId === currentUser.id
                          ? "text-right text-[var(--text-subtle)]"
                          : "text-[var(--text-subtle)]"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat input */}
      <div className="p-2 sm:p-4 border-t border-border bg-card dark:bg-card dark:border-gray-700 sticky bottom-0 left-0 right-0 z-10">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 dark:bg-gray-800 dark:border-gray-700"
          />
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 dark:hover:bg-primary/80"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
        {!autoScroll && activeConversation!.messages.length > 5 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
              setAutoScroll(true);
            }}
            className="absolute bottom-20 right-4 rounded-full py-2 px-3 shadow-md bg-card dark:bg-gray-800 border border-border dark:border-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs">New messages</span>
          </Button>
        )}
      </div>
    </div>
  );
}
