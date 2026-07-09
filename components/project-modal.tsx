"use client"

import { X, Github, ExternalLink } from "lucide-react"
import { useEffect } from "react"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: number
    title: string
    description: string
    overview: string
    workingPrinciple?: string
    lessons: string
    tags: string[]
    image: string
    github?: string
    live?: string
    features: string[]
    duration: string
    role: string
  } | null
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  return (
    <>
      {/* Backdrop (Visual only) */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        aria-hidden="true"
      />

      {/* Modal Wrapper */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto pt-10"
        onClick={onClose}
      >
        {/* Modal Card */}
        <div 
          className="relative bg-card border-4 border-border shadow-brutal max-w-4xl w-full flex flex-col my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex items-center justify-center p-2 bg-background border-2 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all z-50 text-foreground"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          {/* Project Image Panel (Top) */}
          <div className="w-full border-b-4 border-border flex-shrink-0 bg-muted">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-40 md:h-56 object-cover" />
          </div>

          {/* Content Panel (Bottom) - Scrollable */}
          <div className="w-full p-8 md:p-10 flex flex-col overflow-y-auto max-h-[60vh]">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground mb-6 pr-12">{project.title}</h2>
              
              {(project.github || project.live) && (
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-background text-foreground border-2 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black uppercase tracking-widest text-sm"
                    >
                      <Github size={18} />
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground border-2 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black uppercase tracking-widest text-sm"
                    >
                      <ExternalLink size={18} />
                      Live
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-6 mb-8 p-6 bg-secondary border-4 border-border">
              <div>
                <p className="text-foreground font-black uppercase tracking-widest text-xs mb-1">Type</p>
                <p className="font-bold text-muted-foreground">{project.duration}</p>
              </div>
              <div>
                <p className="text-foreground font-black uppercase tracking-widest text-xs mb-1">Role</p>
                <p className="font-bold text-muted-foreground">{project.role}</p>
              </div>
            </div>

            {/* Description & Details */}
            <div className="space-y-8 flex-grow">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-3 flex items-center gap-3">
                  <span className="w-3 h-3 bg-primary block border border-border" />
                  Description
                </h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{project.description}</p>
              </div>
              
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-3 flex items-center gap-3">
                  <span className="w-3 h-3 bg-primary block border border-border" />
                  Overview
                </h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{project.overview}</p>
              </div>

              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-4 flex items-center gap-3">
                  <span className="w-3 h-3 bg-primary block border border-border" />
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-4 text-muted-foreground font-medium">
                      <span className="text-primary font-black mt-1">►</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.workingPrinciple && (
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-3 flex items-center gap-3">
                    <span className="w-3 h-3 bg-primary block border border-border" />
                    How It Works
                  </h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">{project.workingPrinciple}</p>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-3 flex items-center gap-3">
                  <span className="w-3 h-3 bg-primary block border border-border" />
                  What I Learned
                </h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{project.lessons}</p>
              </div>

              {/* Tags */}
              <div className="pt-8 border-t-4 border-border">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-foreground text-background font-black uppercase tracking-widest border-2 border-transparent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}
