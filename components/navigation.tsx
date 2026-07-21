"use client"
import { useState } from "react"
import { Menu, X, Mail, Github, Linkedin, MapPin, Gamepad2 } from "lucide-react"
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

  const contactLinks = [
    { icon: Mail, label: "Email", href: "mailto:rnurazim@gmail.com" },
    { icon: Github, label: "GitHub", href: "https://github.com/NurazimRoizan" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/nurazimroy" },
    { icon: MapPin, label: "Strava", href: "/strava" },
    { icon: Gamepad2, label: "Steam", href: "https://steamcommunity.com/id/arkxenark" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b-4 border-border md:left-72">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="text-lg md:text-xl font-black uppercase tracking-tighter bg-primary text-primary-foreground px-4 py-2 border-2 border-border shadow-brutal-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
          <a href="/">
            NurazimRoizan
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.id === "home" ? "/" : `/#${item.id}`}
              onClick={(e) => {
                if (window.location.pathname === "/" && onNavigate) {
                  e.preventDefault()
                  onNavigate(item.id)
                }
              }}
              className={`px-4 py-2 font-black uppercase tracking-widest text-sm transition-all border-2 ${
                activeSection === item.id 
                  ? "bg-foreground text-background border-border shadow-brutal-sm" 
                  : "border-transparent text-foreground hover:bg-primary hover:text-primary-foreground hover:border-border hover:shadow-brutal-sm hover:-translate-y-[2px]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/strava"
            className="px-4 py-2 font-black uppercase tracking-widest text-sm transition-all border-2 border-transparent text-foreground hover:bg-primary hover:text-primary-foreground hover:border-border hover:shadow-brutal-sm hover:-translate-y-[2px]"
          >
            Strava
          </Link>

          {/* Theme Toggle */}
          <div className="ml-2">
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 bg-background border-2 border-border shadow-brutal-sm text-foreground hover:bg-primary hover:text-primary-foreground" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t-4 border-border bg-card max-h-[85vh] overflow-y-auto">
          {/* Profile Identity (Mobile Only) */}
          <div className="p-6 border-b-4 border-border bg-secondary flex flex-col items-center">
             <img src="/professional-portrait.jpg" alt="Profile" className="w-24 h-24 border-4 border-border shadow-brutal object-cover mb-4" />
             <h2 className="text-2xl font-black uppercase tracking-tighter text-foreground text-center">Nurazim Roizan</h2>
             <p className="text-primary font-bold text-xs uppercase tracking-tight mt-1 mb-6 text-center">96% Front-End Developer<br/>4% Dark Mode Enthusiast</p>
             <div className="flex flex-wrap justify-center gap-3 w-full">
               {contactLinks.map((link) => {
                 const Icon = link.icon
                 return (
                   <a key={link.label} href={link.href} target={link.href.startsWith("mailto:") || link.href.startsWith("/") ? undefined : "_blank"} rel={link.href.startsWith("mailto:") || link.href.startsWith("/") ? undefined : "noopener noreferrer"} className="flex items-center justify-center p-3 bg-card border-2 border-border shadow-brutal active:shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] transition-all">
                     <Icon size={20} className="text-foreground" />
                   </a>
                 )
               })}
             </div>
          </div>

          <div className="flex flex-col p-4 gap-4">
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
                className={`block px-4 py-3 font-black uppercase tracking-widest text-sm border-2 ${
                  activeSection === item.id 
                    ? "bg-foreground text-background border-border shadow-brutal-sm" 
                    : "border-transparent text-foreground hover:bg-primary hover:text-primary-foreground hover:border-border hover:shadow-brutal-sm"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/strava"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 font-black uppercase tracking-widest text-sm border-2 border-transparent text-foreground hover:bg-primary hover:text-primary-foreground hover:border-border hover:shadow-brutal-sm"
            >
              Strava
            </Link>

            {/* Theme Toggle for Mobile */}
            <div className="pt-4 mt-2 border-t-4 border-border flex justify-start">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}