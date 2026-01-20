"use client"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

interface NavigationProps {
  onNavigate?: (section: string) => void
  activeSection: string
}

export default function Navigation({ onNavigate, activeSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "cv", label: "CV" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border md:left-72">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold bg-gradient-to-r from-[#FF8C00] to-[#FFA500] dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">
          <a href="/">
            NurazimRoizan/Portfolio
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.id === "home" ? "/" : `/#${item.id}`}
              onClick={(e) => {
                // Only prevent default and use onNavigate if we're already on home page
                if (window.location.pathname === "/" && onNavigate) {
                  e.preventDefault()
                  onNavigate(item.id)
                }
              }}
              className={`transition-colors duration-300 font-medium relative group ${activeSection === item.id ? "text-[#FF8C00] dark:text-cyan-400" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] dark:from-cyan-400 dark:to-cyan-300 transition-all duration-300 ${activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </Link>
          ))}
          <Link
            href="/strava"
            className="transition-colors duration-300 font-medium relative group text-muted-foreground hover:text-foreground"
          >
            Strava
            <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] dark:from-cyan-400 dark:to-cyan-300 transition-all duration-300 w-0 group-hover:w-full" />
          </Link>

          {/* Theme Toggle */}
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95">
          <div className="flex flex-col gap-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.id === "home" ? "/" : `/#${item.id}`}
                onClick={(e) => {
                  if (window.location.pathname === "/" && onNavigate) {
                    e.preventDefault()
                    onNavigate(item.id)
                  }
                  setIsMenuOpen(false)
                }}
                className={`text-left font-medium transition-colors ${activeSection === item.id ? "text-[#FF8C00] dark:text-cyan-400" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/strava"
              onClick={() => setIsMenuOpen(false)}
              className="text-left font-medium transition-colors text-muted-foreground hover:text-foreground"
            >
              Strava
            </Link>

            {/* Theme Toggle for Mobile */}
            <div className="pt-2 border-t border-border">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}