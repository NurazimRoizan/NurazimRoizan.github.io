"use client"

import { X, Github, ExternalLink } from "lucide-react"
import { useEffect, useRef } from "react"

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
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && project) {
      if (!dialog.open) {
        dialog.showModal()
      }
    } else if (dialog.open) {
      dialog.close()
    }
  }, [isOpen, project])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    // Fallback for browsers without native <dialog closedby="any"> support
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      const isOutside = (e: MouseEvent | PointerEvent) => {
        const rect = dialog.getBoundingClientRect()
        return (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        )
      }

      let pressedOutside = false
      const handlePointerDown = (e: PointerEvent) => {
        pressedOutside = e.target === dialog && isOutside(e)
      }
      const handlePointerUp = (e: PointerEvent) => {
        if (pressedOutside && e.target === dialog && isOutside(e)) {
          dialog.close()
        }
        pressedOutside = false
      }

      dialog.addEventListener("pointerdown", handlePointerDown)
      dialog.addEventListener("pointerup", handlePointerUp)
      return () => {
        dialog.removeEventListener("pointerdown", handlePointerDown)
        dialog.removeEventListener("pointerup", handlePointerUp)
      }
    }
  }, [isOpen, project])

  if (!isOpen || !project) return null

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-modal-title"
      onClose={onClose}
      {...({ closedby: "any" } as any)}
      className="relative bg-card text-foreground border-4 border-border shadow-brutal max-w-4xl w-[calc(100%-2rem)] m-auto p-0 open:flex open:flex-col max-h-[90dvh]"
    >
      {/* Close Button */}
      <form method="dialog">
        <button
          type="submit"
          autoFocus
          className="absolute top-4 right-4 flex items-center justify-center p-2 bg-background border-2 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all z-50 text-foreground"
          aria-label="Close modal"
        >
          <X size={24} aria-hidden="true" />
        </button>
      </form>

      {/* Project Image Panel (Top) */}
      <div className="w-full border-b-4 border-border flex-shrink-0 bg-muted">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={896}
          height={224}
          className="w-full h-40 md:h-56 object-cover"
        />
      </div>

      {/* Content Panel (Bottom) - Scrollable */}
      <div className="w-full p-8 md:p-10 flex flex-col overflow-y-auto max-h-[60dvh]">
        <div className="mb-8">
          <h2 id="project-modal-title" className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground mb-6 pr-12">
            {project.title}
          </h2>
          
          {(project.github || project.live) && (
            <div className="flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-background text-foreground border-2 border-border shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black uppercase tracking-widest text-sm"
                >
                  <Github size={18} aria-hidden="true" />
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
                  <ExternalLink size={18} aria-hidden="true" />
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
              <span className="w-3 h-3 bg-primary block border border-border" aria-hidden="true" />
              Description
            </h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-pretty">{project.description}</p>
          </div>
          
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-3 flex items-center gap-3">
              <span className="w-3 h-3 bg-primary block border border-border" aria-hidden="true" />
              Overview
            </h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-pretty">{project.overview}</p>
          </div>

          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-primary block border border-border" aria-hidden="true" />
              Key Features
            </h3>
            <ul className="space-y-3">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex gap-4 text-muted-foreground font-medium">
                  <span className="text-primary font-black mt-1" aria-hidden="true">►</span>
                  <span className="text-pretty">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.workingPrinciple && (
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-3 flex items-center gap-3">
                <span className="w-3 h-3 bg-primary block border border-border" aria-hidden="true" />
                How It Works
              </h3>
              <p className="text-muted-foreground font-medium leading-relaxed text-pretty">{project.workingPrinciple}</p>
            </div>
          )}

          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-3 flex items-center gap-3">
              <span className="w-3 h-3 bg-primary block border border-border" aria-hidden="true" />
              What I Learned
            </h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-pretty">{project.lessons}</p>
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
    </dialog>
  )
}
