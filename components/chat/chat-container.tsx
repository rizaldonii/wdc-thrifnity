"use client"

import { useEffect, useRef, useState } from "react"
import ChatInterface from "./chat-interface"

export default function ChatContainer() {
    const [containerHeight, setContainerHeight] = useState("calc(100vh - 180px)")
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Function to calculate the appropriate height
        const calculateHeight = () => {
            // Get navbar height
            const navbar = document.querySelector("nav")?.parentElement
            const navbarHeight = navbar ? navbar.offsetHeight : 100

            // Get footer height
            const footer = document.querySelector("footer")
            const footerHeight = footer ? footer.offsetHeight : 0

            // Add some padding - extra on mobile
            const padding = window.innerWidth < 768 ? 20 : 20

            // Set the container height to viewport height minus navbar and footer
            const calculatedHeight = `calc(100vh - ${navbarHeight + footerHeight + padding}px)`
            setContainerHeight(calculatedHeight)

            // For debugging
            console.log(
                `Navbar: ${navbarHeight}px, Footer: ${footerHeight}px, Total: ${navbarHeight + footerHeight + padding}px`,
            )
        }

        // Calculate on mount and when window resizes
        calculateHeight()
        window.addEventListener("resize", calculateHeight)

        // Recalculate after a short delay to ensure all elements are properly rendered
        const timer = setTimeout(calculateHeight, 500)

        // Cleanup
        return () => {
            window.removeEventListener("resize", calculateHeight)
            clearTimeout(timer)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 flex flex-col"
            style={{ height: containerHeight, minHeight: "500px" }}
        >
            <ChatInterface />
        </div>
    )
}

