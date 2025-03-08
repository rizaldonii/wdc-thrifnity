"use client"

import { useRef } from "react"
import ChatInterface from "./chat-interface"

export default function ChatContainer() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div
            ref={containerRef}
            className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 flex flex-col mb-8"
            style={{ height: "calc(100vh - 200px)", minHeight: "600px" }}
        >
            <ChatInterface />
        </div>
    )
}