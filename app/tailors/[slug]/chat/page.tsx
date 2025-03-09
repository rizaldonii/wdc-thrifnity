"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { chatConversations, chatRooms } from "@/data/chats";
import { tailors } from "@/data/tailors";
import type { ChatConversation, ChatMessage, OrderStatus } from "@/types/chat";
import ChatHeader from "@/containers/chat-page/chat-header";
import MessageList from "@/containers/chat-page/message-list";
import MessageInput from "@/containers/chat-page/message-input";
import ServiceRequestPanel from "@/containers/chat-page/service-request-panel";
import OrderDetailsPanel from "@/containers/chat-page/order-details-panel";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function TailorChatPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [conversation, setConversation] = useState<ChatConversation | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"chat" | "order">("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Find the tailor by slug
  const tailor = tailors.find((t) => t.slug === slug);

  // Simulate fetching conversation data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from an API
        // For now, we'll use the sample data
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

        if (!tailor) {
          throw new Error("Tailor not found");
        }

        // Find the chat room for this tailor
        const room = chatRooms.find(
          (room) => room.participants.tailor.id === tailor.id
        );

        if (!room) {
          // If no conversation exists, we could create a new one
          // For now, we'll just show an error
          throw new Error("No conversation found with this tailor");
        }

        // Find the conversation for this room
        const conv = chatConversations.find((conv) => conv.roomId === room.id);

        if (!conv) {
          throw new Error("Conversation data not found");
        }

        setConversation(conv);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, tailor]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (conversation && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation, conversation?.messages]);

  // Handle sending a new message
  const handleSendMessage = (text: string, image?: File) => {
    if (!conversation || (!text.trim() && !image)) return;

    // In a real app, you would send this to an API
    // For now, we'll just update the local state
    const newMessage: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: conversation.participants.user.id, // Assuming the current user is the one sending
      text: text,
      image: image ? URL.createObjectURL(image) : undefined,
      read: false,
      createdAt: new Date().toISOString(),
    };

    setConversation({
      ...conversation,
      messages: [...conversation.messages, newMessage],
    });
  };

  // Handle order status changes
  const handleStatusChange = (status: OrderStatus) => {
    if (!conversation || !conversation.activeServiceRequest) return;

    // In a real app, you would send this to an API
    // For now, we'll just update the local state
    setConversation({
      ...conversation,
      activeServiceRequest: {
        ...conversation.activeServiceRequest,
        status: status,
        updatedAt: new Date().toISOString(),
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading conversation...</span>
      </div>
    );
  }

  if (error || !conversation || !tailor) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error ||
              "Could not load the conversation. Please try again later."}
          </AlertDescription>
        </Alert>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="bg-background rounded-xl shadow-sm border overflow-hidden">
        <ChatHeader
          tailor={tailor}
          hasActiveOrder={!!conversation.activeServiceRequest}
          onTabChange={(tab) => setActiveTab(tab as "chat" | "order")}
          activeTab={activeTab}
        />

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "chat" | "order")}
          className="flex flex-col h-[calc(100vh-200px)]"
        >
          <TabsContent
            value="chat"
            className="flex-1 flex flex-col data-[state=active]:flex data-[state=inactive]:hidden m-0 overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto p-4">
              <MessageList
                messages={conversation.messages}
                user={conversation.participants.user}
                tailor={conversation.participants.tailor}
              />
              <div ref={messagesEndRef} />
            </div>
            <MessageInput onSendMessage={handleSendMessage} />
          </TabsContent>

          <TabsContent
            value="order"
            className="flex-1 overflow-y-auto data-[state=active]:block data-[state=inactive]:hidden m-0 p-4"
          >
            {conversation.activeServiceRequest ? (
              <OrderDetailsPanel
                serviceRequest={conversation.activeServiceRequest}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <ServiceRequestPanel
                tailor={conversation.participants.tailor}
                services={tailor.services}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
