"use client";

import { useState, useEffect } from "react";

/**
 * A hook that detects if the current viewport is a mobile device
 * @param breakpoint The maximum width in pixels to consider as mobile (default: 768px)
 * @returns A boolean indicating if the current viewport is mobile
 */
export function useMobile(breakpoint = 768): boolean {
  // Default to false during SSR
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the window width is less than the breakpoint
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check initially
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [breakpoint]);

  return isMobile;
}
