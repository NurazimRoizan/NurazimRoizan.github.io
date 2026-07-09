"use client"
import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  
  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true)
      return
    }

    document.body.classList.add("custom-cursor-enabled")

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      const target = e.target as HTMLElement
      // Check if hovering over interactive elements
      const isClickable = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") !== null ||
        target.closest("button") !== null
      
      setIsPointer(isClickable)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.classList.remove("custom-cursor-enabled")
    }
  }, [])

  if (isTouch) return null

  return (
    <div 
      className="fixed top-0 left-0 pointer-events-none z-[10000] transition-transform duration-75 ease-out mix-blend-difference hidden md:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      <div className={`
        bg-white
        transition-all duration-200 ease-out
        ${isPointer ? 'w-10 h-10 rounded-full bg-transparent border-4 border-white' : 'w-6 h-6 rounded-none'}
      `} />
    </div>
  )
}
