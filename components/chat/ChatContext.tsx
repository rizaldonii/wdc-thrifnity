"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { chatData } from "./ChatData";

export interface Message {
  id: number;
  senderId: number;
  text?: string;
  product?: {
    id: number;
    name: string;
    price: number;
    image: string;
    forSale: boolean;
    forTrade: boolean;
  };
  time: string;
}

export interface Conversation {
  id: number;
  contact: {
    id: number;
    name: string;
    avatar: string;
    online: boolean;
  };
  messages: Message[];
  lastMessage: string;
  time: string;
  unread: number;
}

interface ChatContextType {
  conversations: Conversation[];
  activeConversationId: number;
  setActiveConversationId: (id: number) => void;
  sendMessage: (text: string) => void;
  currentUser: {
    id: number;
    name: string;
    avatar: string;
  };
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [conversations, setConversations] = useState(chatData.conversations);
  const [activeConversationId, setActiveConversationId] = useState(1);

  const currentUser = {
    id: 1,
    name: "Sarah",
    avatar: "/placeholder.svg?height=40&width=40",
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    setConversations((prevConversations) => {
      return prevConversations.map((conversation) => {
        if (conversation.id === activeConversationId) {
          const newMessage = {
            id: conversation.messages.length + 1,
            senderId: currentUser.id,
            text,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
            lastMessage: text,
            time: "Just now",
          };
        }
        return conversation;
      });
    });
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        currentUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
