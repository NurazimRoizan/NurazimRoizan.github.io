"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t-4 border-border bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3">
          {/* Brand */}
          <div className="p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-border">
            <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground mb-4 inline-block bg-primary text-primary-foreground px-4 py-2 border-2 border-border shadow-brutal-sm">
              Portfolio
            </h3>
            <p className="font-bold text-muted-foreground uppercase tracking-widest text-sm leading-relaxed">
              Building beautiful and functional digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-border bg-secondary">
            <h4 className="font-black uppercase tracking-widest text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <a href="#home" className="inline-block font-black uppercase tracking-widest text-sm border-b-4 border-transparent hover:border-primary transition-all">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="inline-block font-black uppercase tracking-widest text-sm border-b-4 border-transparent hover:border-primary transition-all">
                  Projects
                </a>
              </li>
              <li>
                <a href="#cv" className="inline-block font-black uppercase tracking-widest text-sm border-b-4 border-transparent hover:border-primary transition-all">
                  CV
                </a>
              </li>
              <li>
                <Link href="/strava" className="inline-block font-black uppercase tracking-widest text-sm border-b-4 border-transparent hover:border-primary transition-all">
                  Strava
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="p-8 md:p-12 bg-muted">
            <h4 className="font-black uppercase tracking-widest text-foreground mb-6">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-background border-4 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-background border-4 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="p-4 bg-background border-4 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-4 border-border p-8 bg-card">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-black uppercase tracking-widest text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              Made with <Heart size={16} className="text-primary fill-primary" /> by Nurazim
            </p>
            <p>© {currentYear} All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
