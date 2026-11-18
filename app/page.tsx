"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import CVSection from "@/components/cv-section"
import Footer from "@/components/footer"
import Marquee from "@/components/marquee"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main > [id]")
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id")
            if (id) setActiveSection(id)
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
      element.focus({ preventScroll: true })
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navigation onNavigate={scrollToSection} activeSection={activeSection} />

      <div id="home" tabIndex={-1} className="focus:outline-none">
        <HeroSection />
      </div>

      <div id="projects" tabIndex={-1} className="focus:outline-none">
        <ProjectsSection />
      </div>

      <div id="cv" tabIndex={-1} className="focus:outline-none">
        <CVSection />
      </div>

      <Marquee />

      <Footer />
    </main>
  )
}
