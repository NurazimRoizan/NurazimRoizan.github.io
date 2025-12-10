"use client"

import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="mb-8 inline-block">
          <div className="px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-sm font-medium glow-border">
            ✨ Welcome to my portfolio
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          I build beautiful{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
            digital experiences
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Full-stack developer passionate about creating innovative solutions. Specialized in modern web technologies
          and building scalable applications.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-6 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-semibold rounded-lg flex items-center justify-center gap-2 group shadow-lg glow-border-strong"
          >
            View My Work
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            className="px-8 py-6 border-cyan-400/30 text-foreground hover:bg-cyan-400/5 bg-transparent glow-border"
          >
            Download Resume
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 justify-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-secondary/50 hover:bg-cyan-400/10 border border-cyan-400/20 transition-all duration-300 hover:border-cyan-400/50 glow-border"
          >
            <Github size={24} className="text-cyan-400" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-secondary/50 hover:bg-cyan-400/10 border border-cyan-400/20 transition-all duration-300 hover:border-cyan-400/50 glow-border"
          >
            <Linkedin size={24} className="text-cyan-400" />
          </a>
          <a
            href="mailto:your.email@example.com"
            className="p-3 rounded-lg bg-secondary/50 hover:bg-cyan-400/10 border border-cyan-400/20 transition-all duration-300 hover:border-cyan-400/50 glow-border"
          >
            <Mail size={24} className="text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  )
}
