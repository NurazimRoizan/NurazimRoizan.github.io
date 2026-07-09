"use client"
import React from "react"

export default function Marquee() {
  const text = "REACT // NEXT.JS // TYPESCRIPT // TAILWIND // NEO-BRUTALISM // UI/UX // "
  // Duplicate text multiple times to ensure the container is filled so the loop is seamless
  const repeatedText = Array(4).fill(text).join("")

  return (
    <div className="w-full bg-primary border-t-4 border-b-4 border-border overflow-hidden py-3 md:py-4 flex">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-primary-foreground shrink-0 pr-4">
          {repeatedText}
        </h2>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-primary-foreground shrink-0 pr-4">
          {repeatedText}
        </h2>
      </div>
    </div>
  )
}
