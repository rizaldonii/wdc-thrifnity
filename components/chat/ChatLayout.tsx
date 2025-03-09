"use client";
import { Card } from "@/components/ui/card";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWidow";
import { ChatProvider } from "./ChatContext";

export default function ChatLayout() {
  return (
    <Card
      className="w-full overflow-hidden border-0 shadow-lg flex flex-col"
      style={{ height: "calc(100vh - 160px)", minHeight: "600px" }}
    >
      <ChatProvider>
        <div className="flex h-full">
          <ChatSidebar />
          <ChatWindow />
        </div>
      </ChatProvider>
    </Card>
  );
}
