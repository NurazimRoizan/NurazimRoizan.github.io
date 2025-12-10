"use client"

import { Mail, Github, Linkedin, MapPin, Gamepad2, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const contactLinks = [
    { icon: Mail, label: "Email", href: "mailto:your.email@example.com", color: "text-cyan-400" },
    { icon: Github, label: "GitHub", href: "https://github.com", color: "text-cyan-400" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", color: "text-cyan-400" },
    { icon: MapPin, label: "Strava", href: "/strava", color: "text-orange-500" },
    { icon: Gamepad2, label: "Steam", href: "https://steamcommunity.com", color: "text-cyan-400" },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Sidebar - compact layout without scrolling */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-secondary/80 to-background border-r border-cyan-400/20 p-6 z-30 flex-col justify-between">
        <div>
          <div className="text-center">
            {/* Profile Picture */}
            <div className="mb-5 flex justify-center">
              <img
                src="/professional-portrait.jpg"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-cyan-400/30 object-cover profile-glow"
              />
            </div>

            {/* Name */}
            <h1 className="text-xl font-bold mb-1">Your Name</h1>

            {/* Job Title */}
            <p className="text-cyan-400 font-semibold text-sm mb-5">Full Stack Developer</p>

            {/* Favorite Quote - Compact */}
            <p className="text-muted-foreground italic text-xs leading-relaxed mb-6 p-3 border-l-2 border-orange-500 bg-secondary/50 rounded-r">
              "Code is poetry written in a language computers understand."
            </p>

            {/* Contact Links - Icon + Label in rows */}
            <div className="flex flex-col gap-2">
              {contactLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto:") || link.href.startsWith("/") ? undefined : "_blank"}
                    rel={
                      link.href.startsWith("mailto:") || link.href.startsWith("/") ? undefined : "noopener noreferrer"
                    }
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary border border-cyan-400/20 hover:border-cyan-400/50 transition-all group text-sm glow-border"
                  >
                    <Icon size={18} className={link.color} />
                    <span className="font-medium group-hover:text-cyan-400 transition-colors">{link.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2025 Your Name</p>
          <p className="mt-1">Crafted with passion</p>
        </div>
      </aside>

      {/* Mobile Dropdown Menu - appears from top-right */}
      {isOpen && (
        <div className="md:hidden fixed top-16 right-4 w-72 bg-secondary/95 backdrop-blur-sm border border-cyan-400/30 rounded-lg shadow-2xl p-5 z-40 glow-border">
          <div className="text-center space-y-4">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <img
                src="/professional-portrait.jpg"
                alt="Profile"
                className="w-20 h-20 rounded-full border-3 border-cyan-400/30 object-cover profile-glow"
              />
            </div>

            {/* Name */}
            <div>
              <h2 className="text-lg font-bold">Your Name</h2>
              <p className="text-cyan-400 font-semibold text-sm">Full Stack Developer</p>
            </div>

            {/* Favorite Quote */}
            <p className="text-muted-foreground italic text-xs leading-relaxed p-3 border-l-2 border-orange-500 bg-secondary/50 rounded-r">
              "Code is poetry written in a language computers understand."
            </p>

            <div className="flex flex-col gap-2 pt-2">
              {contactLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto:") || link.href.startsWith("/") ? undefined : "_blank"}
                    rel={
                      link.href.startsWith("mailto:") || link.href.startsWith("/") ? undefined : "noopener noreferrer"
                    }
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary border border-cyan-400/20 hover:border-cyan-400/50 transition-all group text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={18} className={link.color} />
                    <span className="font-medium group-hover:text-cyan-400 transition-colors">{link.label}</span>
                  </a>
                )
              })}
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-muted-foreground pt-3 border-t border-cyan-400/10">
              <p>© 2025 Your Name</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {isOpen && <div className="md:hidden fixed inset-0 z-20" onClick={() => setIsOpen(false)} />}
    </>
  )
}
