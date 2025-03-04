"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"

interface ChatSidebarProps {
  onSelectConversation?: () => void
}

// Sample data for conversations
const conversations = [
  {
    id: 1,
    name: "Alex",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "That's gorgeous! I might just buy it...",
    time: "10:48 AM",
    unread: 0,
    active: true,
  },
  {
    id: 2,
    name: "Maya",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Is this still available?",
    time: "Yesterday",
    unread: 2,
    active: false,
  },
  {
    id: 3,
    name: "Liam",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'd like to trade my jacket for your...",
    time: "Yesterday",
    unread: 0,
    active: false,
  },
  {
    id: 4,
    name: "Emma",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the quick response!",
    time: "Monday",
    unread: 0,
    active: false,
  },
  {
    id: 5,
    name: "Noah",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can you send more photos?",
    time: "Sunday",
    unread: 1,
    active: false,
  },
]

export default function ChatSidebar({ onSelectConversation }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeConversation, setActiveConversation] = useState(1)

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleConversationClick = (id: number) => {
    setActiveConversation(id)
    if (onSelectConversation) {
      onSelectConversation()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 hidden md:block">
        <h1 className="text-xl font-bold text-[#1D9BF0] mb-4">Thrifnity</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile search */}
      <div className="p-4 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
            <h2 className="font-semibold text-gray-700">Messages</h2>
            <Button variant="ghost" size="sm" className="text-[#1D9BF0]">
              <Plus className="h-4 w-4 mr-1" /> New
            </Button>
          </div>

          <div className="space-y-1">
            {filteredConversations.map((conv) => (
              <motion.div
                key={conv.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleConversationClick(conv.id)}
                className={`flex items-center p-2 rounded-lg cursor-pointer ${
                  activeConversation === conv.id ? "bg-blue-50" : "hover:bg-gray-100"
                }`}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                    <img src={conv.avatar || "/placeholder.svg"} alt={conv.name} />
                  </Avatar>
                  {conv.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#1D9BF0] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{conv.name}</h3>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

