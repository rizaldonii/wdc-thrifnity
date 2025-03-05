"use client"

import type React from "react"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, Flag, Menu, MoreVertical, Search, Send, UserPlus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import ChatSidebar from "./chat-sidebar"
import ProductCard from "./product-card"

// Sample data for the chat
const chatData = {
  user: {
    id: 1,
    name: "Sarah",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  contact: {
    id: 2,
    name: "Alex",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  messages: [
    {
      id: 1,
      senderId: 2,
      text: "Hi Sarah! I saw you have this denim jacket. Is it still available?",
      time: "10:30 AM",
    },
    {
      id: 2,
      senderId: 2,
      product: {
        id: 101,
        name: "Vintage Denim Jacket",
        price: 45.99,
        image: "/placeholder.svg?height=120&width=120",
        forSale: true,
        forTrade: false,
      },
      time: "10:31 AM",
    },
    {
      id: 3,
      senderId: 1,
      text: "Hey Alex! Yes, it's still available. Are you interested in buying it?",
      time: "10:33 AM",
    },
    {
      id: 4,
      senderId: 2,
      text: "Actually, I was wondering if you'd be interested in trading? I have this sweater that might be your style.",
      time: "10:35 AM",
    },
    {
      id: 5,
      senderId: 2,
      product: {
        id: 102,
        name: "Cashmere Sweater",
        price: 39.99,
        image: "/placeholder.svg?height=120&width=120",
        forSale: false,
        forTrade: true,
      },
      time: "10:36 AM",
    },
    {
      id: 6,
      senderId: 1,
      text: "That's a beautiful sweater! I might be interested. Let me think about it and get back to you.",
      time: "10:40 AM",
    },
    {
      id: 7,
      senderId: 2,
      text: "Sure, no rush! By the way, do you have any other vintage items?",
      time: "10:42 AM",
    },
    {
      id: 8,
      senderId: 1,
      text: "Yes, I just listed this dress yesterday. It's for sale only though.",
      time: "10:45 AM",
    },
    {
      id: 9,
      senderId: 1,
      product: {
        id: 103,
        name: "Floral Vintage Dress",
        price: 55.0,
        image: "/placeholder.svg?height=120&width=120",
        forSale: true,
        forTrade: false,
      },
      time: "10:46 AM",
    },
    {
      id: 10,
      senderId: 2,
      text: "That's gorgeous! I might just buy it outright. Let me check my size...",
      time: "10:48 AM",
    },
  ],
}

export default function ChatInterface() {
  const [showSidebar, setShowSidebar] = useState(true)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(chatData.messages)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Check if we're on mobile and handle resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // Show sidebar automatically when switching to desktop
      if (!mobile && !showSidebar) {
        setShowSidebar(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [showSidebar]) // Corrected dependency

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]) //Corrected dependency

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        senderId: 1, // Current user
        text: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Scroll to bottom after sending message
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-full bg-gray-50 relative">
      {/* Mobile header - only visible on small screens */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-bold text-[#1D9BF0]">Thrifnity</h1>
        <Button variant="ghost" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? <ChevronLeft /> : <Search />}
        </Button>
      </div>

      {/* Chat sidebar - responsive */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`border-r border-gray-200 bg-white z-30 ${isMobile ? "fixed inset-0 w-full h-full top-[60px]" : "w-80 relative"
              }`}
          >
            <ChatSidebar
              onSelectConversation={() => {
                // On mobile, close sidebar when a conversation is selected
                if (window.innerWidth < 768) {
                  setShowSidebar(false)
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main chat area - responsive */}
      <div className="flex-1 flex flex-col h-full" ref={chatContainerRef}>
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            {isMobile ? (
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowSidebar(!showSidebar)}>
                <ChevronLeft />
              </Button>
            ) : (
              !showSidebar && (
                <Button variant="ghost" size="icon" onClick={() => setShowSidebar(true)}>
                  <Menu className="h-5 w-5" />
                </Button>
              )
            )}
            <Avatar className="h-10 w-10">
              <img src={chatData.contact.avatar || "/placeholder.svg"} alt={chatData.contact.name} />
            </Avatar>
            <div>
              <h2 className="font-semibold">{chatData.contact.name}</h2>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </motion.button>
              </DropdownMenuTrigger>
              <AnimatePresence>
                <DropdownMenuContent className="w-56 z-50" sideOffset={5} asChild>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2 px-3 hover:bg-blue-50 transition-colors duration-200">
                      <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 0.9 }}>
                        <UserPlus className="h-4 w-4 text-[#1D9BF0]" />
                      </motion.div>
                      <span>Follow +</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2 px-3 text-red-500 hover:bg-red-50 transition-colors duration-200">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Flag className="h-4 w-4" />
                      </motion.div>
                      <span>Report User</span>
                    </DropdownMenuItem>
                  </motion.div>
                </DropdownMenuContent>
              </AnimatePresence>
            </DropdownMenu>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-gray-50 pb-24 md:pb-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.senderId === chatData.user.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[70%] ${msg.senderId === chatData.user.id ? "order-2" : "order-1"}`}
                >
                  {msg.senderId !== chatData.user.id && (
                    <Avatar className="h-8 w-8 mb-1">
                      <img src={chatData.contact.avatar || "/placeholder.svg"} alt={chatData.contact.name} />
                    </Avatar>
                  )}

                  {msg.text && (
                    <div
                      className={`rounded-2xl p-2 sm:p-3 ${msg.senderId === chatData.user.id
                          ? "bg-[#1D9BF0] text-white"
                          : "bg-white border border-gray-200"
                        }`}
                    >
                      <p className="text-sm sm:text-base">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 text-right ${msg.senderId === chatData.user.id ? "text-blue-100" : "text-gray-500"
                          }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  )}

                  {msg.product && (
                    <div className="mt-2">
                      <ProductCard product={msg.product} />
                      <p
                        className={`text-xs mt-1 ${msg.senderId === chatData.user.id ? "text-right text-gray-500" : "text-gray-500"
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

        {/* Chat input - fixed at bottom on mobile */}
        <div className="p-2 sm:p-4 border-t border-gray-200 bg-white md:relative fixed bottom-0 left-0 right-0 z-40">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" className="bg-[#1D9BF0] hover:bg-[#1a8cd8]">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

