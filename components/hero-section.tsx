"use client"

import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/components/analytics"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 px-6 border-b-4 border-border overflow-hidden bg-background">
      {/* Harsh Halftone Dot Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-20 dark:opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 2px, transparent 0)",
          backgroundSize: "32px 32px"
        }}
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-start text-left">
        <div className="mb-8">
          <div className="inline-block px-4 py-2 border-2 border-border bg-card shadow-brutal text-foreground font-black uppercase tracking-widest text-sm">
            Welcome
          </div>
        </div>

        <h1 className="text-6xl sm:text-8xl md:text-[9rem] font-black uppercase tracking-tighter leading-[0.85] mb-8 text-foreground mix-blend-difference">
          Nurazim
          <br />
          <span className="text-primary block transform -skew-x-6 mt-2">
            Roizan
          </span>
        </h1>

        <div className="bg-card border-l-8 border-primary p-6 shadow-brutal mb-12 max-w-2xl">
          <p className="text-xl md:text-2xl font-bold uppercase tracking-tight text-foreground leading-snug">
            I force technology to comply with my comfort level to solve micro-inefficiencies in life.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <Button
            onClick={() => {
              trackEvent("view_work_click")
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="px-10 py-8 bg-primary hover:bg-primary text-primary-foreground text-xl uppercase font-black tracking-widest flex items-center justify-center gap-3 border-4 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
          >
            View My Work
            <ArrowRight size={28} />
          </Button>
          <Button
            asChild
            variant="outline"
            className="px-10 py-8 bg-card text-foreground text-xl uppercase font-black tracking-widest border-4 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
          >
            <a 
              href="/Nurazim_Roizan_CV.pdf" 
              download="Nurazim_Roizan_CV.pdf"
              onClick={() => trackEvent("resume_download")}
            >
              Download CV
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
