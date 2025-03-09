import ChatLayout from "@/components/chat/ChatLayout";

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 container mx-auto px-4 py-6">
        <ChatLayout />
      </main>
    </div>
  );
}
