"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import CVSection from "@/components/cv-section"
import Footer from "@/components/footer"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {}

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navigation onNavigate={scrollToSection} activeSection={activeSection} />

      <div id="home">
        <HeroSection />
      </div>

      <div id="projects">
        <ProjectsSection />
      </div>

      <div id="cv">
        <CVSection />
      </div>

      <Footer />
    </main>
  )
}
