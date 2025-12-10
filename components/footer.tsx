"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-secondary/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent mb-2">
              Portfolio
            </h3>
            <p className="text-sm text-muted-foreground">Building beautiful and functional digital experiences.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#home" className="hover:text-cyan-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#cv" className="hover:text-cyan-400 transition-colors">
                  CV
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-cyan-400/10 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                <Github size={18} className="text-cyan-400" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-cyan-400/10 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                <Linkedin size={18} className="text-cyan-400" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-cyan-400/10 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                <Mail size={18} className="text-cyan-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              Made with <Heart size={16} className="text-cyan-400" /> by me
            </p>
            <p>© {currentYear} All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
