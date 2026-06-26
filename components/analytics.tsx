"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Helper function so we can manually trigger events anywhere in the app
export const trackEvent = async (eventName: string, path?: string) => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jimiroi.com"
    
    // Fire and forget. We don't await the response because we don't want to block the UI.
    fetch(`${API_URL}/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: eventName,
        path: path || window.location.pathname,
        project: "portfolio"
      }),
      // keepalive ensures the fetch finishes even if the user closes the tab immediately
      keepalive: true, 
    }).catch(err => {
      // Silently fail if the adblocker blocks it or the API is down
      console.warn("Analytics blocked or failed:", err)
    })
  } catch (error) {
    // Ignore errors to ensure analytics never breaks the app
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track a page view every time the pathname changes
    trackEvent("page_view", pathname)
  }, [pathname])

  return null // This component is completely invisible
}
