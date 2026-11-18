"use client"
import React, { useState } from "react"
import { Pause, Play } from "lucide-react"

export default function Marquee() {
  const [isPaused, setIsPaused] = useState(false)
  const text = "REACT // REACT NATIVE // EXPO // NEXT.JS // TYPESCRIPT // TAILWIND // UI/UX // "
  // Duplicate text multiple times to ensure the container is filled so the loop is seamless
  const repeatedText = Array(4).fill(text).join("")

  return (
    <div className="relative w-full bg-primary border-t-4 border-b-4 border-border overflow-hidden py-3 md:py-4 flex items-center">
      <div className={`flex whitespace-nowrap animate-marquee w-max ${isPaused ? "animate-marquee-paused" : ""}`}>
        <span className="text-2xl md:text-3xl font-black uppercase tracking-widest text-primary-foreground shrink-0 pr-4">
          {repeatedText}
        </span>
        <span aria-hidden="true" className="text-2xl md:text-3xl font-black uppercase tracking-widest text-primary-foreground shrink-0 pr-4">
          {repeatedText}
        </span>
      </div>
      <button
        type="button"
        onClick={() => setIsPaused((prev) => !prev)}
        aria-label={isPaused ? "Play scrolling banner" : "Pause scrolling banner"}
        className="relative z-10 mr-3 ml-auto shrink-0 p-2 bg-background text-foreground border-2 border-border shadow-brutal-sm hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
      >
        {isPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>
    </div>
  )
}
